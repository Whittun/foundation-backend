import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  createObjective(createObjectiveDto: CreateObjectiveDto, categoryId: number) {
    return this.prisma.objective.create({
      data: {
        text: createObjectiveDto.text,
        categoryId,
        status: createObjectiveDto.status,
        days: createObjectiveDto.days,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  findObjectivesByCategoryId(id: number) {
    return this.prisma.category.findMany({
      where: { id },
      select: {
        objectives: true,
      },
    });
  }

  updateObjective(objectiveId: number, updateObjectiveDto: UpdateObjectiveDto) {
    return this.prisma.objective.update({
      where: { id: objectiveId },
      data: updateObjectiveDto,
    });
  }

  removeObjective(id: number) {
    return this.prisma.objective.delete({ where: { id } });
  }
}
