var Util = new function() {

    this.getCurrentUrlPrefix = function() {
        return window.location.href.split("/")[0] + "//" + window.location.hostname //TODO: check if I can just use //
                + window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"));
    };

}
