import _YtoProTable from './src/index.vue'

import { install } from '../../_utils'

export const YtoProTable = install(_YtoProTable)

/** alert 组件实例类型 */
export type YtoProTableInstance = InstanceType<typeof YtoProTable>

export default YtoProTable
