// import { WebsocketService } from './websocket';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the ChartService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartService {
    // ws: $WebSocket;
    ws: WebSocket;
    counter: number;
    url: string;
    public messages: Subject<any>;

    private websocket: WebSocket;
    
    
    
    constructor(public http: Http) {
        console.log('Hello ChartService Provider');
        this.url = "ws://192.168.1.78:8080/display/add";
        // this.url = "ws://demos.kaazing.com/echo"; 
        // this.ws = new $WebSocket(this.url);
        this.ws = new WebSocket(this.url);
    }

    // sendMessage(text:string){
    //     this.websocket.send(text);
    //   }
  
    // GetInstanceStatus(): Observable<any>{
    //     this.websocket = new WebSocket(this.url); //dummy echo websocket service
    //     this.websocket.onopen =  (evt) => {
    //         this.websocket.send("Hello World");
    //     };
  
    //     return Observable.create(observer=>{
    //         this.websocket.onmessage = (evt) => { 
    //             console.log(evt);
    //             observer.next(evt);
    //         };
    //     })
    //     .map(res=> "From WS: " + res.data)
    //     .share();
    // }

    subscribe() {
        this.ws = new WebSocket(this.url);
        console.log(this.ws)
        // this.ws.
        this.ws.onopen = (event) => {
            console.log("Open");
            const obj = {
                num1: 3,
                num2: 4
            }
            this.ws.send(obj);
            this.ws.send("Here's some text that the server is urgently awaiting!"); 
        };
    
        this.ws.onmessage = (event) => {
            console.log(event);
          }
    
        this.ws.onerror = error => {
            console.log(error);
        };

        // console.log("trying to subscribe to ws");
        // this.ws = new $WebSocket(this.url);
        // this.ws.send("Hello");
        // this.ws.getDataStream().subscribe(
        //     res => {
        //         console.log(res)
        //         var count = JSON.parse(res.data).value;
        //         console.log('Got: ' + count);
        //         this.counter = count;
        //     },
        //     function(e) { console.log('Error: ' + e.message); },
        //     function() { console.log('Completed'); }
        // );
        
    }
          

    close() {
        this.ws.close(404, 'Close');    // close immediately
    }

  

}
