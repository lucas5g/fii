import { Injectable } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import * as cheerio from 'cheerio';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FundService {
  constructor(private prisma: PrismaService) {}
  create(createFundDto: CreateFundDto) {
    return this.prisma.fund.create({
      data: createFundDto,
    });
  }

  async findAll() {
    const funds = ['htmx11', 'cpts11'];

    const scrapings = [];

    for (const fund of funds) {
      const url = `https://www.fundsexplorer.com.br/funds/${fund}`;
      const response = await fetch(url);
      const data = await response.text();

      const $ = cheerio.load(data);

      const name = $('h1').text();
      const dividentYieldYear = $(
        '#dividends-container > div:nth-child(3) > div:nth-child(4) > p > b',
      )
        .text()
        .replace('', '');

      // const dividentCurrentYield = $(
      //   '#dividends-container > div:nth-child(3) > div:nth-child(2) > p > b',
      // ).text();
      // const segment = $(
      //   '.basicInformation__grid__box:nth-child(6) > p > b',
      // ).text();
      // const appreciationHigh = $(
      //   '.quotation >  div > div.quotation__grid__box.alta:nth-child(4) > p:nth-child(1)',
      // ).text();
      // const appreciationLow =
      //   '-' +
      //   $(
      //     '.quotation >  div > div.quotation__grid__box.baixa:nth-child(4) > p:nth-child(1)',
      //   ).text();

      // const appreciation = appreciationHigh || appreciationLow;

      scrapings.push({
        name,
        dividentYieldYear,
        //  dividentCurrentYield,
        // appreciation,
        // segment,
        // lastDivident
      });
    }

    return scrapings;
  }

  findOne(id: string) {
    return this.prisma.fund.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateFundDto: UpdateFundDto) {
    return this.prisma.fund.update({
      where: { id },
      data: updateFundDto,
    });
  }

  remove(id: string) {
    return this.prisma.fund.delete({
      where: { id },
    });
  }
}
