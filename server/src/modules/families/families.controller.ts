import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { FamiliesService } from './families.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { FamilyCreateDto } from './families.dto';
import { Family } from 'src/models/Family';

@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post('/create')
  @ApiOkResponse({
    description: 'Family has been successfully created.',
  })
  async createFamily(
    @Body() familyCreateDto: FamilyCreateDto,
  ): Promise<Family> {
    // const findOneFamily = await this.familiesService.findOnByName(
    //   familyCreateDto.name,
    // );
    // if (findOneFamily)
    //   throw new HttpException(
    //     `Family name ${familyCreateDto.name} already existed. Please try another name.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    return await this.familiesService.createFamily(familyCreateDto);
  }
  
}
