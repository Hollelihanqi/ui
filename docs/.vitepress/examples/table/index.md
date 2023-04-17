# BaseTable 表格

基于 element-plus：el-table el-pagination 二次封装，支持 element-plus 的所有属性

### 功能

- JSON 数据渲染 Table
- 自带分页功能

## 基本使用

<demo src="./basic.vue"></demo>

## Attributes

[完整配置请参考-element-plus]('https://element-plus.org/zh-CN/component/table.html')

### Table 属性

| 属性名           | 说明                         | 类型     | 可选值 | 默认值                  | 备注                                           |
| ---------------- | ---------------------------- | -------- | ------ | ----------------------- | ---------------------------------------------- |
| `columns`        | 表头                         | array    | —      | []                      | columns 配置项兼容 Table-column 属性           |
| `tableData`      | 数据源                       | array    | —      | []                      | —                                              |
| `paginationHide` | 是否显示底部分页功能         | boolean  | —      | false                   | —                                              |
| `total`          | 总条目数                     | number   | —      | 0                       | —                                              |
| `pageSize`       | 分页大小                     | number   | —      | 10                      | —                                              |
| `pageSizes`      | 每页显示个数选择器的选项设置 | array    | —      | [10, 30, 50, 100]       | —                                              |
| `currentPage`    | 当前页数                     | array    | —      | 1                       | —                                              |
| `handleChange`   | table 分页回调函数           | function | —      | handleChange(type, num) | type='page' ==> 页码，type='size' ==> 分页大小 |

### Column 属性

| 属性名       | 说明         | 类型     | 备注            |
| ------------ | ------------ | -------- | --------------- |
| `hideCell`   | 隐藏列       | boolean  |                 |
| `formatText` | 列文本格式化 | function | formatText(row) |
| `slot`       | 列插槽 name  | string   | —               |
