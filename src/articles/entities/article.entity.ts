import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Comment } from '../../comments/comment.entity';

@Entity()
export class Article {
@PrimaryGeneratedColumn()
id: number;

@Column()
title: string;

@Column({ type: 'longtext' }) // Modifie la colonne content pour utiliser le type longtext
content: string;

@Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Modifie le type de createdAt en Date et retire le timestamp
createdAt: Date;

@Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Modifie le type de updatedAt en Date et retire le timestamp
updatedAt: Date;

@ManyToOne(() => User, user => user.articles)
@JoinColumn({ name: 'authorId' })
author: User;

@OneToMany(() => Comment, comment => comment.article)
comments: Comment[];
}