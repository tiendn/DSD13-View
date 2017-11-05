import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/retry";

/*
  Generated class for the ChartService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChartService {
	constructor(public http: Http) {
		console.log("Hello ChartService Provider");
	}

	fetchData(url) {
		return new Promise((resolve, reject) => {
			try {
				this.http.get(url)
				.timeout(3000)
				.retry(3)
				.map(res => res.json())
				.subscribe(
					res => {
						if (res != undefined && res != null) {
							// console.log(res);
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
			} catch (error) {
				reject(error);
			}
		})
	}

	fetchHttpData() {
		return this.fetchData("http://192.168.1.78:8080/display/httpstatisical");
	}

	fetchHeadCodeData() {
		return this.fetchData("http://192.168.1.78:8080/display/statusstatisical");
	}

	fetchEpsData() {
		return this.fetchData("http://192.168.1.78:8080/display/epsstatisical");
	}


	fetchServerData() {
		return this.fetchData("http://192.168.1.78:8080/display/powerbystatisical");
	}
}
