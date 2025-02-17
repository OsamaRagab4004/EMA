import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent
} from 'ng-apexcharts';
import {FireStorageService} from "../../services/fire-storage.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {ActivatedRoute} from "@angular/router";
import {LoginFirebaseService} from "../../services/login-firebase.service";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};



@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit{
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

score:number=0;
textLabel:string="Test Text";
correctList = [];
correct = 0;
  constructor(private local: LocalStorageService, private router: ActivatedRoute, private auth: LoginFirebaseService, private db: FireStorageService) {
    this.chartOptions = {
      series: [this.score],
      chart: {
        height: 400,
        width:400,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%"
          }
        }
      },
      labels: [this.textLabel]
    };
  }


  ngOnInit() {
    this.correctList = this.local.getCorrectList();
    this.correct = 0;
    this.correctList.forEach(value => {
      if(value) {
        this.correct++;
      }
    });
    this.score = (this.correct/this.correctList.length) * 100;
    this.chartOptions = {...this.chartOptions, series: [Number(this.score.toFixed(2))]};
  }
  ionViewWillEnter(){
    const id = this.router.snapshot.params.id;
    if(this.router.snapshot.params.mode === 'learn'){
      this.db.updatePackageReference(this.auth.uid, id, 0, 'learn');
    } else {
      this.db.updatePackageReference(this.auth.uid, id, this.score, 'exam');
    }
    console.log();
  }
}
