import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatosBasicos } from '../interfaces/datos-basicos';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  getCarInfo(carId: string): Observable<DatosBasicos> {
    // simulando datos desde una API
    const carInfo = {
      plate: 'ABC123',
      year: '2020',
      color: 'Rojo',
      model: 'Sedan'
    };
    return of(carInfo);
  }


}
