let SongLoader = new function() {

    let songs;

    this.randomSong = function() {
        let keys = Object.keys(songs);
        return songs[keys[Math.floor(Math.random() * keys.length)]];
    }

    this.getSong = function(id) {
        return songs[id];
    }

    this.loadSongs = function() {
        songs = {};
        $.ajax({
            url:        Util.getCurrentUrlPrefix() + "/songs.csv",
            success:    csv => {
                            let lines = csv.split("\n");
                            lines.forEach(line => {
                                try {
                                    let s = new Song(line);
                                    songs[s.getId()] = s;
                                    count = count + 1;
                                } catch (ignored) {
                                }
                            });
                        },
            async:        false
        });
    }

}
