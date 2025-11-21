// YouTube Player API
        let player;
        let isPlaying = false;
        let controlsTimeout;
        let progressInterval;
        let lastVolume = 100; // Store last volume before mute

        // DOM Elements
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
        const videoContainer = document.querySelector('.video-container');
        const mainContainer = document.querySelector('.relative.w-full.max-w-4xl');

        // Load YouTube API
        function loadYouTubeAPI() {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Initialize YouTube Player
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('youtubePlayer', {
                height: '100%',
                width: '100%',
                videoId: 'syOu7gL8AKo',
                playerVars: {
                    'playsinline': 1,
                    'enablejsapi': 1,
                    'rel': 0,
                    'modestbranding': 1,
                    'controls': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });
        }

        function onPlayerReady(event) {
            console.log('YouTube Player Ready');
            
            // Set initial volume
            player.setVolume(volumeSlider.value);
            
            // Update duration display with proper format
            const duration = player.getDuration();
            durationEl.textContent = formatTimeExtended(duration);
            
            // Update progress bar color
            updateProgressBarColor();
            
            // Update volume slider color
            updateVolumeSliderColor();
            
            // Start progress update interval
            progressInterval = setInterval(updateProgress, 500);
            
            // Hide loading indicator
            loadingIndicator.classList.add('hidden');
            
            // Make YouTube iframe click-through
            const iframe = document.querySelector('#youtubePlayer iframe');
            if (iframe) {
                iframe.style.pointerEvents = 'none';
            }
        }

        function onPlayerStateChange(event) {
            console.log('Player State Change:', event.data);
            
            switch(event.data) {
                case YT.PlayerState.PLAYING:
                    isPlaying = true;
                    updatePlayPauseIcon();
                    playOverlay.classList.add('opacity-0', 'pointer-events-none');
                    loadingIndicator.classList.add('hidden');
                    break;
                case YT.PlayerState.PAUSED:
                    isPlaying = false;
                    updatePlayPauseIcon();
                    break;
                case YT.PlayerState.BUFFERING:
                    loadingIndicator.classList.remove('hidden');
                    break;
                case YT.PlayerState.CUED:
                    loadingIndicator.classList.add('hidden');
                    break;
                case YT.PlayerState.ENDED:
                    isPlaying = false;
                    updatePlayPauseIcon();
                    playOverlay.classList.remove('opacity-0', 'pointer-events-none');
                    break;
            }
        }

        function onPlayerError(event) {
            console.error('YouTube Player Error:', event.data);
            loadingIndicator.classList.add('hidden');
            alert('Error loading video. Please try again.');
        }

        // Helper Functions - Fixed Time Format
        const formatTimeExtended = (seconds) => {
            if (isNaN(seconds) || seconds === Infinity) return '0:00';
            
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            
            if (hours > 0) {
                return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            } else {
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        };

        // Update progress bar color based on progress
        const updateProgressBarColor = () => {
            const progressPercent = progressBar.value + '%';
            progressBar.style.setProperty('--progress-percent', progressPercent);
        };

        // Update volume slider color based on volume
        const updateVolumeSliderColor = () => {
            const volumePercent = volumeSlider.value + '%';
            volumeSlider.style.setProperty('--volume-percent', volumePercent);
        };

        // Dynamic color for progress bar based on progress percentage
        const getProgressColor = (percent) => {
            if (percent < 25) {
                return '#ef4444'; // Red for low progress
            } else if (percent < 50) {
                return '#f59e0b'; // Amber for medium progress
            } else if (percent < 75) {
                return '#eab308'; // Yellow for high progress
            } else {
                return '#22c55e'; // Green for near completion
            }
        };

        // Dynamic color for volume based on volume percentage
        const getVolumeColor = (percent) => {
            if (percent < 25) {
                return '#3b82f6'; // Blue for low volume
            } else if (percent < 50) {
                return '#60a5fa'; // Light blue for medium volume
            } else if (percent < 75) {
                return '#93c5fd'; // Lighter blue for high volume
            } else {
                return '#bfdbfe'; // Very light blue for max volume
            }
        };

        const showControls = () => {
            controlsBar.classList.remove('opacity-0');
            controlsBar.classList.add('opacity-100');
            clearTimeout(controlsTimeout);
            if (isPlaying) {
                controlsTimeout = setTimeout(() => {
                    controlsBar.classList.remove('opacity-100');
                    controlsBar.classList.add('opacity-0');
                }, 3000);
            }
        };

        const updateVolumeIcon = () => {
            if (!player) return;
            
            const volume = player.getVolume();
            const isMuted = player.isMuted();
            
            if (isMuted || volume === 0) {
                volumeIcon.classList.add('hidden');
                mutedIcon.classList.remove('hidden');
            } else {
                volumeIcon.classList.remove('hidden');
                mutedIcon.classList.add('hidden');
            }
        };

        // Fixed Volume Toggle Function
        const toggleMute = () => {
            if (!player) return;
            
            if (player.isMuted()) {
                // Unmute and restore previous volume
                player.unMute();
                player.setVolume(lastVolume);
                volumeSlider.value = lastVolume;
                updateVolumeSliderColor();
            } else {
                // Mute and store current volume
                lastVolume = player.getVolume();
                player.mute();
                volumeSlider.value = 0;
                updateVolumeSliderColor();
            }
            updateVolumeIcon();
        };

        // Event Handlers
        const togglePlay = () => {
            if (!player) return;
            
            if (isPlaying) {
                player.pauseVideo();
            } else {
                player.playVideo();
                playOverlay.classList.add('opacity-0', 'pointer-events-none');
            }
        };

        const updatePlayPauseIcon = () => {
            if (isPlaying) {
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                controlsBar.classList.remove('opacity-0');
                controlsBar.classList.add('opacity-100');
            }
        };

        const updateProgress = () => {
            if (!player || !player.getCurrentTime) return;
            
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            
            // Update current time with proper format
            currentTimeEl.textContent = formatTimeExtended(currentTime);
            
            // Update duration if needed (in case it wasn't available initially)
            if (duration && duration > 0) {
                durationEl.textContent = formatTimeExtended(duration);
                const progress = (currentTime / duration) * 100;
                progressBar.value = progress;
                
                // Update progress bar color
                updateProgressBarColor();
                
                // Apply dynamic color based on progress
                const progressColor = getProgressColor(progress);
                progressBar.style.background = `linear-gradient(to right, ${progressColor} 0%, ${progressColor} ${progress}%, #4b5563 ${progress}%, #4b5563 100%)`;
            }
        };

        const seekVideo = (e) => {
            if (!player || !player.getDuration) return;
            
            const duration = player.getDuration();
            const time = (e.target.value / 100) * duration;
            player.seekTo(time, true);
            
            // Update progress bar color after seeking
            updateProgressBarColor();
        };

        const adjustVolume = (e) => {
            if (!player) return;
            
            const volume = e.target.value;
            player.setVolume(volume);
            player.unMute(); // Ensure unmuted when adjusting volume
            
            // Store current volume for mute/unmute functionality
            lastVolume = volume;
            
            updateVolumeIcon();
            
            // Update volume slider color
            updateVolumeSliderColor();
            
            // Apply dynamic color based on volume
            const volumeColor = getVolumeColor(volume);
            volumeSlider.style.background = `linear-gradient(to right, ${volumeColor} 0%, ${volumeColor} ${volume}%, #4b5563 ${volume}%, #4b5563 100%)`;
        };

        const toggleFullscreen = () => {
            const container = mainContainer;
            
            if (!document.fullscreenElement) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        };

        const changeSpeed = (option) => {
            if (!player) return;
            
            const speed = parseFloat(option.dataset.speed);
            player.setPlaybackRate(speed);
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
            if (!player) return;
            
            const keyActions = {
                ' ': () => { e.preventDefault(); togglePlay(); },
                'k': () => { e.preventDefault(); togglePlay(); },
                'ArrowLeft': () => { 
                    e.preventDefault(); 
                    if (player && player.getCurrentTime) {
                        player.seekTo(player.getCurrentTime() - 5, true);
                    }
                },
                'ArrowRight': () => { 
                    e.preventDefault(); 
                    if (player && player.getCurrentTime) {
                        player.seekTo(player.getCurrentTime() + 5, true);
                    }
                },
                'f': () => fullscreenBtn.click(),
                'm': () => volumeBtn.click(),
                'ArrowUp': () => { 
                    e.preventDefault(); 
                    const currentVolume = player.getVolume();
                    const newVolume = Math.min(100, currentVolume + 10);
                    player.setVolume(newVolume);
                    volumeSlider.value = newVolume;
                    lastVolume = newVolume;
                    updateVolumeIcon();
                    updateVolumeSliderColor();
                },
                'ArrowDown': () => { 
                    e.preventDefault(); 
                    const currentVolume = player.getVolume();
                    const newVolume = Math.max(0, currentVolume - 10);
                    player.setVolume(newVolume);
                    volumeSlider.value = newVolume;
                    lastVolume = newVolume;
                    updateVolumeIcon();
                    updateVolumeSliderColor();
                }
            };
            
            if (keyActions[e.key]) keyActions[e.key]();
        };

        // Initialize everything
        function init() {
            // Load YouTube API
            loadYouTubeAPI();
            
            // Set global onYouTubeIframeAPIReady function
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            
            // Event Listeners
            playButton.addEventListener('click', togglePlay);
            playPauseBtn.addEventListener('click', togglePlay);
            playOverlay.addEventListener('click', togglePlay);
            progressBar.addEventListener('input', seekVideo);
            progressBar.addEventListener('input', updateProgressBarColor);
            volumeBtn.addEventListener('click', toggleMute);
            volumeSlider.addEventListener('input', adjustVolume);
            volumeSlider.addEventListener('input', updateVolumeSliderColor);
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            speedBtn.addEventListener('click', toggleSpeedMenu);
            shareBtn.addEventListener('click', shareVideo);
            
            speedOptions.forEach(option => {
                option.addEventListener('click', () => changeSpeed(option));
            });

            videoContainer.addEventListener('mousemove', showControls);
            videoContainer.addEventListener('mouseleave', () => {
                if (isPlaying) {
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

            // Note: Picture-in-Picture functionality is not available for YouTube iframes
            pipBtn.addEventListener('click', () => {
                alert('Picture-in-Picture is not available for YouTube videos in this implementation.');
            });
            
            // Make sure YouTube iframe doesn't block our controls
            setTimeout(() => {
                const iframe = document.querySelector('#youtubePlayer iframe');
                if (iframe) {
                    iframe.style.pointerEvents = 'none';
                }
            }, 1000);
        }

        // Start the application
        init();