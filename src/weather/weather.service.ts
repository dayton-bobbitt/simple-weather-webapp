import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

//#region Private interfaces

interface AccuWeatherLocationResponse {
  Key: string;
  AdministrativeArea: {
    LocalizedName: string;
  };
  ParentCity: {
    LocalizedName: string;
  };
};

interface AccuWeatherCurrentConditions {
  Temperature: {
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RealFeelTemperature: {
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
};

type AccuWeatherCurrentConditionsResponse = [AccuWeatherCurrentConditions];

//#endregion

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) { }

  async getWeather(ip: string): Promise<Weather> {
    const locationResponse = await this.getLocationFromIp(process.env.NODE_ENV === 'production' ? ip : process.env.DEVELOPMENT_IP_ADDR);
    const currentConditionsRes = await this.getForecastForLocation(locationResponse.Key);
    return {
      description: `It's ${currentConditionsRes.Temperature.Imperial.Value}°${currentConditionsRes.Temperature.Imperial.Unit} in ${locationResponse.ParentCity.LocalizedName}, ${locationResponse.AdministrativeArea.LocalizedName}. Feels like ${currentConditionsRes.RealFeelTemperature.Imperial.Value}°${currentConditionsRes.RealFeelTemperature.Imperial.Unit}.`,
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
