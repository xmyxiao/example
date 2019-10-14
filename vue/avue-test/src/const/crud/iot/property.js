
export const tableOption = {
  emptyText: '暂无数据',
  index: false,
  border: true,
  indexLabel: '序号',
  stripe: false,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'left',
  addBtn: false,
  page: false,
  refreshBtn: false,
  columnBtn: false,
  column: [{
    label: '功能类型',
    prop: 'funType',
    value: '',
    span: 25,
    editDisabled: false,
    addVisdiplay: false,
    formsolt:false
  }, {
    label: '功能名称',
    prop: 'funName',
    value: '',
    span: 24,
    width: '220px',
    editDisabled: false,
    addVisdiplay: false,
    formsolt: false,
    solt: true
  }, {
    label: '标识符',
    prop: 'funKey',
    value: '',
    span: 24,
    editDisabled: false,
    addVisdiplay: false,
    formsolt: false
  }, {
    label: '数据类型',
    prop: 'funDataType',
    value: '',
    span: 24,
    editDisabled: false,
    addVisdiplay: false,
    formsolt: false,
    solt: true
  }, {
    label: '数据定义',
    prop: 'funText',
    value: '',
    span: 24,
    width: '160px',
    solt:true,
    ditDisabled: false,
    addVisdiplay: false
  }] 
}