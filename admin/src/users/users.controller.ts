import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users.
  @Get('get-users')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  // Set admin privilege on the user corresponding to uid.
  @Post('set-admin')
  async setUserAsAdmin(@Body() uid: string) {
    return await this.usersService.setUserAsAdmin(uid);
  }
}
