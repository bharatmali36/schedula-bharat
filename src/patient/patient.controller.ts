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

  private getUserId(req: any): number {
    const id = req.user?.id;
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }

  @Post('profile')
  createProfile(
    @Req() req,
    @Body()
    dto: CreatePatientProfileDto,
  ) {
    return this.patientService.createProfile(
      this.getUserId(req),
      dto,
    );
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.patientService.getProfile(
      this.getUserId(req),
    );
  }

  @Patch('profile')
  updateProfile(
    @Req() req,
    @Body()
    dto: UpdatePatientProfileDto,
  ) {
    return this.patientService.updateProfile(
      this.getUserId(req),
      dto,
    );
  }
}