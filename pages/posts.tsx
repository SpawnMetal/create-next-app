import Head from 'next/head'
import {MainLayout} from '../components/MainLayout'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {MyPost} from '../interfaces/post'
import {NextPageContext} from 'next'

interface PostsPageProps {
  posts: MyPost[] // Явный тип, массив MyPost
}

export default function Posts({posts: serverPosts}: PostsPageProps) {
  // При асинхронном получении данных не отображает для SEO, поэтому используется getInitialProps
  const [posts, setPosts] = useState(serverPosts)

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.API_URL}/posts`)
      const json = await response.json()
      setPosts(json)
    }

    if (!serverPosts) load()
  }, [])

  if (!posts) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Head>
        <title>Posts Page | Next Course</title>
      </Head>
      <h1>Posts Page</h1>
      {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {/* Переход на страницу [id] с корректным отображением в адресной строке post.id, а не текстом [id] */}
            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}

// Метод getInitialProps устарел. ctx.query = {id: номер}, взят из [id] страницы и её значения
Posts.getInitialProps = async ({req}: NextPageContext) => {
  if (!req) return {posts: null}

  const response = await fetch(`${process.env.API_URL}/posts`) // fetch будет преобразован next'ом в import fetch from 'isomorphic-unfetch'
  const posts: MyPost[] = await response.json()

  return {
    posts,
  }
}
