const fn = require('./demo1.js')
fn()
require('../css/main.css')
require('../scss/index.scss')

import axios from 'axios'
axios.get('/api/widget?ajax=json&id=ad').then(res => {
    console.log(res);
  });
  function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
  }
  
  var gen = g();
  console.log(gen.next()); // 返回Object {value: "a", done: false}

  for(let p of [1,2,3,4]) {
      console.log(p)
  }