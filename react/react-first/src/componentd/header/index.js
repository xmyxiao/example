import React, { Component } from 'react';
import { Title } from './style'
import { actionCreators } from '../store';

class Header extends Component {
  render(){
    return (
      <div>
        {
          // 这里使用的是 style-compontens来实现的样式管理
        }
        <Title>
          头部测试
          <div className="other">123</div>
        </Title>
        <Title className="other">
          头部测试
        </Title>
      </div>
    );
  }
}

export default Header
