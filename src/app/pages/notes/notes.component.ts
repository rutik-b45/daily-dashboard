import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../notes.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-notes',
  imports: [CommonModule,FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  newNote: Note = {
  title: '',
  content: '',
  date: '',
  saved: false
};
  Notes: Note[] = [];
  constructor(private notesService: NotesService, private router: Router) { }
  showModel: boolean = false;
  ngOnInit(): void {
    this.getNotes()
  }
  getNotes(): void {
    this.notesService.getNotes().subscribe((data) => {
      this.Notes = data;
    })
  }
  saveCurrentNote(note: Note): void {
    const updatedNote = { ...note, saved: !note.saved }
    this.notesService.updateNote(updatedNote).subscribe(
      (res) => {
        note.saved = res.saved;
      },
      (err) => {
        console.error('Error updating note:', err);
      }
    );

  }
  deleteNote(note: Note): void {
    if(!note.id)return;
    this.notesService.deleteNote(note.id).subscribe(() => {
      this.getNotes();
    },
      (err) => {
        console.error('Error deleting note:', err);
      })
  }
  editNote(note: Note): void {
    this.router.navigate(['note-detail', note.id])
  }
  cancelModel(): void {
    this.showModel = false;
  }

  openModel(): void {
    this.showModel = true;
  }
  saveNote():void{
    const today = new Date().toISOString().split('T')[0]; 

    const note:Note = {
      title: this.newNote.title,
      content: this.newNote.content,
      date: today,
      saved: this.newNote.saved
    }
    this.notesService.addNote(note).subscribe({
      next:()=>{
        this.getNotes();
        this.showModel = false;
      }
    })
  }

}
