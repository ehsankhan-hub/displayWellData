import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateCanvasTracksComponent, TrackInfo, TrackCurve } from '../../components/generate-canvas-tracks/generate-canvas-tracks.component';
import { ITracks } from '../../models/tracks.model';
import { LogHeadersService } from '../../services/log-headers.service';

/**
 * Component for displaying MWD Time-based well log data.
 * Uses the same data source as depth-based but displays with time index type.
 * 
 * @remarks
 * This component serves as a time-based template that:
 * - Provides MWD track configurations for time-based display
 * - Passes indexType='time' to the canvas tracks renderer
 * - Uses the same db.json data but interprets index as time
 */
@Component({
  selector: 'app-mwd-time',
  standalone: true,
  imports: [CommonModule, GenerateCanvasTracksComponent],
  providers: [LogHeadersService],
  template: `
    <app-generate-canvas-tracks 
      [listOfTracks]="combinedTracks"
      [well]="well"
      [wellbore]="wellbore"
      [indexType]="'time'">
    </app-generate-canvas-tracks>
  `,
  styles: [`:host { display: block; width: 100%; height: 100%; }`]
})
export class MwdTimeComponent implements OnInit {
  /** Unique identifier for the well */
  @Input() well: string = '';
  /** Unique identifier for the wellbore */
  @Input() wellbore: string = '';

  /** Combined track configurations in TrackInfo format */
  combinedTracks: TrackInfo[] = [];

  ngOnInit(): void {
    console.log('🕐 MWD Time Component initialized');
    this.initializeTracks();
  }

  private initializeTracks(): void {
    this.combinedTracks = [
      {
        trackNo: 1,
        trackName: 'MWD Gamma Ray (Time)',
        trackType: 'Linear',
        trackWidth: 100,
        isIndex: false,
        isDepth: false,
        curves: [
          {
            mnemonicId: 'GR',
            displayName: 'Gamma Ray',
            color: '#E74C3C',
            lineStyle: 'solid',
            lineWidth: 2,
            min: 0,
            max: 150,
            autoScale: false,
            show: true,
            LogId: 'MWD_Time_SLB',
            data: [],
            mnemonicLst: []
          }
        ]
      },
      {
        trackNo: 2,
        trackName: 'MWD Resistivity (Time)',
        trackType: 'Linear',
        trackWidth: 100,
        isIndex: false,
        isDepth: false,
        curves: [
          {
            mnemonicId: 'RT',
            displayName: 'Resistivity',
            color: '#2ECC71',
            lineStyle: 'solid',
            lineWidth: 2,
            min: 0.1,
            max: 100,
            autoScale: false,
            show: true,
            LogId: 'MWD_Time_SLB',
            data: [],
            mnemonicLst: []
          }
        ]
      },
      {
        trackNo: 3,
        trackName: 'Bulk Density (Time)',
        trackType: 'Linear',
        trackWidth: 100,
        isIndex: false,
        isDepth: false,
        curves: [
          {
            mnemonicId: 'RHOB',
            displayName: 'Bulk Density',
            color: '#3498DB',
            lineStyle: 'solid',
            lineWidth: 2,
            min: 2.0,
            max: 3.0,
            autoScale: false,
            show: true,
            LogId: 'MWD_Time_SLB',
            data: [],
            mnemonicLst: []
          }
        ]
      },
      {
        trackNo: 4,
        trackName: 'PEF (Time)',
        trackType: 'Linear',
        trackWidth: 100,
        isIndex: false,
        isDepth: false,
        curves: [
          {
            mnemonicId: 'PEF',
            displayName: 'Photoelectric Factor',
            color: '#9B59B6',
            lineStyle: 'solid',
            lineWidth: 2,
            min: 0,
            max: 10,
            autoScale: false,
            show: true,
            LogId: 'MWD_Time_SLB',
            data: [],
            mnemonicLst: []
          }
        ]
      }
    ];

    console.log('🕐 MWD Time tracks initialized:', this.combinedTracks);
  }
}
