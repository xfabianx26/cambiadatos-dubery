import { Component } from '@angular/core';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css']

})
export class DropdownlistComponent {

  carInfo: any = {};

  constructor(private carService: MockService) {}

  ngOnInit(): void {
  }

  openCarModal(carId: string) {
    this.carService.getCarInfo(carId).subscribe(data => {
      this.carInfo = data;

    });
  }


}
