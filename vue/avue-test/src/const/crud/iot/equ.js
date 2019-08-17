export const tableOption = {
  menuType: 'text',
  viewBtn: false,
  delBtn: false,
  editBtn: false,
  addBtn: false,
  column: [{
    label: 'DeviceName',
    prop: 'deviceName',
    search: true,
    overHidden: true
  },{
    label: '设备所属产品',
    prop: 'product',
  },{
    label: '节点类型',
    prop: 'type'
  },{
    label: '状态/启用状态',
    prop: 'state'
  },{
    label: '最后上线时间',
    prop: 'time',
    overHidden: true
  }]
}