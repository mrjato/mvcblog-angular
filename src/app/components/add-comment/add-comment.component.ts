import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentData} from '../../models/CommentData';
import {CommentsService} from '../../services/comments.service';
import {Comment} from '../../models/Comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  @Input() public postId: number;
  @Output() public comment: EventEmitter<Comment>;

  public commentForm: FormGroup;
  public error?: string;

  constructor(
    private readonly service: CommentsService
  ) {
    this.commentForm = new FormGroup({
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(255)
      ])
    });

    this.comment = new EventEmitter<Comment>();
  }

  onSubmitForm() {
    const data: CommentData = {
      content: this.commentForm.value.content,
      post: this.postId
    };

    this.service.add(data).subscribe(
      comment => {
        this.comment.emit(comment);
        this.commentForm.reset();
      },
      error => {
        this.error = error.messsage;
      }
    );
  }
}
