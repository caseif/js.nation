let Background = new function() {

    const SUBREDDIT = "EarthPorn";
    const WHITELISTED_DOMAINS = ["i.imgur.com", "i.redd.it", "i.reddituploads.com"];

    let stockUrls = [
        "u9muu7r", "elUmrNS", "TcA4IsQ", "PaMnxZn", "P7hwlaN", 
        "I5O4QWi", "fT4bxpb", "U7Bx7FQ", "Qujelxk", "KAHqXM2", 
        "laGeYSO", "HdsWnkU", "xEanEAB", "NG3moRJ", "31E8sfB",  
        "XGiYXHs", "QBAbrBJ", "uclwgUc", "koPzyZ1", "8VfPY96"  
    ];

    let redditJsonpTag;
    let redditData;
    
    this.setUp = function() {
        redditJsonpTag = document.createElement("script");
        this.loadRedditBackground();
    }

    this.loadRedditBackground = function() {
        $.ajax({
            url: "https://www.reddit.com/r/" + SUBREDDIT + "/.json",
            method: "GET",
            success: handleRedditData,
            error: handleRedditFail
        });
    }
    
    let handleRedditData = function(result) {
        let posts = result.data.children;
        Util.shuffle(posts);
        let post;
        let found = false;
        for (let i = 0; i < posts.length; i++) {
            post = posts[i];
            if (WHITELISTED_DOMAINS.indexOf(post.data.domain) != -1
                    && post.data.preview.images[0].source.width >= 2560) {
                found = true;
                break;
            }
        }

        if (!found) {
            console.log("Failed to find satisfactory Reddit post; falling back to Imgur");
            loadImgurBackground();
        }

        let smol = post.data.preview.images[0].resolutions[1].url.replaceAll("&amp;", "&");
        let full = post.data.url.replaceAll("&amp;", "&");
        setBackground(full, smol);
    }

    let handleRedditFail = function() {
        console.log("Failed to reach Reddit API, falling back to Imgur...");
        loadImgurBackground();
    }

    let loadImgurBackground = function() {
        $.ajax({
            url: "https://api.imgur.com/3/gallery/r/earthporn/0",
            method: "GET",
            headers: {
                Authorization: "Client-ID 0428dcb72fbc5da",
                Accept: "application/json"
            },
            data: {
                image: localStorage.dataBase64,
                type: "base64"
            },
            success: handleImgurData,
            error: handleImgurFail
        });
    }
    
    let handleImgurData = function(result) {
        let id = result.data[Math.floor(Math.random() * result.data.length)].id;
        setBackground("https://i.imgur.com/" + id + ".jpg", "https://i.imgur.com/" + id + "m.jpg");
    }

    let handleImgurFail = function() {
        console.log("Failed to reach Imgur API; falling back to stock photos");
        loadStockBackground();
    }
    
    let loadStockBackground = function() {
        let id = stockUrls[Math.floor(Math.random() * stockUrls.length)];
        setBackground("https://i.imgur.com/" + id + ".jpg", "https://i.imgur.com/" + id + "m.jpg");
    }

    let setBackground = function(fullRes, lowRes) {
        document.getElementById("bgimg1").style.display = "";
        document.getElementById("bgimg2").style.display = "";
        document.getElementById("limg1").style.display = "";
        document.getElementById("limg2").style.display = "";

        document.getElementById("bgimg1").src = fullRes;
        document.getElementById("bgimg2").src = fullRes;
        if (lowRes !== undefined) {
            document.getElementById("limg1").src = lowRes;
            document.getElementById("limg2").src = lowRes;
        }
    }
    
    this.flipImage = function() {
        $(".bgleft, .bgright").toggleClass("bgright bgleft");
    }
    
    this.fadeFullRes = function(element) {
        $("#" + element.id).css({"opacity": 1, "filter": "none"});
    }
    this.resetBG = function() {
        document.getElementById("bgimg1").src = "";
        document.getElementById("bgimg2").src = "";
        document.getElementById("limg1").src = "";
        document.getElementById("limg2").src = "";
    }
    
}
