import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;

    return user;
  }
  @Post('signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;

    return user;
  }

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }
  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }
  @Delete(':id')
  removeUserr(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }
}
