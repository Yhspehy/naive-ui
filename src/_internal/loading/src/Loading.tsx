import { h, defineComponent, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import { ExtractPublicPropTypes } from '../../../_utils'
import NIconSwitchTransition from '../../icon-switch-transition'
import style from './styles/index.cssr'

const exposedLoadingProps = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: undefined
  }
}

export type BaseLoadingExposedProps = ExtractPublicPropTypes<
  typeof exposedLoadingProps
>

export default defineComponent({
  name: 'BaseLoading',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    },
    ...exposedLoadingProps
  },
  setup (props) {
    useStyle('-base-loading', style, toRef(props, 'clsPrefix'))
  },
  render () {
    const { clsPrefix, radius, strokeWidth, stroke, scale } = this
    const scaledRadius = radius / scale
    return (
      <div class={`${clsPrefix}-base-loading`} role="img" aria-label="loading">
        <NIconSwitchTransition>
          {{
            default: () =>
              this.show ? (
                <div
                  key="icon"
                  class={`${clsPrefix}-base-loading__transition-wrapper`}
                >
                  <svg
                    class={`${clsPrefix}-base-loading__svg`}
                    viewBox={`0 0 ${scaledRadius * 2} ${scaledRadius * 2}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: stroke }}
                  >
                    <circle
                      class={`${clsPrefix}-base-loading__circle`}
                      fill="none"
                      stroke="currentColor"
                      stroke-width={strokeWidth}
                      cx={scaledRadius}
                      cy={scaledRadius}
                      r={scaledRadius - strokeWidth / 2}
                    ></circle>
                  </svg>
                </div>
              ) : (
                <div
                  key="placeholder"
                  class={`${clsPrefix}-base-loading__placeholder`}
                >
                  {this.$slots}
                </div>
              )
          }}
        </NIconSwitchTransition>
      </div>
    )
  }
})
