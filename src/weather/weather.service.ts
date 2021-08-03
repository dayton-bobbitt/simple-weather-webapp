import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) { }

  async getWeather(ip: string): Promise<Weather> {
    const locationResponse = await this.getLocationFromIp(process.env.NODE_ENV === 'production' ? ip : process.env.DEVELOPMENT_IP_ADDR);
    const currentConditionsResponse = await this.getForecastForLocation(locationResponse.Key);

    return {
      Location: locationResponse,
      CurrentConditions: currentConditionsResponse,
    };
  }

  private getLocationFromIp(ip: string): Promise<AccuWeatherLocationResponse> {
    return new Promise((resolve) => {
      this.httpService.get(`${process.env.ACCU_WEATHER_API_DOMAIN}/locations/v1/cities/ipaddress`, {
        params: {
          apikey: process.env.ACCU_WEATHER_API_KEY,
          q: ip,
        },
      }).subscribe((response: AxiosResponse<AccuWeatherLocationResponse>) => {
        resolve(response.data);
      });
    });
  }

  private getForecastForLocation(locationKey: string): Promise<AccuWeatherCurrentConditions> {
    return new Promise((resolve) => {
      this.httpService.get(`${process.env.ACCU_WEATHER_API_DOMAIN}/currentconditions/v1/${locationKey}?details=true`, {
        params: {
          apikey: process.env.ACCU_WEATHER_API_KEY,
        },
      }).subscribe((response: AxiosResponse<AccuWeatherCurrentConditionsResponse>) => {
        resolve(response.data[0]);
      });
    });
  }
}
