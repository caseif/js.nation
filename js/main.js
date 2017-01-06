let Main = new function() {
    this.init = function() {
        Util.setUp();

        SongLoader.loadSongs();

        Callbacks.setUp();
        Background.setUp();

        Nodes.setUp();

        Database.setUp();
        Gui.setUp();

        Canvas.setUp();
        Emblem.setUp();
        Spectrum.setUp();

        Nodes.playSong(SongLoader.randomSong());
    }
}

window.onload = Main.init;
