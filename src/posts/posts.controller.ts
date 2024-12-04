import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dtos';
import { PatchPostDto } from './dtos/patch-post-dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(
    /**
     * Injecting a post service
     */
    private readonly postsService: PostsService,
  ) {}

  @Get('/:userId?')
  public getPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created successfully',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Update data for a post',
  })
  @ApiResponse({
    status: 200,
    description: 'A 200 response if the post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostsDto: PatchPostDto) {
    console.log(patchPostsDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Detele a post by id',
  })
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}