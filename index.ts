import express from 'express'
import * as cheerio from 'cheerio'
import axios from 'axios'

const app = express()

const port = 3000

async function main(){
  const url = 'https://www.fundsexplorer.com.br/funds/game11'
  const { data } = await axios.get(url)

  const $ = cheerio.load(data)

  const name = $('h1').text()
  const indicators = $('.indicators__box > p > b ')
  const dividentYieldYear = $(indicators[2]).text().replace(/\s+/g, '')
  const dividentCurrentYield = $(indicators[8]).text()
  const lastDivident =  $(indicators[7]).text()
//  .replace(/\s+/g, ' ')

 console.log({name, dividentYieldYear, dividentCurrentYield, lastDivident}) 
}

main()

app.listen(port, () => {console.log(`SERVER RUN => http://localhost:${port}`) })


