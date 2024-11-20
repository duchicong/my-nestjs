import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * The method to get all the users from the database
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
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
    const isAuth = this.authService.isAuth();
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
  public findOneById(id: string) {
    return {
      id,
      firstName: 'cong',
      email: 'ducong@gmail.com',
    };
  }
}
