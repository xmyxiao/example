export const tableOption = {
  menuType: 'text',
  selection: true,
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
    prop: 'type',
    dicData:[
      {
        label:'类型1',
        value:1
      },{
        label:'类型0',
        value:0
      }
    ]
  },{
    label: '状态/启用状态',
    prop: 'state',
    dicData:[
      {
        label:'状态1',
        value:1
      },{
        label:'状态0',
        value:0
      }
    ]
  },{
    label: '最后上线时间',
    prop: 'time',
    overHidden: true
  }]
}