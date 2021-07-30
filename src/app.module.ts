import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherService } from './weather/weather.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [WeatherService],
})
export class AppModule {}
