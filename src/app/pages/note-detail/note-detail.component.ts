import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NotesService } from '../../notes.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-note-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.css'
})
export class NoteDetailComponent implements OnInit {
  note: Note | null = null;
  noteId!: number;
  constructor(private route: ActivatedRoute, private location:Location, private noteService: NotesService, private router:Router) { }
  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id'))
    this.loadNote();
  }
  loadNote(): void {

    this.noteService.getNoteById(this.noteId).subscribe(
      (data) => {
        this.note = data;
      },
      (error) => {
        console.error('Error loading note:', error);
      }
    );
  }
  saveNote(): void {
    if (!this.note) return;

    const today = new Date().toISOString().split('T')[0]; 
    this.note.date = today;

    this.noteService.updateNote(this.note).subscribe(() => {
      alert('Note updated!');
      this.router.navigate(['/notes']);
    });
  }
  deleteNote(note: Note): void {
    if(!note.id)return;
    this.noteService.deleteNote(note.id).subscribe(() => {
      this.router.navigate(['/notes'])
    },
      (err) => {
        console.error('Error deleting note:', err);
      })
  }
  goBack(): void {    this.location.back();
  }
}
