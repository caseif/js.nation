let SongLoader = new function() {

    this.randomSong = function() {
        let songs = getAllSongs();
        return songs[Object.keys(songs)[Math.random() * songs.length]];
    };

    this.getSong = function(id) {
        getAllSongs()[id];
    };

    let getAllSongs = function() {
        let songs = [];
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
                            songs.splice("undefined", 1);
                        },
            async:        false
        });
        return songs;
    };

};
