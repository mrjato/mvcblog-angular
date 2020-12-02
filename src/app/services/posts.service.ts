import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PostListWrapper} from './wrappers/PostListWrapper';
import {map} from 'rxjs/operators';
import {Post} from '../models/Post';
import {HttpClient} from '@angular/common/http';
import {PostWrapper} from './wrappers/PostWrapper';

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
        map(post => post.post)
      );
  }
}