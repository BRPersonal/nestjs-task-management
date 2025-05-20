import {Injectable,ConflictException,InternalServerErrorException,} from '@nestjs/common';
import {DataSource,Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
    private userRepository: Repository<User>;

    constructor(private dataSource: DataSource) {
      this.userRepository = this.dataSource.getRepository(User);
    }
  
    public getRepository() : Repository<User> {
      return this.userRepository;
    }

    public async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = this.userRepository.create({ username, password: hashedPassword });
    
        try {
          await this.userRepository.save(user);
        } 
        catch (error) {
          if (error.code === '23505') {
            // duplicate username
            throw new ConflictException('Username already exists');
          } else {
            throw new InternalServerErrorException();
          }
        }
      }
}