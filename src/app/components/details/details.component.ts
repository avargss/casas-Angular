import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../service/housing.service';
import { HousingLocation } from '../../model/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../service/formulario.service';
import { Cliente } from '../../model/cliente';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {

  client!: Cliente;

  route: ActivatedRoute = inject(ActivatedRoute);
  
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    if (this.applyForm.valid) {
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
      );
    } else {
      console.log('Form is invalid');
    }
  }

  crearCliente() {
    return {
      id: Number(new Date()),
      firstName: this.applyForm.value.firstName || '',
      lastName: this.applyForm.value.lastName || '',
      email: this.applyForm.value.email || '',
    };
  }

  guardarCliente() {
    this.client = this.crearCliente();
  }
}