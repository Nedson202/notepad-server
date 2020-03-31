import { IsNotEmpty } from 'class-validator';

export class CreateNoteDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
