import _YtoTable from './src/index.vue'

import { install } from '../../_utils'

export const YtoTable = install(_YtoTable)

/** alert 组件实例类型 */
export type YtoTableInstance = InstanceType<typeof YtoTable>

export default YtoTable
