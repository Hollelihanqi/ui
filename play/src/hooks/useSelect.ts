import { onMounted, reactive, ref } from "vue";

//定义下拉框接收得数据格式
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  key?: string;
}

//定义入参格式
interface FetchSelectProps {
  apiFun: () => Promise<any[]>;
}

export function useSelect(props: FetchSelectProps) {
  const { apiFun } = props;
  const options = ref<SelectOption[]>([]);
  const loading = ref(false);

  const loadData = () => {
    loading.value = true;
    options.value = [];
    return apiFun().then(
      (data) => {
        loading.value = false;
        options.value = data;
        return data;
      },
      (err) => {
        loading.value = false;
        options.value = [
          {
            value: "-1",
            label: err.message,
            disabled: true,
          },
        ];

        return Promise.reject(err);
      }
    );
  };

  onMounted(() => {
    loadData();
  });

  return reactive({
    options,
    loading,
  });
}
