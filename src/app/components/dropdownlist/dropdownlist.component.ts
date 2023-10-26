import { Component, ViewChild, ElementRef } from '@angular/core';
import { Car } from 'src/app/interfaces/car.model';
import { MockService } from 'src/app/services/mock.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css']

})
export class DropdownlistComponent {


  @ViewChild('closeButton') closeButton!: ElementRef;

  models: string[] = [];
  cars: Car[] = [];
  selectedCar: Car | null = null;
  selectedModel: string = '';
  public plateNotFound: boolean = false;
  public isEditing: boolean = false;


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
  const index = this.cars.findIndex(c => c.plateNumber === car.plateNumber);

  if (index !== -1) {
    this.cars[index] = car;
    Swal.fire({
      title: 'Éxito!',
      text: 'Coche editado con éxito.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.closeButton.nativeElement.click();
      }
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'No se pudo encontrar el coche para editar.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}






}


