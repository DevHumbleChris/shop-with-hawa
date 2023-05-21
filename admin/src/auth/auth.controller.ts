import { UserDTO } from './../dto/user.dto';
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: UserDTO) {
    return this.authService.signIn(data);
  }
}
