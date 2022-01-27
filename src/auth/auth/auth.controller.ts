import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiBody, ApiTags, ApiOkResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiTags('Auth')
  @ApiBody({
    schema: {
      type: 'Object',
      example: '{ "email": "adm@email.com", "password": "123" }'
    },
  })
  @ApiOkResponse({
    description: 'Login bem sucedido.',
    schema: {
      type: 'Object',
      example: `
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjFmMDUzNGFkMWU1YWQwOTZlNmY4ODMyIiwibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1AZW1haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQzMTU2OTg4LCJleHAiOjE2NDMxNjA1ODh9.1A9nXHKmi_Jh2BziS8JapisykvBF7VwsvUeMmw7WS1M",
          "user": {
            "subject": "61f0534ad1e5ad096e6f8832",
            "name": "Admin",
            "email": "adm@email.com",
            "role": "admin"
          }
        }
      `
    }
  })
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  async login(@Body() body) {
    if (body.email && body.password) {
      return await this.authService.login(body.email, body.password);
    }
    
    throw new HttpException("Credenciais Inválidas!", HttpStatus.FORBIDDEN);
  }

  @UseGuards(JwtGuard)
  @Get('user')
  @ApiOkResponse({
    description: 'Dados do payload usuário.',
    schema: {
      type: 'Object',
      example: `{
        "subject": "61f0534ad1e5ad096e6f8832",
        "name": "Admin",
        "email": "adm@email.com",
        "role": "admin"
      }`
    }
  })
  @ApiTags('Auth')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(200)
  @ApiUnauthorizedResponse({ description: 'Token inválido.'})
  async getUser(@Req() req) {
    const id = req.user.subject

    const user = await this.authService.getDataUser(id)

    return {
      user: {
        ...user, exp: req.user.exp, iat: req.user.iat
      }
    };
  }

}
