import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '@database/PrismaService';

@Injectable()
export class PostsService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return await this._prisma.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        body: createPostDto.body,
        published: createPostDto.published,
        authorId: createPostDto.authorId,
      },
    });
  }

  async findAll() {
    return await this._prisma.post.findMany();
  }

  async findOne(id: number) {
    return await this._prisma.post.findUnique({
      where: { id },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this._prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        description: updatePostDto.description,
        body: updatePostDto.body,
        published: updatePostDto.published,
      },
    });
  }

  async remove(id: number) {
    return this._prisma.post.delete({
      where: { id },
    });
  }
}
