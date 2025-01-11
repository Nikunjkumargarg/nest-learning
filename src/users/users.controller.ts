import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Ip,
  Headers,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id?')
  public getUsers(
    //@Param('id', ParseIntPipe) id: number | undefined,
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Body() body: any,
  ) {
    return this.userService.findall(getUsersParamDto, limit, page);
  }
  @Post()
  public createUsers(
    @Body() createUserDto: CreateUserDto,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(createUserDto);
    console.log(headers);
    console.log(ip);
    return 'you sent a post request';
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto instanceof PatchUserDto);
    return patchUserDto;
  }
}
