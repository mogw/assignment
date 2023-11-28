export class StoreAssetResultDto {
  id: string

  decrypt_key: string

  constructor(id, decrypt_key) {
    this.id = id;
    this.decrypt_key = decrypt_key;
  }
}
