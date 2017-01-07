let Gui = new function() {
    let timer;
    let fadetime = 250;
    let timeout = 2000;
    
    // keeps gui on screen - may  be useful
    let guiStay = false;

    this.setUp = function() {

        $('#showGUI').click(function() {
            $('#gui_full').fadeToggle(fadetime);
        });
        
        if(guiStay == false){
            $(document).mousemove(() => {
                clearInterval(timer);
                $("#gui_top").fadeIn(fadetime);
                $("#gui_bottom").fadeIn(fadetime);
                timer = setTimeout(() => {
                    $("#gui_top").fadeOut(fadetime);   
                    $("#gui_bottom").fadeOut(fadetime);   
                }, timeout);  
            }).mouseleave(() => {
                $("#gui_top").fadeOut(fadetime);
                $("#gui_bottom").fadeOut(fadetime);
            });
        }
        
    }
    
    this.setTitle  = function(artist, title) {
        $("#elmTitle").html("<span id='guiArtist'><b>" + artist + "</b></span><br><span id='guiTitle'>" + title + "</span>");
    }
    
};
