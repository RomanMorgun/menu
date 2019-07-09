import { Dish } from './dish.model';

export class Order {

  constructor(
    private id: number,
    private cafeId: number,
    public dishes: Dish[],
    public totalPrice: number
  ) {}

}
