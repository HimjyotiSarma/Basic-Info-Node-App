import http from 'http'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { error, log } from 'console'

dotenv.config({
  path: './.env',
})

const PORT = process.env.PORT
const HOST = process.env.HOST

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html')

  try {
    if (req.url == '/') {
      res.statusCode = 200
      const content = await fs.readFile('./public/index.html', 'utf-8')
      res.write(content)
    } else if (req.url == '/about') {
      const content = await fs.readFile('./public/about.html', 'utf-8')
      res.write(content)
    } else if (req.url == '/contact') {
      const content = await fs.readFile('./public/contact-me.html', 'utf-8')
      res.write(content)
    } else {
      const content = await fs.readFile('./public/404.html', 'utf-8')
      res.write(content)
    }
    res.end()
  } catch (error) {
    console.error('Something went wrong when parsing the Url')
    console.error('Error', error)
  }
  res.end()
})

server.listen(PORT, HOST, () => {
  console.log(
    'Server is Listening at Port ' + PORT + ' and the HOST is ' + HOST
  )
})
