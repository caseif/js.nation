let IoHandler = new function() {

    const KEY_F_UPPER = 70;
    const KEY_F_LOWER = 102;

    this.setUp = function() {
        $("#canvas").click(() => {
            Database.closeGui();
        });

        $(document).keypress(event => {
            if (event.which == KEY_F_UPPER || event.which == KEY_F_LOWER) {
                Background.flipImage();
            }
        });
    }

}
