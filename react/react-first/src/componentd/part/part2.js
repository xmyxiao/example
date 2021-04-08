import React, { Component } from 'react';

class Part2 extends Component {
	constructor(props) {
		super(props);  
		this.state  = {
      counter: 0
    }
	}
	componentDidMount(){ // 装载完成
		this.timer = setTimeout(
			() => {
				this.setState({
          counter: this.state.counter + 1
        })
			},
			1000
		);
	}
	componentWillUnmount(){ // 销毁前
		
	}
	render(){
		return (
			<div>{this.state.counter}</div>
		)
	}
}

export default Part2