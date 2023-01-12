import { gql } from "@apollo/client";

const ADD_MUSIC = gql`
  mutation AddMusic($data: MusicCreateInput!) {
    addMusic(data: $data)
  }
`

export {
  ADD_MUSIC
}