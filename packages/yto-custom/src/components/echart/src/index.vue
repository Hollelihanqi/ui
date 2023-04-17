<template>
  <component :is="getRenderChart()" :options="optins" :width="width" :height="height"></component>
</template>

<script lang="ts" setup>
import LineChart from './LineChart.vue'
import BarChart from './BarChart.vue'
import BaseChart from './BaseChart.vue'
import PieChart from './PieChart.vue'

interface Props {
  type?: 'line'|'bar'|'pie';//目前支持3种预定义图形
  optins: any;
  width:string;
  height:string;
}
const props = withDefaults(defineProps<Props>(), {
  type: undefined,
  height:'400px',
  width:'100%',
  optins:()=>{
    return {}
  }
})

const chartMap = new Map<String,any>
chartMap.set('line', LineChart)
chartMap.set('bar', BarChart)
chartMap.set('pie', PieChart)

const getRenderChart = () => {
  console.log('getRenderChart', props.type);
  return  props.type && chartMap.has(props.type) ? chartMap.get(props.type) : BaseChart
};

</script>
