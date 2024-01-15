import { IsNotEmpty } from 'class-validator';

export class CreateFundDto {
  @IsNotEmpty()
  name: string;
}
