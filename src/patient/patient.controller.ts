import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PatientService } from './patient.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

import { CreatePatientProfileDto } from './dto/create-patient-profile.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';

@Controller('patient')
@UseGuards(
  JwtAuthGuard,
  RolesGuard,
)
@Roles('PATIENT')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @Post('profile')
  createProfile(
    @Req() req,
    @Body()
    dto: CreatePatientProfileDto,
  ) {
    return this.patientService.createProfile(
      req.user.id,
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.patientService.getProfile(
      req.user.id,
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req,
    @Body()
    dto: UpdatePatientProfileDto,
  ) {
    return this.patientService.updateProfile(
      req.user.id,
      dto,
    );
  }
}