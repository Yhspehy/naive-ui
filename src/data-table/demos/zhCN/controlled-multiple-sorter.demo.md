# 受控的多列排序

如果列对象的 sortOrder 属性被设为 'ascend'、'descend' 或者 false，表格的排序将为受控状态。

```html
<n-space vertical :size="12">
  <n-data-table
    ref="table"
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @update:sorter="handleUpdateSorter"
  />
</n-space>
```

```js
import { ref, computed } from 'vue'

const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    chinese: 98,
    math: 60,
    english: 70
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    chinese: 98,
    math: 66,
    english: 89
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    chinese: 88,
    math: 99,
    english: 89
  }
]

export default {
  data () {
    return {
      data: data,
      pagination: { pageSize: 5 }
    }
  },
  setup () {
    const sortStatesRef = ref([])
    const sortKeyMapOrderRef = computed(() =>
      sortStatesRef.value.reduce((result, { columnKey, order }) => {
        result[columnKey] = order
        return result
      }, {})
    )
    const paginationRef = ref({ pageSize: 5 })

    const columnsRef = computed(() => [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age',
        sortOrder: sortKeyMapOrderRef.value.age || false,
        sorter (rowA, rowB) {
          return rowA.age - rowB.age
        }
      },
      {
        title: 'Chinese Score',
        key: 'chinese',
        sortOrder: sortKeyMapOrderRef.value.chinese || false,
        sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3
        }
      },
      {
        title: 'Math Score',
        key: 'math',
        sortOrder: sortKeyMapOrderRef.value.math || false,
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2
        }
      },
      {
        title: 'English Score',
        sortOrder: sortKeyMapOrderRef.value.english || false,
        key: 'english',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1
        }
      }
    ])

    function handleUpdateSorter (sorters) {
      console.log(sorters)
      sortStatesRef.value = [].concat(sorters)
    }
    return {
      columns: columnsRef,
      handleUpdateSorter,
      data,
      pagination: paginationRef
    }
  }
}
```