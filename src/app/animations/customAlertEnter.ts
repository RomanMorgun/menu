import { Animation } from '@ionic/core';

export function customModalEnter(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();
    console.log('animation');
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation.beforeStyles({ opacity: 1 })
        .fromTo('translateY', `1000px`, '70%');

    backdropAnimation.fromTo('translateY', `1000px`, '10%');

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(800)
        .beforeAddClass('show-modal')
        .add(backdropAnimation)
        .add(wrapperAnimation));
}


export function myLeaveAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const wrapperElRect = wrapperEl!.getBoundingClientRect();

    wrapperAnimation.beforeStyles({ opacity: 1 })
        .fromTo('translateY', '75%', '1000px');

    backdropAnimation.fromTo('opacity', 0.0, 0.0);

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('ease-out')
        .duration(600)
        .add(backdropAnimation)
        .add(wrapperAnimation));

}

export function customAlertLive(AnimationL: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationL();

    const backdropAnimation = new AnimationL();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationL();
    const wrapperElemLive = baseEl.querySelector('.alert-wrapper') as HTMLElement;
    wrapperAnimation.addElement(wrapperElemLive);

    wrapperElemLive.style.top = '0';

    backdropAnimation.fromTo('opacity', 0.01, 0.3);

    wrapperAnimation.beforeStyles({ opacity: 1 });
    wrapperAnimation.fromTo('transform', `translateY(-100px)`, 'translateY(-200px)');

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36, .66, .3, .1, 1)')
        .duration(500)
        .add(wrapperAnimation)
        .add(backdropAnimation));
}


export function customAlertEnter(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = new AnimationC();
    const wrapperElem = baseEl.querySelector('.alert-wrapper') as HTMLElement;
    wrapperAnimation.addElement(wrapperElem);

    wrapperElem.style.top = '0';

    backdropAnimation.fromTo('opacity', 0.01, 0.3);

    wrapperAnimation.beforeStyles({ opacity: 1 });
    wrapperAnimation.fromTo('transform', `translateY(${baseEl.clientHeight}px)`, 'translateY(-200px)');

    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36, .66, .3, .1, 1)')
        .duration(500)
        .add(wrapperAnimation)
        .add(backdropAnimation));
}
