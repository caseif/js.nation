//TODO: some serious organization/structure improvement

let Database = new function() {

    const PER_PAGE = 8;

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

    let dbTemplate;

    let db;
    
    let page = 0;
    let totalCount;

    this.setUp = function() {
        elmFile = document.getElementById("fileSelector")
        elmAdd = document.getElementById("add2DB");
        elmView = document.getElementById("viewDB");
        elmDeldb = document.getElementById("delDB");

        elmTitle = document.getElementById("field-title");
        elmArtist = document.getElementById("field-artist");
        elmImage1 = document.getElementById("bgimg1");
        elmImage2 = document.getElementById("bgimg2");
        elmAudio = document.getElementById("audio");
        elmTable = document.getElementById("display");

        // button Listeners
        elmFile.addEventListener("change", handleFileSelection, false);
        elmAdd.addEventListener("click", addSong, false);
        elmView.addEventListener("click", handleRefresh, false);
        elmDeldb.addEventListener("click", handleDeleteDB, false);

        dbTemplate = $.templates("#table-row-template");

        // Create Database
        db = new Dexie("visDB");
        db.version(1).stores({id3: "++id, artist, title, duration, img, audio"});
        db.open().catch(e => alert("Open failed: " + e));

        db.id3.count().then(c => totalCount = c).finally(() => handleView(false));
    }

    // Delete Database
    let handleDeleteDB = function() {
        if (!confirm("Are you sure you wish to delete the database? This action cannot be undone!")) {
            return;
        }
        db.delete();
        handleView(false);
        alert("Database deleted. (You'll need to refresh the page.)");
    }


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
        handleView(true);
    }

    let addSong = function() {
        let image = imgStore;
        let artist = elmArtist.value;
        let title = elmTitle.value;
        let duration = Util.secondsToHms(elmAudio.duration);
        db.id3.add({artist: artist, title: title, duration: duration, img: image, audio: fileStore});
        totalCount++;
        handleView(false);
    }

    let handleRefresh = function() {
        handleView();
    }

    let handleView = function(enableFields = undefined) {
        let i = 0;
        let skip = page * PER_PAGE;
        db.id3.filter(row => i++ >= skip).limit(PER_PAGE).toArray()
                .then(arr => $("#db-view").html(dbTemplate.render(arr)))
                .catch(console.error);
        if (enableFields !== undefined) {
            $("#add2DB").attr("disabled", !enableFields);
            $("#field-artist").attr("disabled", !enableFields);
            $("#field-title").attr("disabled", !enableFields);
        }

        if (page <= 0) {
            $("#db-prev").css("color", "#555");
            $("#db-prev").removeClass("interactable");
        } else {
            $("#db-prev").css("color", "#DBDBDB");
            $("#db-prev").addClass("interactable");
        }

        let totalPages = Math.ceil(totalCount / PER_PAGE);
        if (page >= totalPages - 1) {
            $("#db-next").css("color", "#555");
            $("#db-next").removeClass("interactable");
        } else {
            $("#db-next").css("color", "#DBDBDB");
            $("#db-next").addClass("interactable");
        }

        $("#db-page-info").html("Page " + (page + 1) + "/" + totalPages);
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
        totalCount--;
        if (totalCount % PER_PAGE == 0) {
            page--;
        }
        handleView(false);
    }

    this.updateTitle = function(id, title) {
        id = parseInt(id);
        db.transaction("rw", db.id3, () => db.id3.where("id").equals(id).modify({title: title}))
                .catch(e => console.log(e));
    }

    this.updateArtist = function(id, artist) {
        id = parseInt(id);
        db.transaction("rw", db.id3, () => db.id3.where("id").equals(id).modify({artist: artist}))
                .catch(e => console.log(e));
    }

    this.prevPage = function() {
        if (page > 0) {
            page--;
            handleView();
        }
    }

    this.nextPage = function() {
        if (page < Math.ceil(totalCount / PER_PAGE) - 1) {
            page++;
            handleView();
        }
    }
    
}
