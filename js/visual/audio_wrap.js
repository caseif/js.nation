
let AudioWrap = new function() {

    let audio_player = $("#audio-player");
    let play_button = $("#play");
    let progress_bar = $("#progressbar");
    let time = $("#time");
    let mute_button = $("#mute");
    let volume_bar = $("#volume");
    let player = null;
    
    this.getTime = function(t) {
        let m = ~~(t / 60), s = ~~(t % 60); // boi I know you didn't write this shit yourself
        return (m < 10 ? ("0" + m) : m) + ":" + (s < 10 ? ("0" + s) : s);
    }
    
    this.setUp = function() {
        player = document.getElementById("audio");
        
        volume_bar.click(function(e) {
            let perc = e.offsetX / $(this).width() * 100;
            let result = perc / 100;
            volume_bar.val(perc);
            player.volume = result;
        });

        play_button.click(function() {
            player[player.paused ? "play" : "pause"]();
            $(this).toggleClass("fa-play", player.paused);
            $(this).toggleClass("fa-pause", !player.paused);
        });

        mute_button.click(function() {
            if (player.volume == 0) {
                player.volume = volume;
            } else {
                volume = player.volume;
                player.volume = 0;
            }
            volume_bar.val(player.volume * 100);
            $(this).toggleClass("fa-volume-up", player.volume != 0);
            $(this).toggleClass("fa-volume-off", player.volume == 0);
        });

        player.addEventListener("timeupdate", function() {
            let currentTime = player.currentTime;
            let duration = player.duration;
            let progression = (currentTime + .25) / duration * 100;
            progress_bar.val(progression);
            time.text(AudioWrap.getTime(player.currentTime));
                    
        });

        progress_bar.click(function (e) {
            let perc = e.offsetX/ $(this).width() * 100;
            let result = (perc / 100) * player.duration;
            player.currentTime = result;
        });

        player.onended = function() {
            $("#play").attr("class", "fa fa-play");
        };
    
    }
    
}