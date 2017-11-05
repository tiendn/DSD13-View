import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
// import * from "rxjs";
import "rxjs/add/operator/map";
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/retry';

/*
  Generated class for the EpsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EpsService {
	constructor(public http: Http) {
		console.log("Hello EpsService Provider");
	}

  	fetchData() {
		console.log("Data");
		return new Promise((resolve, reject) => {
			this.http.get("http://192.168.1.78:8080/display/epsstatisical")
			.timeout(3000)
			.retry(3)
			.map(res => res.json())
			.subscribe(
				res => {
					if (res != undefined && res != null) {
						console.log(res);
						resolve(res);
					}
					else {
						resolve(null);
					}
				},
				error => {
					console.log(error);
					reject(error);
				}
			);
		})
	}
}
