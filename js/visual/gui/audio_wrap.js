// Rant time:
// Tt turns out, arrow functions are actually *not* equivalent to the pre-ES6 anonymous function syntax.
// Specifically, the `this` keyword is lexically scoped.
// That means it takes its context from the surrounding code, not the arrow function itself.
// This is one of the stupidest fucking nuances I've dealt with in a while tbh.
// I mean, is it really that unreasonable to assume the semantics should be the same?
// Shit like this is the reason JS gets such a bad rap, and rightfully so.
let AudioWrap = new function() {

    let body;
    let audio_player;
    let play_button;
    let progress_bar;
    let time;
    let mute_button;
    let volume_bar;
    let player;
    
    this.getTime = function(t) {
        let m = ~~(t / 60), s = ~~(t % 60); // boi I know you didn't write this shit yourself
        return (m < 10 ? ("0" + m) : m) + ":" + (s < 10 ? ("0" + s) : s);
    }

    this.setUp = function() {
        body = $("body");
        audio_player = $("#audio-player");
        play_button = $("#play");
        progress_bar = $("#progressbar");
        time = $("#time");
        mute_button = $("#mute");
        volume_bar = $("#volume");
        player = document.getElementById("audio");

        play_button.click(this.togglePlaying);

        IoHandler.addDragListener(progress_bar, val => player.currentTime = val * player.duration);
        
        IoHandler.addDragListener(volume_bar, val => {
            let res = Util.clamp(val, 0, 1);
            volume_bar.val(res * 100);
            player.volume = res;
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

        player.onended = () => {
            $("#play").attr("class", "fa fa-play");
        };

        Callbacks.addCallback(this.updateProgress);    
    }

    this.updateProgress = function() {
        let currentTime = player.currentTime;
            let duration = player.duration;
            let progression = (currentTime + .25) / duration * 100;
            progress_bar.val(progression);
            time.text(AudioWrap.getTime(player.currentTime));
    }

    this.togglePlaying = function() {
        player[player.paused ? "play" : "pause"]();
        play_button.toggleClass("fa-play", player.paused);
        play_button.toggleClass("fa-pause", !player.paused);
    }
    
}