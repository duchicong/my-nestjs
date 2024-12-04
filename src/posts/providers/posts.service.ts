import { Body, forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dtos';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting Users service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    /**
     * Inject metaOptionRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async findAll(userId: number) {
    const author = await this.userService.findOneById(userId);
    return await this.postRepository.find({
      relations: { metaOptions: true, author: true },
      where: {
        author,
      },
    });
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // let newMetaOption = null;

    // if (createPostDto.metaOptions)
    //   newMetaOption = this.metaOptionRepository.create(
    //     createPostDto.metaOptions,
    //   );
    const author = await this.userService.findOneById(createPostDto.authorId);

    const newPost = this.postRepository.create({
      ...createPostDto,
      author,
    });

    // if (newPost) {
    //   if (newMetaOption) {
    //     await this.metaOptionRepository.save(newMetaOption);
    //     newPost.metaOptions = newMetaOption;
    //   }
    // }

    return await this.postRepository.save(newPost);
  }

  public async delete(id: number) {
    await this.postRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }
}
