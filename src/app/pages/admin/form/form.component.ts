import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Models
import { Category } from 'src/app/models/category.model';
import { Manufacturer } from 'src/app/models/manufacturer.model';
import { Model } from 'src/app/models/model.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { YearFuel } from 'src/app/models/yearFuel.model';

// Services
import { VehiclesService } from 'src/app/services/vehicles.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public vehicle: Vehicle = new Vehicle();

  public categories: Category[] = [];
  public manufacturers: Manufacturer[] = [];
  public models: Model[] = [];
  public yearsFuels: YearFuel[] = [];

  public formVehicle: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vehiclesService: VehiclesService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private getParams() {
    this.route.params.subscribe((params: any) => {
      this.vehicle = params['vehicle'];
   });
  }

  private createForm() {
    this.formVehicle = this.formBuilder.group({
      category: '',
      manufacturer: '',
      model: '',
      yearFuel: '',
      weekdayNormal: '',
      weekenddayNormal: '',
      weekdayLoyalty: '',
      weekenddayLoyalty: ''
    });

    this.loadData();
  }

  private loadData() {
    this.utilsService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    this.utilsService.getManufacturers()
      .subscribe((manufacturers: Manufacturer[]) => {
        this.manufacturers = manufacturers;
      });

    this.loadForm();
  }

  private loadForm() {
    this.formVehicle.patchValue({
      category: this.vehicle.category,
      manufacturer: this.vehicle.manufacturer,
      model: this.setModel(),
      yearFuel: this.setYearFuel(),
      weekdayNormal: this.vehicle.weekdayNormal,
      weekenddayNormal: this.vehicle.weekenddayNormal,
      weekdayLoyalty: this.vehicle.weekdayLoyalty,
      weekenddayLoyalty: this.vehicle.weekenddayLoyalty
    });
  }

  private setModel() {
    if (
      (this.vehicle.manufacturer !== undefined && this.vehicle.manufacturer !== null)
      && (this.vehicle.model !== undefined && this.vehicle.model !== null)
    ) {
      this.getModels(this.vehicle.manufacturer.id);
      this.formVehicle.get('model').setValue(this.vehicle.model);
    }
  }

  private setYearFuel() {
    if (
      (this.vehicle.manufacturer !== undefined && this.vehicle.manufacturer !== null)
      && (this.vehicle.model !== undefined && this.vehicle.model !== null)
      && (this.vehicle.yearFuel !== undefined && this.vehicle.yearFuel !== null)
    ) {
      this.getYearsAndFuels(this.vehicle.manufacturer.id, this.vehicle.model.id);
      this.formVehicle.get('yearFuel').setValue(this.vehicle.yearFuel);
    }
  }

  public getModelsByForm(event: any) {
    if (this.formVehicle.get('manufacturer').value !== null) {
      this.getModels(this.formVehicle.get('manufacturer').value);
    }
  }

  public getYearsAndFuelsByForm(event: any) {
    if (
      this.formVehicle.get('manufacturer').value !== null
      && this.formVehicle.get('model').value !== null
    ) {
      this.getYearsAndFuels(this.formVehicle.get('manufacturer').value, this.formVehicle.get('model').value);
    }
  }

  private getModels(manufacturerId: string) {
    this.utilsService.getModels(manufacturerId)
      .subscribe((models: Model[]) => {
        this.models = models;
      });
  }

  private getYearsAndFuels(manufacturerId: string, modelId: string) {
    this.utilsService.getYearsAndFuels(manufacturerId, modelId)
      .subscribe((yearsFuels: YearFuel[]) => {
        this.yearsFuels = yearsFuels;
      });
  }

  public onSubmit() {
    this.captureVehicle();

    if ( this.vehicle.id !== undefined && this.vehicle.id !== null && this.vehicle.id !== '' ) {
      this.vehiclesService.put(this.vehicle)
        .subscribe((action: boolean) => {
          if (action) {
            alert(`O veículo ${this.vehicle.manufacturer.name} ${this.vehicle.model.name} foi alterado com sucesso!`);
            this.router.navigate(['/admin']);
          } else {
            alert(`Não foi possível alterar o veículo ${this.vehicle.manufacturer.name} ${this.vehicle.model.name}!`);
          }
        });
    } else {
      this.vehiclesService.post(this.vehicle)
        .subscribe((action: boolean) => {
          if (action) {
            alert(`O veículo ${this.vehicle.manufacturer.name} ${this.vehicle.model.name} foi adicionado com sucesso!`);
            this.router.navigate(['/admin']);
          } else {
            alert(`Não foi possível adicionar o veículo ${this.vehicle.manufacturer.name} ${this.vehicle.model.name}!`);
          }
        });
    }
  }

  private captureVehicle() {
    this.vehicle.category = this.categories.find((category: Category) => category.id == this.formVehicle.get('category').value);
    this.vehicle.manufacturer = this.manufacturers.find((manufacturer: Manufacturer) => manufacturer.id == this.formVehicle.get('manufacturer').value);
    this.vehicle.model = this.models.find((model: Model) => model.id == this.formVehicle.get('model').value);
    this.vehicle.yearFuel = this.yearsFuels.find((yearFuel: YearFuel) => yearFuel.id == this.formVehicle.get('yearFuel').value);
    this.vehicle.weekdayNormal = this.formVehicle.get('weekdayNormal').value;
    this.vehicle.weekenddayNormal = this.formVehicle.get('weekenddayNormal').value;
    this.vehicle.weekdayLoyalty = this.formVehicle.get('weekdayLoyalty').value;
    this.vehicle.weekenddayLoyalty = this.formVehicle.get('weekenddayLoyalty').value;
  }

}
