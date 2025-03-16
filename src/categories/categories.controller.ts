import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { CreateObjectiveDto } from './dto/create-objective.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Post(':id/objectives')
  createObjective(
    @Param('id') id: string,
    @Body() createObjectiveDto: CreateObjectiveDto,
  ) {
    return this.categoriesService.createObjective(createObjectiveDto, +id);
  }

  @Patch('/objectives/:id')
  update(
    @Param('id') id: string,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.categoriesService.updateObjective(+id, updateObjectiveDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Get(':id/objectives')
  findByCategory(@Param('id') id: string) {
    return this.categoriesService.findObjectivesByCategoryId(+id);
  }

  @Delete('/objectives/:id')
  remove(@Param('id') id: string) {
    return this.categoriesService.removeObjective(+id);
  }
}
