import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';

@Controller('/api')
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weather')
  public getWeather(): Weather {
    return this.weatherService.getWeather();
  }
}
