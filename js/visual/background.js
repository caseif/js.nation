let Background = new function() {

    let urls = ["ch2BGga", "xA01J0J", "czRL14s", "tBm4nmM", "VcKlu5n", "8ztI8Ng", "Di8c0cV"];

    this.setUp = function() {
        let index = urls[Math.floor(Math.random() * urls.length)];
        document.getElementById("bgimg1").src = "https://i.imgur.com/" + index +".jpg";
        document.getElementById("bgimg2").src = "https://i.imgur.com/" + index +".jpg";
    }

}
