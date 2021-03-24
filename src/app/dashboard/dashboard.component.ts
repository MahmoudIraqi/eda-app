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
      title: 'Track Request',
      value: 200,
    },
    {
      title: 'Draft Request',
      value: 200,
    },
    {
      title: 'Approved Request',
      value: 200,
    },
    {
      title: 'Rejected Request',
      value: 200,
    }
  ];
  private svg;
  private margin = {top: 20, right: 0, bottom: 30, left: 40};
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
    this.svg = d3.create('svg')
      .attr('viewBox', [0, 0, this.width, this.height]);
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.title))
      .padding(0.2);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)]).nice()
      .range([this.height - this.margin.bottom, this.margin.top]);

    // Draw the Y-axis on the DOM
    const xAxis = g => g
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select('.domain').remove());

    const gx = this.svg.append('g')
      .call(xAxis);

    const gy = this.svg.append('g')
      .call(yAxis);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.title))
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value))
      .attr('width', x.bandwidth());

    // Create and fill the bars
    x.domain(data.sort(this.svg.node()).map(d => d.title));

    const t = this.svg.transition()
      .duration(750);

    bar.data(data, d => d.title)
      .order()
      .transition(t)
      .delay((d, i) => i * 20)
      .attr('x', d => x(d.title));

    gx.transition(t)
      .call(xAxis)
      .selectAll('.tick')
      .delay((d, i) => i * 20);
  }
}
