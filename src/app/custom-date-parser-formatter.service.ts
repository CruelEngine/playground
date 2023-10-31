import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CustomDateParserFormatterService {
  readonly DELIMITER = '/';
	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
        month: parseInt(date[1], 10),
				day: parseInt(date[0], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

	format(date: NgbDateStruct | null): string {
    if(date){
      return `${this.padNumber(date.month)}${this.DELIMITER}${this.padNumber(date.day)}${this.DELIMITER}${date.year}`; 
    }
    if(date == null){
    }
    
    return '';
		//return (date) ?`${this.padNumber(date.month)}${this.DELIMITER}${this.padNumber(date.day)}${this.DELIMITER}${date.year}`:'';
	}

  private padNumber(value: number) {
    return (value < 10) ? `0${value}` : value.toString();
  }
}
