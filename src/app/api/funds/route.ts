import * as cheerio from 'cheerio'

import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const funds = []

  const test = [
    'game11',
    'cpts11', 'xpml11', 'patc11', 'xplg11', 'htmx11', 'hglg11']


  for (let fund of test) {

    const url = `https://www.fundsexplorer.com.br/funds/${fund}`
    const response = await fetch(url, {
      next: { revalidate: 43200 }
    })
    const data = await response.text()


    const $ = cheerio.load(data)

    const name = $('h1').text()

    const indicators = $('.indicators__box > p > b ')
    const basicInformations = $('.basicInformation')

    const dividentYieldYear = $(indicators[2]).text().replace(/\s+/g, '')
    const dividentCurrentYield = $(indicators[8]).text()
    const segment = $('.basicInformation__grid__box:nth-child(6) > p > b').text()
    // const segment = $()
    // const lastDivident = $(indicators[7]).text()

    funds.push({
      name, dividentYieldYear, dividentCurrentYield, segment
      // lastDivident
    })

  }


  return NextResponse.json(funds)
}
