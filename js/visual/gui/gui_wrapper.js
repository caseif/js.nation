let GuiWrapper = new function() {

    this.isOpen = false;

    let keepGui = false;

    let timer;

    this.setUp = function() {
        $(document).mousemove(() => {
            this.isOpen = true;
            clearInterval(timer);
            $("#gui-top").fadeIn(Config.guiFadeTime);
            $("#gui-bottom").fadeIn(Config.guiFadeTime);
            $("*").css("cursor", "auto");
            if (!keepGui && !Config.keepGui) {
                timer = setTimeout(() => {
                    $("#gui-top").fadeOut(Config.guiFadeTime);   
                    $("#gui-bottom").fadeOut(Config.guiFadeTime);
                    $("*").css("cursor", "none");
                    this.isOpen = false;
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
        $("#gui-artist").html(artist);
        $("#gui-title").html(title);
    }

    this.updatePlayBtn = function() {
        $("#play").toggleClass("fa-play", $("audio").paused);
        $("#play").toggleClass("fa-pause", !$("audio").paused);
    }

};
