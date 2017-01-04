Nodes.setUp();
Canvas.setUp();
Emblem.setUp();
Spectrum.setUp();

Nodes.playSong(SongLoader.randomSong());
window.onresize = function() {Canvas.setUp();}