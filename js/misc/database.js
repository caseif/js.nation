//TODO: some serious organization/structure improvement

let Database = new function() {

    // Listen Elements
    let elmFile;
    let elmAdd = document.getElementById("add2DB");
    let elmView = document.getElementById("viewDB");
    let elmDeldb = document.getElementById("delDB");

    // Global Stores
    let fileStore;
    let imgStore;

    // Misc Elements
    let elmTitle;
    let elmArtist;
    let elmImage1;
    let elmImage2;
    let elmAudio;
    let elmTable;

    this.id3;

    this.setUp = function() {
        elmFile = document.getElementById("fileSelector")
        elmAdd = document.getElementById("add2DB");
        elmView = document.getElementById("viewDB");
        elmDeldb = document.getElementById("delDB");

        elmTitle = document.getElementById("title");
        elmArtist = document.getElementById("artist");
        elmImage1 = document.getElementById("bgimg1");
        elmImage2 = document.getElementById("bgimg2");
        elmAudio = document.getElementById("audio");
        elmTable = document.getElementById("display");

        // button Listeners
        elmFile.addEventListener("change", handleFileSelection, false);
        elmAdd.addEventListener("click", addSong, false);
        elmView.addEventListener("click", handleView, false);
        elmDeldb.addEventListener("click", handleDeleteDB, false);
        
        handleView();
    }

    // Delete Database
    let handleDeleteDB = function() {
        db.delete();
        handleView();
        alert("You'll need to refresh");
    }

    // Create Database
    let db = new Dexie("visDB");
    db.version(1).stores({id3: "++id, artist, title, duration, img, audio"});
    db.open().catch(e => alert("Open failed: " + e));


    let handleFileSelection = function(e) {
        //reset globals
        imgStore = undefined;
        fileStore = e.target.files[0];

        let url;
        try {
            url = URL.createObjectURL(fileStore);
        } catch (error) {
            return;
        }
        ID3.loadTags(url, () => {
            let tags = ID3.getAllTags(url);
            if (tags.picture !== undefined) {
                // Convert picture to base64
                let image = tags.picture; let base64String = "";
                for (let i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }
                imgurl = "data:" + image.format + ";base64," + window.btoa(base64String);
                imgStore = imgurl;
            }
            if (tags.title !== undefined) {
                elmTitle.value = tags.title;
            } else {
                elmTitle.value = "";
            }
            if (tags.artist !== undefined) {
                elmArtist.value = tags.artist;
            } else {
                elmArtist.value = "";
            }
            Background.resetBG();
            Background.loadRedditBackground();
            GuiWrapper.setTitle(tags.artist, tags.title);
            
        }, {
            dataReader: ID3.FileAPIReader(fileStore),
            tags: ["artist", "title", "picture"]
        });
        
        Nodes.playSongFromUrl(url);
        handleView();
    }

    let addSong = function() {
        let image = imgStore;
        let artist = elmArtist.value;
        let title = elmTitle.value;
        let duration = Util.secondsToHms(elmAudio.duration);
        db.id3.add({artist: artist, title: title, duration: duration, img: image, audio: fileStore});
        handleView();
    }

    //TODO: this function needs to get merged into Gui and made less ugly
    let handleView = function() {
        db.id3.toArray()
                .then(arr => $("#db-view").html($.templates("#table-row-template").render(arr)))
                .catch(console.err);
    }

    this.handlePlay = function(i) {
        db.id3.where("id").equals(i).each(result => {
            GuiWrapper.setTitle(result.artist, result.title);
            Nodes.playSongFromUrl(URL.createObjectURL(result.audio));
            Background.resetBG();
            Background.loadRedditBackground();
        });
    }

    this.handleRemove = function(i) {
        db.id3.where("id").equals(i).delete();
        handleView();
    }

    this.openGui = function() {
        $('#gui_full').fadeIn(Config.guiFadeTime);
        keepGui = true;
    }

    this.closeGui = function() {
        $('#gui_full').fadeOut(Config.guiFadeTime);
        keepGui = false;
    }
    
}
