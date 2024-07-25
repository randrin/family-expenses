import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './app/databases/orm';
import { FamiliesModule } from './modules/families/families.module';

@Module({
  imports: [
    FamiliesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
})
export class AppModule {}
