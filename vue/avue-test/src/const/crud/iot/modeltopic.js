export const tableOption = {
  emptyText: '暂无数据',
  index: false,
  border: true,
  stripe: false,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'left',
  addBtn: false,
  refreshBtn: false,
  columnBtn: false,
  column: [{
    label: 'Topic类',
    prop: 'topicAddr',
    value: '',
    span: 25,
    width: '400px',
    formsolt:false
  }, {
    label: '操作权限',
    prop: 'optionTypeName',
    value: '',
    span: 25,
    formsolt:false
  }, {
    label: '描述',
    prop: 'topicRemark',
    value: '',
    span: 25,
    formsolt:false
  }]
}