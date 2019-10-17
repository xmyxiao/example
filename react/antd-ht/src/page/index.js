import React from 'react';
import { DatePicker, Button } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class IndexPage extends React.Component {
  
  onChange(date, dateString) {
    console.log(date, dateString);
  }

  openWin(){
    const electron = window.electron
    const ipc = window.electron.ipcRenderer
    ipc.send('add')
    //window.loadURL('http://localhost:5888/login?info=afdG9rZW4lM0RiNGVhYjNiOC0xMTk5LTRmYzYtODAxMC0yNWRiMTcyNGM2ZmElMjZwaWQlM0QyMCUyNmFwcGlkJTNENjg2JTI2bmFtZSUzRCVFNiVCNSU4QiVFOCVBRiU5NSUyNnByb2plY3RuYW1lJTNEJUU2JUI1JThCJUU4JUFGJTk1JTI2cHJvamVjdF9pZCUzRDIwJTI2YXBwX2lkJTNEdGVzdDAwMQ==')
  }

  render() {
    return (
      // <Calendar onPanelChange={this.onPanelChange} /> 
      <div>
        <DatePicker onChange={this.onChange} />
        <br />
        <MonthPicker onChange={this.onChange} placeholder="Select month" />
        <br />
        <RangePicker onChange={this.onChange} />
        <br />
        <WeekPicker onChange={this.onChange} placeholder="Select week" />
        <Button type="primary" onClick={this.openWin}>打开新窗口</Button>
      </div>
    )
  }
}