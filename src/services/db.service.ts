import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  query(q) {
    return this.http.post('/api/query', {query: q});
  }
  queryOx(q) {
    return this.http.post('/api/query/oxford', {query: q});
  }
  wordCount() {
    return this.http.get('/api/wordCount');
  }
  createWord(body) {
    return this.http.post('/api/addWord', body);
  }
}
