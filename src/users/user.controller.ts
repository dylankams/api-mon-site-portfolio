import { Controller, Get, Post, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        const user = await this.userService.findById(id);
        if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const rowsAffected = await this.userService.delete(id);
        if (rowsAffected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }

}
