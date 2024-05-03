import {useEffect, useState} from "react";
import video from '../../../video/video.mp4';


const BtnPlay = ({isPaused, ...props}) => {

    if (isPaused) {
        return (
            <button {...props}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className={'size-5'}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                </svg>
            </button>
        )
    }

    return (
        <button {...props}>
            <svg className="pause-icon size-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z"/>
            </svg>
        </button>
    )
}


const VideoPlayer = () => {
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        const videoContainer = document.querySelector('#videoContainer');
        const video = document.querySelector('#video');

        const addClassPaused = () => {
            videoContainer.classList.add('paused');
            setIsPaused(true);
        }

        const removeClassPaused = () => {
            videoContainer.classList.remove('paused');
            setIsPaused(false);
        }

        const removeClassTheater = () => videoContainer.classList.remove('theater');

        video.addEventListener('play', removeClassPaused);
        video.addEventListener('pause', addClassPaused);
        video.addEventListener('leavepictureinpicture', removeClassTheater);

        return () => {
            video.removeEventListener('play', removeClassPaused);
            video.removeEventListener('pause', addClassPaused);
            video.removeEventListener('leavepictureinpicture', removeClassTheater);
        }
    }, [])


    const togglePlay = () => {
        const video = document.querySelector('#video');
        video.paused ? video.play() : video.pause()
    }

    const toggleFullScreen = () => {
        const videoContainer = document.querySelector('#videoContainer');

        if (document.fullscreenElement == null)
            videoContainer.requestFullscreen().catch(console.log);
        else
            document.exitFullscreen().catch(console.log);

    }

    const toggleTheaterMode = () => {
        const videoContainer = document.querySelector('#videoContainer');
        const video = document.querySelector('#video');

        videoContainer.classList.toggle('theater');

        if (videoContainer.classList.contains('theater'))
            video.requestPictureInPicture().catch(console.log);
        else
            document.exitPictureInPicture().catch(console.log);
    }

    const toggleMute = () => {
        const video = document.querySelector('#video');

        video.muted = !video.muted;
    }

    const handleChangeVolume = (e) => {
        const videoContainer = document.querySelector('#videoContainer');
        const video = document.querySelector('#video');

        video.volume = e.target.value;
        video.muted = e.target.value === 0;

        let volumeLevel;
        if (video.volume === 0 || video.muted) {
            volumeLevel = 'muted';
        }
        else if (video.volume > .5) {
            volumeLevel = 'high';
        }
        else {
            volumeLevel = 'low';
        }

        videoContainer.dataset.volumeLevel = volumeLevel;
    }

    return (
        <div
            className={'relative group/player flex justify-center mx-auto w-full bg-black paused z-[100]'}
            id={'videoContainer'}
            data-volume-level={'high'}
        >
            <video src={video} id={'video'} onClick={togglePlay}/>
            <div className={`
                    flex items-center gap-2 p-2 text-white group/player-[.paused]:opacity-100 z-0
                    absolute bottom-0 left-0 right-0 
                    opacity-0 group-hover/player:opacity-100 transition-opacity duration-300
                    *:opacity-85 hover:*:opacity-100
                    before:content-[''] before:absolute before:bottom-0 before:left-0
                    before:w-full before:aspect-[6/1] before:-z-[1] before:pointer-events-none
                    before:bg-gradient-to-t before:from-[rgba(0,0,0,.35)] before:from-40%
                `}
            >
                <BtnPlay isPaused={isPaused} onClick={togglePlay}/>
                <div className={'group/volume flex items-center pr-6'}>
                    <button className={'volume size-6 *:hidden'} onClick={toggleMute}>
                        <svg className="high group-data-[volume-level=high]/player:block" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
                        </svg>
                        <svg className="low group-data-[volume-level=low]/player:block" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"/>
                        </svg>
                        <svg className="muted group-data-[volume-level=muted]/player:block" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>
                        </svg>
                    </button>
                    <input
                        type="range" min={0} max={1} step={'any'}
                        className={'w-0 group-hover/volume:w-[100px] transition-all scale-x-0 origin-left group-hover/volume:scale-x-100'}
                        onChange={handleChangeVolume}
                    />
                </div>
                <button className={'ml-auto size-6'} onClick={toggleTheaterMode}>
                    <svg viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                    </svg>
                </button>
                <button className={'full-screen size-6'} onClick={toggleFullScreen}>
                    <svg className="open" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                    <svg className="close hidden" viewBox="0 0 24 24">
                        <path fill="currentColor"
                              d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;