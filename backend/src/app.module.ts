import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventBusModule } from '@Abhishek/event-bus';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TokensModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    EventBusModule.register({
      uri: 'amqp://guest:guest@localhost:5672',
      exchange: 'users_exchange',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
