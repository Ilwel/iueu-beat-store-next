import { useMutation } from "@apollo/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "../../context/UserContext"
import { SIGN_IN } from "../../gql/mutations"
import SignInForm from "../../types/SignInForm"
import UserContextType from "../../types/UserContextType"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  height: 70%;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 20%;
    padding: 4rem;
  }
  .cta{
    display: flex;
    gap: 1rem;
    a{
     opacity: 0.5;
     :hover{
      opacity: 1;
     }
    }
  }
  p{
    font-size: 2rem;
  }
`

export default function SignIn() {
  const [, setUser] = useContext(UserContext) as UserContextType
  const router = useRouter()
  const [signInHandler, { data, loading, error }] = useMutation(SIGN_IN)
  const [form, setForm] = useState<SignInForm>({
    username: "",
    password: ""
  })
  useEffect(() => {
    if (data) {
      localStorage.setItem('token', data?.signIn.token)
      localStorage.setItem('user', JSON.stringify(data?.signIn.user))
      setUser({ token: data?.signIn.token, isAdmin: data?.signIn.user.isAdmin })
      router.push('/')
    }
  }, [data, router, setUser])

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <Container>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        signInHandler({
          variables: {
            data: form
          }
        })
      }}>
        <h2>Login</h2>
        <input type="text" placeholder="username" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
        <input type="password" placeholder="password" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />

        <button type="submit">Entrar</button>

      </form>
      <div className="cta">
        <p>Não possui um cadastro?</p> <Link href='/sign-up'>Crie aqui</Link>
      </div>
    </Container>
  )
}