import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    NotesModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb://localhost/nest',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    ),
  ],
})
export class AppModule { }
