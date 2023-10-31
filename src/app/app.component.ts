import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable } from '@angular/core';
import { DateModel } from './date.model';
import {NgbDatepickerModule,  NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatterService } from './custom-date-parser-formatter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatterService },
	],
})
export class AppComponent {

  placeholder: string = 'mm/dd/yyyy';
  isValidDate:boolean=true;
  model: DateModel = { value: '', visible: true };
  previousDate: DateModel = { value: '', visible: true };

  constructor( private cd: ChangeDetectorRef ) {}

  onBlur(event: any) {
    const date =  event?.target.value;
    this.isValidDate = this.validateDate(date);
    if(this.isValidDate){
      this.previousDate.value = this.model.value ?? '';
    }else{
      this.model.value = this.previousDate.value ?? '';
      this.isValidDate=true;
      this.cd.markForCheck();
    }
  }
  
  onKeypressEvent(){
    const value = this.model.value ?? '';
    this.isValidDate =this.validateDate(value);
  }

  dateSelectEvent(){
    this.previousDate.value = this.model.value ?? '';
  }
  
  private padNumber(value: number) {
    return (value < 10) ? `0${value}` : value.toString();
  }

  private validateDate(date: string): boolean {
    if (date ==''){ return false; }
    
    const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;//mm/dd/yyyy
    if(!datePattern.test(date)){ return false ;}

    const [month, day, year] = date.split('/').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    return (day > daysInMonth) ? false : true;
  }
}
