import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormSQLiteConnector } from './config/db/sqlite-connector';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeormSQLiteConnector.getTypeOrmConfig()),
    AssetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
