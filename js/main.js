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
        
        audioWrap.setUp();

        Nodes.playSong(SongLoader.randomSong());
    }
}

window.onload = Main.init;
