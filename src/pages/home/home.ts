// import { HttpHttpsService } from './../../providers/http-https-service';
import { ChartService } from './../../providers/chart-service';
import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import Highcharts from 'highcharts';
// declare var Highcharts: any;
// declare var require: any;
// let HighCharts = require('highcharts');

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [ChartService]
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
	constructor(public navCtrl: NavController, public platform: Platform, public service: ChartService) {
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
				text: 'DSD13'
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					millisecond: '%H:%M:%S'
				},
				tickPixelInterval: 150
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
					stacking: 'percent',
					lineColor: '#ffffff',
                    lineWidth: 1,
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
				data: [{ x: new Date().getTime(), y: 0}]
			}, {
				name: 'HTTPS',
				data: [{ x: new Date().getTime(), y: 0}]
			}]
		});
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
		this.fetchData();
	}

	fetchData() {
		const interval = setInterval(() => {
			this.service.fetchHttpData().then((data: Array<Object>) => {
				if (data) {
					this.addChartSeries(data);
				}
			});
		}, 1000);
		// setTimeout(() => {
		// 	clearInterval(interval);
		// }, 5000)
	}


	addChartSeries(data) {
		// this.helper.addChartSeries(this.chart, id, name, data,);
		// const data = [];
		const { httpCount, httpsCount } = data;
		const x = (new Date()).getTime();
		// data.push({
		// 	x: x,
		// 	y: value
		// })
		this.chart.series[0].addPoint([x, httpCount], true, false);
		this.chart.series[1].addPoint([x, httpsCount], true, false);
		// const serie = this.chart.series[0];
		// console.log(serie)
		// if (serie) {
			// if (serie.data.length % 5 === 0) {
			// 	// this.count--;
			// 	serie.addPoint([x, value], true, true);
			// }
			// else {
			// 	// this.count++;
			// 	serie.addPoint([x, value], true, false);
			// }
		// } else {
			// this.chart.addSeries({
			// 	id: id,
			// 	name: name,
			// 	data: [{
			// 		x: x,
			// 		y: value
			// 	}],
			// 	lineWidth: 1,
			// 	marker: {
			// 		symbol: 'circle',
			// 		radius: 1
			// 	}
			// }, true, true);
		// }
	}
	// initSocket() {
	// 	this.chartService.subscribe();		
	// }
}
