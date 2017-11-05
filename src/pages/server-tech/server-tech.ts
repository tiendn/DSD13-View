import { ChartService } from './../../providers/chart-service';
// import { ServerTechService } from './../../providers/server-tech-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ServerTech page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-server-tech',
  templateUrl: 'server-tech.html',
  providers: [ChartService]
})
export class ServerTechPage {
  chartID: string;
  chart: any;
  constructor(public navCtrl: NavController, public service: ChartService) {
    this.chartID = "server-tech-chart";
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
                text: 'Server languages'
            },
            subtitle: {
                text: 'DSD13'
            },
            xAxis: {
                // categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                },
                type: 'datetime',
				dateTimeLabelFormats: {
					millisecond: '%H:%M:%S'
				},
				tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    enabled: false,
                },
                labels: {
                    formatter: function () {
                        return `${this.value}%`
                    },
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b><br/>', //  ({point.y:,.0f}
                split: true
            },
            plotOptions: {
                area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#ffffff',
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                        enabled: true
                        }
                    }
                },
                }
            },
            series: [
                {
                    name: '.Net',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                {
                    name: 'PHP',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                {
                    name: 'Express',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                {
                    name: 'Servlet',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                {
                    name: 'Jsp',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: 'Django',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: 'Others',
                    data: [{ x: new Date().getTime(), y: 0}]
                }
            ],
            credits: {
                enabled: false
            },
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
			this.service.fetchServerData().then((data: Array<Object>) => {
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
		const { countAspDotNet, countPhp, countExpress, countServlet, countJsp, countDjango, countOther } = data;
		const x = (new Date()).getTime();
		// data.push({
		// 	x: x,
		// 	y: value
		// })
		this.chart.series[0].addPoint([x, countAspDotNet], true, false);
        this.chart.series[1].addPoint([x, countPhp], true, false);
        this.chart.series[2].addPoint([x, countExpress], true, false);
        this.chart.series[3].addPoint([x, countServlet], true, false);
        this.chart.series[4].addPoint([x, countJsp], true, false);
        this.chart.series[5].addPoint([x, countDjango], true, false);
        this.chart.series[6].addPoint([x, countOther], true, false);

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
		// this.chartService.subscribe();		
	// }


}
