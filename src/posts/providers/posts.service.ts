import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Posts } from '../posts.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { metaOptions } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(metaOptions)
    private readonly metaOptionsRepository: Repository<metaOptions>,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}
  public findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      { user: user, title: 'Test tile', content: 'Test Content' },
      { user: user, title: 'Test tile 2', content: 'Test Content 2' },
    ];
  }
  public async create(@Body() createPostDto: CreatePostDto) {
    // console.log(createPostDto);
    // let metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : undefined;

    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    let post = this.postRepository.create(createPostDto);

    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    return await this.postRepository.save(post);
  }
}
