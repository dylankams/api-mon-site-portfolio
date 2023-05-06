import { Controller, Post, Body, Param, NotFoundException, Get, Delete,UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';


@Controller('articles/:articleId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

    @Post()
    async create(@Param('articleId') articleId: number, @Body() createCommentDto: CreateCommentDto) {
        const comment = await this.commentService.create(articleId, createCommentDto);
        if (!comment) {
        throw new NotFoundException(`Article with id ${articleId} not found`);
        }
        return comment;
    }

    @Get()
    async findAll(@Param('articleId') articleId: number): Promise<Comment[]> {
        return await this.commentService.findAll(articleId);
    }

    @Delete(':id')
    async delete(@Param('articleId') articleId: number, @Param('id') id: number): Promise<void> {
        const affectedRows = await this.commentService.delete(articleId, id);
        if (affectedRows === 0) {
            throw new NotFoundException(`Comment with id ${id} not found`);
        }
    }

}
