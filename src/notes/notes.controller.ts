import { CreateNoteDTO } from './dto/notes.dto';
import { JWTAuthGuard } from './../auth/jwt.guard';
import { NotesService } from './notes.service';
import {
  Controller, Get, Post, Put, Delete, UseGuards, Param, Body,
  Request, UsePipes, ValidationPipe,
} from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @UseGuards(JWTAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createNote(@Body() createNoteDTO: CreateNoteDTO, @Request() req) {
    const { socialID: authorID } = req.user;

    const note = await this.notesService.create(createNoteDTO, authorID);

    if (note && note.noteExists) {
      return {
        message: 'Note already exist. Edit note instead',
        data: {
          note: note.existingNote,
        },
      };
    }

    return {
      message: 'Note created successfully',
      data: {
        note,
      },
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async getNote(@Request() req, @Param('id') noteID: string) {
    const { socialID: authorID } = req.user;

    const note = await this.notesService.findOne({ _id: noteID, authorID });

    if (!note) {
      return {
        message: 'Note not found',
        data: {
          note: {},
        },
      };
    }

    return {
      message: 'Note retrieved successfully',
      data: note,
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  async getNotes(@Request() req) {
    const { socialID: authorID } = req.user;

    const notes = await this.notesService.findAll({ authorID });

    if (!notes || !notes.length) {
      return {
        message: 'No note found',
        data: {
          notes: [],
        },
      };
    }

    return {
      message: 'Note retrieved successfully',
      data: {
        notes,
      },
    };
  }

  @UseGuards(JWTAuthGuard)
  @Put()
  updateNote() {
    console.log('do nothing');
  }

  @UseGuards(JWTAuthGuard)
  @Delete()
  async deleteNote(@Request() req, @Param('id') noteID: string) {
    const { socialID: authorID } = req.user;

    const { noteNotFound, unauthorised } =
      await this.notesService.findAll({ _id: noteID, authorID });

    if (noteNotFound) {
      return {
        message: 'Note not found',
      };
    }

    if (unauthorised) {
      return {
        message: 'You do not have permission to delete note',
      };
    }

    return {
      message: 'Note deleted successfully',
    };
  }

  @UseGuards(JWTAuthGuard)
  @Delete('/delete-all')
  async deleteAllNotes(@Request() req) {
    const { socialID: authorID } = req.user;

    const notes = await this.notesService.deleteAll({ authorID });

    if (notes && !notes.length) {
      return {
        message: 'You have no note currently',
      };
    }

    return {
      message: 'All Notes deleted successfully',
    };
  }
}
