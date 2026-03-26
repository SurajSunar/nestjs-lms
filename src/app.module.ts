import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ScannerModule } from './scanner/scanner.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ScannerModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'surbhu',
      password: 'surbhu',
      database: 'nestjs_lms',
      synchronize: false,
      logging: process.env.ENV !== 'production',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
      migrationsTableName: 'migrations',
      migrationsRun: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
