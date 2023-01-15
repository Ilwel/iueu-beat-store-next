import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import playIcon from '../public/icons/play.svg'
import pauseIcon from '../public/icons/pause.svg'
import nextIcon from '../public/icons/next.svg'
import prevIcon from '../public/icons/prev.svg'
import VanillaTilt from 'vanilla-tilt';

type PlayerProps = {
  music: File | undefined
  cover: File | undefined
  bpm: number
  style: string
  keyValue: string
  title: string
}

const Container = styled.div`
  display: flex;
  border: solid 0.1rem var(--surface-2);
  box-shadow: 0 8px 32px 0 var(--surface-1-70);
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 4rem;
  border-radius: 1rem;
  height: 30rem;
  width: 30rem;
  backdrop-filter: blur( 12px );
  -webkit-backdrop-filter: blur( 12px );
  .infos{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .cover{
    opacity: 1;
    border-radius: 50%;
  }
  .controls{
    display: flex;
    gap: 1rem;
    .player-icon{
      cursor: pointer;
      height: 3rem;
      width: auto;
      opacity: 0.7;
      transition: 0.5s;
      :hover{
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }
  h2{
    color: var(--highlight);
    font-weight: normal;
  }
`

const Player = (props: PlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const musicPlayer = useRef<HTMLAudioElement>(null)

  const playHandler = () => {
    if (!isPlaying) {
      musicPlayer.current?.play()
      setIsPlaying(true)
    } else {
      musicPlayer.current?.pause()
      setIsPlaying(false)
    }
  }

  const nextHandler = () => {
    if (musicPlayer.current?.currentTime) {
      musicPlayer.current.currentTime += 10
    }
  }

  const prevHandler = () => {
    if (musicPlayer.current?.currentTime) {
      musicPlayer.current.currentTime -= 10

    }
  }

  useEffect(() => {
    musicPlayer.current?.addEventListener('ended', () => {
      setIsPlaying(false)
    })
    const tilt = document.querySelector('.tilt');
    if (tilt) {
      VanillaTilt.init(tilt as HTMLElement, {
        max: 25,
        speed: 100,
        glare: true,
        "max-glare": 0.06,
        scale: 1.2,

      })
    }

  }, [])

  return (
    <Container className='tilt'>
      <div className='infos'>
        <h2>{props.title}</h2>
        <p>({props.bpm} BPM) - {props.style} (Key: {props.keyValue}) </p>
      </div>
      {props.cover && <Image className='cover' src={URL.createObjectURL(props.cover)} alt='music cover' width={100} height={100} />}
      {props.music && (
        <>
          <audio ref={musicPlayer}>
            <source src={URL.createObjectURL(props.music)} />
          </audio>
          <div className="controls">
            <Image onClick={prevHandler} className='player-icon' src={prevIcon} alt='play icon' />
            <Image onClick={playHandler} className='player-icon' src={isPlaying ? pauseIcon : playIcon} alt='play icon' />
            <Image onClick={nextHandler} className='player-icon' src={nextIcon} alt='play icon' />
          </div>
        </>
      )
      }
    </Container>
  );
};

export default Player;