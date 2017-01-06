SongLoader.loadSongs();

Callbacks.setUp();
Background.setUp();

Nodes.setUp();
Db.setUp();

Canvas.setUp();
Emblem.setUp();
Spectrum.setUp();

Nodes.playSong(SongLoader.randomSong());
