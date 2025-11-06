// DOM Elements
        const video = document.getElementById('videoPlayer');
        const playOverlay = document.getElementById('playOverlay');
        const playButton = document.getElementById('playButton');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const playIcon = document.getElementById('playIcon');
        const pauseIcon = document.getElementById('pauseIcon');
        const currentTimeEl = document.getElementById('currentTime');
        const durationEl = document.getElementById('duration');
        const progressBar = document.getElementById('progressBar');
        const volumeBtn = document.getElementById('volumeBtn');
        const volumeIcon = document.getElementById('volumeIcon');
        const mutedIcon = document.getElementById('mutedIcon');
        const volumeSlider = document.getElementById('volumeSlider');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const fullscreenIcon = document.getElementById('fullscreenIcon');
        const exitFullscreenIcon = document.getElementById('exitFullscreenIcon');
        const pipBtn = document.getElementById('pipBtn');
        const speedBtn = document.getElementById('speedBtn');
        const speedMenu = document.getElementById('speedMenu');
        const speedOptions = document.querySelectorAll('.speed-option');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const controlsBar = document.getElementById('controlsBar');
        const shareBtn = document.getElementById('shareBtn');

        let controlsTimeout;

        // Helper Functions
        const formatTime = (seconds) => {
            if (isNaN(seconds)) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        const showControls = () => {
            controlsBar.classList.remove('opacity-0');
            controlsBar.classList.add('opacity-100');
            clearTimeout(controlsTimeout);
            if (!video.paused) {
                controlsTimeout = setTimeout(() => {
                    controlsBar.classList.remove('opacity-100');
                    controlsBar.classList.add('opacity-0');
                }, 3000);
            }
        };

        const updateVolumeIcon = () => {
            if (video.muted || video.volume === 0) {
                volumeIcon.classList.add('hidden');
                mutedIcon.classList.remove('hidden');
            } else {
                volumeIcon.classList.remove('hidden');
                mutedIcon.classList.add('hidden');
            }
        };

        // Event Handlers
        const togglePlay = () => {
            if (video.paused) {
                video.play();
                playOverlay.classList.add('opacity-0', 'pointer-events-none');
            } else {
                video.pause();
            }
        };

        const updatePlayPauseIcon = () => {
            if (video.paused) {
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                controlsBar.classList.remove('opacity-0');
                controlsBar.classList.add('opacity-100');
            } else {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            }
        };

        const updateProgress = () => {
            currentTimeEl.textContent = formatTime(video.currentTime);
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.value = progress;
        };

        const seekVideo = (e) => {
            const time = (e.target.value / 100) * video.duration;
            video.currentTime = time;
        };

        const toggleMute = () => {
            video.muted = !video.muted;
            updateVolumeIcon();
        };

        const adjustVolume = (e) => {
            video.volume = e.target.value / 100;
            video.muted = false;
            updateVolumeIcon();
        };

        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                video.parentElement.parentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        };

        const togglePip = async () => {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else {
                    await video.requestPictureInPicture();
                }
            } catch (error) {
                console.log('PiP not supported:', error);
            }
        };

        const changeSpeed = (option) => {
            const speed = parseFloat(option.dataset.speed);
            video.playbackRate = speed;
            speedBtn.textContent = speed + 'x';
            speedOptions.forEach(opt => opt.classList.remove('bg-gray-700'));
            option.classList.add('bg-gray-700');
            speedMenu.classList.add('hidden');
            speedMenu.classList.remove('flex');
        };

        const toggleSpeedMenu = () => {
            speedMenu.classList.toggle('hidden');
            speedMenu.classList.toggle('flex');
        };

        const shareVideo = async () => {
            const shareData = {
                title: 'Video Player',
                text: 'Check out this video!',
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                }
            } catch (error) {
                console.log('Share failed:', error);
            }
        };

        const handleKeyDown = (e) => {
            const keyActions = {
                ' ': () => { e.preventDefault(); togglePlay(); },
                'k': () => { e.preventDefault(); togglePlay(); },
                'ArrowLeft': () => { e.preventDefault(); video.currentTime -= 5; },
                'ArrowRight': () => { e.preventDefault(); video.currentTime += 5; },
                'f': () => fullscreenBtn.click(),
                'm': () => volumeBtn.click(),
                'ArrowUp': () => { 
                    e.preventDefault(); 
                    video.volume = Math.min(1, video.volume + 0.1); 
                    volumeSlider.value = video.volume * 100; 
                },
                'ArrowDown': () => { 
                    e.preventDefault(); 
                    video.volume = Math.max(0, video.volume - 0.1); 
                    volumeSlider.value = video.volume * 100; 
                }
            };
            
            if (keyActions[e.key]) keyActions[e.key]();
        };

        // Event Listeners
        playButton.addEventListener('click', togglePlay);
        playPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
        video.addEventListener('play', updatePlayPauseIcon);
        video.addEventListener('pause', updatePlayPauseIcon);
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(video.duration);
        });
        progressBar.addEventListener('input', seekVideo);
        volumeBtn.addEventListener('click', toggleMute);
        volumeSlider.addEventListener('input', adjustVolume);
        fullscreenBtn.addEventListener('click', toggleFullscreen);
        pipBtn.addEventListener('click', togglePip);
        speedBtn.addEventListener('click', toggleSpeedMenu);
        shareBtn.addEventListener('click', shareVideo);
        
        speedOptions.forEach(option => {
            option.addEventListener('click', () => changeSpeed(option));
        });

        video.addEventListener('waiting', () => {
            loadingIndicator.classList.remove('hidden');
        });

        video.addEventListener('canplay', () => {
            loadingIndicator.classList.add('hidden');
        });

        video.parentElement.addEventListener('mousemove', showControls);
        video.parentElement.addEventListener('mouseleave', () => {
            if (!video.paused) {
                controlsBar.classList.remove('opacity-100');
                controlsBar.classList.add('opacity-0');
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fullscreenIcon.classList.add('hidden');
                exitFullscreenIcon.classList.remove('hidden');
            } else {
                fullscreenIcon.classList.remove('hidden');
                exitFullscreenIcon.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', handleKeyDown);

        document.addEventListener('click', (e) => {
            if (!speedBtn.contains(e.target) && !speedMenu.contains(e.target)) {
                speedMenu.classList.add('hidden');
                speedMenu.classList.remove('flex');
            }
        });