import { Category } from './category.model';
import { Manufacturer } from './manufacturer.model';
import { Model } from './model.model';
import { YearFuel } from './yearFuel.model';

export class Vehicle {
    id: string;
    category: Category;
    manufacturer: Manufacturer;
    model: Model;
    yearFuel: YearFuel;
    weekdayNormal?: number;
    weekenddayNormal?: number;
    weekdayLoyalty?: number;
    weekenddayLoyalty?: number;
    totalNormal?: number;
    totalLoyalty?: number;
}