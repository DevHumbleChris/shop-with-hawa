import { User } from './../schemas/user.schema';
import { UserDTO } from './../dto/user.dto';
import { FirebaseAdmin } from '../firebase/firebase.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly firebase: FirebaseAdmin,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async signIn(data: UserDTO) {
    // If users exists.
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      throw new BadRequestException('Email Already Exists!');
    }

    const hashedPassword = await this.hashPassword(data.password);

    return hashedPassword;
  }

  async signUp(data: UserDTO) {
    return data;
  }

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

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}
