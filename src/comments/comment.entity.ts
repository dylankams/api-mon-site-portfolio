import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Article } from '../articles/entities/article.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(({ type: 'mediumtext' }))
  content: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article: Article;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Modifie le type de createdAt en Date et retire le timestamp
  createdAt: Date;
}
