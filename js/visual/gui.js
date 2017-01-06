let Gui = new function() {

    let lastTouch = 0;
    const PANEL_TIMEOUT = 1000;
    let timeoutId;

    this.setUp = function() {
        $("#controls").mouseenter(() => {
            clearTimeout(timeoutId);
            slideUpPanel();
        }).mouseleave(() => {
            timeoutId = setTimeout(() => Gui.slideDownPanel(), PANEL_TIMEOUT);
        });
        setTimeout(Gui.slideDownPanel, 1000);
    }

    function slideUpPanel() {
        $("#controls").css("bottom", 0);
    }

    this.slideDownPanel = function() {
        $("#controls").css("bottom", (-$("#controls").height() + 32) + "px");
    }


};
