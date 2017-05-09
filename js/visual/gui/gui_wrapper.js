let GuiWrapper = new function() {

    let keepGui = false;

    let timer;

    this.setUp = function() {
        $(document).mousemove(() => {
            clearInterval(timer);
            $("#gui-top").fadeIn(Config.guiFadeTime);
            $("#gui-bottom").fadeIn(Config.guiFadeTime);
            $("*").css("cursor", "auto");
            if (!keepGui && !Config.keepGui) {
                timer = setTimeout(() => {
                    $("#gui-top").fadeOut(Config.guiFadeTime);   
                    $("#gui-bottom").fadeOut(Config.guiFadeTime);
                    $("*").css("cursor", "none");
                }, Config.guiTimeout);
            }
        });

        $('input:text, .ui.button', '.ui.action.input').on('click', function(e) {
            $('input:file', $(e.target).parents()).click();
        });

        $('input:file', '.ui.action.input').on('change', function(e) {
            var name = e.target.files[0].name;
            $('input:text', $(e.target).parent()).val(name);
        });
    }
    
    this.setTitle  = function(artist, title) {
        $("#elm-title").html("<h1 id='gui-song'><span id='gui-artist'>" + artist + "</span><br> " + title + "</h1>");
    }

};
