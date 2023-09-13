import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { Category } from 'src/app/models/category.model';
import { Vehicle } from 'src/app/models/vehicle.model';

// Services
import { VehiclesService } from 'src/app/services/vehicles.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  public categories: Category[] = [];
  public vehicles: Vehicle[] = [];

  constructor(
    private router: Router,
    private vehiclesService: VehiclesService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.utilsService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    this.getVehicles();
  }

  private getVehicles(categoryId?: string) {
    this.vehiclesService.getAll(categoryId)
      .subscribe((vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
      });
  }

  public getVehiclesByCategory(event: any) {
    const categoryId: string = event.target.value;
    this.getVehicles(categoryId);
  }

  public confirmEdit(vehicle: Vehicle) {
    if (confirm(`Deseja confirmar a alteração do veículo ${vehicle.manufacturer.name} ${vehicle.model.name}?`)) {
      this.edit(vehicle);
    }
  }

  private edit(vehicle: Vehicle) {
    this.router.navigate(['/admin/form', { vehicle }]);
  }

  public confirmDelete(vehicle: Vehicle) {
    if (confirm(`Deseja confirmar a remoção do veículo ${vehicle.manufacturer.name} ${vehicle.model.name}?`)) {
      this.delete(vehicle);
    }
  }

  private delete(vehicle: Vehicle) {
    this.vehiclesService.delete(vehicle)
      .subscribe((action: boolean) => {
        if (action) {
          this.vehicles.splice(this.vehicles.indexOf(vehicle), 1);
        } else {
          alert(`Não foi possível remover o veículo ${vehicle.manufacturer.name} ${vehicle.model.name}!`);
        }
      });
  }

}
