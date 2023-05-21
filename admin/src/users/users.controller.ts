import { UserDTO } from './../dto/user.dto';
import { JwtGuard } from './../auth/jwt.guard';
import { Controller, Body, Post, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users.
  @UseGuards(JwtGuard)
  @Get('get-users')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @UseGuards(JwtGuard)
  @Get('get-admins')
  async getAdmins() {
    return await this.usersService.getAdmins();
  }

  // Create new admin.
  @UseGuards(JwtGuard)
  @Post('new-admin')
  async createNewAdmin(@Body() data: UserDTO) {
    return await this.usersService.createNewAdmin(data);
  }

  // Change Password.
  @Post(':id/update-password')
  async updatePassword(
    @Body() password: string,
    @Param('id') id: Types.ObjectId,
  ) {
    return await this.usersService.updatePassword({ _id: id, password });
  }
}
