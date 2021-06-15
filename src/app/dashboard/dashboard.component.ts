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
  private pieData = [
    {name: 'Register Products', value: 25, color: '<5'},
    {name: 'Register Hair Colorant Product', value: 50, color: '20-24'},
    {name: 'Register Kit', value: 120, color: '35-39'},
    {name: 'Register Hair Colorant Kit', value: 145, color: '50-54'},
    {name: 'Register product for kit\hair colorant kit', value: 225, color: '65-69'},
    {name: 'Register hair colorant product for kit', value: 300, color: '≥85'}
  ];
  private svg;
  private margin = 50;
  private width = 1250 - (this.margin * 2);
  private height = 450 - (this.margin * 2);

  private svgPie;
  private marginPie = 50;
  private widthPie = 600 - (this.margin * 2);
  private heightPie = 450 - (this.margin * 2);

  constructor() {
  }

  ngOnInit(): void {
    this.numberOFAllRequestObject.map((x, i) => {
      this.counter(this.numberCount, 0, x.numberOfRequest, 5000, i);
    });

    this.drawBars(this.data);
    this.drawPieChart(this.pieData);
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

  private drawBars(data: any[]): void {
    this.svg = d3.select('svg#chart')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')
      .attr('font-size', '14px');

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
      .attr('transform', '')
      .attr('font-size', '14px');

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
      .attr('fill', '#c28a30');
  }

  private drawPieChart(data: any[]): void {

    this.svgPie = d3.select('#containerPieChart')
      .append('svg')
      .attr('width', this.widthPie)
      .attr('height', this.heightPie)
      .append('g')
      .attr('transform', 'translate(' + this.widthPie / 2 + ',' + this.heightPie / 2 + ')');

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(this.widthPie, this.heightPie) / 2 - 1);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const pie = d3.pie()
      .value(d => d.value);

    const arcs = pie(data);

    const radius = Math.min(this.widthPie, this.heightPie) / (2 * 0.8);

    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    this.svgPie.append('g')
      .attr('stroke', 'white')
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('fill', d => color(d.data.color))
      .attr('d', arc)
      .append('title')
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    this.pieData.map(x => {
      x.color = color(x.color);
    });
  }
}
