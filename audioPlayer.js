document.addEventListener("DOMContentLoaded", () => {
    // Grab DOM elements
    const titleEl = document.getElementById("title");
    const genreEl = document.getElementById("genre");
    const coverEl = document.getElementById("cover");
    const audioEl = document.getElementById("audio");
    const playBtn = document.getElementById("play");
    const playIcon = document.getElementById("playIcon");
    const progressBar = document.getElementById("progress-bar");
    const progressThumb = document.getElementById("progress-thumb");

    // Song list
    const songs = [
        {
            title: "Juliet",
            genre: "EDM",
            cover: "juliet.png",
            file: "juliet.mp3",
        },
        {
            title: "Russian Roulette",
            genre: "EDM",
            cover: "rr.png",
            file: "rr.mp3",
        },
        {
            title: "NoahVideo",
            genre: "Peak",
            cover: "noah.png",
            file: "video.mp3",
        },
    ];

    let current = 0;

    function loadSong(index) {
        const song = songs[index];
        titleEl.textContent = song.title;
        genreEl.textContent = song.genre;
        coverEl.src = song.cover;
        audioEl.src = song.file;
    }

    function updatePlayIcon() {
        if (audioEl.paused) {
            playIcon.src = "playbtn.png";
        } else {
            playIcon.src = "pausebtn.png";
        }
    }

    playBtn.addEventListener("click", () => {
        if (audioEl.paused) {
            audioEl.play();
        } else {
            audioEl.pause();
        }
        updatePlayIcon();
    });

    document.getElementById("back").addEventListener("click", () => {
        current = (current - 1 + songs.length) % songs.length;
        loadSong(current);
        audioEl.play();
        updatePlayIcon();
    });

    document.getElementById("forward").addEventListener("click", () => {
        current = (current + 1) % songs.length;
        loadSong(current);
        audioEl.play();
        updatePlayIcon();
    });

    audioEl.addEventListener("timeupdate", () => {
        const percent = (audioEl.currentTime / audioEl.duration) * 100;
        progressBar.style.width = percent + "%";
        progressThumb.style.left = `calc(${percent}% - 6px)`;
    });

    // Allow seeking by clicking progress bar
    document.querySelector(".progress-container").addEventListener("click", (e) => {
        const width = e.currentTarget.clientWidth;
        const clickX = e.offsetX;
        audioEl.currentTime = (clickX / width) * audioEl.duration;
    });

    // Load the first song when DOM is ready
    loadSong(current);
    updatePlayIcon();
});
