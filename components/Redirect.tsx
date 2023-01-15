import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type RedirectProps = {
  to: string
}

const Redirect = (props: RedirectProps) => {
  const router = useRouter()
  useEffect(() => {
    router.push(props.to)
  }, [router, props])
  return (
    <>
    </>
  );
};

export default Redirect;