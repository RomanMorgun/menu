import { Dish } from './dish.model';

export class Category {


  constructor(
    public id: number,
    public name: string,
    public dishes?: Dish[]) {}

}

