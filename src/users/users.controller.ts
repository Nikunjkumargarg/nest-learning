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
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id?/:optional?')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Body() body: any,
  ) {
    console.log(typeof id);
    console.log(id);
    //bivbi
    console.log(limit);
    console.log(page);
    console.log(body);
    return 'you sent a get request';
  }
  @Post()
  public createUsers(
    @Body('email') body: any,
    @Headers() headers: any,
    @Ip() ip: any,
  ) {
    console.log(body);
    console.log(headers);
    console.log(ip);
    return 'you sent a post request';
  }
}
