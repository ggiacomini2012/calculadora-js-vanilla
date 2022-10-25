import '../css/style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
   Oi
  </div>
`

setupCounter(document.querySelector('#app'))
