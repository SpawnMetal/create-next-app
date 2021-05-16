import Head from 'next/head'
import Link from 'next/link'

interface MainLayoutProps {
  children?: any
  title?: string
}

export function MainLayout({children, title}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Next Course</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta name="description" content="this is tutorial for next" />
        <meta charSet="utf-8" />
      </Head>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </nav>
      <main>{children}</main>
      <style jsx>{`
        nav {
          position: fixed;
          height: 60px;
          left: 0;
          right: 0;
          top: 0;
          background: darkblue;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        nav a {
          color: #fff;
          text-decoration: none;
        }

        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  )
}
