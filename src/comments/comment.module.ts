import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Article } from '../articles/entities/article.entity';
import { ArticleService } from '../articles/article.service';
import { ArticleModule } from '../articles/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Article]),
    ArticleModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, ArticleService],
})
export class CommentModule {}
