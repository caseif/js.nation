let Background = new function() {
    
    let urls = [
    "u9muu7r", "elUmrNS", "TcA4IsQ", "PaMnxZn", "P7hwlaN", 
    "I5O4QWi", "fT4bxpb", "U7Bx7FQ", "Qujelxk", "KAHqXM2", 
    "laGeYSO", "HdsWnkU", "xEanEAB", "NG3moRJ", "31E8sfB",  
    "XGiYXHs", "QBAbrBJ", "uclwgUc", "koPzyZ1", "8VfPY96"  
    ];

    this.setUp = function() {
        let index = urls[Math.floor(Math.random() * urls.length)];
        document.getElementById("bgimg1").src = "https://i.imgur.com/" + index +".jpg";
        document.getElementById("bgimg2").src = "https://i.imgur.com/" + index +".jpg";
        document.getElementById("limg1").src = "https://i.imgur.com/" + index +"m.jpg";
        document.getElementById("limg2").src = "https://i.imgur.com/" + index +"m.jpg";
    }
}

$(window).on("load", function() {
    $('.realbg').css('opacity', '1');
});