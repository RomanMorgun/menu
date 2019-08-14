import { Ingredient } from './ingredient.model';

export class Dish {

  constructor(
    public id?: number,
    public name?: string,
    public price?: any,
    public description?: string,
    public weight?: number,
    public ingredients?: Ingredient[],
    public image?: string,
    public open?: boolean,
    public count?: number
    ) {}
}
