import { Injectable,UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository} from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignInResponse} from './signin-response.interface';

@Injectable()
export class AuthService {
    constructor(private repository:UsersRepository,
                private jwtService: JwtService){
    }

    public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.repository.createUser(authCredentialsDto);
    }
    
    public async signIn(authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
        const { username, password } = authCredentialsDto;
        const user = await this.repository.getRepository().findOneBy({ username });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          const payload: JwtPayload = { username };
          const accessToken: string = await this.jwtService.sign(payload,{secret: process.env.JWT_SECRET});
          return { accessToken };
        } 
        else {
          throw new UnauthorizedException('Please check your login credentials');
        }
      }    

}
