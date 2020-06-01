import { animate, group, state, style, transition, trigger } from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '250px', opacity: '1', visibility: 'visible', overflow: 'visible'
        })),
        state('out', style({
            'max-height': '0px', opacity: '0', visibility: 'hidden', overflow: 'hidden'
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                opacity: '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                visibility: 'hidden', overflow: 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                visibility: 'visible', overflow: 'hidden'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '250px'
            })),
            animate('800ms ease-in-out', style({
                opacity: '1'
            }))
        ]
        )])
    ]),
];
