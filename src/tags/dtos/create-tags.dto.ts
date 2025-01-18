import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsJSON,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @IsString()
  @MaxLength(256)
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

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsJSON()
  schema: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl: string;
}
