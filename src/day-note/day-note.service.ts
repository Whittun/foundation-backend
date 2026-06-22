import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isValidDateFormat } from 'src/shared/utils/validate-date-format';
import { DayNote } from './day-note.entity';

@Injectable()
export class DayNoteService {
  constructor(
    @InjectRepository(DayNote)
    private readonly dayNoteRepository: Repository<DayNote>,
  ) {}

  async findDayNote(date: string, userId: number) {
    this.validateDate(date);

    return this.dayNoteRepository.findOne({
      where: {
        userId,
        date,
      },
    });
  }

  async setDayNote(date: string, userId: number, contentJson: Record<string, unknown>) {
    this.validateDate(date);

    const dayNote = await this.dayNoteRepository.findOne({
      where: {
        userId,
        date,
      },
    });

    if (dayNote) {
      dayNote.contentJson = contentJson;
      return this.dayNoteRepository.save(dayNote);
    }

    const newDayNote = this.dayNoteRepository.create({
      userId,
      date,
      contentJson,
    });

    return this.dayNoteRepository.save(newDayNote);
  }

  async deleteDayNote(date: string, userId: number) {
    this.validateDate(date);

    const dayNote = await this.dayNoteRepository.findOne({
      where: {
        userId,
        date,
      },
    });

    if (dayNote) {
      await this.dayNoteRepository.delete(dayNote.id);
      return { deleted: true };
    }

    return { deleted: false };
  }

  private validateDate(date: string) {
    if (!isValidDateFormat(date)) {
      throw new BadRequestException('The date must be in the YYYY-MM-DD format');
    }
  }
}
