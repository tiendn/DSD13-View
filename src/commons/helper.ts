import { Injectable } from '@angular/core';

@Injectable()

export class Helper {
    addChartSeries(chart, id, name, data) {
        chart.addSeries({
            id: id,
            name: name,
            // ticker: ticker,
            data: data,
            // ...props,
            lineWidth: 1,
            marker: {
                symbol: 'circle',
                radius: 1
            }
        }, true);
    }
}
    