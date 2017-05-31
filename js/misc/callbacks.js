let Callbacks = new function() {

    const PRIORITY_LEVELS = 5;

    let callbacks = Array();

    let player;

    this.setUp = function() {
        player = document.getElementById("audio");
    }

    this.invokeCallbacks = function(spectrum, multiplier) {
        if (!player.paused) {
            for (let i = 0; i < PRIORITY_LEVELS; i++) {
                handleCallbackArray(callbacks[i], spectrum, multiplier);
            }
        }
    }

    let handleCallbackArray = function(callbacks, spectrum, multiplier) {
        if (callbacks === undefined) {
            return;
        }

        let len = callbacks.length;
        for (let i = 0; i < len; i++) {
            callbacks[i](spectrum, multiplier);
        }
    }

    this.addCallback = function(callback, priority) {
        if (priority === undefined) {
            priority = 2;
        }
        if (priority < 0 || priority >= PRIORITY_LEVELS || !Number.isInteger(priority)) {
            throw "Invalid priority [0-" + (PRIORITY_LEVELS - 1) + "]";
        }
        if (callbacks[priority] === undefined) {
            callbacks[priority] = Array();
        }
        callbacks[priority].push(callback);
    }
    
}
