import { Controller, Get, Ip } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';

@Controller('/api')
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('/weather')
  public getWeather(@Ip() ip: string): Promise<Weather> {
    return this.weatherService.getWeather(ip);
  }
}
