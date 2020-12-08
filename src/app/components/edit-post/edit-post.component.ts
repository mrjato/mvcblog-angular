import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../../services/posts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/Post';
import {PostData} from '../../models/PostData';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public postForm: FormGroup;
  public post: Post;
  public error?: string;

  constructor(
    private readonly service: PostsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255)
      ])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.service.get(id).subscribe(
      post => {
        this.post = post;
        this.postForm.setValue({
          title: post.title,
          content: post.content
        });
      },
      () => {
        this.router.navigate(['/posts'], {queryParams: {flash: $localize`Error recuperando el artículo.`}});
      }
    );
  }

  onSubmitForm() {
    const data: PostData = this.postForm.value;

    this.service.edit(this.post.id, data).subscribe(
      post => {
        this.router.navigate(['/posts'], {queryParams: {flash: $localize`Artículo "${post.title}" modificado.`}});
      },
      error => {
        this.error = error.message;
      }
    );
  }
}
