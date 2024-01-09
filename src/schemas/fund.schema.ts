import { z } from 'zod'
export const FundCreateSchema = z.object({
  name: z.string()
})

export type FundCreateType = z.infer<typeof FundCreateSchema>