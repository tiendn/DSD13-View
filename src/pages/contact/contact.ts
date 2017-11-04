import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-contact",
  templateUrl: "contact.html"
})
export class ContactPage {
  chartID: string;
  chart: any;
  constructor(public navCtrl: NavController) {
    this.chartID = "head-code-chart";
  }

  ionViewDidLoad() {
		this.initChart();
		this.initSocket();
	}

	initChart() {
		this.chart = Highcharts.chart(this.chartID, {
			chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Math.random();
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
      },
      title: {
          text: 'Live random data'
      },
      xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
      },
      yAxis: {
          title: {
              text: 'Value'
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },
      series: [{
          name: 'Random data',
          data: (function () {
              // generate an array of random data
              var data = [],
                  time = (new Date()).getTime(),
                  i;

              for (i = -19; i <= 0; i += 1) {
                  data.push({
                      x: time + i * 1000,
                      y: Math.random()
                  });
              }
              return data;
          }())
      }],
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
      }
		});
	}

	initSocket() {
		// this.chartService.subscribe();		
	}
}
