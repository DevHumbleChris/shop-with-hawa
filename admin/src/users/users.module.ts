import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './../schemas/user.schema';
import { JwtStrategy } from './../auth/jwt.strategy';
import { FirebaseAdmin } from './../firebase/firebase.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, FirebaseAdmin, JwtStrategy],
})
export class UsersModule {}
