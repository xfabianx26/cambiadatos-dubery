import { Component } from '@angular/core';
import { Car } from 'src/app/interfaces/car.model';
import { MockService } from 'src/app/services/mock.service';

@Component({
  selector: 'dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css']

})
export class DropdownlistComponent {

  models: string[] = [];
  cars: Car[] = [];
  selectedCar: Car | null = null;
  selectedModel: string = '';
  public plateNotFound: boolean = false;

  constructor(private carService: MockService) {}

  ngOnInit(): void {
    this.getModel()
  }


  getModel(): void {
    this.carService.getCars().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
        this.models = data.map(car => car.model);
      },
      error: (error: any) => {
        console.error('Error al cargar los datos:', error);
      }
    });

}

onModelChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  if (selectElement) {
    this.selectedModel = selectElement.value;
  }
}


searchCarByPlate(plate: string): void {
  this.plateNotFound = false; // Restablecer el estado
  if (plate.trim() === '') {
    this.selectedCar = null;
  } else {
    this.selectedCar = this.cars.find(car => car.plateNumber === plate) || null;
    if (this.selectedCar === null) {
      this.plateNotFound = true;
    }
  }
}





editCar(car: Car): void {
/*   const index = this.cars.findIndex(c => c.plateNumber === car.plateNumber);
  if (index !== -1) {
    // Actualiza el coche. Esto es solo un ejemplo; puedes reemplazarlo con lógica más compleja si es necesario.
    this.cars[index] = car;
  } */
}


deleteCar(car: Car): void {
/*   const index = this.cars.findIndex(c => c.plateNumber === car.plateNumber);
  if (index !== -1) {
    this.cars.splice(index, 1);
  } */
}

}
