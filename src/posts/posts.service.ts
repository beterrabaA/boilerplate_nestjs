import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '@database/PrismaService';

@Injectable()
export class PostsService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      return await this._prisma.post.create({
        data: {
          title: createPostDto.title,
          description: createPostDto.description,
          body: createPostDto.body,
          published: createPostDto.published,
          authorId: createPostDto.authorId,
        },
      });
    } catch (error) {
      console.error('service layer - Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  async findAllByAuthorId(authorId: number) {
    try {
      return await this._prisma.post.findMany({
        where: { authorId },
      });
    } catch (error) {
      console.error('service layer - Error fetching posts by author:', error);
      throw new Error('Failed to fetch posts by author');
    }
  }

  async findAllByPublished() {
    try {
      return await this._prisma.post.findMany({
        where: { published: true },
      });
    } catch (error) {
      console.error('service layer - Error fetching published posts:', error);
      throw new Error('Failed to fetch published posts');
    }
  }

  async findAll() {
    try {
      return await this._prisma.post.findMany();
    } catch (error) {
      console.error('service layer - Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  async findOne(id: number) {
    try {
      return await this._prisma.post.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('service layer - Error fetching post:', error);
      throw new Error('Failed to fetch post');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto, authorId: number) {
    try {
      return await this._prisma.post.update({
        where: { id, authorId },
        data: {
          title: updatePostDto.title,
          description: updatePostDto.description,
          body: updatePostDto.body,
          published: updatePostDto.published,
        },
      });
    } catch (error) {
      console.error('service layer - Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }

  async remove(id: number, authorId: number) {
    try {
      return this._prisma.post.delete({
        where: { id, authorId },
      });
    } catch (error) {
      console.error('service layer - Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }
}
