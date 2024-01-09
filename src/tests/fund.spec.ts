import { describe, it, expect } from 'vitest'
import { FundService } from '../services/fund.service'
import { FundCreateType } from '../schemas/fund.schema'

const service = new FundService

describe('Fund', () => {
  it('Find All', async () => {
    const result = await service.findAll();

    const properties = ['name', 'dividentYieldYear', 'dividentCurrentYield', 'lastDivident']

    properties.forEach(property => {
      expect(result[0]).toHaveProperty(property)
    })

  })

  it.only('Find One', async() => {
    const result = await service.findOne('659d721f8df58dcfa7bd1f8b')
    console.log(result)
  })

  it('Create', async() => {
    const data:FundCreateType = {
      name:'ctps11'
    }
    const result = await service.create(data)

    console.log(result)

    await service.delete(result.id)
  })
})