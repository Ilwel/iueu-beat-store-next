import { Dispatch, SetStateAction } from "react"

export type User = {
  token: string,
  isAdmin: boolean
}

type UserContextType = [
  User,
  Dispatch<SetStateAction<User>>
]

export default UserContextType