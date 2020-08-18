const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Progress bar
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

// Music
const songs = [
    {
        name: 'music-1.mp3',
        img: 'img-1.jpg',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'music-2.mp3',
        img: 'img-2.jpg',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'music-3.mp3',
        img: 'img-3.jpg',
        displayName: 'GoodNight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1.mp3',
        img: 'metric-1.jpg',
        displayName: 'Sealed with a Kiss',
        artist: 'Jacinto Design'
    }
]

// Check if playing
let isPlaying  = false;

// Play
function playSong() {
    isPlaying = true;
    music.play();
    playBtn.setAttribute('title', 'Pause');
    playBtn.classList.replace('fa-play', 'fa-pause');
}

// Pause
function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.setAttribute('title', 'Play')
    playBtn.classList.replace('fa-pause', 'fa-play');
}

// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.setAttribute('src', `music/${song.name}`);
    image.src = `img/${song.img}`;
}

// current song
let songIndex = 0;

// next somg
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    } 
    loadSong(songs[songIndex]);
    playSong();
}

// prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    } 
    loadSong(songs[songIndex]);
    playSong();
}

// On load select first song
loadSong(songs[songIndex]);

// Next Prev listeners
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime/ duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculation display for currentTime

        const currentTimeMins = Math.floor(currentTime/60);
        let currentTimeSeconds = Math.floor(currentTime % 60);

        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }

        if (currentTimeSeconds) {
            currentTimeEl.textContent = `${currentTimeMins}:${currentTimeSeconds}`;
        }

    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration;
}

music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);