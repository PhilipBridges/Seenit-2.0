import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./auth.guard";
import { MessagesComponent } from "./messages/messages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { PostViewComponent } from "./post-view/post-view.component";
import { SeenListComponent } from "./seen-list/seen-list.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "home",
    component: PostlistComponent,
  },
  {
    path: "posts/:id",
    component: PostViewComponent
  },
  {
    path: "inbox",
    component: MessagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "seens",
    component: SeenListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
