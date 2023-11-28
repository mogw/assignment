import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { StoreAssetDto } from './dto/store-asset.dto';
import { RetrieveAssetDto } from './dto/retrieve-asset.dto';
import { Asset } from './entities/asset.entity';
import { Like, Repository } from 'typeorm';
import { encrypt, decrypt, hashEncryptKey } from 'src/common/helper';
import { StoreAssetResultDto, RetrieveAssetResultDto } from './dto/index.dto';
@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) { }

  async store(storeAssetDto: StoreAssetDto) {
    const salt = process.env.SECRET_KEY;
    const hashedEncryptKey = hashEncryptKey(storeAssetDto.encrypt_key, salt);
    const encryptedData = encrypt(
      JSON.stringify(storeAssetDto.value),
      hashedEncryptKey,
    );

    // Get a existing one, or create a new one
    let record =
      (await this.assetRepository.findOneBy({ id: storeAssetDto.id })) ||
      this.assetRepository.create({ id: storeAssetDto.id });

    record.encryptKey = storeAssetDto.encrypt_key;
    record.encryptedData = encryptedData;

    await this.assetRepository.save(record);

    const result = new StoreAssetResultDto(storeAssetDto.id, hashedEncryptKey);
    return instanceToPlain(result)
  }

  async findWithWildcard(id) {
    if (id.includes('*')) {
      // Replace '*' with '%' for SQL LIKE wildcard
      const pattern = id.replace(/\*/g, '%');
      return this.assetRepository.findBy({ id: Like(pattern) });
    } else {
      return this.assetRepository.findBy({ id });
    }
  }

  async retrieve(retrieveAssetDto: RetrieveAssetDto) {
    let records = await this.findWithWildcard(retrieveAssetDto.id);
    if (!records) return [];

    let result = [];
    records.forEach((r) => {
      try {
        const decrypted = decrypt(
          r.encryptedData,
          retrieveAssetDto.decrypt_key,
        );

        result.push(new RetrieveAssetResultDto(r.id, JSON.parse(decrypted)))
      } catch (error) {
        console.log('error', error);
      }
    });

    return instanceToPlain(result);
  }
}
