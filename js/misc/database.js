//TODO: some serious organization/structure improvement

let Database = new function () {

    let perPage = Math.floor(($(window).height() - 400) / 550 * 8);

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

    let order;
    let index;

    this.setUp = function () {
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
        db.version(1).stores({ id3: "++id, artist, title, duration, img, audio" });
        db.open().catch(e => alert("Open failed: " + e));

        db.id3.count().then(c => totalCount = c).finally(() => {
            applyShuffle();
            handleView(false);
            if (totalCount > 0) {
                Database.playCurrent().catch(ex => {
                    console.error(ex);
                    $("#welcome-noauto-container").css("display", "block");
                    $("#audio")[0].src = "";
                    AudioWrap.togglePlaying();
                    GuiWrapper.welcomeOpen = true;
                });
            } else {
                $("#welcome-full").css("display", "block");
                GuiWrapper.welcomeOpen = true;
                Background.resetBG();
                Background.loadRedditBackground();
            }

        });
    }

    this.toggleShuffle = function () {
        let shuffle = true;
        if (Util.getCookie("shuffle") !== undefined) {
            shuffle = Util.getCookie("shuffle") == "false";
        }
        Util.setCookie("shuffle", shuffle);

        applyShuffle();
    }

    let applyShuffle = function () {
        let shuffle = Util.getCookie("shuffle") == "true";

        if (index === undefined) {
            index = Math.floor(Math.random() * totalCount);
        }

        let prev = order !== undefined ? order[index] : NaN;

        order = Util.range(totalCount);
        if (shuffle) {
            Util.shuffle(order);
        }

        if (prev != NaN) {
            for (let i = 0; i < order.length; i++) {
                if (order[i] == prev) {
                    index = i;
                    break;
                }
            }
        }

        $("#shuffle").toggleClass("on", shuffle);
    }

    // Delete Database
    let handleDeleteDB = function () {
        if (!confirm("Are you sure you wish to delete the database? This action cannot be undone!")) {
            return;
        }
        db.delete();
        handleView(false);
        alert("Database deleted. (You'll need to refresh the page.)");
    }


    let handleFileSelection = function (e) {
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
                let image = tags.picture;
                let base64String = "";

                for (let i = 0; i < image.data.length; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }

                imgStore = "data:" + image.format + ";base64," + window.btoa(base64String);
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

        let promise = Nodes.playSongFromUrl(url);

        handleView(true);

        return promise;
    }

    let addSong = function () {
        let image = imgStore;

        let artist = elmArtist.value;
        let title = elmTitle.value;
        let duration = Util.secondsToHms(elmAudio.duration);

        if (image === undefined) {
            $.ajax({
                url: "https://itunes.apple.com/search?term=" + artist + " " + title,
                dataType: 'jsonp'
            }).done(function (data) {
                console.log("No ID3 artwork found; attempting iTunes search.");

                let itunesStr;

                if (data.results[0] == undefined) {
                    itunesStr = "./img/art_ph.png";
                } else {
                    itunesStr = JSON.stringify(data.results[0].artworkUrl100);
                    itunesStr = itunesStr.replace(/\"/g, "");
                }

                db.id3.add({ artist: artist, title: title, duration: duration, img: itunesStr, audio: fileStore });

                order[totalCount] = totalCount;
                index = totalCount;
                totalCount++;

                handleView(false);
            })
        } else {

            db.id3.add({ artist: artist, title: title, duration: duration, img: image, audio: fileStore });

            order[totalCount] = totalCount;
            index = totalCount;
            totalCount++;

            handleView(false);
        }

    }

    let handleRefresh = function () {
        handleView();
    }

    let handleView = function (enableFields = undefined) {
        let i = 0;
        let skip = page * perPage;

        db.id3.filter(row => i++ >= skip).limit(perPage).toArray()
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

        let totalPages = Math.ceil(totalCount / perPage);

        if (page >= totalPages - 1) {
            $("#db-next").css("color", "#555");
            $("#db-next").removeClass("interactable");
        } else {
            $("#db-next").css("color", "#DBDBDB");
            $("#db-next").addClass("interactable");
        }

        $("#db-page-info").html("Page " + (totalCount > 0 ? page + 1 : 0) + "/" + totalPages);
    }

    this.handlePlay = function (i) {
        let promiseArr = [];
        let promise = new Promise((resolve, reject) => {
            promiseArr.push({ resolve: resolve, reject: reject });
        });

        db.id3.where("id").equals(i).each(result => {
            let subPromise = Nodes.playSongFromUrl(URL.createObjectURL(result.audio));
            Background.resetBG();
            Background.loadRedditBackground();

            promiseArr[0].resolve(subPromise);
        });

        return promise;
    }

    this.handleRemove = function (i) {
        db.id3.where("id").equals(i).delete();
        totalCount--;
        if (totalCount % perPage == 0) {
            page--;
        }

        applyShuffle();

        handleView(false);
    }

    this.updateTitle = function (id, title) {
        id = parseInt(id);
        db.transaction("rw", db.id3, () => db.id3.where("id").equals(id).modify({ title: title }))
            .catch(e => console.log(e));
    }

    this.updateArtist = function (id, artist) {
        id = parseInt(id);
        console.log(id);
        db.transaction("rw", db.id3, () => db.id3.where("id").equals(id).modify({ artist: artist }))
            .catch(e => console.log(e));
    }

    this.prevPage = function () {
        if (page > 0) {
            page--;
            handleView();
        }
    }

    this.nextPage = function () {
        if (page < Math.ceil(totalCount / perPage) - 1) {
            page++;
            handleView();
        }
    }

    this.playSongAtIndex = function (index) {
        let promiseArr = [];
        let promise = new Promise((resolve, reject) => {
            promiseArr.push({ resolve: resolve, reject: reject });
        });

        db.id3.toArray().then(arr => {
            promiseArr[0].resolve(this.handlePlay(arr[order[index]].id));
        });

        return promise;
    }

    this.playCurrent = function () {
        return this.playSongAtIndex(index);
    }

    this.playNextSong = function () {
        return this.playSongAtIndex(++index < totalCount ? index : (index = 0));
    }

    this.playPrevSong = function () {
        return this.playSongAtIndex(--index >= 0 ? index : (index = totalCount - 1));
    }

}
