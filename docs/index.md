<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-27 16:45:39
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-04-06 14:42:40
 * @FilePath: \yto-engine\docs\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

---

## hello: world

<script setup>
import { ref } from 'vue'
import {useData} from 'vitepress'
const {page} = useData()
const count = ref(0)

const columns = [
  {
    label: "序号",
    type: "index",
    width:80
  },
  {
    label: "调用方编码",
    prop: "callerCode",
  },
  {
    label: "调用方名称",
    prop: "callerName",
  }
];

const tableData = [
    {
        callerCode: "YTO-5464564",
        callerName: "CALL-NAME",
        ownerStr: "LIHANQI",
        status: '已调用',
        lastCallTime:"2023.01.10"
    },
    {
        callerCode: "YTO-5464564",
        callerName: "CALL-NAME",
        ownerStr: "LIHANQI",
        status: '已调用',
        lastCallTime:"2023.01.10"
    },
]
</script>

## Markdown Content

The count is: {{ count }}

<yto-table :columns="columns" :tableData="tableData"  style="padding:30px 16px;">
        <template #callStatus="scope">
            <span>{{ scope.row.status }}</span>
        </template>
    </yto-table>

<button :class="$style.button" @click="count++">Increment</button>

<pre>{{ page }}</pre>
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
