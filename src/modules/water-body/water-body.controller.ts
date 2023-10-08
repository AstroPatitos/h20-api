import { Response } from 'express';

import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WaterBodyService } from './water-body.service';
import { FailResponseDto } from 'src/shared/dtos/fail-response.dto';
import { WaterBodyCoordinateDto } from './dto/water-body-coordinate.dto';
import { WaterBody } from 'src/shared/entities/water-body.entity';

@ApiTags('water-bodies')
@Controller('water-body')
export class WaterBodyController {
  constructor(private readonly waterBodyService: WaterBodyService) {}

  @ApiOperation({ summary: 'Get locations' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully login.',
    type: WaterBodyCoordinateDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
    type: FailResponseDto,
  })
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const waterBodiesCoordinates =
        await this.waterBodyService.getCoordinates();
      return res.status(HttpStatus.OK).send(waterBodiesCoordinates);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
      });
    }
  }

  @ApiOperation({ summary: 'Get water bodu by id' })
  @ApiResponse({ status: 200, description: 'Supplier found', type: WaterBody })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
    type: FailResponseDto,
  })
  @UsePipes(ValidationPipe)
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      return res
        .status(HttpStatus.OK)
        .send(await this.waterBodyService.findOne(id));
    } catch (error) {
      return res.status(error.getStatus()).send({
        success: false,
        message: error.response.message
      });
    }
  }

  @ApiOperation({ summary: 'Upload data excel' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/')
  async uploadProforma(
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      await this.waterBodyService.charge(file);
      return res.status(HttpStatus.OK).send({
        success: true,
        message: 'Water bodies successfully created',
      });
    } catch (error) {
      return res.status(error.getStatus()).send({
        success: error.response.success,
        message: error.response.message,
        error_key: error.response.error_key,
      });
    }
  }
}
