/* eslint-disable prettier/prettier */
import { IsEmail, IsEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsEmail()
  public email;

  @IsString()
  @IsEmpty()
  @Length(8, 30, { message: 'Password should betweeen 8 - 30 characters'})
  public password;
}
