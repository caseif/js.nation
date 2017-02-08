let Main = new function() {
    this.init = function() {
        Callbacks.setUp();
        
        Util.setUp();

        SongLoader.loadSongs();
        Background.setUp();

        Nodes.setUp();

        Database.setUp();
        Gui.setUp();

        Canvas.setUp();
        Emblem.setUp();
        Spectrum.setUp();

        Scene.setUp();
        Particles.setUp();
        Lighting.setUp();
        Renderer.setUp();

        Nodes.playSong(SongLoader.randomSong());
    }

    this.postInit = function() {
        AudioWrap.setUp();
    }

    this.resizeCallback = function() {
        Canvas.setStyling();
        Renderer.updateSize();
    }

    window.onload = this.init;
    $(document).ready(this.postInit);
    window.onresize = this.resizeCallback;
}
