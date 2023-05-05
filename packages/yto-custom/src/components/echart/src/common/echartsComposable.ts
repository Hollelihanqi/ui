/*
 * @Author: 魏春霈
 * @Date: 2023-04-17 11:00:49
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-04-18 13:53:06
 * @Description: 自定义组合函数
 */
const echartsComposable = (chartRef: any) => {
  const getEchartInstance = () => {
    return chartRef ? unref(chartRef).getEchartInstance() : null;
  };
  return {
    getEchartInstance,
  };
};

export default echartsComposable;
