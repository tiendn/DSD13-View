import { Helper } from './../../commons/helper';
// import { ChartService } from './../../providers/chart-service';
// import { HeadCodeService } from './../../providers/head-code-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
//   providers: [ChartService]
})
export class AboutPage {

  chartID: string;
  chart: any;
  constructor(public navCtrl: NavController, public helper: Helper) {
    this.chartID =  "head-code-chart";
  }

  ionViewDidLoad() {
    this.fetchData();
	this.initChart();
		// this.initSocket();
  }
  
//   fetchData() {
// 	// this.service.fetchData();
//   }

	initChart() {
		this.chart = Highcharts.chart(this.chartID, {
			chart: {
            type: 'area'
            },
            title: {
                text: 'Response Code'
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
                    name: '1xx',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: '2xx',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: '5xx',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: '4xx',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                {
                    name: '3xx',
                    data: [{ x: new Date().getTime(), y: 0}]
                },
                {
                    name: '200',
                    data: [{ x: new Date().getTime(), y: 0}]
                }, 
                
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
			this.helper.fetchHeadCodeData().then((data: Array<Object>) => {
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
		const { countLess200, count200, countGreater200, countGreater300, countGreater400, countGreater500 } = data;
		const x = (new Date()).getTime();
		// data.push({
		// 	x: x,
		// 	y: value
		// })
		this.chart.series[0].addPoint([x, countLess200], true, false);
        this.chart.series[1].addPoint([x, countGreater200], true, false);
        this.chart.series[2].addPoint([x, countGreater500], true, false);
        this.chart.series[3].addPoint([x, countGreater400], true, false);
        this.chart.series[4].addPoint([x, countGreater300], true, false);
        this.chart.series[5].addPoint([x, count200], true, false);
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
