import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { metaOptions } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(metaOptions)
    private metaOptionRepository: Repository<metaOptions>,
  ) {}

  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    let metaOption = this.metaOptionRepository.create(createPostMetaOptionsDto);
    return await this.metaOptionRepository.save(metaOption);
  }
}
