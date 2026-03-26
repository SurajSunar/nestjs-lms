import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';

@Injectable()
export class OCRService {
  async processImage(base64Image: string) {
    const result = await Tesseract.recognize(base64Image, 'eng');
    const text = result.data.text;
    return this.extractFields(text, base64Image);
  }

  extractFields(text: string, base64Image: string) {
    return {
      name: text.match(/Name[:\s]+([A-Z ]+)/i)?.[1] || '',
      idNumber: text.match(/\d{6,}/)?.[0] || '',
      raw: text,
      image: base64Image,
    };
  }
}
