//TODO: some serious organization/structure improvement

let Database = new function() {

    // Listen Elements
    let elmFile = document.getElementById("fileSelector");
    let elmAdd = document.getElementById("add2DB");
    let elmView = document.getElementById("viewDB");
    let elmDeldb = document.getElementById("delDB");

    // Global Stores
    let fileStore;
    let imgStore;

    // Misc Elements
    let elmTitle = document.getElementById("title");
    let elmArtist = document.getElementById("artist");
    let elmImage0 = document.getElementById("img");
    let elmImage1 = document.getElementById("bgimg1");
    let elmImage2 = document.getElementById("bgimg2");
    let elmAudio = document.getElementById("audio");
    let elmTable = document.getElementById("display");

    this.setUp = function() {
        // button Listeners
        elmFile.addEventListener("change", handleFileSelection, false);
        elmAdd.addEventListener("click", addSong, false);
        elmView.addEventListener("click", handleView, false);
        elmDeldb.addEventListener("click", handleDeleteDB, false);

        handleView();
    }

    // Debug Element | xalert("message");
    let elmMessages = document.getElementById("messages");
    function xalert(message) {
        elmMessages.innerHTML += message + "<br>";
    }

    // Delete Database
    function handleDeleteDB() {
        db.delete();
        handleView();
        xalert("You'll need to refresh");
    }

    // Create Database
    let db = new Dexie("visDB");
    db.version(1).stores({id3: "++id, artist, title, duration, img, audio"});
    db.open().catch(e => xalert("Open failed: " + e));


    function handleFileSelection(e) {
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
                elmImage0.src = imgStore;
            } else {
                elmImage0.src = "";
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
        }, {
            dataReader: ID3.FileAPIReader(fileStore),
            tags: ["artist", "title", "picture"]
        });
        Nodes.playSongFromUrl(url);
        handleView();
    }

    function addSong() {
        let image = imgStore;
        let artist = elmArtist.value;
        let title = elmTitle.value;
        let duration = Util.secondsToHms(elmAudio.duration);
        db.id3.add({artist: artist, title: title, duration: duration, img: image, audio: fileStore});
        handleView();
    }

    //TODO: this function needs to get merged into Gui and made less ugly
    function handleView() {
        elmTable.innerHTML = "";
        
        db.id3.each(result => {
            let tr = "<tr>";
            let td1;
            if (result.img !== undefined) {
                td1 = "<td><img width=\"50px\" src=\"" + result.img + "\"></td>";
            } else {
                td1 = "<td></td>";
            }
            let td2 = "<td><a onclick=\"javascript:handlePlay(" + result.id + ")\">Play</a></td>";
            let td3 = "<td>" + result.title + "</td>";
            let td4 = "<td>" + result.artist + "</td>";
            let td5 = "<td><a onclick=\"javascript:handleRemove(" + result.id + ")\">Remove</a></td>";
            let td6 = "<td>" + result.duration + "</td>";
            let tr2 = "</tr></td>";
            elmTable.innerHTML = elmTable.innerHTML + tr + td1 + td2 + td3 + td4 + td5 + td6 + tr2;
        });
    }

    function handlePlay(i) {
        db.id3.where("id").equals(i).each(result => {
            Nodes.playSongFromUrl(URL.createObjectURL(result.audio));
            //elmAudio.src = URL.createObjectURL(result.audio);
            elmImage0.src = result.img;
        });
        handleView();
    }

    function handleRemove(i) {
        db.id3.where("id").equals(i).delete();
        handleView();
    }

}
