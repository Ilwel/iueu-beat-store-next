import Head from 'next/head'
import { useMutation } from '@apollo/client'
import { ADD_MUSIC } from '../../gql/mutations'
import { ChangeEvent, useEffect, useState } from 'react'
import MusicForm from '../../types/MusicForm'
import base64ToFile from '../../utils/base64ToFile'
import styled from 'styled-components'
import confirmIcon from '../../public/icons/confirm.svg'
import Image from 'next/image'
import Player from '../../components/Player'
import { useRouter } from 'next/router'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  gap: 10rem;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    padding: 4rem;
    gap: 2rem;
    .files{
      display: flex;
      gap: 2rem;
    }
    label{
      display: flex;
      align-items: center;
      gap: 1rem;
      img{
        height: 2rem;
        width: auto;
        animation: grow-up 1s forwards;
      }
    }
  }
`

export default function CreateMusic() {
  const router = useRouter()
  const [addMusicHandler, { data, loading, error }] = useMutation(ADD_MUSIC)
  const [form, setForm] = useState<MusicForm>({
    style: '',
    title: '',
    key: '',
    raw: '',
    cover: '',
    bpm: 0
  })
  const [music, setMusic] = useState<File>()
  const [cover, setCover] = useState<File>()
  const [title, setTitle] = useState('')
  const [style, setStyle] = useState('')
  const [key, setKey] = useState('')
  const [bpm, setBpm] = useState(0)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <Container>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        const token = localStorage.getItem('token') as string
        addMusicHandler({ variables: { data: form }, context: { headers: { authorization: 'Bearer ' + token } } });

      }}>
        <h2>Enviar Beat</h2>
        <input type="text" placeholder='Title' onChange={(e) => {
          setTitle(e.target.value)
          setForm({ ...form, title: e.target.value })
        }} />
        <input type="number" placeholder='Bpm' onChange={(e) => {
          setBpm(Number(e.target.value))
          setForm({ ...form, bpm: Number(e.target.value) })
        }} />
        <input type="text" placeholder='Key' onChange={(e) => {
          setKey(e.target.value)
          setForm({ ...form, key: e.target.value })
        }} />
        <input type="text" placeholder='Style' onChange={(e) => {
          setStyle(e.target.value)
          setForm({ ...form, style: e.target.value })
        }} />
        <div className="files">
          <label htmlFor="music" className='custom-file-input'>
            Upload Music
            <input type="file" id='music' placeholder='audio file' onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                const file = e.target.files[0]
                const base64 = Buffer.from((await file.arrayBuffer())).toString('base64')
                const file2 = base64ToFile(base64)
                setMusic(file2)
                setForm({ ...form, raw: base64 })
              }
            }} />
            {music && (
              <Image className='confirm-icon' src={confirmIcon} alt='music upload confirm' />
            )
            }
          </label>
          <label htmlFor="cover" className='custom-file-input'>
            Upload Cover
            <input type="file" id='cover' placeholder='img file' onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                const file = e.target.files[0]
                const base64 = Buffer.from((await file.arrayBuffer())).toString('base64')
                const file2 = base64ToFile(base64)
                setCover(file2)
                setForm({ ...form, cover: base64 })
              }
            }} />
            {cover && (
              <Image className='confirm-icon' src={confirmIcon} alt='cover upload confirm' />
            )
            }
          </label>
        </div>
        <button type='submit'> Send Music </button>
      </form>

      <Player keyValue={key} style={style} bpm={bpm} title={title} cover={cover} music={music} />

    </Container >
  )
}

export async function getStaticProps() {
  return {
    props: {
      adminPage: true,
    },
  }
}