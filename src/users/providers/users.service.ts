import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //check if user exists with same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    //if exists then throw error
    //if not then create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  public findall(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const environment = this.configService.get<string>('S3_BUCKET');
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
