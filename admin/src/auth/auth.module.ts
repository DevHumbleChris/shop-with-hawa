import { FirebaseAdmin } from '../firebase/firebase.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAdmin],
})
export class AuthModule {}
