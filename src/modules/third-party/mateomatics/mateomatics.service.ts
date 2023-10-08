import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MateomaticsService {
  async getCurrentClimate(
    waterBodyId: number,
    latitude: string,
    longitude: string,
  ) {
    const url_test = `https://${process.env.METEOMATICS_USERNAME}:${process.env.METEOMATICS_PASSWORD}@${process.env.METEOMATICS_API_URL}/2023-10-08T00:00:00Z--2023-10-11T00:00:00Z:PT1H`;
    console.log(url_test);
    const response = await axios({
      method: 'POST',
      url: `https://${process.env.METEOMATICS_USERNAME}:${process.env.METEOMATICS_PASSWORD}@${process.env.METEOMATICS_API_URL}/2023-10-08T00:00:00Z--2023-10-11T00:00:00Z:PT1H`,
      data: {
        Text: 't_2m:C/52.520551,13.461804/json'
      },
    }).catch(() => {
      throw new ForbiddenException('API not available');
    });
    console.log(response.data);
  }
}
