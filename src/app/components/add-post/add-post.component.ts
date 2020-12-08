import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../../services/posts.service';
import {Router} from '@angular/router';
import {PostData} from '../../models/PostData';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public postForm: FormGroup;
  public error?: string;

  constructor(
    private readonly service: PostsService,
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

  onSubmitForm() {
    const data: PostData = this.postForm.value;

    this.service.add(data).subscribe(
      post => {
        this.router.navigate(['/posts'], {queryParams: {flash: $localize`Artículo "${post.title}" creado.`}});
      },
      error => {
        this.error = error.messsage;
      }
    );
  }
}
