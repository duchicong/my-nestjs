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

  public async findAll(userId: string) {
    console.log(userId);
    return this.postRepository.find({
      relations: { metaOptions: true },
    });
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    // let newMetaOption = null;

    // if (createPostDto.metaOptions)
    //   newMetaOption = this.metaOptionRepository.create(
    //     createPostDto.metaOptions,
    //   );

    const newPost = this.postRepository.create(createPostDto);

    // if (newPost) {
    //   if (newMetaOption) {
    //     await this.metaOptionRepository.save(newMetaOption);
    //     newPost.metaOptions = newMetaOption;
    //   }
    // }

    return await this.postRepository.save(newPost);
  }

  public async delete(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    const inversePost = await this.metaOptionRepository.find({
      where: { id: post.metaOptions.id },
      relations: { post: true },
    });

    await this.postRepository.delete(post.id);
    // await this.metaOptionRepository.delete(inversePost.id);

    return {
      deleted: true,
      id,
    };
  }
}
