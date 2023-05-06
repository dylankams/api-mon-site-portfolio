import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Article } from 'src/articles/entities/article.entity';

@Injectable()
export class CommentService {
  constructor(

    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findById(id: number): Promise<Comment> {
    const options: FindOneOptions<Comment> = {
      where: { id: id },
    };
    const comment = await this.commentRepository.findOne(options);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return comment;
  }

  async findAll(articleId: number): Promise<Comment[]> {
    const options: FindOneOptions<Article> = {
        where: { id: articleId },
        relations: ['comments'] // Ajouter relations ici
      };
      const article = await this.articleRepository.findOne(options);
      
    if (!article) {
      throw new NotFoundException(`Article with ID "${articleId}" not found`);
    }
    return article.comments;
  }

  async create(articleId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const options: FindOneOptions<Article> = {
      where: { id: articleId }
    };
    const article = await this.articleRepository.findOne(options);
    if (!article) {
      throw new NotFoundException(`Article with ID "${articleId}" not found`);
    }
    const comment = this.commentRepository.create(createCommentDto);
    comment.article = article;
    return await this.commentRepository.save(comment);
  }

  async update(id: number, updateCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = await this.findById(id);
    comment.content = updateCommentDto.content;
    return await this.commentRepository.save(comment);
  }

  async delete(articleId: number, id: number): Promise<number> {
    const result = await this.commentRepository.delete({ id: id, article: { id: articleId } });
    return result.affected;
  }
  
}
