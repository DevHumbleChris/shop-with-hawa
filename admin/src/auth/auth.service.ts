import { UserDTO } from './../dto/user.dto';
import { FirebaseAdmin } from '../firebase/firebase.service';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly firebase: FirebaseAdmin) {}
  async signIn(data: UserDTO) {
    return 'signin';
  }

  async signUp(data: UserDTO) {
    return 'signUp';
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
}
