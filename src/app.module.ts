import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TasksModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any, // Type assertion to solve the type error
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10), // Convert string to number
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true      
    }),
    AuthModule    
  ]

})
export class AppModule {}
