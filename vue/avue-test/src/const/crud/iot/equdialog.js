export const tableOption = {
  menuType: 'text',
  selection: true,
  viewBtn: false,
  delBtn: false,
  menu:false,
  editBtn: false,
  addBtn: false,
  searchBtn: false,
  searchClearable: false,
  column: [{
    label: '设备名称',
    prop: 'deviceName',
    search: true,
    overHidden: true
  },{
    label: '设备所属产品',
    prop: 'prodName',
  },{
    label: '节点类型',
    prop: 'prodNodeTypeName'
  },{
    label: '状态/启用状态',
    prop: 'deviceState',
    solt: true
  },{
    label: '最后上线时间',
    prop: 'lastOnlineTime',
    overHidden: true
  }]
}