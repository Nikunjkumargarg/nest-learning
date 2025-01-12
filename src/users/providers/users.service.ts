import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  public findall(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();
    console.log(isAuth);
    return [
      { getUsersParamDto, limit, page },
      {
        name: 'nikunj',
        email: 'nikunj@gmail.com',
      },
      {
        name: 'shivani',
        email: 'shivani@gmail.com',
      },
    ];
  }
  public findOneById(id: string) {
    return {
      id: 1234,
      name: 'monisha',
      email: 'monisha@gmail.com',
    };
  }
}
