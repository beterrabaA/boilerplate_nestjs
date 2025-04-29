import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const userId = req.user.id;
    createPostDto.authorId = userId;

    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      console.error('Error creating post:', error);
      throw new BadRequestException('Failed to create post');
    }
  }

  @Get('own')
  findAllByAuthorId(@Request() req) {
    const authorId = req.user.id;

    try {
      return this.postsService.findAllByAuthorId(+authorId);
    } catch (error) {
      console.error('Error fetching posts by author:', error);
      throw new BadRequestException('Failed to fetch posts by author');
    }
  }

  @Get('published')
  findAllByPublished() {
    try {
      return this.postsService.findAllByPublished();
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw new BadRequestException('Failed to fetch published posts');
    }
  }

  @Get()
  findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new BadRequestException('Failed to fetch posts');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const post = this.postsService.findOne(+id);
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new BadRequestException('Failed to fetch post');
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Request() req) {
    try {
      const authorId = req.user.id;
      return this.postsService.update(+id, updatePostDto, +authorId);
    } catch (error) {
      console.error('Error updating post:', error);
      throw new BadRequestException('Failed to update post');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req) {
    const authorId = req.user.id;
    try {
      const currentPost = this.postsService.remove(+id, +authorId);
      if (!currentPost) {
        throw new NotFoundException('Post not found or does not belong to the user');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new BadRequestException('Failed to delete post');
    }
  }
}
