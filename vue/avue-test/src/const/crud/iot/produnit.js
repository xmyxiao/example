export const tableOption = {
  emptyText: '暂无数据',
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    label: '单位ID',
    prop: 'id',
    value: '',
    span: 24,
    addVisdiplay: false,
    editVisdiplay: false,
    rules: [{
      required: true,
      message: '请填写单位英文名称',
      trigger: 'blur'
    }]
  },
  {
    label: '删除标志',
    prop: 'delFlag',
    value: '',
    span: 24,
    hide: true,
    addVisdiplay: false,
    editVisdiplay: false,
    rules: [{
      required: true,
      message: '请填写单位英文名称',
      trigger: 'blur'
    }]
  }, {
    label: '英文名称',
    prop: 'enName',
    value: '',
    span: 24,
    search: true,
    addVisdiplay: true,
    rules: [{
      required: true,
      message: '请填写单位英文名称',
      trigger: 'blur'
    }]
  }, {
    label: '中文名称',
    prop: 'cnName',
    value: '',
    span: 24,
    search: true,
    addVisdiplay: true,
    rules: [{
      required: true,
      message: '请填写单位中文名称',
      trigger: 'blur'
    }]
  }, {
    width: 100,
    label: '创建人',
    prop: 'createId',
    value: '',
    span: 24,
    editVisdiplay: false,
    addVisdiplay: false
  }, {
    width: 150,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd',
    editVisdiplay: false,
    addVisdiplay: false,
    span: 24
  }]
}