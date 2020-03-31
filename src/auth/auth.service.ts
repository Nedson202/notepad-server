import { CreateUserDTO } from './../users/dto/users.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(user: any): Promise<any> {
    const existingUser = await this.usersService.findOne(user);

    if (existingUser) {
      return existingUser;
    }

    return await this.usersService.create(user);
  }

  async login(user: any) {
    return this.jwtService.sign({ ...user });
  }
}
