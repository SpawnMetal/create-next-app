// http://localhost:3000/api/echo?message=hello
export default function echo(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(
    JSON.stringify({
      message: req.query.message ?? 'Base message',
    })
  )
}
