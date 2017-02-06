function Song(rawData) {
    if (rawData != "" && !rawData.match("^#")) { // check it's not a comment or an empty line
        let data = rawData.split("\|");
        if (data.length < 4) {
            throw "Invalid song data";
        }
        this.id = data[0];
        this.artist = data[1];
        this.title = data[2];
        this.file = data[3];
    } else {
        throw "non-song";
    }
}

Song.prototype.getId = function() {
    return this.id;
}

Song.prototype.getArtist = function() {
    return this.artist;
}

Song.prototype.getTitle = function() {
    return this.title;
}

Song.prototype.getFileId = function() {
    return this.file;
}

Song.prototype.getUrl = function() {
    return getCurrentUrlPrefix() + "/songs/" + this.getFileId();
}
