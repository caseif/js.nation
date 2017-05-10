let IoHandler = new function() {

    const KEY_ENTER = 13;
    const KEY_F_UPPER = 70;
    const KEY_F_LOWER = 102;

    this.setUp = function() {
        $("#canvas").click(() => {
            GuiWrapper.closeGui();
        });

        $("#db-view").on("click", ".row-title", function() {
            if ($(this).find("input").length == 0) {
                GuiWrapper.toggleTextField($(this));
            }
        });

        $("#db-view").on("click", ".row-artist", function() {
            if ($(this).find("input").length == 0) {
                GuiWrapper.toggleTextField($(this));
            }
        });

        $("#db-view").on("blur", ".db-edit-input", function() {
            GuiWrapper.toggleTextField($(this).parent());
        });

        $(document).keypress(event => {
            if (event.which == KEY_F_UPPER || event.which == KEY_F_LOWER) {
                if (!GuiWrapper.isOpen) {
                    Background.flipImage();
                }
            } else if (event.which == KEY_ENTER) {
                let focused = $(document.activeElement);
                if (focused.hasClass("db-edit-input")) {
                    GuiWrapper.toggleTextField(focused.parent());
                }
            }
        });

        $("#field-artist").on("input", function() {
            $("#gui-artist").html($(this).val());
        });

        $("#field-title").on("input", function() {
            $("#gui-title").html($(this).val());
        });
    }

}
