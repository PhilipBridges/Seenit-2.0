import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from ".//app-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthService } from "./auth.service";
import { InterceptorService } from "./interceptor.service";
import { NavbarComponent } from "./navbar/navbar.component";
import { MessagesComponent } from "./messages/messages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PostlistComponent } from "./postlist/postlist.component";
import { PostFormComponent } from "./postlist/post-form/post.form.component";
import { PostViewComponent } from "./post-view/post-view.component";
import { CommentlistComponent } from "./commentlist/commentlist.component";
import { SeenListComponent } from "./seen-list/seen-list.component";
import { SeenFormComponent } from "./seen-list/seen-form/seen-form.component";
import { SeenViewComponent } from "./seen-list/seen-view/seen-view.component";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MessagesComponent,
    NotFoundComponent,
    PostlistComponent,
    PostFormComponent,
    PostViewComponent,
    CommentlistComponent,
    SeenListComponent,
    SeenFormComponent,
    SeenViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.rectangleBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.0)",
      backdropBorderRadius: "40px",
      primaryColour: "#3f51b5",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff"
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
