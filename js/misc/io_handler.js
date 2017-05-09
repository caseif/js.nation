let IoHandler = new function() {

    const KEY_F_UPPER = 70;
    const KEY_F_LOWER = 102;

    this.setUp = function() {
        $("#canvas").click(() => {
            Database.closeGui();
        });

        $("#db-view").on("click", ".row-title", function() {
            let id = $(this).parent().attr("data-songid");
            console.log("title: " + id);
        });

        $("#db-view").on("click", ".row-artist", function() {
            let id = $(this).parent().attr("data-songid");
            console.log("artist: " + id);
        });

        $(document).keypress(event => {
            if (event.which == KEY_F_UPPER || event.which == KEY_F_LOWER) {
                if (!GuiWrapper.isOpen) {
                    Background.flipImage();
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
