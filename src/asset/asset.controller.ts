import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AssetService } from './asset.service';
import { StoreAssetDto, RetrieveAssetDto } from './dto/index.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post('/store')
  @ApiBody({ type: StoreAssetDto })
  store(@Body() storeAssetDto: StoreAssetDto) {
    return this.assetService.store(storeAssetDto);
  }

  @Get('/retrieve')
  findAll(@Query() retrieveAssetDto: RetrieveAssetDto) {
    return this.assetService.retrieve(retrieveAssetDto);
  }
}
