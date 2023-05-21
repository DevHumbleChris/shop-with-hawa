import { UserDTO } from './../dto/user.dto';
import { FirebaseAdmin } from './../firebase/firebase.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from './../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private readonly firebase: FirebaseAdmin,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // get users.
  async getUsers() {
    try {
      return await this.firebase.auth.listUsers();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Set admin privilege on the user corresponding to uid.
  async setUserAsAdmin(uid: string) {
    try {
      return await this.firebase.auth.setCustomUserClaims(uid, {
        admin: true,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Get Admins.
  async getAdmins() {
    return await this.userModel.find().exec();
  }

  // Create new admin.
  async createNewAdmin(data: UserDTO) {
    // Check if users exists.
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      throw new BadRequestException('Email Already Exists!');
    }

    const hashedPassword = await this.hashPassword(data.password);

    const token = await this.signToken({
      email: data.email,
    });

    // New user.
    const newUser = await new this.userModel({
      email: data.email,
      password: hashedPassword,
      token,
    });

    return await newUser.save();
  }

  // Update Password.
  async updatePassword(args: { _id: Types.ObjectId; password: string }) {
    const user = await this.userModel.findOne({ _id: args._id });

    if (!user) {
      throw new BadRequestException();
    }

    const hashedPasword = await this.hashPassword(args.password);

    const isPasswordChanged = await this.userModel.updateOne(
      {
        _id: args._id,
      },
      {
        $set: {
          password: hashedPasword,
        },
      },
    );

    if (!isPasswordChanged) {
      throw new BadRequestException();
    }

    return {
      message: 'Password Changed Successfully!',
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

  // Sign tokens.
  async signToken(args: { email: string }): Promise<string> {
    return await this.jwtService.sign(args, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
