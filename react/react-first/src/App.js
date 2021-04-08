import React from 'react';
import Header from './componentd/header/'
import Part1 from './componentd/part/part1.js'
import Part2 from './componentd/part/part2.js'

function App() {
  return (
    <div>
      <Header />
	  <Part1 name={'测试'} />
	  <Part2 />
      test file
    </div>
  );
}

export default App;
