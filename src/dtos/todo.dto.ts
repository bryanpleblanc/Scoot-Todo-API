import { IsEmail, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
