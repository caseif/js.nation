let Background = new function() {

    let stockUrls = [
        "u9muu7r", "elUmrNS", "TcA4IsQ", "PaMnxZn", "P7hwlaN", 
        "I5O4QWi", "fT4bxpb", "U7Bx7FQ", "Qujelxk", "KAHqXM2", 
        "laGeYSO", "HdsWnkU", "xEanEAB", "NG3moRJ", "31E8sfB",  
        "XGiYXHs", "QBAbrBJ", "uclwgUc", "koPzyZ1", "8VfPY96"  
    ];
    
    this.setUp = function() {
        loadImgurBackground();
    }

    let loadImgurBackground = function() {
        $.ajax({
            url: "https://api.imgur.com/3/gallery/r/earthporn/0",
            method: 'GET',
            headers: {
                Authorization: "Client-ID 0428dcb72fbc5da",
                Accept: "application/json"
            },
            data: {
                image: localStorage.dataBase64,
                type: "base64"
            },
            success: handleImgurData
        });
    }
    
    let loadStockBackground = function() {
        let id = stockUrls[Math.floor(Math.random() * stockUrls.length)];
        setBackground("https://i.imgur.com/" + id + ".jpg", "https://i.imgur.com/" + id + "m.jpg");
    }

    let setBackground = function(fullRes, lowRes) {
        document.getElementById("bgimg1").src = fullRes;
        document.getElementById("bgimg2").src = fullRes;
        if (lowRes !== undefined) {
            document.getElementById("limg1").src = lowRes;
            document.getElementById("limg2").src = lowRes;
        }
    }
    
    let handleImgurData = function(result) {
        let id = result.data[Math.floor(Math.random() * result.data.length)].id;
        setBackground("https://i.imgur.com/" + id + ".jpg", "https://i.imgur.com/" + id + "m.jpg");
    }

    this.flipImage = function() {
        $(".bgleft, .bgright").toggleClass("bgright bgleft");
    }
    
}
