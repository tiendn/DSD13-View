import { HttpHttpsService } from './../../providers/http-https-service';
// import { ChartService } from './../../providers/chart-service';
import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import Highcharts from 'highcharts';
// declare var Highcharts: any;
// declare var require: any;
// let HighCharts = require('highcharts');

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [HttpHttpsService]
})

// const CHART_TYPE = {
//     "CHART1": "HTTP/HTTPS" , // Number of percentage between HTTP and HTTPS
//     "CHART2": "HEADER_CODE", // Header code response: 2xx,3xx,4xx,5xx
//     "CHART3": "EPS", // Number of eps by each client
//     "CHART4": "SERVER_TECHNOLOGIES" // PHP, JAVA, .NET, NodeJS, Python
// }

export class HomePage {
	chart: any;
	chartID: any;
	isApp: boolean;
	constructor(public navCtrl: NavController, public platform: Platform, public service: HttpHttpsService) {
		// console.log(Highcharts); 
		// console.log(this.navCtrl.id);
		// this.type = ''
		// enum 
		this.chartID = "http-https-chart";
		this.isApp = true; // !this.platform.is("mobileweb");
	}

	ionViewDidLoad() {
		this.initChart();
		// this.initSocket();
	}

	initChart() {
		this.chart = Highcharts.chart(this.chartID, {
			chart: {
				type: 'area'
			},
			title: {
				text: 'HTTP and HTTPS'
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				allowDecimals: false,
				labels: {
					formatter: function () {
						return this.value; // clean, unformatted number for year
					}
				}
			},
			yAxis: {
				title: {
					text: ''
				},
				labels: {
					formatter: function () {
						return this.value;
					}
				}
			},
			tooltip: {
				pointFormat: 'Have <b>{point.y:,.0f}</b> {series.name} domains now'
			},
			plotOptions: {
				area: {
					// pointStart: new Date(),
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 2,
						states: {
							hover: {
								enabled: true
							}
						}
					}
				},
				series: {
                    marker: {
                        enabled: false
                    }
                }
			},
            marker: {
                enabled: false,

            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
			series: [{
				name: 'HTTP',
				data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
					1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
					27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
					26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
					24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
					22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
					10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
			}, {
				name: 'HTTPS',
				data: [null, null, null, null, null, null, null, null, null, null,
					5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
					4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
					15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
					33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
					35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
					21000, 20000, 19000, 18000, 18000, 17000, 16000]
			}]
		});
	}

	// initSocket() {
	// 	this.chartService.subscribe();		
	// }
}
