import { Component, OnInit, Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataService } from '../../services/shared.data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = null;
  showHeader = false;

  constructor (private router: Router, private http: HttpClient, public dialog: MatDialog, private dataService: DataService) {
    this.showHeader = false;
    this.dataService.changeHeaderState(this.showHeader);
    this.username = null;
    this.dataService.changeMessage(this.username);
  }
  
  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => this.username = message);
    this.dataService.currentHeaderState.subscribe(message => this.showHeader = message);
  }

  checkSubmissions(): Observable<Data>  {
    let BASE_URL = 'https://hn.algolia.com/api/v1/search?tags=story,author_';
    BASE_URL += this.username;

    return this.http.get<Data>(BASE_URL);
  }

  sanityCheck() {
    this.checkSubmissions().subscribe(data => {
      if (data.nbHits > 20) {
        this.showHeader = true;
        this.dataService.changeHeaderState(this.showHeader);
        this.router.navigate(['/top']);
      }
      else {
        console.log('Insufficient submissions found.');
        this.openDialog();
      }
    })
  }


  onSubmit(f: NgForm) {
    this.username = f.value.input;
    this.dataService.changeMessage(this.username);
    this.sanityCheck();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialog, {
      width: '450px',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export interface Data {
  hits: any[];
  nbHits: number;
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})

export class ErrorDialog {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }

}

export interface DialogData {
  username: string;

}
