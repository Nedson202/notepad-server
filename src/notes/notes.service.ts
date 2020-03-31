import { CreateNoteDTO } from './dto/notes.dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.interface';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) { }

  async create(createNoteDTO: CreateNoteDTO, authorID: string) {
    const { name } = createNoteDTO;
    const newNote = {
      ...createNoteDTO,
      authorID,
    };

    const note =
      await this.noteModel.findOne({ authorID, name });

    if (note) {
      return {
        noteExists: true,
        existingNote: note,
      };
    }

    const createdNote = new this.noteModel(newNote);

    return createdNote.save();
  }

  async findOne(param: any) {
    const note = await this.noteModel.findOne(param);

    return note;
  }

  async findAll(param: any) {
    const notes = await this.noteModel.find(param);

    return notes;
  }

  async deleteOne(param: any): Promise<{
    noteNotFound?: boolean,
    unauthorised?: boolean,
  }> {
    const { authorID, _id } = param;

    const note = await this.findOne({ _id });

    if (!note) {
      return {
        noteNotFound: true,
      };
    }

    if (note.authorID !== authorID) {
      return {
        unauthorised: true,
      };
    }

    await this.noteModel.deleteOne(param);
  }

  async deleteAll(param: any) {
    const notes = await this.findOne(param);

    if (!notes) {
      return [];
    }

    await this.noteModel.deleteMany(param);
  }
}
