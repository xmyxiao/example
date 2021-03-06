export const tableOption = {
  menuType: 'text',
  viewBtn: false,
  delBtn: false,
  editBtn: false,
  addBtn: false,
  column: [{
    label: '父组',
    prop: 'parentId',
    hide: true,
    span: 24,
    formsolt: true,
    overHidden: true
  },{
    label: '分组名称',
    prop: 'name',
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入分组名称'
    }]
  },{
    label: '分组ID',
    prop: 'appId',
    addDisplay: false,
    addVisdiplay: false
  },{
    label: '添加时间',
    prop: 'createTime',
    addDisplay: false,
    addVisdiplay: false
  },{
    label: '描述',
    prop: 'remark',
    hide: true,
    span: 24,
    formsolt: true,
    overHidden: true
  }]
}