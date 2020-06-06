let GuiWrapper = new function() {

    this.isOpen = false;

    this.aboutOpen = false;

    this.keepGui = false;

    let outsideWindow = false;

    let timer;

    this.setUp = function() {
        $(document).mousemove(() => {
            clearInterval(timer);
            $("#gui-top").fadeIn(Config.guiFadeTime);
            $("#gui-bottom").fadeIn(Config.guiFadeTime);
            $("body").css("cursor", "auto");

            if (!this.keepGui && !Config.keepGui && ($('.gui-part:hover').length == 0 || outsideWindow)) {
                timer = setTimeout(() => {
                    hideOverlay();
                }, Config.guiTimeout);
            }
        });

        $(document).mouseleave(() => {
            outsideWindow = true;
            hideOverlay();
        });

        $(document).mouseenter(() => {
            outsideWindow = false;
        });

        $("input:text, .ui.button", ".ui.action.input").on("click", function(e) {
            $("input:file", $(e.target).parents()).click();
        });

        $("input:file", ".ui.action.input").on("change", function(e) {
            var name = e.target.files[0].name;
            $("input:text", $(e.target).parent()).val(name);
        });
    }

    let hideOverlay = function() {
        $("#gui-top").fadeOut(Config.guiFadeTime);   
        $("#gui-bottom").fadeOut(Config.guiFadeTime);
        $("body").css("cursor", "none");
    }

    this.openGui = function() {
        if (this.aboutOpen) {
            this.closeAbout();
        }
        if (this.welcomeOpen) {
            this.closeWelcome();
        }
        $("#gui-full").fadeIn(Config.guiFadeTime);
        this.keepGui = true;
    }

    this.closeGui = function() {
        $("#gui-full").fadeOut(Config.guiFadeTime);
        this.keepGui = false;
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
        if (!element.is("div")) {
            element = element.find("div");
        }
        
        let input = element.find("input")[0];
        if (input !== undefined) {
            // finished editing
            let id = element.parent().parent().attr("data-songid");
            let newVal = input.value;
            if (newVal.length == 0) {
                element.html($(input).attr("data-oldval"));
                return;
            }
            if (element.parent().hasClass("row-title")) {
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

    this.openAbout = function() {
        if (!this.aboutOpen) {
            if (this.keepGui) {
                this.closeGui();
            }
            if (this.welcomeOpen) {
                this.closeWelcome();
            }
            $("#about-full").fadeIn(Config.guiFadeTime);
            this.aboutOpen = true;
        }
    }

    this.closeAbout = function() {
        if (this.aboutOpen) {
            $("#about-full").fadeOut(Config.guiFadeTime);
            this.aboutOpen = false;
        }
    }

    this.closeWelcome = function() {
        if (this.welcomeOpen) {
            $("#welcome-full").fadeOut(Config.guiFadeTime);
            $("#welcome-noauto-container").fadeOut(Config.guiFadeTime);
            this.welcomeOpen = false;
        }
    }

};
