import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions  } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}


  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }


  async findById(id: number): Promise<Article> {
    const options: FindOneOptions<Article> = {
      where: { id: id }
    };
    const article = await this.articleRepository.findOne(options);
    return article;
  }


  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = createArticleDto.title;
    article.content = createArticleDto.content;
    return await this.articleRepository.save(article);
  }
  


  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const options: FindOneOptions<Article> = {
      where: { id: id }
    };
    const article = await this.articleRepository.findOne(options);
    if (!article) {
      throw new NotFoundException(`Article with ID "${id}" not found`);
    }
    article.title = updateArticleDto.title;
    article.content = updateArticleDto.content;
    return await this.articleRepository.save(article);
  }

  async delete(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
