import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";
import "rxjs/add/operator/retry";
@Injectable()

export class Helper {
    apiUrl: string = "localhost";
	constructor(public http: Http) {
		console.log("Hello ChartService Provider");
		// this.presentPrompt();
	}


	fetchData(url) {
		// console.log(url)
		// return new Promise((resolve, reject) => {
		// 	resolve({ httpCount: 0, httpsCount: 0});
		// });
		return new Promise((resolve, reject) => {
			try {
				this.http.get(url)
				.timeout(1000)
				// .retry(3)
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
		return this.fetchData(`http://${this.apiUrl}:8080/display/httpstatisical`);
	}

	fetchHeadCodeData() {
		return this.fetchData(`http://${this.apiUrl}:8080/display/statusstatisical`);
	}

	fetchEpsData() {
		return this.fetchData(`http://${this.apiUrl}:8080/display/epsstatisical`);
	}


	fetchServerData() {
		return this.fetchData(`http://${this.apiUrl}:8080/display/powerbystatisical`);
	}
}
    