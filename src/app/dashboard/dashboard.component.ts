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
  private data = [
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
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() {
  }

  ngOnInit(): void {
    this.numberOFAllRequestObject.map((x, i) => {
      this.counter(this.numberCount, 0, x.numberOfRequest, 5000, i);
    });

    this.createSvg();
    this.drawBars(this.data);
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

  private createSvg(): void {
    this.svg = d3.select('svg')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.title))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 2000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.title))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.value))
      .attr('fill', '#d04a35');
  }
}
