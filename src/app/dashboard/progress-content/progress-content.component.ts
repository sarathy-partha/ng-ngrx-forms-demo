import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-progress-content',
  templateUrl: './progress-content.component.html',
  styleUrls: ['./progress-content.component.scss']
})
export class ProgressContentComponent implements OnInit {
  outlineText: String;
  @Input() percent: number;

  @ViewChild('Progress') canvasRef: ElementRef;
  @ViewChild('progressPercent') progressPercent: ElementRef;

  constructor() {}

  ngOnInit() {
    this.showProgressContent(this.percent);
  }

  showProgressContent(percent) {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    this.outlineText = 'Text';
    let i = 0; // use it for Amount loaded
    const start = 4.72; //From where to start position of progress;
    const cw = ctx.canvas.width / 2; //to get x cordinate;
    const ch = ctx.canvas.height / 2; // to get y coordinate;
    let diff;

    if (percent <= 50) this.progressPercent.nativeElement.className = 'red percent';
    else this.progressPercent.nativeElement.className = 'green percent';
    const bar = setInterval(progressBar, 0);

    function progressBar() {
      // Draw the clip path that will mask everything else
      // that we'll draw later.
      diff = i / 100 * Math.PI * 2;
      ctx.clearRect(0, 0, 200, 200);
      ctx.beginPath();
      ctx.arc(cw, ch, 70, 0, 2 * Math.PI, false);

      ctx.fillStyle = '#FFF'; // for color of circle
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fill(); // fill function
      ctx.strokeStyle = '#c3c3c3'; // for border color
      ctx.stroke(); // Stroke function

      if (percent <= 50) {
        ctx.strokeStyle = '#ff0000';
      } else ctx.strokeStyle = '#00bb11';
      ctx.textAlign = 'center'; //you know already for aligning text in center;
      ctx.lineWidth = 10; // for Stroke width
      ctx.font = '10pt Verdana'; // for font specifying
      ctx.beginPath(); // starting circle drawing function

      ctx.arc(cw, ch, 70, start, diff + start, false);

      ctx.stroke();

      ctx.beginPath();

      if (i >= percent) {
        clearTimeout(bar);
      }

      i++; // increment the rate

      //calculated rate level to increase progress bar.
    }
    //var bar = progressBar(this.percent);
  }
}
