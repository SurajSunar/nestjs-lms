import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  ForbiddenException,
  Get,
} from '@nestjs/common';
import { OCRService } from './ocr.service';
import { ScannerGateway } from 'src/gateway/scanner.gateway';
import { log } from 'console';

@Controller('scanner')
export class ScannerController {
  constructor(
    private ocrService: OCRService,
    private readonly scannerGateway: ScannerGateway,
  ) {}

  @Get('upload')
  uploadList() {
    const results = this.ocrService.getUploadList();
    return results;
  }

  @Post('upload/:sessionId')
  async upload(
    @Param('sessionId') sessionId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    console.log('inside upload');
    // eslint-disable-next-line
    // const ip = (req.headers['x-forwarded-for'] || req.ip) as string;
    // if (!ip.startsWith('10.') && !ip.startsWith('192.168.'))
    //   throw new ForbiddenException('VPN required');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const extracted = await this.ocrService.processImage(body.image);

    if (!extracted['duplicate']) {
      this.scannerGateway.sendToDesktop(sessionId, extracted);
    }
    // Emit result to desktop via WebSocket

    return extracted;
  }
}
