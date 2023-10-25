import { Component } from '@angular/core';
import { Car } from 'src/app/interfaces/car.model';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css']

})
export class DropdownlistComponent {

  cars: Car[] = [];
  selectedCar: Car | null = null;

  constructor(private carService: MockService) {}

  ngOnInit(): void {
    this.getSelection()
  }


  getSelection(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('Error al cargar los datos:', error);
      }
    });
  }
}
