import { Module } from '@nestjs/common';
import { ScannerController } from './scanner.controller';
import { OCRService } from './ocr.service';
import { ScannerGateway } from 'src/gateway/scanner.gateway';

@Module({
  controllers: [ScannerController],
  providers: [ScannerGateway, OCRService],
})
export class ScannerModule {}
