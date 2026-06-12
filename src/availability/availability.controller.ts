import { Controller, Post, Get, Body, Req, UseGuards, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateRecurringAvailabilityDto } from './dto/create-recurring.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOverrideDto } from './dto/create-override.dto';

@Controller('doctor/availability')
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}

  private getDoctorId(req: any): number {
    const id = req.user?.id;
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }

  @UseGuards(JwtAuthGuard)
  @Post('override')
  createOverride(@Req() req, @Body() dto: CreateOverrideDto) {
    return this.service.createOverride(this.getDoctorId(req), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRecurring(@Req() req, @Body() dto: CreateRecurringAvailabilityDto) {
    return this.service.createRecurring(this.getDoctorId(req), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getRecurring(@Req() req) {
      console.log('GET AVAILABILITY HIT');
    return this.service.getRecurring(this.getDoctorId(req));
  }

  @UseGuards(JwtAuthGuard)
  @Get('date')
  getByDate(@Req() req, @Query('date') date: string) {
    return this.service.getAvailabilityByDate(this.getDoctorId(req), date);
  }
}




