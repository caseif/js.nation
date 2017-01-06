let Util = new function() {

    this.setUp = function() {
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
    }

    this.getCurrentUrlPrefix = function() {
        return window.location.href.split("/")[0] + "//" + window.location.hostname //TODO: check if I can just use //
                + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
    }

    this.random = function(min, max) {
        return Math.random() * (max - min) + min;
    }

    this.secondsToHms = function(seconds) {
        seconds = Number(seconds);
        let h = Math.floor(seconds / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }

    this.shuffle = function(arr) {
        for (let i = arr.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
        }
    }

}
