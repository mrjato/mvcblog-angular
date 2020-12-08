import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {Post} from '../../models/Post';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[];

  constructor(
    private readonly service: PostsService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
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

  private removePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
    this.router.navigate(['/posts'], {queryParams: {flash: $localize`Artículo eliminado.`}});
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  private notifyDeletionError() {
    this.router.navigate(['/posts'], {queryParams: {flash: $localize`No se ha podido eliminar el artículo.`}});
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  onDelete(id: number) {
    if (confirm($localize`Se va a eliminar el artículo. ¿Está seguro de que desea continuar?`)) {
      this.service.delete(id).subscribe(
        deleted => {
          if (deleted) {
            this.removePost(id);
          } else {
            this.notifyDeletionError();
          }
        },
        error => {
          this.notifyDeletionError();
        }
      );
    }
  }
}
