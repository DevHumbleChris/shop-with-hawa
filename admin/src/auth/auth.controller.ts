import { UserDTO } from './../dto/user.dto';
import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: UserDTO) {
    return this.authService.signIn(data);
  }

  @Post('signup')
  async signUp(@Body() data: UserDTO) {
    return this.authService.signUp(data);
  }

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
