let guiStay = false;

let Gui = new function() {
    let timer;
    let fadetime = 250;
    let timeout = 1500;
    
    // keeps gui on screen - may  be useful/debugging
    

    this.setUp = function() {
        
        $('#canvas').click(function() {
            $('#gui_full').fadeToggle(fadetime);
            guiStay = !guiStay;
        });
        
        
        $(document).mousemove(() => {

            clearInterval(timer);
            $("#gui_top").fadeIn(fadetime);
            $("#gui_bottom").fadeIn(fadetime);
            if(guiStay == false){
                timer = setTimeout(() => {
                    $("#gui_top").fadeOut(fadetime);   
                    $("#gui_bottom").fadeOut(fadetime);   
                }, timeout);
            }
        });
        
        $('input:text, .ui.button', '.ui.action.input')
            .on('click', function(e) {
                $('input:file', $(e.target).parents()).click();
            })
        ;

        $('input:file', '.ui.action.input')
            .on('change', function(e) {
                var name = e.target.files[0].name;
                $('input:text', $(e.target).parent()).val(name);
            })
        ;
        
        
    }
    
    this.setTitle  = function(artist, title) {
        $("#elmTitle").html("<h1 id='guiSong'><span id='guiArtist'>" + artist + "</span><br> " + title + "</h1>");
    }
    
    
    
};
