import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAssetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The value of id' })
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The value of decrypt_key provided when storing' })
  decrypt_key: string
}
