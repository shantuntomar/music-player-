//select all the buttons :
let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let prevBtn = document.querySelector('.prev-track');
let playBtn = document.querySelector('.play-track');
let nextBtn = document.querySelector('.next-track');

let seekSlider = document.querySelector('.seek-slider');
let volumeSlider = document.querySelector('.volume-slider');
let currentTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');

//define track list json format : 
let trackList = [
    {
        name : "We Rollin",
        artist : "Shubh",
        image : "https://i.scdn.co/image/ab67616d0000b273baf6c6478977c551c6f3cd0e",
        path : "1.mp3"
    },
    {
        name : "Elevated",
        artist : "Shubh",
        image : "https://i.ytimg.com/vi/9CvwbW9UhJc/maxresdefault.jpg",
        path : "2.mp3"
    }
];

//global values : 
let trackIndex = 0;
let isPlaying = false;
let updateTimer;

//create audio element for the player : 
let currentTrack = document.createElement('audio');

//whenever track is load : 
function loadTrack(trackIndex) {
    //clear the data regarding previous track :
    clearInterval(updateTimer);
    resetValues();
    //load the new track : 
    currentTrack.src = trackList[trackIndex].path;
    currentTrack.load();
    //now update the detai; of the track :
    trackArt.style.backgroundImage = "url("+ trackList[trackIndex].image +")";
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    nowPlaying.textContent = " PLAYING " + (trackIndex+1) + " OF " + trackList.length;
    //update the timer : 
    updateTimer = setInterval(seekUpdate , 1000);
    //when song is ended we handle it using ended event . 
    currentTrack.addEventListener("ended" , nextTrack);
}

function resetValues() {
    currentTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

//handle buttons and onclicks  : 
function playPauseTrack() {
    //switch between playing and pausing 
    if(!isPlaying) playTrack();
    else pauseTrack();
}

//function to play the track : 
function playTrack() {
    //play the loaded track
    currentTrack.play();
    isPlaying = true;
    //replace the icon 
    playBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

//function to pause the track 
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    //replace the icon 
    playBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

//function to go back to previous track 
function prevTrack() {
    if(trackIndex > 0) {
        trackIndex -= 1;
    }
    else trackIndex = trackList.length-1;
    //load the track : 
    loadTrack(trackIndex);
    playTrack();
}

//function to go to the next track.
function nextTrack() {
    if(trackIndex < trackList.length-1) {
        trackIndex += 1;
    }
    else trackIndex = 0;
    // ..load the track :
    loadTrack(trackIndex);
    playTrack(); 
}

//seek and volume control code :
function seekTo() {
    let seekto;
    seekto = currentTrack.duration * (seekSlider.value / 100);
    //set the current track position to seek position . 
    currentTrack.currentTime = seekto;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    // Check if the current track duration is a legible number.
    if(!isNaN(currentTrack.duration)) {
        seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        seekSlider.value = seekPosition;
        //calculate the time left and total duration. 
        let currMin = Math.floor(currentTrack.currentTime / 60);
        let currSec = Math.floor(currentTrack.currentTime - currMin * 60);
        let durationMin = Math.floor(currentTrack.duration / 60);
        let durationSec = Math.floor(currentTrack.duration - durationMin * 60);

        //add 0 to the singlr digit time values : 
        if(currSec < 10) {currSec = "0" + currSec;}
        if(durationSec < 10) {durationSec = "0" + durationSec;}
        if(currMin < 10) {currMin = "0" + currMin;}
        if(durationMin < 10) {durationMin = "0" + durationMin;}

        //display the update time : 
        currentTime.textContent = currMin + ":" + currSec;
        totalDuration.textContent = durationMin + ":" + durationSec;
    }
    
}

loadTrack(trackIndex);



