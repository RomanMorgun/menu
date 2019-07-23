import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDishListDirective]'
})

export class DishListDirective {
  constructor() {
    // this.elementRef.nativeElement.style.background = 'black';
  }


  // @HostListener('touchmove') onSwipeFunc(event) {
  //   console.log(event);
  //   alert('test');
  //
  //   if (event.direction === 2) {
  //     alert('RTL swipe');
  //   } else if (event.direction === 4) {
  //     alert('LTR swipe');
  //   }
  // }


  // @HostListener('touchmove') onTouchMove() {
  //   console.log(event);
  //   alert('touchmove');
  // }

  @HostListener('click') onClickFunc() {
    console.log('click');
    console.log(event);

  }

}
