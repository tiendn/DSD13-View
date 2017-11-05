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
	count: number = 0;
	constructor(public navCtrl: NavController, private helper: Helper, public service: ChartService) {
		this.chartID = "eps-chart";
	}

	ionViewDidLoad() {
		this.initChart();
		// this.initSocket();
	}
  
	fetchData() {
		const interval = setInterval(() => {
			this.service.fetchEpsData().then((data: Array<Object>) => {
				if (data) {
					data.forEach(element => {
						// this.addChartSeries(element["clientAddress"], element["clientAddress"], element["eps"]);
						this.addChartSeries(element["clientAddress"], element["clientAddress"], Math.random());
					});
				}
			});
		}, 1000);
		// setTimeout(() => {
		// 	clearInterval(interval);
		// }, 5000)
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
				text: ''
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
					return '<b>' + this.series.name + '</b><br/>' +
						Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
						Highcharts.numberFormat(this.y, 2);
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

	addChartSeries(id, name, value) {
		// this.helper.addChartSeries(this.chart, id, name, data,);
		// const data = [];
		this.count++;
		const x = (new Date()).getTime();
		// data.push({
		// 	x: x,
		// 	y: value
		// })
		const serie = this.chart.get(id);
		if (serie) {
			if (this.count % 5 === 0)
				serie.addPoint([x, value], true, true);
			else 
				serie.addPoint([x, value], true, false);
		} else {
			this.chart.addSeries({
				id: id,
				name: name,
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
