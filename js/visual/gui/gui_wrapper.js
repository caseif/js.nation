let GuiWrapper = new function() {

    this.isOpen = false;

    let keepGui = false;

    let timer;

    this.setUp = function() {
        $(document).mousemove(() => {
            clearInterval(timer);
            $("#gui-top").fadeIn(Config.guiFadeTime);
            $("#gui-bottom").fadeIn(Config.guiFadeTime);
            $("body").css("cursor", "auto");
            if (!keepGui && !Config.keepGui) {
                timer = setTimeout(() => {
                    $("#gui-top").fadeOut(Config.guiFadeTime);   
                    $("#gui-bottom").fadeOut(Config.guiFadeTime);
                    $("body").css("cursor", "none");
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

    this.openGui = function() {
        $('#gui-full').fadeIn(Config.guiFadeTime);
        keepGui = true;
    }

    this.closeGui = function() {
        $('#gui-full').fadeOut(Config.guiFadeTime);
        keepGui = false;
    }
    
    this.setTitle  = function(artist, title) {
        $("#gui-artist").html(artist);
        $("#gui-title").html(title);
    }

    this.updatePlayBtn = function() {
        $("#play").toggleClass("fa-play", $("audio").paused);
        $("#play").toggleClass("fa-pause", !$("audio").paused);
    }

    this.toggleTextField = function(element) {
        let input = element.find("input")[0];
        if (input !== undefined) {
            // finished editing
            let id = element.parent().attr("data-songid");
            let newVal = input.value;
            if (newVal.length == 0) {
                element.html($(input).attr("data-oldval"));
                return;
            }
            if (element.hasClass("row-title")) {
                Database.updateTitle(id, newVal);
            } else {
                Database.updateArtist(id, newVal);
            }
            element.html(newVal);
        } else {
            // start editing
            element.html("<input type='text' class='db-edit-input' value='" + element.html()
                    + "' onfocus='this.value = this.value' data-oldval='" + element.html()
                    + "' style='min-width:" + element.width() + "px'>");
            element.find("input").focus();
        }
    }

};
