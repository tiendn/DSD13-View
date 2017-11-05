import { ChartService } from './../../providers/chart-service';
import { Helper } from './../../commons/helper';
import { EpsService } from './../../providers/eps-service';
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html",
  providers: [ChartService]
})
export class ContactPage {
	chartID: string;
	chart: any;
	min: number = 99999;
	max: number = -1;
	// count: number = 1;
	constructor(public navCtrl: NavController, private helper: Helper, public service: ChartService) {
		this.chartID = "eps-chart";
	}

	ionViewDidLoad() {
		this.initChart();
		// this.initSocket();
	}

	initChart() {
		this.chart = Highcharts.chart(this.chartID, {
			chart: {
				type: 'spline',
				style: {
				// fontFamily: 'Signika, serif'
				},
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,
				// events: {
				// 	load: function () {
	
				// 		// set up the updating of the chart each second
				// 		var series = this.series[0];
				// 		setInterval(function () {
				// 			var x = (new Date()).getTime(), // current time
				// 				y = 3;
				// 			series.addPoint([x, y], true, true);
				// 		}, 1000);
				// 	}
				// }
			},
			title: {
				text: 'Eps of each client'
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
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				labels: {
					formatter: function() {
						return `${this.value} Eps`
					}
				}
			},
			tooltip: {
				formatter: function () {
					return '<span style="color:' + this.series.color + '; font-weight: bold;">' + this.series.name + '</span><br/>' +
						'<b>Time</b>: ' + Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
						'<b>Eps</b>: ' + Highcharts.numberFormat(this.y, 0);
				}
			},
			plotOptions: {
				spline: {
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
			},
			exporting: {
				enabled: false
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
			// series: [{
			// 	name: 'Random data',
			// 	data: (function () {
			// 		// generate an array of random data
			// 		var data = [],
			// 			time = (new Date()).getTime(),
			// 			i;
	
			// 		for (i = -19; i <= 0; i += 1) {
			// 			data.push({
			// 				x: time + i * 1000,
			// 				y: Math.random()
			// 			});
			// 		}
			// 		return data;
			// 	}())
			// }]
		});
		Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
		this.fetchData();
	}

	fetchData() {
		// const data = [{id: 1}, {id: 2}, {id: 3}]
		const interval = setInterval(() => {
			this.service.fetchEpsData().then((data: Array<Object>) => {
				if (data) {
					data.forEach(element => {
						this.addChartSeries(element["clientAddress"], element["clientPort"], element["eps"]);
						// this.addChartSeries(element["id"], 'fdfs', Math.random());
					});
				}
			});
		}, 1000);
		// setTimeout(() => {
		// 	clearInterval(interval);
		// }, 5000)
	}

	addChartSeries(address, port, value) {
		// this.helper.addChartSeries(this.chart, id, name, data,);
		// const data = [];
		this.min = value > 0 ? this.min <= value ? this.min : value : this.min;
		this.max = this.max <= value ? value : this.max;
		const x = (new Date()).getTime();
		const id = `${address}:${port}`;
		// data.push({
		// 	x: x,
		// 	y: value
		// })
		const serie = this.chart.get(id);
		// console.log(serie.data.length)
		if (serie) {
			if (serie.data.length % 7 === 0) {
				// this.count--;
				serie.addPoint([x, value], true, true);
			}
			else {
				// this.count++;
				serie.addPoint([x, value], true, false);
			}
		} else {
			this.chart.addSeries({
				id: id,
				name: id,
				data: [{
					x: x,
					y: value
				}],
				lineWidth: 1,
				marker: {
					symbol: 'circle',
					radius: 1
				}
			}, true, true);
		}
	}

	// addPoint(serie, value) {
	// 	// console.log(value);
	// 	// const { x, y } = point;
	// 	const timeNow = (new Date()).getTime();
	// 	serie.addPoint([timeNow, value], true, true, true);
	// }

	// initSocket() {
		// this.chartService.subscribe();		
	// }
}
