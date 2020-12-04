import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {PostListWrapper} from './wrappers/PostListWrapper';
import {catchError, map, mapTo} from 'rxjs/operators';
import {Post} from '../models/Post';
import {HttpClient} from '@angular/common/http';
import {PostWrapper} from './wrappers/PostWrapper';
import {PostData} from '../models/PostData';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly http: HttpClient) { }

  public list(): Observable<Post[]> {
    return this.http.get<PostListWrapper>(`${environment.publicApi}/posts.json`)
      .pipe(
        map(list => list.posts)
      );
  }

  public get(id: number | string): Observable<Post> {
    return this.http.get<PostWrapper>(`${environment.publicApi}/posts/${id}.json`)
      .pipe(
        map(list => list.post)
      );
  }

  public add(postData: PostData): Observable<Post> {
    return this.http.post<PostWrapper>(`${environment.privateApi}/posts.json`, postData)
      .pipe(
        map(post => post.post)
      );
  }

  public edit(postId: number | string, postData: PostData): Observable<Post> {
    return this.http.put<PostWrapper>(`${environment.privateApi}/posts/${postId}.json`, postData)
      .pipe(
        map(data => data.post)
      );
  }

  public delete(postId: number | string): Observable<boolean> {
    // If the post is successfully deleted, true is returned.
    // If an error 404 is received, false is returned.
    // Otherwise, an exception is thrown.
    return this.http.delete(`${environment.privateApi}/posts/${postId}.json`)
      .pipe(
        mapTo(true),
        catchError(error => error.status === 404 ? of(false) : throwError(error))
      );
  }
}
