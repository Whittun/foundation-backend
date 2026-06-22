import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DayNoteController } from './day-note.controller';
import { DayNote } from './day-note.entity';
import { DayNoteService } from './day-note.service';

@Module({
  controllers: [DayNoteController],
  providers: [DayNoteService],
  imports: [TypeOrmModule.forFeature([DayNote]), AuthModule],
})
export class DayNoteModule {}
