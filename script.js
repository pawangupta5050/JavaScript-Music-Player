let songIndex = 0;
let audioElement = new Audio('Songs/2.mp3');
let masterPlay = document.getElementById('masterPlay');
let SongProgress = document.getElementById('SongProgress');
let BeatGif = document.getElementById('BeatGif');
let songItems = Array.from(document.getElementsByClassName('songItems'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { songName: "BrownMunde", filePath: "Songs/0.mp3", coverPath: "coverImages/Brownmunde.jpg" },
    { songName: "Excuses", filePath: "Songs/1.mp3", coverPath: "coverImages/Excuses.jpg" },
    { songName: "Kabira", filePath: "Songs/2.mp3", coverPath: "coverImages/kabira.jpg" },
    { songName: "Kun Faya Kun", filePath: "Songs/3.mp3", coverPath: "coverImages/kunfaya.jpg" },
    { songName: "Tera Yaar", filePath: "Songs/4.mp3", coverPath: "coverImages/teraYaar.jpg" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        BeatGif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        BeatGif.style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    SongProgress.value = progress;
});

SongProgress.addEventListener('change', () => {
    audioElement.currentTime = SongProgress.value * audioElement.duration / 100;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `Songs/${songIndex}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            BeatGif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            BeatGif.style.opacity = 0;
        }

    })
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});