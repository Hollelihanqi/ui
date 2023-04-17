import _YtoMenu from './src/index.vue'

import { install } from '../../_utils'

export const YtoMenu = install(_YtoMenu)

/** alert 组件实例类型 */
export type YtoMenuInstance = InstanceType<typeof YtoMenu>

export default YtoMenu
