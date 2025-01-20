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
  public async findAll(userId: string) {
    const user = await this.usersService.findOneById(userId);
    return await this.postRepository.find();
  }
  public async create(createPostDto: CreatePostDto) {
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
  public async getMetaoptionAndPost(id: number) {
    let post = await this.postRepository.findOneBy({ id });
    let inverse = await this.metaOptionsRepository.find({
      where: { id: post.metaOptions.id },
      relations: { post: true },
    });
    return inverse;
  }
  public async delete(id: number) {
    await this.postRepository.delete(id);
    return { deleted: true, id };
  }
}
