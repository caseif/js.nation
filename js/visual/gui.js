let gui = new function() {
    
    this.customSong = function(url) {
        Nodes.destroyContext();
        Nodes.setUp();
        Nodes.playSong(null,true,url);
    }
    this.resetRandom = function() {
        Nodes.destroyContext();
        Nodes.setUp();
        Nodes.playSong(SongLoader.randomSong());
    }

};