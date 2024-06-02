import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClusterStudentsService} from "../../services/cluster-students.service";
import {ActivatedRoute} from "@angular/router";
import {GetStudentMembershipValues} from "../../models/GetStudentMembershipValues";
interface LegendEntry {
  label: string;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements  OnChanges {
  @Input() studentId: number = -1;
  @Input() studentEmail: string = '';
  @Input() chartId: string = '';
  private percentages: number[] = [];

  private labels = ["Cluster 0", "Cluster 1", "Cluster 2", "Cluster 3", "Cluster 4"];
  private colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  legendData: LegendEntry[] = [];

  constructor(
    private clusterStudentService: ClusterStudentsService,
    private route: ActivatedRoute
  ) { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentId']) {
      this.getMembershipData();
    }
  }


  private getMembershipData(): void {
    if (this.studentId === -1) return;
    this.clusterStudentService.getMembershipValues(this.studentId).subscribe({
      next: (data) => {
        this.percentages = [
          Math.round(data.cluster0 * 100),
          Math.round(data.cluster1 * 100),
          Math.round(data.cluster2 * 100),
          Math.round(data.cluster3 * 100),
          Math.round(data.cluster4 * 100)
        ];
        console.log(this.percentages);
        this.drawPieChart();
        this.generateLegendData();
      },
      error: (err) => console.error('Error fetching membership values', err)
    });
  }

  private drawPieChart(): void {
    const canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Unable to get canvas context');
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);
    let startAngle = 0;

    this.percentages.forEach((percentage, index) => {
      const sliceAngle = (percentage / 100) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = this.colors[index];
      ctx.fill();

      startAngle = endAngle;
    });
  }

  private generateLegendData(): void {
    this.legendData = this.percentages.map((percentage, index) => ({
      label: this.labels[index],
      percentage,
      color: this.colors[index]
    }));
  }
}
