# BaseTable 表格

基于 element-plus：el-table el-pagination 二次封装，支持 element-plus 的所有属性

### 功能

- JSON 数据渲染 Table
- 自带分页功能

## 基本使用

<demo src="./basic.vue"></demo>

## 自动请求数据

<demo src="./request.vue"></demo>

## Attributes

[完整配置请参考-element-plus](https://element-plus.org/zh-CN/component/table.html)

### Table 属性

| 属性名             | 说明                                                                                                                            | 类型     | 可选值     | 默认值                  | 备注                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------- | ----------------------- | ---------------------------------------------- |
| `columns`          | 表头                                                                                                                            | Array    | —          | []                      | columns 配置项兼容 Table-column 属性           |
| `tableData`        | 数据源                                                                                                                          | Array    | —          | []                      | —                                              |
| `paginationHide`   | 是否显示底部分页功能                                                                                                            | Boolean  | —          | false                   | —                                              |
| `total`            | 总条目数                                                                                                                        | number   | —          | 0                       | —                                              |
| `pageSize`         | 分页大小                                                                                                                        | Number   | —          | 10                      | —                                              |
| `pageSizes`        | 每页显示个数选择器的选项设置                                                                                                    | Array    | —          | [10, 30, 50, 100]       | —                                              |
| `currentPage`      | 当前页数                                                                                                                        | Array    | —          | 1                       | —                                              |
| `currentPageField` | 传递给 API 时,当前页面 FieldName                                                                                                | String   | —          | page                    | —                                              |
| `pageSizeField`    | 传递给 API 时,当前页大小 FieldName                                                                                              | String   | —          | size                    | —                                              |
| `handleChange`     | table 分页回调函数                                                                                                              | Function | —          | handleChange(type, num) | type='page' ==> 页码，type='size' ==> 分页大小 |
| `requestApi`       | 表格数据获取 API，返回一个 Promise                                                                                              | Function | —          |                         |                                                |
| `requestAuto`      | 是否立即触发 requestApi ,如果依赖于 otherParams，可设置为 false，手动调用 updateTableData 方法获取列表数据                      | Boolean  | true/false | true                    |                                                |
| `dataCallback`     | 表格数据获取成功后的回调函数，接收 API 请求回的结果，可在数据渲染之前进行格式化操作，且必须返回: {items:[],total:0}或者一个数组 | Function | —          | —                       | —                                              |
| `otherParams`      | 表格数据获取时，其它参数                                                                                                        | Object   | —          | —                       |

### Column 属性

| 属性名       | 说明         | 类型     | 备注            |
| ------------ | ------------ | -------- | --------------- |
| `hideCell`   | 隐藏列       | boolean  |                 |
| `formatText` | 列文本格式化 | function | formatText(row) |
| `slot`       | 列插槽 name  | string   | —               |

### Table 方法

| 属性名            | 说明                                     | 类型     | 备注 |
| ----------------- | ---------------------------------------- | -------- | ---- |
| `updateTableData` | 表格数据更新,调用此方法会执行 requestAPI | Function |      |
