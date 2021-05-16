import Link from 'next/link'
import {MainLayout} from '../components/MainLayout'

export default function Index() {
  return (
    <MainLayout title={'Home page'}>
      <h1>Hello Next.JS!</h1>
      <p>
        <Link href={'/about'}>
          <a>About</a>
        </Link>
      </p>
      <p>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, quo!
      </p>
    </MainLayout>
  )
}
