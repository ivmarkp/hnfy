import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatProgressBarModule, MatIconModule, MatInputModule, MatButtonModule, MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/stories/stories.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import { HomeComponent, ErrorDialog} from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { DataService } from './services/shared.data.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    TimeAgoPipe,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    ErrorDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressBarModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    NgxSpinnerModule,
    AngularFontAwesomeModule
  ],
  entryComponents:[ErrorDialog],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
