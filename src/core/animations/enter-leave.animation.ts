import {Injectable} from '@angular/core';
import {trigger, state, style, transition, animate} from "@angular/animations";

@Injectable()
export class EnterLeaveAnimation {
  private static animationKey = "enterLeave";

  public static getKey(): string{
    return EnterLeaveAnimation.animationKey;
  }

  public static getHostKey(): {[key: string]: string}{
    let returnObj = {};
    returnObj["[@"+EnterLeaveAnimation.animationKey+"]"] = '';
    return returnObj;
  }

  public static animation(): Object[]{
    return [
      trigger(EnterLeaveAnimation.animationKey, [
        state('in', style({
          transform: 'translateX(-100%)',
        })),
        transition('* => void', [
          animate('500ms cubic-bezier(.94,.24,.28,.97)', style({
            transform: 'translateX(500%)'
          }))
        ]),
        transition('void => *', [
          style({
            transform: 'translateX(-100%) translateY(50%) scale(0.1)',
          }),
          animate('200ms cubic-bezier(.37,.58,.94,.61)', style({
            transform: 'scale(1)'
          }))
        ]),

      ])
    ];
  }
}
