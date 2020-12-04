import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {Comment} from '../../models/Comment';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post?: Post;

  constructor(
    private readonly service: PostsService,
    private readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.service.get(id).subscribe(
      post => this.post = post,
      error => this.router.navigate(['/posts'], {queryParams: {flash: 'Post no encontrado.'}})
    );
  }

  onNewComment(comment: Comment) {
    this.post.comments.push(comment);
  }

  isLogged() {
    return this.authenticationService.hasCredentials();
  }
}
