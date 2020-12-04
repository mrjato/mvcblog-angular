import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../models/Post';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    private readonly service: PostsService,
    private readonly authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.service.list().subscribe(
      posts => this.posts = posts
    );
  }

  isLogged(): boolean {
    return this.authenticationService.hasCredentials();
  }

  isOwner(post: Post): boolean {
    return this.isLogged() && this.authenticationService.getCredentials().username === post.author;
  }
}
