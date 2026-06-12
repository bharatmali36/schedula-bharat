import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { DoctorService } from './doctor.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreateDoctorProfileDto } from './dto/create-doctor-profile.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

import { Query } from '@nestjs/common';
import { DoctorQueryDto } from './dto/doctor-query.dto';
import { Param, ParseIntPipe } from '@nestjs/common';


@Controller('doctor')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('DOCTOR')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
  ) {}

  private getUserId(req: any): number {
    const id = req.user?.id;
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }

  @Get()
findAll(@Query() query: DoctorQueryDto) {
  return this.doctorService.findAll(query);
}

// @Get(':id')
// findOne(
//   @Param('id', ParseIntPipe) id: number,
// ) {
//   return this.doctorService.findOne(id);
// }
@Get('details/:id')
findOne(
  @Param('id', ParseIntPipe) id: number,
) {
  console.log('DOCTOR FINDONE HIT');
  return this.doctorService.findOne(id);
}

  @Post('profile')
  createProfile(
    @Req() req,
    @Body()
    dto: CreateDoctorProfileDto,
  ) {
    return this.doctorService.createProfile(
      this.getUserId(req),
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.doctorService.getProfile(
      this.getUserId(req),
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req,
    @Body()
    dto: UpdateDoctorProfileDto,
  ) {
    return this.doctorService.updateProfile(
      this.getUserId(req),
      dto,
    );
  }
}