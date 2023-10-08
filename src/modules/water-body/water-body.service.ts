import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workbook, Worksheet } from 'exceljs';
import { WaterBody } from 'src/shared/entities/water-body.entity';
import { WaterType } from 'src/shared/enums/water-type.enum';
import { Repository } from 'typeorm';
import { WaterBodyCoordinateDto } from './dto/water-body-coordinate.dto';

@Injectable()
export class WaterBodyService {
  constructor(
    @InjectRepository(WaterBody)
    private readonly waterBodyRepository: Repository<WaterBody>,
  ) {}

  async getCoordinates() {
    const waterBodies = await this.waterBodyRepository.find();
    const waterBodiesCoordinates: WaterBodyCoordinateDto[] = [];
    waterBodies.forEach((waterBody) => {
      const waterBodyCoordinate = new WaterBodyCoordinateDto();
      waterBodyCoordinate.id = waterBody.id;
      waterBodyCoordinate.latitude = waterBody.latitude;
      waterBodyCoordinate.longitude = waterBody.longitude;

      waterBodiesCoordinates.push(waterBodyCoordinate);
    });
    return waterBodiesCoordinates;
  }

  async charge(excel: Express.Multer.File) {
    const workbook = new Workbook();
    const workbookCharge = await workbook.xlsx.load(excel.buffer);
    const mainSheet = workbookCharge.getWorksheet('ESTACIONES');

    if (!mainSheet || mainSheet === undefined)
      throw new BadRequestException({
        success: false,
        message:
          'The system can read the excel file, check the version or if the sheet name is p1',
        error_key: 'invalid_excel',
      });

    const waterBodies = this.defineWaterBody(mainSheet);
    try {
      await this.waterBodyRepository.save(waterBodies);
    } catch (error) {
      throw new InternalServerErrorException({
        message: error.message,
      });
    }
  }

  defineWaterBody(mainSheet: Worksheet) {
    const waterBodies: WaterBody[] = [];
    for (let i = 2; i <= mainSheet.rowCount; i++) {
      const row = mainSheet.getRow(i);
      const waterType = String(row.getCell(26).value);
      const waterBody = new WaterBody();
      switch (waterType) {
        case 'Lake station':
          waterBody.waterType = WaterType.LAKE;
          break;
        case 'River station':
          waterBody.waterType = WaterType.RIVER;
          break;
        case 'Reservoir station':
          waterBody.waterType = WaterType.RESERVOIR;
          break;
        case 'Wetland station':
          waterBody.waterType = WaterType.WETLAND;
          break;
        case 'Groundwater station':
          //waterBody.waterType = WaterType.WETLAND;
          continue;
      }
      waterBody.stationNumber = String(row.getCell(1).value);
      waterBody.country = String(row.getCell(2).value);
      waterBody.description = String(row.getCell(3).value);
      waterBody.elevation = Number(row.getCell(4).value);
      waterBody.latitude = String(row.getCell(5).value);
      waterBody.longitude = String(row.getCell(6).value);
      waterBody.zincDissolved = String(row.getCell(7).value);
      waterBody.zincTotal = String(row.getCell(8).value);
      waterBody.totalSuspendedSolids = String(row.getCell(9).value);
      waterBody.totalColiforms = String(row.getCell(10).value);
      waterBody.totalNitrogen = String(row.getCell(11).value);
      waterBody.totalDissolvedSolids = String(row.getCell(12).value);
      waterBody.waterTemperature = String(row.getCell(13).value);
      waterBody.airTemperature = String(row.getCell(14).value);
      waterBody.pH = String(row.getCell(15).value);
      waterBody.dissolvedOxigen = String(row.getCell(16).value);
      waterBody.percentDissolvedOxigen = String(row.getCell(17).value);
      waterBody.oxidizedNitrogen2 = String(row.getCell(18).value);
      waterBody.oxidizedNitrogen3 = String(row.getCell(19).value);
      waterBody.dissolvedMercury = String(row.getCell(20).value);
      waterBody.totalMercury = String(row.getCell(21).value);
      waterBody.fecalColiform = String(row.getCell(22).value);
      waterBody.ecoli = String(row.getCell(23).value);
      waterBody.chemicalOxygenDemand = String(row.getCell(24).value);
      waterBody.biochemicalOxigenDemand = String(row.getCell(25).value);
      waterBodies.push(waterBody);
    }
    return waterBodies;
  }

  async findOne(id: number) {
    const waterBody = await this.waterBodyRepository.findOneBy({ id });
    if (!waterBody)
      throw new NotFoundException({
        message: `Doesn't exist a water body with id ${id}`,
      });
    return waterBody;
  }

//   getWQI(waterBody: WaterBody){
//     const dissolvedOxigen = 
//     const WQI = 0.22 * waterBody.dissolvedOxigen
//   }
}
