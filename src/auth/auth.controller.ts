import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignInResponse} from './signin-response.interface';


@Controller('/auth')
export class AuthController {
    constructor(private authService:AuthService){
    }

    @Post('/signup')
    public async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
      return await this.authService.signUp(authCredentialsDto);
    }
  
    @Post('/signin')
    public async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<SignInResponse> {
      return await this.authService.signIn(authCredentialsDto);
    }
}
