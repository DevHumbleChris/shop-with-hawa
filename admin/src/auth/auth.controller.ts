import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Get all users.
  @Get('get-users')
  async getUsers() {
    return await this.authService.getUsers();
  }

  // Set admin privilege on the user corresponding to uid.
  @Post('set-admin')
  async setUserAsAdmin(@Body() uid: string) {
    return await this.authService.setUserAsAdmin(uid);
  }
}
