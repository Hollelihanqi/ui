import Echart from "./src/index.vue";

import { install } from "../../_utils";

export const YtoEchart = install(Echart);

export type { EchartInstance } from "./src/instance";

export default YtoEchart;
