import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  getWeather(): Weather {
    return {
        description: "It's hot!",
    };
  }
}
