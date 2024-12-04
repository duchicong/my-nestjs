import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * The method to get all the users from the database
   */
  constructor(
    // Injecting usersRepository
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Find all users and pagination pages
   */
  public findAll(
    getUserParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    console.log('args ', { getUserParamDto, limit, page });
    // const isAuth = this.authService.isAuth();
    const isAuth = true;
    console.log('isauth ', isAuth);
    return [
      {
        id: getUserParamDto?.id,
        firstName: 'cong',
        email: 'ducong@gmail.com',
      },
    ];
  }

  /**
   * Find a single user using the Id of the user
   */
  public async findOneById(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) throw new Error('User is not exist!');

      return user;
    } catch (err) {
      return err;
    }
  }

  public async createUser(createUserDto: CreateUserDto) {
    try {
      // check user is exists with smae email
      const exsitingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (exsitingUser) throw new Error('User is existed');

      let newUser = this.usersRepository.create(createUserDto);
      newUser = await this.usersRepository.save(newUser);

      return newUser;
    } catch (err) {
      return err;
    }
  }
}
