import { c, cB, cE } from '../../../../_utils/cssr'
import { iconSwitchTransition } from '../../../../_styles/transitions/icon-switch.cssr'

export default c([
  c('@keyframes loading-animation', `
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  `),
  c('@keyframes loading--circle-animation', `
    0% {
      stroke-dasharray: 1px, 800px;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 400px, 800px;
      stroke-dashoffset: -80px;
    }
    100% {
      stroke-dasharray: 400px, 800px;
      stroke-dashoffset: -570px;
    }
  `),
  cB('base-loading', `
    position: relative;
    line-height: 0;
    width: 1em;
    height: 1em;
    animation: loading-animation 1.4s linear infinite ;
  `, [
    cE('transition-wrapper', `
      position: absolute;
      width: 100%;
      height: 100%;
    `, [
      iconSwitchTransition()
    ]),
    cE('svg', `
      display: block;
    `),
    cE('circle', `
      stroke: currentColor;
      stroke-dasharray: 320px, 800px;
      stroke-dashoffset: 0px;
      animation: loading--circle-animation 1.4s ease-in-out infinite;;
    `),
    cE('placeholder', `
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    `, [
      iconSwitchTransition({
        left: '50%',
        top: '50%',
        originalTransform: 'translateX(-50%) translateY(-50%)'
      })
    ])
  ])
])
