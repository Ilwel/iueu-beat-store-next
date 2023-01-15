import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  .nav{
    display: flex;
    align-items: center;
    padding: 4rem;
    gap: 2rem;
    p{
      background-color: var(--surface-2);
      color: var(--highlight);
      border-radius: 1rem;
      padding: 1.5rem;
      user-select: none;
    }
    span{
      cursor: pointer;
      transition: .5s;
      font-size: 2rem;
      :hover{
        color: var(--highlight);
        transform: scale(1.1);
      }
    }
  }
`

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const token = localStorage.getItem('token')
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/sign-in')
  }

  return (
    <Container>
      <div className='nav'>
        <p>iueu beat store</p>
        <Link href='/'>
          Home
        </Link>
        {!token ? (
          <>
            <Link href='/sign-in'>
              Entrar
            </Link>
            <Link href='#'>
              Cadastro
            </Link>
          </>
        ) : (
          <span onClick={handleSignOut}>
            Sair
          </span>
        )}
      </div>
      {props.children}
    </Container>
  );
};

export default Layout;