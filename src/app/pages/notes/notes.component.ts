import { Component, OnInit } from '@angular/core';
import { Note, NotesService } from '../../notes.service';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {
  NoteS:Note[] = [];
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes()
  }
  getNotes():void{
    this.notesService.getNotes().subscribe((data)=>{
      this.NoteS = data;
      console.log(data);
    })
  }
}
