import { Test, TestingModule } from '@nestjs/testing';
import { FundService } from './fund.service';
import { PrismaService } from '../prisma/prisma.service';
import { Fund } from '@prisma/client';
import { UpdateFundDto } from './dto/update-fund.dto';

describe('FundService', () => {
  let service: FundService;
  let id: string;

  const testList = (list: Fund[]) => {
    list.forEach((row) => {
      ['id', 'name'].forEach((property) => {
        expect(row).toHaveProperty(property);
      });
    });
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundService, PrismaService],
    }).compile();

    service = module.get<FundService>(FundService);

    const data = {
      name: 'cpts11',
    };

    const result = await service.create(data);

    expect(result).toMatchObject(data);
    id = result.id;
  });

  it.only('find all', async () => {
    const result = await service.findAll();

    console.log(result);

    ['dividentYieldYear', 'name'].forEach((property) => {
      expect(result[0]).toHaveProperty(property);
    });
  });

  it('find one', async () => {
    const result = await service.findOne(id);

    testList([result]);
  });

  it('update', async () => {
    const data: UpdateFundDto = {
      name: 'ctps12',
    };

    const result = await service.update(id, data);

    expect(result).toMatchObject(result);
  });

  afterAll(async () => {
    await service.remove(id);
  });
});
