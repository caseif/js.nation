var Callbacks = new function() {

    let callbacks = [];
    const PRIORITY_LEVELS = 5;

    this.setUp = function() {
        for (let i = 0; i < PRIORITY_LEVELS; i++) {
            callbacks[i] = [];
        }
    }

    this.invokeCallbacks = function(spectrum, multiplier) {
        for (let i = 0; i < PRIORITY_LEVELS; i++) {
            handleCallbackArray(callbacks[i], spectrum, multiplier);
        }
    }

    let handleCallbackArray = function(callbacks, spectrum, multiplier) {
        let len = callbacks.length;
        for (let i = 0; i < len; i++) {
            callbacks[i](spectrum, multiplier);
        }
    }

    this.addCallback = function(callback, priority) {
        if (priority == undefined) {
            priority = 2;
        }
        if (priority < 0 || priority >= PRIORITY_LEVELS || !Number.isInteger(priority)) {
            throw "Invalid priority [0-" + (PRIORITY_LEVELS - 1) + "]";
        }
        callbacks[priority].push(callback);
    }
    
}
