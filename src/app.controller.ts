import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getMainPage() {
    return {
      foglalasok: (await this.appService.getNumberOfGuests()).length
    };
  }
}
