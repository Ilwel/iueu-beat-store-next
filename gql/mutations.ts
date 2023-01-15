import { gql } from "@apollo/client";

const ADD_MUSIC = gql`
  mutation AddMusic($data: MusicCreateInput!) {
    addMusic(data: $data)
  }
`

const SIGN_IN = gql`
mutation SignIn($data: SignInInputData!) {
  signIn(data: $data) {
    token
    user {
      id
      instagram
      isAdmin
      spotifyLink
      username
      youtubeLink
    }
  }
}
`

export {
  ADD_MUSIC,
  SIGN_IN
}