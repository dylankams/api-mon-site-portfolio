import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './repositories/article.repository'; 
import { UserRepository } from '../users/user.repository';
import { CommentRepository } from '../comments/comment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, User, Comment]) // Import des entités et des repositories
  ],
  providers: [
    ArticleService, 
    ArticleRepository, 
    UserRepository, 
    CommentRepository
  ], 
  controllers: [ArticleController],
})
export class ArticleModule {}
