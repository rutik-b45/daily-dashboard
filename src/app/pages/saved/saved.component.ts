import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved',
  imports: [CommonModule],
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css', '../notes/notes.component.css']
})
export class SavedComponent implements OnInit {
  savedNotes: Note[] = [];

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.getSavedNotes();
  }

  getSavedNotes(): void {
    this.noteService.getNotes().subscribe((notes) => {
      this.savedNotes = notes.filter(note => note.saved);
    });
  }
  toggleSave(note: Note): void {
    const updatedNote = { ...note, saved: !note.saved }
    this.noteService.updateNote(updatedNote).subscribe(
      (res) => {
        note.saved = res.saved;
        this.getSavedNotes();
      },
      (err) => {
        console.error('Error updating note:', err);
      }
    );

  }
  deleteNote(note: Note): void {
    this.noteService.deleteNote(note.id).subscribe(() => {
      this.getSavedNotes();

    },
      (err) => {
        console.error('Error deleting note:', err);
      })
  }
}
