import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting Users service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public findAll(userId: string) {
    const user = this.userService.findOneById(userId);
    return [
      {
        user,
        title: 'the post 1',
        describe: 'this is content',
      },
      {
        user,
        title: 'the post 2',
        describe: 'this is content',
      },
    ];
  }
}
