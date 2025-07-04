import { Component, inject } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';
import { HttpClient } from '@angular/common/http';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private data = inject(DataService);

  protected WebApiUrl="http://localhost:5067";

  protected CommentText="";
  protected UserId=2;
  protected UserName="Blend 285*";

  protected WebBoardId=1;
  protected WebBoard:any;

  protected topic="";
  protected content="";
  protected createdTime="";
  protected createUserName="";
  
  protected WebBoardComments:any;

  constructor(private httpClient: HttpClient)
  {
  }

  ClearCommentText(){
    this.CommentText="";
  }

  ionViewWillEnter(){
    console.log('callreport.page.ts:ionViewWillEnter()');
    this.getWebBoard();
    this.getWebBoardComments();
  }

  ionViewDidEnter(){
    console.log('callreport.page.ts:ionViewDidEnter()');
  }

  ionViewDidLeave(){
    console.log('callreport.page.ts:ionViewDidLeave()');
  }

  onEnterPressed(event:any){
    console.log('onEnterPressed()');   
    let comment=event.target.value;
    this.postWebBoardComment(comment);
  }

  postWebBoardComment(comment:string){

    let json = {
      "webBoardCommentId": 0,
      "webBoardId": this.WebBoardId,
      "commentText": comment,
      "commentRecordCreatedTime": null,
      "createdUserId": this.UserId
    }

    try {
      let url=`${this.WebApiUrl}/WebBoardComment`;
      let body=json;
      this.httpClient.post(url,body)
      .subscribe({
        next:(res)=>{
          console.log(res);      
          this.ClearCommentText();
          this.getWebBoardComments();
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log('complete');
        },
      });
    } catch (err) {
        console.log(err);
    }
  }

  getWebBoard(){
    
    let url=`${this.WebApiUrl}/WebBoard/GetWebBoardId/1`;
    this.httpClient.get(url).subscribe ({
        next:(res)=>{
          this.WebBoard=res;
          console.log(this.WebBoard);
          this.topic=this.WebBoard.topic;          
          this.content=this.WebBoard.content;
          this.createdTime=this.WebBoard.createTime;
          this.createUserName=this.WebBoard.createUserName;
        
        },
        error:(err)=>{
          console.log(err);
        },
        complete:()=>{
          console.log('complete');
        },
    });       
  }

  getWebBoardComments(){
    
    let url=`${this.WebApiUrl}/WebBoardComment/getWebBoardCommentByWebBoardId?WebBoardId=1`;
    this.httpClient.get(url)
    .subscribe  ({
      next:(res)=>{
        this.WebBoardComments=res;
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log('complete');
      },
    });
  }
  
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  
}
