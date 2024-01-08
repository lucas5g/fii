import express from 'express'
import * as cheerio from 'cheerio'
import axios from 'axios'

const app = express()

const port = 3000

async function main(){
  const url = 'https://www.fundsexplorer.com.br/funds/cpts11'
  const { data } = await axios.get(url)

  const $ = cheerio.load(data)

  const document = $('h1')

 console.log(document.text()) 
}

main()

app.listen(port, () => {console.log(`SERVER RUN => http://localhost:${port}`) })


