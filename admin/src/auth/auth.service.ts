import { ConfigService } from '@nestjs/config';
import { User } from './../schemas/user.schema';
import { UserDTO } from './../dto/user.dto';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signIn(data: UserDTO) {
    // If users exists.
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) {
      throw new BadRequestException("Email Doesn't Exists!");
    }

    const isPassword = await this.comparePassword({
      hashedPassword: user.password,
      password: data.password,
    });

    if (!isPassword) {
      throw new BadRequestException('Password is Incorrect!');
    }

    const token = await this.signToken({ email: user.email });

    if (!token) {
      throw new UnauthorizedException();
    }

    return {
      _id: user._id,
      email: user.email,
      token: user.token,
      message: 'Signed in Successfully!',
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(args: {
    hashedPassword: string;
    password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(args.password, args.hashedPassword);
  }

  async signToken(args: { email: string }): Promise<string> {
    return await this.jwtService.sign(args, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
