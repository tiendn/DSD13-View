// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
// // import { Subscription } from 'rxjs/Subscription'
// import { QueueingSubject } from 'queueing-subject'
// import { Observable } from 'rxjs/Observable'
// import websocketConnect from 'rxjs-websockets'
// import 'rxjs/add/operator/share'
// /*
//   Generated class for the ChartService provider.

//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular 2 DI.
// */
// @Injectable()
// export class ChartService1 {
//   private inputStream: QueueingSubject<string>
//   public messages: Observable<string>
//   constructor(public http: Http) {
//     console.log('Hello ChartService Provider');
//   }

//   public connect() {
//     if (this.messages)
//       return

//     // Using share() causes a single websocket to be created when the first
//     // observer subscribes. This socket is shared with subsequent observers
//     // and closed when the observer count falls to zero.
//     // this.messages = websocketConnect(
//       // 'ws://127.0.0.1:4201/ws',
//       // this.inputStream = new QueueingSubject<string>()
//     // ).messages.share()
//   }

//   public send(message: string):void {
//     // If the websocket is not connected then the QueueingSubject will ensure
//     // that messages are queued and delivered when the websocket reconnects.
//     // A regular Subject can be used to discard messages sent when the websocket
//     // is disconnected.
//     this.inputStream.next(message)
//   }

// }
