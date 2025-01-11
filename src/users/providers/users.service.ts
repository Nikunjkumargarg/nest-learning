import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto';

@Injectable()
export class UsersService {
  public findall(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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
