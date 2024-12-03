import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EnumPostStatus, EnumPostType } from '../enums';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePostMetaOptionsDto } from 'src/meta-options/dtos/create-post-meta-options-dto';

export class CreatePostDto {
  @ApiProperty({
    example: 'this is a title',
    description: 'This is title of blog post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: EnumPostType,
    description: 'Possible values: "post", "page", "story", "series"',
  })
  @IsEnum(EnumPostType)
  @IsNotEmpty()
  postType: EnumPostType;

  @ApiProperty({
    example: 'my-blog-post',
    description: 'is url like as my-url',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    enum: EnumPostStatus,
  })
  @IsEnum(EnumPostStatus)
  @IsNotEmpty()
  status: EnumPostStatus;

  @ApiProperty({
    description: 'is text',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'format json string',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiProperty({
    description: 'format like as url',
    example: 'http://todo.abc/images/image.jpg',
  })
  @IsOptional()
  @MaxLength(1024)
  @IsUrl()
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'format by ISO8601',
    example: '2024-11-20T14:20:12.231Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    example: ['nestjs', 'post1', 'xxx'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'multiple object with key and value defined',
    example: [{ key: 'abc', value: 1231231 }],
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"sidebarEnabled": true}',
        },
      },
    },
  })
  @IsOptional()
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;
}
