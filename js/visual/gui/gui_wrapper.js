let GuiWrapper = new function() {

    let keepGui = false;

    let timer;

    this.setUp = function() {
        
        $('#canvas').click(function() {
            $('#gui_full').fadeToggle(Config.guiFadeTime);
            keepGui = !keepGui;
        });
        
        
        $(document).mousemove(() => {
            clearInterval(timer);
            $("#gui_top").fadeIn(Config.guiFadeTime);
            $("#gui_bottom").fadeIn(Config.guiFadeTime);
            $("*").css("cursor", "auto");
            if (!keepGui) {
                timer = setTimeout(() => {
                    $("#gui_top").fadeOut(Config.guiFadeTime);   
                    $("#gui_bottom").fadeOut(Config.guiFadeTime);
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
        $("#elmTitle").html("<h1 id='guiSong'><span id='guiArtist'>" + artist + "</span><br> " + title + "</h1>");
    }

};
