import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PostListWrapper} from './wrappers/PostListWrapper';
import {map} from 'rxjs/operators';
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
}
