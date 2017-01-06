let Gui = new function() {

    let lastTouch = 0;
    const PANEL_TIMEOUT = 500;
    let timeoutId;

    this.setUp = function() {
        $("#controls").mouseenter(() => {
            clearTimeout(timeoutId);
            slideUpPanel();
        }).mouseleave(() => {
            timeoutId = setTimeout(() => Gui.slideDownPanel(), PANEL_TIMEOUT);
        });
        setTimeout(Gui.slideDownPanel, 500);
    }

    function slideUpPanel() {
        $("#controls").css("bottom", 0);
    }

    this.slideDownPanel = function() {
        $("#controls").css("bottom", (-$("#controls").height() + 30) + "px");
    }
    
    this.setTitle  = function(artist, title) {
        $("#elmTitle").html(artist + " - " + title);
    }


};
