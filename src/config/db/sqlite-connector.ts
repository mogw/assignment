import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class SQLiteConnectorService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.getValue('SQLITE_DATABASE'),
      entities: ["dist/**/*.entity.js"],
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}

const TypeormSQLiteConnector = new SQLiteConnectorService(process.env)
  .ensureValues([
    'SQLITE_DATABASE',
  ]);

export { TypeormSQLiteConnector };
