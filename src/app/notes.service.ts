import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Note {
  id?: number;
  title: string;
  content: string;
  date:string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }
}
