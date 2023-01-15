export default function Profile() {
  return (
    <div>
      Profile
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  }
}