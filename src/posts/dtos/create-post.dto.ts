import {
  IsArray,
  IsEnum,
  IsISO8601,
  isISO8601,
  IsJSON,
  isNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostsController } from '../posts.controller';

export class createPostDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty({
    description: 'This is the title for the blog post',
    example: 'Nikunj garg from jagadhri is a billionaire',
  })
  title: string;

  @IsEnum(postType)
  @IsNotEmpty()
  @ApiProperty({
    enum: postType,
    description: 'Possible values are post,page,story,series',
  })
  postType: postType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces.',
  })
  @ApiProperty({
    description: 'For example - my url',
    example: 'my-blog-post',
  })
  slug: string;

  @IsEnum(postStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: postStatus,
    description: 'possible values draft,scheduled,review,published',
  })
  status: postStatus;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  content?: string;

  @IsOptional()
  @IsJSON()
  @ApiPropertyOptional({
    description:
      'Serialization your JSON object else a validation error will be thrown',
    example: '{"key":"value"}',
  })
  schema?: string;

  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Feature image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  featuredImage?: string;

  @IsISO8601()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-01-01T12:00:00Z',
  })
  publishedOn?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @ApiPropertyOptional({
    description: 'Array of tags passed as string values',
    example: ['typescript', 'programming', 'development'],
  })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  @ApiPropertyOptional({
    type: 'array',
    required: false,
    
  })
  metaOption: CreatePostMetaOptionsDto;
}
