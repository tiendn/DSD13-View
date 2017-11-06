import { Helper } from './../../commons/helper';
import { AlertController } from 'ionic-angular';
import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import Highcharts from 'highcharts';

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})


export class HomePage {
	chart: any;
	chartID: any;
	isApp: boolean;
	constructor(public navCtrl: NavController, public platform: Platform, public helper: Helper, public alertCtrl: AlertController) {
		// console.log(Highcharts); 
		// console.log(this.navCtrl.id);
		// this.type = ''
		// enum 
		this.chartID = "http-https-chart";
		this.isApp = true; // !this.platform.is("mobileweb");
		this.presentPrompt();
	}

	ionViewDidLoad() {
		// this.initSocket();
	}

	presentPrompt() {
		let alert = this.alertCtrl.create({
		  title: 'Server IP Address',
		  enableBackdropDismiss: false,
		  inputs: [
			{
			  name: 'apiUrl',
			  placeholder: 'localhost'
			},
		  ],
		  buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  handler: data => {
				console.log('Cancel clicked');
			  }
			},
			{
			  text: 'OK',
			  handler: data => {
				  console.log(data)
				this.helper.apiUrl = data.apiUrl;
				this.initChart();
			  }
			}
		  ]
		});
		alert.present();
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
			this.helper.fetchHttpData().then((data: Array<Object>) => {
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
	// 	this.charthelper.subscribe();		
	// }
}
