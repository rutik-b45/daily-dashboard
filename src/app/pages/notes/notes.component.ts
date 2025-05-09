import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../notes.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notes',
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  Notes:Note[] = [];
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes()
  }
  getNotes():void{
    this.notesService.getNotes().subscribe((data)=>{
      this.Notes = data;
    })
  }
  saveCurrentNote(note:Note):void{    
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
    this.notesService.deleteNote(note.id).subscribe(() => {
      this.getNotes();
    },
      (err) => {
        console.error('Error deleting note:', err);
      })
  }
  
}
