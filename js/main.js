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
}

window.onload = Main.init;
$(document).ready(Main.postInit);
