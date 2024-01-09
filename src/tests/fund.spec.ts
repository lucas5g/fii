import { describe, it, expect } from 'vitest'
import { FundService } from '../services/fund.service'
import { FundCreateType } from '../schemas/fund.schema'
import request from 'supertest'

const service = new FundService

describe('Fund', () => {
  it.only('Find All', async () => {
   
    const result = await service.findAll()

// '    const properties = ['name', 'dividentYieldYear', 'dividentCurrentYield']

//     properties.forEach(property => {
//       expect(body[0]).toHaveProperty(property)
//     })'
    
   
    console.log(result)

  })

  it('Find One', async() => {
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

  it.only('test', )
})