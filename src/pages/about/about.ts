import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  chartID: string;
  chart: any;
  constructor(public navCtrl: NavController) {
    this.chartID =  "eps-chart";
  }

  ionViewDidLoad() {
		this.initChart();
		this.initSocket();
	}

	initChart() {
		this.chart = Highcharts.chart(this.chartID, {
			chart: {
        type: 'area'
      },
      title: {
          text: 'Response Code'
      },
      // subtitle: {
      //     text: 'Source: Wikipedia.org'
      // },
      xAxis: {
          // categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
          tickmarkPlacement: 'on',
          title: {
              enabled: false
          }
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
      series: [{
          name: '2xx',
          data: [502, 635, 809, 947, 1402, 3634, 5268]
      }, {
          name: '3xx',
          data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
          name: '4xx',
          data: [163, 203, 276, 408, 547, 729, 628]
      }, {
          name: '5xx',
          data: [18, 31, 54, 156, 339, 818, 1201]
      }],
      credits: {
          enabled: false
      },
		});
	}

	initSocket() {
		// this.chartService.subscribe();		
	}

}
