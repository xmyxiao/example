import styled from 'styled-components';

export const Title = styled.div`
  width:100%;
  height:50px;
  line-height:50px;
  color:#ccc;
  &.other{
    color:#00f;
  }
  & .other{
    display:inline-block;
    color:#0f0;
  }
`
// 这里的&.classname 表示同时存在这两个类名  & .other代表子元素有这个类名的