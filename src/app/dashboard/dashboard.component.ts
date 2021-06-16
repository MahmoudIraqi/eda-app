import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  numberOFAllRequestObject = [
    {
      id: 'track',
      icon: 'flaticon-tracking',
      title: 'Track Requests',
      numberOfRequest: 1000,
      active: false,
    },
    {
      id: 'draft',
      icon: 'flaticon-archive',
      title: 'Draft Requests',
      numberOfRequest: 300,
      active: false,
    },
    {
      id: 'approve',
      icon: 'flaticon-approval',
      title: 'Approved Products',
      numberOfRequest: 650,
      active: false,
    },
    {
      id: 'reject',
      icon: 'flaticon-rejected',
      title: 'Rejected Products',
      numberOfRequest: 50,
      active: false,
    }
  ];
  @ViewChild('count', {static: true}) numberCount: ElementRef;
  dataObject = {
    track: {
      data: [
        {
          title: 'Notification',
          value: 200,
        },
        {
          title: 'Re-Notification',
          value: 100,
        },
        {
          title: 'Tell & Do Variation',
          value: 800,
        },
        {
          title: 'Do & Tell Variation',
          value: 1200,
        },
        {
          title: 'Inspection',
          value: 50,
        },
        {
          title: 'Custom Release',
          value: 950,
        },
        {
          title: 'General Enquiries',
          value: 30,
        }
      ],
      pieData: [
        {name: 'Register Products', value: 125, color: '<5'},
        {name: 'Register Hair Colorant Product', value: 12, color: '20-24'},
        {name: 'Register Kit', value: 1000, color: '35-39'},
        {name: 'Register Hair Colorant Kit', value: 30, color: '50-54'},
        {name: 'Register product for kit\hair colorant kit', value: 12, color: '65-69'},
        {name: 'Register hair colorant product for kit', value: 650, color: '≥85'}
      ]
    },
    draft: {
      data: [
        {
          title: 'Notification',
          value: 1000,
        },
        {
          title: 'Re-Notification',
          value: 800,
        },
        {
          title: 'Tell & Do Variation',
          value: 600,
        },
        {
          title: 'Do & Tell Variation',
          value: 400,
        },
        {
          title: 'Inspection',
          value: 100,
        },
        {
          title: 'Custom Release',
          value: 50,
        },
        {
          title: 'General Enquiries',
          value: 30,
        }
      ],
      pieData: [
        {name: 'Register Products', value: 25, color: '<5'},
        {name: 'Register Hair Colorant Product', value: 50, color: '20-24'},
        {name: 'Register Kit', value: 120, color: '35-39'},
        {name: 'Register Hair Colorant Kit', value: 145, color: '50-54'},
        {name: 'Register product for kit\hair colorant kit', value: 225, color: '65-69'},
        {name: 'Register hair colorant product for kit', value: 300, color: '≥85'}
      ]
    },
    approve: {
      data: [
        {
          title: 'Notification',
          value: 1000,
        },
        {
          title: 'Re-Notification',
          value: 800,
        },
        {
          title: 'Tell & Do Variation',
          value: 600,
        },
        {
          title: 'Do & Tell Variation',
          value: 400,
        },
        {
          title: 'Do & Tell Variation',
          value: 200,
        },
        {
          title: 'Inspection',
          value: 100,
        },
        {
          title: 'Custom Release',
          value: 50,
        },
        {
          title: 'General Enquiries',
          value: 30,
        }
      ],
      pieData: [
        {name: 'Register Products', value: 25, color: '<5'},
        {name: 'Register Hair Colorant Product', value: 50, color: '20-24'},
        {name: 'Register Kit', value: 120, color: '35-39'},
        {name: 'Register Hair Colorant Kit', value: 145, color: '50-54'},
        {name: 'Register product for kit\hair colorant kit', value: 225, color: '65-69'},
        {name: 'Register hair colorant product for kit', value: 300, color: '≥85'}
      ]
    },
    reject: {
      data: [
        {
          title: 'Notification',
          value: 1000,
        },
        {
          title: 'Re-Notification',
          value: 800,
        },
        {
          title: 'Tell & Do Variation',
          value: 600,
        },
        {
          title: 'Do & Tell Variation',
          value: 400,
        },
        {
          title: 'Inspection',
          value: 100,
        },
        {
          title: 'Custom Release',
          value: 50,
        },
        {
          title: 'General Enquiries',
          value: 30,
        }
      ],
      pieData: [
        {name: 'Register Products', value: 25, color: '<5'},
        {name: 'Register Hair Colorant Product', value: 50, color: '20-24'},
        {name: 'Register Kit', value: 120, color: '35-39'},
        {name: 'Register Hair Colorant Kit', value: 145, color: '50-54'},
        {name: 'Register product for kit\hair colorant kit', value: 225, color: '65-69'},
        {name: 'Register hair colorant product for kit', value: 300, color: '≥85'}
      ]
    },
  };

  dataForBarChart;
  dataForPieCharts;

  constructor() {
  }

  ngOnInit(): void {
    this.numberOFAllRequestObject.map((x, i) => {
      this.counter(this.numberCount, 0, x.numberOfRequest, 5000, i);
    });

    this.selectCharts('track', 0);
  }

  counter(id, start, end, duration, index) {
    let countValue,
      current = start,
      range = end - start,
      increment = end > start ? 1 : -1,
      step = Math.abs(Math.floor(duration / range)),
      timer = setInterval(() => {
        current += increment;
        this.numberOFAllRequestObject[index].numberOfRequest = current;
        if (current == end) {
          clearInterval(timer);
        }
      }, step);

  }

  selectCharts(whichType, index) {
    this.numberOFAllRequestObject.map(request => request.active = false);

    this.numberOFAllRequestObject[index].active = true;

    this.dataForBarChart = this.dataObject[whichType].data;
    this.dataForPieCharts = this.dataObject[whichType].pieData;
  }
}
