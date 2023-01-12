import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
`

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};

export default Layout;