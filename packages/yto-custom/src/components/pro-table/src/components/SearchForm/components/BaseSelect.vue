<script lang="ts">
import { defineComponent, h, ref } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { request } from "@yto/utils";
import { _edebounce } from "../../../utils";

export default defineComponent({
  props: {
    valueKey: {
      type: String,
      default: "value",
    },
    labelKey: {
      type: String,
      default: "label",
    },
    w: {
      type: String,
      default: "auto",
    },
    url: {
      type: String,
      default: "",
    },
    method: {
      type: String,
      default: "GET",
    },
    field: {
      type: String,
      default: "",
    },
    optTemp: {
      type: [Function, Object],
      default: null,
    },
    dataCallback: {
      type: [Function],
      required: false,
      default: null,
    },
    // modelValue: {
    //   // 此属性是 vue3.0 默认的 v-model 双向数据绑定 prop，请在子组件上通过 v-model 进行传递
    //   // 因为组件内部时通过 watch 监听 v-model 的值的变化来更新组件的内部 _value；
    //   // 所以清除表单时一定要手动对 v-model 的值进行手动置空，否则组件下次不会更新 _value
    //   type: String,
    //   default: "",
    // },
  },
  setup(props, { slots, attrs }) {
    const options: any = ref([]);
    const loading = ref(false);
    const searchData = (params = {}) => {
      return request.request({
        url: props.url,
        method: props.method,
        params: params,
        data: JSON.stringify(params),
      });
    };
    if (attrs.remote !== undefined && props.url && !attrs.remote) {
      searchData().then((res: any) => {
        if (props.dataCallback) {
          options.value = props.dataCallback(res);
          return;
        }
        options.value = res;
      });
    }
    const remoteMethod = _edebounce(async (query: string) => {
      if (query) {
        loading.value = true;
        const result: any = await searchData({ [props.field]: query });
        loading.value = false;
        if (result.items) {
          options.value = result.items;
        } else if (Array.isArray(result)) {
          options.value = result;
        }
      } else {
        options.value = [];
      }
    });

    const cusTemplate = (item: any) => {
      if (props.optTemp && typeof props.optTemp === "function") {
        return props.optTemp(item);
      }
      return h("div", { class: "cus-temp" }, [
        h("span", { style: { color: "#000" } }, item[props.valueKey]),
        h("span", {}, item[props.labelKey]),
      ]);
    };
    return () => {
      return h(
        ElSelect,
        {
          loading: loading.value,
          remote: true,
          clearable: true,
          filterable: true,
          reserveKeyword: true,
          style: {
            width: props.w,
          },
          ...attrs,
          remoteMethod: remoteMethod,
        },
        [
          options.value.map((item: any) => {
            return h(
              ElOption,
              {
                key: item[props.valueKey],
                label: item[props.labelKey],
                value: item[props.valueKey],
              },
              {
                default: () => cusTemplate(item),
              }
            );
          }),
        ]
      );
    };
  },
});
</script>
<style lang="scss">
.cus-temp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
</style>
