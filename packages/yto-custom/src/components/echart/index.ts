import _YtoEchart from './src/index.vue'

import { install } from '../../_utils'

export const YtoEchart = install(_YtoEchart)

/** alert 组件实例类型 */
export type YtoEchartInstance = InstanceType<typeof YtoEchart>

export default YtoEchart
