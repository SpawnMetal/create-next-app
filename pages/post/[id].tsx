import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import {MainLayout} from '../../components/MainLayout'
import {NextPageContext} from 'next'
import {MyPost} from '../../interfaces/post'

interface PostPageProps {
  post: MyPost
}

export default function Post({post: serverPost}: PostPageProps) {
  const [post, setPost] = useState(serverPost)
  const router = useRouter()

  console.log(2)

  useEffect(() => {
    async function load() {
      console.log(4)

      const response = await fetch(
        `${process.env.API_URL}/posts/${router.query.id}`
      )
      const data = await response.json()
      setPost(data)
    }

    if (!serverPost) load()
  }, [])

  if (!post) {
    console.log(3)

    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  console.log(5)

  return (
    <MainLayout>
      {/* <h1>Post {router.query.id}</h1> */}
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/posts'}>
        <a>Back to all posts</a>
      </Link>
    </MainLayout>
  )
}

// Отнаследуемся от NextPageContext и добавим для query поле id
interface PostNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

// Данная функция вызывается исключительно только на серверной части. query = {id: номер}, взят из [id] страницы и её значения
// Последовательность выполнения из логов, c - client, s - server:
// 1s GET /posts/1 2c 5c
export async function getServerSideProps({query}: PostNextPageContext) {
  console.log(1)

  const response = await fetch(`${process.env.API_URL}/posts/${query.id}`) // ${ctx.query.id}. fetch будет преобразован next'ом в import fetch from 'isomorphic-unfetch'
  const post: MyPost = await response.json()

  // В браузере: <script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"post":{"id":1,"title":"Что такое Lorem Ipsum?","body":"Lorem Ipsum - это
  return {props: {post}}
}

// // Метод getInitialProps устарел и вызывается как на клиенте, так и на сервере. ctx.query = {id: номер}, взят из [id] страницы и её значения
// Последовательность выполнения из логов, c - client, s - server:
// Переход из /posts в /posts/1: 1c 2c 3c 4c 2c 5c
// Вход /posts/1 сразу: 1s server GET /posts/1 2sc 5sc
// // Post.getInitialProps = async ctx => {
// Post.getInitialProps = async ({query, req}) => {
//   console.log(1)

//   // Обрабатываем действия на клиенте
//   if (!req) return {post: null}

//   // Обрабатываем действия на Сервере
//   console.log('server')

//   const response = await fetch(`${process.env.API_URL}/posts/${query.id}`) // ${ctx.query.id}. fetch будет преобразован next'ом в import fetch from 'isomorphic-unfetch'
//   const post = await response.json()

//   // В браузере: <script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{"post":{"id":1,"title":"Что такое Lorem Ipsum?","body":"Lorem Ipsum - это
//   return {
//     post,
//   }
// }
