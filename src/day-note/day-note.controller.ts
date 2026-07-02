import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.type';
import { DayNoteService } from './day-note.service';
import { SetDayNoteDto } from './dto/set-day-note.dto';

@UseGuards(AuthGuard)
@Controller('day-notes')
export class DayNoteController {
  constructor(private readonly dayNoteService: DayNoteService) {}

  @Get(':date')
  getDayNote(@Param('date') date: string, @Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.dayNoteService.findDayNote(date, userId);
  }

  @Put(':date')
  setDayNote(
    @Param('date') date: string,
    @Body() body: SetDayNoteDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const { contentJson } = body;
    const userId = request.user.id;

    return this.dayNoteService.setDayNote(date, userId, contentJson);
  }

  @Delete(':date')
  removeDayNote(@Param('date') date: string, @Req() request: AuthenticatedRequest) {
    const userId = request.user.id;

    return this.dayNoteService.deleteDayNote(date, userId);
  }
}
