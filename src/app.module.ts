import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/article.module';
import { CommentModule } from './comments/comment.module';
import { UserModule } from './users/user.module';
import { Article } from './articles/entities/article.entity';
import { Comment } from './comments/comment.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bd-site-portfolio',
      entities: [Article, Comment, User],
      synchronize: true,
    }),
    ArticleModule,
    CommentModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
