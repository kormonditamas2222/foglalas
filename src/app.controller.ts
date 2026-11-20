import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { FoglalasDto } from './UjFoglalas.dto.js';

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

  @Post()
  @Render('index')
  async ujFoglalas(@Body() body: FoglalasDto) {
    let errors: string[] = [];
    const emailRegex = /^[a-z]+@[a-z]+/;
    if (!body.name || !body.email || !body.startDate || !body.guests) {
      errors.push("Minden mezőt kötelező megadni!")
    }
    if (!emailRegex.test(body.email)) {
      errors.push("E-mail formája legyen szabványos (example@example.com)")
    }
    const receivedDate = new Date(body.startDate);
    const today = new Date();
    if (receivedDate.getTime() < today.getTime()) {
      errors.push("Az időpont nem lehet a mai napnál korábbi!")
    }
    if (parseInt(body.guests) < 1 || parseInt(body.guests) > 10) {
      errors.push("A foglaló személyek száma nem lehet nagyobb, mint 10, és nem lehet kisebb, mint 1")
    }
    if (errors.length > 0) {
      return {
        foglalasok: (await this.appService.getNumberOfGuests()).length,
        errors,
        name: body.name,
        email: body.email,
        startDate: body.startDate,
        guests: body.guests
      }
    }
  }
}
