<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-07 10:07:48
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-10 22:20:22
 * @FilePath: \xlfk-vite-vue3\src\views\complianceManagement\components\RemoteSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts">
import { defineComponent, h } from "vue";
import BaseSelect from "./BaseSelect.vue";

export default defineComponent({
  setup(props, { slots, attrs }) {
    return () => {
      return h(BaseSelect, {
        placeholder:"请输入",
        ...attrs,
      });
    };
  },
});
</script>
