import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export interface PrintPropertiesData {
  /** Whether the template is depth-based or time-based */
  indexType: 'depth' | 'time';
  /** Current min depth/time of the data */
  dataMin: number;
  /** Current max depth/time of the data */
  dataMax: number;
  /** Current visible min */
  visibleMin: number;
  /** Current visible max */
  visibleMax: number;
  /** Current scale value */
  currentScale: number;
  /** Available scale options */
  scaleOptions: { label: string; value: number }[];
}

export interface PrintPropertiesResult {
  /** Print range mode: 'visible', 'all', 'range' */
  printRange: 'visible' | 'all' | 'range';
  /** Range from value (depth number or time Date) */
  rangeFrom: number | Date;
  /** Range to value (depth number or time Date) */
  rangeTo: number | Date;
  /** Selected scale value */
  scale: number;
  /** Whether to use single page scale */
  useSinglePageScale: boolean;
  /** Whether to print */
  print: boolean;
  /** Header option: 'topAndBottom', 'top', 'bottom', 'none' */
  headerOption: string;
  /** Whether to show page number */
  showPageNumber: boolean;
  /** Whether to show print range on output */
  showPrintRange: boolean;
  /** Whether to use 2" log format */
  use2InchLog: boolean;
}

@Component({
  selector: 'app-print-properties-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <h2 mat-dialog-title>Print Properties</h2>
    <p class="note-text">Note: If printing more than few hours of data, it is recommended to use 64 bit application process.</p>

    <mat-dialog-content>
      <!-- Print Range Section -->
      <div class="section">
        <div class="section-title">Print Range</div>
        <mat-radio-group [(ngModel)]="printRange" class="radio-group">
          <mat-radio-button value="visible">Visible range</mat-radio-button>
          <mat-radio-button value="all">All</mat-radio-button>
          <mat-radio-button value="range">Range</mat-radio-button>
        </mat-radio-group>

        <!-- Depth-based From/To -->
        <div class="range-fields" *ngIf="printRange === 'range' && data.indexType === 'depth'">
          <div class="range-row">
            <label>from</label>
            <input type="number" [(ngModel)]="rangeFromDepth" [min]="data.dataMin" [max]="data.dataMax" class="range-input" />
            <label>FT to</label>
            <input type="number" [(ngModel)]="rangeToDepth" [min]="data.dataMin" [max]="data.dataMax" class="range-input" />
            <label>FT</label>
          </div>
          <div class="range-row muted">
            <span>min: {{ data.dataMin | number:'1.2-2' }}</span>
            <span>max: {{ data.dataMax | number:'1.2-2' }}</span>
          </div>
        </div>

        <!-- Time-based From/To -->
        <div class="range-fields" *ngIf="printRange === 'range' && data.indexType === 'time'">
          <div class="range-row">
            <label>from</label>
            <input type="datetime-local" [(ngModel)]="rangeFromDate" class="range-input date-input" />
            <label>to</label>
            <input type="datetime-local" [(ngModel)]="rangeToDate" class="range-input date-input" />
          </div>
        </div>
      </div>

      <!-- Scale Section -->
      <div class="section">
        <div class="row-inline">
          <label class="field-label">Scale</label>
          <select [(ngModel)]="selectedScale" class="scale-select">
            <option *ngFor="let opt of data.scaleOptions" [value]="opt.value">{{ opt.label }}</option>
          </select>
          <mat-checkbox [(ngModel)]="use2InchLog" class="checkbox-inline">2" Log</mat-checkbox>
        </div>
        <mat-checkbox [(ngModel)]="useSinglePageScale">Use single page scale</mat-checkbox>
      </div>

      <!-- Print Options Section -->
      <div class="section">
        <mat-checkbox [(ngModel)]="doPrint">Print</mat-checkbox>
      </div>

      <!-- Header Section -->
      <div class="section">
        <div class="row-inline">
          <label class="field-label">Header</label>
          <select [(ngModel)]="headerOption" class="header-select">
            <option value="topAndBottom">Top and Bottom</option>
            <option value="top">Top only</option>
            <option value="bottom">Bottom only</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <!-- Location Section -->
      <div class="section">
        <div class="row-inline">
          <label class="field-label">Location</label>
          <select [(ngModel)]="headerOption" class="header-select" disabled>
            <option value="topAndBottom">Top and Bottom</option>
          </select>
        </div>
      </div>

      <!-- All Radio -->
      <div class="section">
        <mat-radio-group [(ngModel)]="allRadio">
          <mat-radio-button value="all">All</mat-radio-button>
        </mat-radio-group>
      </div>

      <!-- Checkboxes -->
      <div class="section checkboxes-right">
        <mat-checkbox [(ngModel)]="showPageNumber">Show page number</mat-checkbox>
        <mat-checkbox [(ngModel)]="showPrintRange">Show print range</mat-checkbox>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="onOk()">OK</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 13px; }
    h2[mat-dialog-title] { margin: 0; padding: 12px 16px; font-size: 15px; font-weight: 600; border-bottom: 1px solid #ddd; }
    .note-text { font-size: 11px; color: #888; padding: 4px 16px 0 16px; margin: 0; font-style: italic; }
    mat-dialog-content { padding: 12px 16px; max-height: 65vh; }
    .section { margin-bottom: 12px; }
    .section-title { font-weight: 600; margin-bottom: 6px; color: #333; }
    .radio-group { display: flex; flex-direction: column; gap: 4px; }
    .radio-group mat-radio-button { font-size: 13px; }
    .range-fields { margin-top: 8px; margin-left: 24px; }
    .range-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .range-row label { font-size: 12px; color: #555; white-space: nowrap; }
    .range-input { width: 120px; padding: 4px 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 12px; }
    .date-input { width: 180px; }
    .muted { font-size: 11px; color: #999; }
    .muted span { margin-right: 24px; }
    .row-inline { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .field-label { font-weight: 500; color: #333; min-width: 60px; }
    .scale-select, .header-select { padding: 4px 8px; border: 1px solid #ccc; border-radius: 3px; font-size: 13px; min-width: 120px; }
    .checkbox-inline { margin-left: 12px; }
    .checkboxes-right { display: flex; flex-direction: column; gap: 4px; }
    mat-dialog-actions { padding: 8px 16px; border-top: 1px solid #ddd; }
    mat-dialog-actions button { min-width: 80px; }
  `]
})
export class PrintPropertiesDialogComponent implements OnInit {
  printRange: 'visible' | 'all' | 'range' = 'visible';
  rangeFromDepth: number = 0;
  rangeToDepth: number = 0;
  rangeFromDate: string = '';
  rangeToDate: string = '';
  selectedScale: number = 1000;
  useSinglePageScale: boolean = false;
  use2InchLog: boolean = false;
  doPrint: boolean = false;
  headerOption: string = 'topAndBottom';
  showPageNumber: boolean = false;
  showPrintRange: boolean = false;
  allRadio: string = '';

  constructor(
    public dialogRef: MatDialogRef<PrintPropertiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrintPropertiesData
  ) {}

  ngOnInit(): void {
    this.rangeFromDepth = this.data.dataMin;
    this.rangeToDepth = this.data.dataMax;
    this.selectedScale = this.data.currentScale;

    if (this.data.indexType === 'time') {
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      this.rangeFromDate = this.formatDateForInput(dayAgo);
      this.rangeToDate = this.formatDateForInput(now);
    }
  }

  private formatDateForInput(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onOk(): void {
    const result: PrintPropertiesResult = {
      printRange: this.printRange,
      rangeFrom: this.data.indexType === 'depth' ? this.rangeFromDepth : new Date(this.rangeFromDate),
      rangeTo: this.data.indexType === 'depth' ? this.rangeToDepth : new Date(this.rangeToDate),
      scale: Number(this.selectedScale),
      useSinglePageScale: this.useSinglePageScale,
      print: this.doPrint,
      headerOption: this.headerOption,
      showPageNumber: this.showPageNumber,
      showPrintRange: this.showPrintRange,
      use2InchLog: this.use2InchLog,
    };
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
