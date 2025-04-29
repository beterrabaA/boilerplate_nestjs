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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const userId = req.user.id; // Assuming you have user ID in the request object
    createPostDto.authorId = userId; // Set the authorId in the DTO

    console.log('Creating post with authorId:', createPostDto.authorId);

    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      console.error('Error creating post:', error);
      throw new BadRequestException('Failed to create post');
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
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.update(+id, updatePostDto);
    } catch (error) {
      console.error('Error updating post:', error);
      throw new BadRequestException('Failed to update post');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.postsService.remove(+id);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new BadRequestException('Failed to delete post');
    }
  }
}
