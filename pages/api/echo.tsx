import {NextApiRequest, NextApiResponse} from 'next'

interface MessageNextApiRequest extends NextApiRequest {
  query: {
    message?: string
  }
}

// http://localhost:3000/api/echo?message=hello
export default function echo(req: MessageNextApiRequest, res: NextApiResponse) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      message: req.query.message ?? 'Base message',
    })
  )
}
