import axios from "axios"
import * as cheerio from 'cheerio'
import { FundCreateType } from '@/schemas/fund.schema'
import { prisma } from "../utils/prisma"
import { Exception } from "../utils/exception"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const exception = new Exception()

interface IFund {
  name: string 
  dividentYieldYear: string
}

export class FundService {
  async findAll() {

    const funds:IFund[] = []

    const test = [
      // 'game11',
      // 'cpts11', 'xpml11',
      // 'patc11',
      // 'xplg11', 'htmx11', 'hglg11',
      'htmx11'
    ]


    for (let fund of test) {

      const url = `https://www.fundsexplorer.com.br/funds/${fund}`
      const response = await fetch(url, {
        next: { revalidate: 43200 }
      })
      const data = await response.text()


      const $ = cheerio.load(data)

      const name = $('h1').text()
      const dividentYieldYear = ($('#dividends-container > div:nth-child(3) > div:nth-child(4) > p > b').text().replace('',''))


      const dividentCurrentYield = $('#dividends-container > div:nth-child(3) > div:nth-child(2) > p > b').text()
      const segment = $('.basicInformation__grid__box:nth-child(6) > p > b').text()
      const appreciationHigh = $('.quotation >  div > div.quotation__grid__box.alta:nth-child(4) > p:nth-child(1)').text()
      const appreciationLow = '-' + $('.quotation >  div > div.quotation__grid__box.baixa:nth-child(4) > p:nth-child(1)').text()

      const appreciation = appreciationHigh || appreciationLow

      funds.push({
        name, dividentYieldYear,
        //  dividentCurrentYield,
        // appreciation,
        // segment,
        // lastDivident
      })
    }
    return funds  
      .sort((a, b) => a.dividentYieldYear > b.dividentYieldYear)
      // .sort((a, b) => a.dividentYieldYear.localeCompare(b.dividentYieldYear))


  }

  findOne(id: string) {
    return id
  }

  async create(data: FundCreateType) {
    try {
      return await prisma.fund.create({ data })
    } catch (error) {
      throw new Error(exception.prisma(error as PrismaClientKnownRequestError))
    }
  }

  delete(id: string) {
    return prisma.fund.delete({
      where: { id }
    })
  }
}