import {Injectable} from '@angular/core';
import {CommentData} from '../models/CommentData';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommentWrapper} from './wrappers/CommentWrapper';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Comment} from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public add(commentData: CommentData): Observable<Comment> {
    return this.http.post<CommentWrapper>(`${environment.privateApi}/comments.json`, commentData)
      .pipe(
        map(data => data.comment)
      );
  }
}
