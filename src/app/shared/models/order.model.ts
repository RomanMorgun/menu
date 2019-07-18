import { Dish } from './dish.model';

export class Order {

  constructor(
    public cafeId: number,
    public dishes: Dish[],
    public totalPrice: number,
    public id?: number,
  ) {}

}
