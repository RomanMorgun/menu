export class Cafe {

  constructor(
    public id: number,
    public name: string,
    public logo: string,
    public position: {
      lat: any;
      lng: any;
    },
    public address: string,
    public workTime: any,
    public telephone: string,
    public menuId: number

  ) {}
  // public menuId: number
}
