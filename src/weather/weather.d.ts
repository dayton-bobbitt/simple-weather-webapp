interface AccuWeatherLocationResponse {
  Key: string;
  AdministrativeArea: {
    LocalizedName: string;
  };
  ParentCity?: {
    LocalizedName: string;
  };
};

interface AccuWeatherCurrentConditions {
  WeatherText: string;
  WeatherIcon: number;
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
  RealFeelTemperature: {
    Metric: {
      Value: number;
      Unit: string;
    };
    Imperial: {
      Value: number;
      Unit: string;
    };
  };
};

type AccuWeatherCurrentConditionsResponse = [AccuWeatherCurrentConditions];

interface Weather {
  Location: AccuWeatherLocationResponse;
  CurrentConditions: AccuWeatherCurrentConditions;
}