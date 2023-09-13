import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Models
import { Result } from 'src/app/models/result.model';
import { Search } from 'src/app/models/search.model';
import { Vehicle } from 'src/app/models/vehicle.model';

// Service
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public search: Search = new Search();

  public formSearch: FormGroup;

  public result: Result;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formSearch = this.formBuilder.group({
      initialDate: '',
      endDate: '',
      email: ''
    });
  }

  public onSubmit() {
    this.search = this.formSearch.getRawValue();
    this.rentalService.search(this.search)
      .subscribe((result: Result) => {
        this.result = result;
      });
  }

  public confirmRegister(vehicle: Vehicle) {
    if (confirm(`Deseja confirmar o aluguel do ${vehicle.manufacturer.name} ${vehicle.model.name}, entre os dias ${this.search.initialDate.toString()} à ${this.search.initialDate.toString()}?`)) {
      this.register(vehicle);
    }
  }

  private register(vehicle: Vehicle) {
    this.rentalService.register(this.search, vehicle)
      .subscribe((action: boolean) => {
        if (action) {
          alert(`O veículo ${vehicle.manufacturer.name} ${vehicle.model.name} foi alugado com sucesso!`);
        } else {
          alert(`Não foi possível alugar o veículo ${vehicle.manufacturer.name} ${vehicle.model.name}!`);
        }
      });
  }

}
