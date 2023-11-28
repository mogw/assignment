import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Unique(["id"])
export class Asset {
    @PrimaryGeneratedColumn('increment', { name: 'asset_id' })
    assetId: number

    @Column({ type: 'varchar', name: "id" })
    id: string

    @Column({ type: 'varchar', name: "encrypt_key" })
    encryptKey: string
    
    @Column({ type: 'blob', name: "encrypted_data" })
    encryptedData: Buffer
}
