import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
  stagger,
  animation
} from '@angular/animations';

export const routerTransitionFading = trigger('routerTransitionFading', [
  transition('* => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':enter', [
        animate(
          '400ms ease-in',
          style({
            opacity: 1
          })
        )
      ], { optional: true }),
      query(':leave', [
        animate(
          '400ms ease-out',
          style({
            opacity: 0
          })
        )
      ], { optional: true })
    ])
  ])
]);

export const routerTransitionFadingStagger = animation([
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: '{{ position }}',
      left: 0,
      right: 0,
      opacity: 0
    })
  ], { optional: true }),
  query('.animatedElement', style({ opacity: 0 }), { optional: true }),
  group([
    query(':enter', [
      animate(
        '100ms ease-in',
        style({
          opacity: 1,
          position: 'relative'
        })
      )
    ], { optional: true }),
    query(':leave', [
      animate(
        '100ms ease-out',
        style({
          opacity: 0
        })
      )
    ], { optional: true }),
  ]),
  query(':enter .animatedElement', stagger(400, [
    style({ transform: 'translateY(20px)' }),
    animate('300ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
  ]), { optional: true })
]);

export const routerTransitionSlide = trigger('routerTransitionSlide', [
  transition('episode0 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode0', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode1 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode1', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode2 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode2', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode3 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode3', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode4 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode4', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode5 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode5', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('result => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(-150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => result', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateX(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateX(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateX(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateX(-150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateX(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
]);

export const routerTransitionSlideUpDown = trigger('routerTransitionSlideUpDown', [
  transition('episode0 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode0', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode1 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode1', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode2 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode2', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode3 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode3', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode4 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode4', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('episode5 => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => episode5', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('result => *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)',
        opacity: 0
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)',
            opacity: 0
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)',
            opacity: 1
          })
        )
      ], { optional: true })
    ])
  ]),
  transition('* => result', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        transform: 'translateY(0)'
      })
    ], { optional: true }),
    group([
      query(':leave', [
        style({ transform: 'translateY(0)' }),
        animate(
          '500ms ease-out',
          style({
            transform: 'translateY(150%)'
          })
        )
      ], { optional: true }),
      query(':enter', [
        style({ transform: 'translateY(150%)' }),
        animate(
          '500ms ease-in',
          style({
            transform: 'translateY(0)'
          })
        )
      ], { optional: true })
    ])
  ]),
]);
