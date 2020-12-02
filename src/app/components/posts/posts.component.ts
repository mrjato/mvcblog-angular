import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    private readonly service: PostsService
  ) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      posts => this.posts = posts
    );
  }
}
