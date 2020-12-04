import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostsComponent} from './components/posts/posts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PostComponent} from './components/post/post.component';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BasicAuthenticationInterceptor} from './lifecycle/basic-authentication.interceptor';
import {AddPostComponent} from './components/add-post/add-post.component';
import {EditPostComponent} from './components/edit-post/edit-post.component';
import {AddCommentComponent} from './components/add-comment/add-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostComponent,
    LoginComponent,
    AddPostComponent,
    EditPostComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
