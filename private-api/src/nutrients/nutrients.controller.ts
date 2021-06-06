import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { NutrientsService } from './nutrients.service';
import { CreateNutrientDto } from './dto/create-nutrient.dto';
import { UpdateNutrientDto } from './dto/update-nutrient.dto';
import { PaginationHelper } from '../../libs/pagination-helper';

@Controller('nutrients')
export class NutrientsController {
  constructor(private readonly nutrientsService: NutrientsService) {}

  @Post()
  create(@Body() createNutrientDto: CreateNutrientDto) {
    return this.nutrientsService.create(createNutrientDto);
    //return createNutrientDto;
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    const { skip, take } = PaginationHelper.getSkipTake(page, limit);
    return this.nutrientsService.findAll(skip, take);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.nutrientsService.findOne(id);
  }

  // @Get(':userId')
  // food(@Param('userId') userId: number) {
  //   return this.nutrientsService.userReport(userId);
  // }


  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateNutrientDto: UpdateNutrientDto,
  ) {
    return this.nutrientsService.update(id, updateNutrientDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    await this.nutrientsService.remove(id);
  }
}