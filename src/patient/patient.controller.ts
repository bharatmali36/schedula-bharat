import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../auth/decorators/roles.decorator';

@Controller('patient')
export class PatientController {
  @Get('profile')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('PATIENT')
  profile() {
    return {
      message:
        'Patient Profile Accessed',
    };
  }
}