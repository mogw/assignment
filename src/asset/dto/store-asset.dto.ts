import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreAssetDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The value of id' })
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The value of encrypt_key' })
  encrypt_key: string

  @IsNotEmpty()
  @ApiProperty({ description: 'The json value of value' })
  value: any
}
