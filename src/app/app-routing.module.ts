import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from './components/posts/posts.component';
import {PostComponent} from './components/post/post.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {LoginComponent} from './components/login/login.component';
import {NotAuthenticatedGuard} from './guards/not-authenticated.guard';
import {AuthenticatedGuard} from './guards/authenticated.guard';
import {EditPostComponent} from './components/edit-post/edit-post.component';


const routes: Routes = [
  {path: 'posts', component: PostsComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'posts/add', component: AddPostComponent, canActivate: [AuthenticatedGuard]},
  {path: 'posts/edit/:id', component: EditPostComponent, canActivate: [AuthenticatedGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthenticatedGuard]},
  {path: '', redirectTo: '/posts', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
