var Canvas = new function() {

    this.canvas = $("#canvas").get()[0];
    this.context = canvas.getContext("2d");

    this.setUp = function() {
        $("#canvas").attr("width", $(window).width());
        $("#canvas").attr("height", $(window).height());

        Nodes.addCallback(clearCallback, 0);
    };

    var clearCallback = function() {
        Canvas.context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
    }

}
