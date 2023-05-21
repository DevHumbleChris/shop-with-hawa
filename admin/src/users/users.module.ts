import { FirebaseAdmin } from './../firebase/firebase.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FirebaseAdmin],
})
export class UsersModule {}
