import axios from "axios"
import * as cheerio from 'cheerio'
import { FundCreateType } from '@/schemas/fund.schema'
import { prisma } from "../utils/prisma"
import { Exception } from "../utils/exception"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Fund } from "@prisma/client"

const exception = new Exception()

export class FundService {
  async findAll() {

    const funds = []

    for (let fund of ['game11', 'cpts11']) {

      const url = `https://www.fundsexplorer.com.br/funds/${fund}`
      const { data } = await axios(url)


      const $ = cheerio.load(data)

      const name = $('h1').text()
      const indicators = $('.indicators__box > p > b ')
      const dividentYieldYear = $(indicators[2]).text().replace(/\s+/g, '')
      const dividentCurrentYield = $(indicators[8]).text()
      const lastDivident = $(indicators[7]).text()

      funds.push({ name, dividentYieldYear, dividentCurrentYield, lastDivident })

    }

    return funds

  }

  findOne(id:string){
    return id
  }

  async create(data: FundCreateType) {
    try {
      return await prisma.fund.create({ data })
    } catch (error) {
      throw new Error(exception.prisma(error as PrismaClientKnownRequestError))
    }
  }

  delete(id:string){
    return prisma.fund.delete({
      where:{id}
    })
  }
}