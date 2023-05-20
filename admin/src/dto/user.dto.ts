/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30, { message: 'Password should betweeen 8 - 30 characters'})
  public password: string;
}
