import { Injectable } from '@nestjs/common';
import Tesseract from 'tesseract.js';

export type ExtractData = {
  name: string;
  idNumber: string;
  raw: string;
  image: string;
};

@Injectable()
export class OCRService {
  private uploadList: ExtractData[] = [];

  getUploadList() {
    return this.uploadList;
  }

  async processImage(base64Image: string) {
    const result = await Tesseract.recognize(base64Image, 'eng');
    const text = result.data.text;
    const extractedResults = this.extractFields(text, base64Image);

    if (this.validateCID(extractedResults.idNumber) > -1) {
      return {
        idNumber: extractedResults.idNumber,
        duplicate: true,
      };
    } else {
      this.uploadList.unshift(extractedResults);
      return extractedResults;
    }
  }

  extractFields(text: string, base64Image: string) {
    return {
      name: text.match(/Name[:\s]+([A-Z ]+)/i)?.[1] || '',
      idNumber: text.match(/\d{6,}/)?.[0] || '',
      raw: text,
      image: base64Image,
    };
  }

  private validateCID(cid: string) {
    return this.uploadList.findIndex((row) => row.idNumber === cid);
  }
}
