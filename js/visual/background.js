let Background = new function() {
    
    this.setUp = function() {

        $.ajax({
            url: 'https://api.imgur.com/3/gallery/r/earthporn/0',
            method: 'GET',
            headers: {
                Authorization: 'Client-ID 0428dcb72fbc5da',
                Accept: 'application/json'
            },
            data: {
                image: localStorage.dataBase64,
                type: 'base64'
            },
            success: handleData
        });
 
    }
    
    let handleData = function(result) {
        let index = result.data[Math.floor(Math.random() * result.data.length)].id;
        document.getElementById("bgimg1").src = "https://i.imgur.com/" + index +".jpg";
        document.getElementById("bgimg2").src = "https://i.imgur.com/" + index +".jpg";
        document.getElementById("limg1").src = "https://i.imgur.com/" + index +"m.jpg";
        document.getElementById("limg2").src = "https://i.imgur.com/" + index +"m.jpg";
    }
    
}

$(window).on("load", function() {
    $('.realbg').css('opacity', '1');
});