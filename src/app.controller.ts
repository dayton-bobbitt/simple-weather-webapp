import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';

@Controller()
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  getWeather(): string {
    return this.weatherService.getWeather();
  }
}
