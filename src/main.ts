import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
<div>



<div>
<button id="compartir2">Compartir</button>
</div>

</div>

<span id="status">offline</span>
</div>
<ul id="clients-ul">
</ul>
<form id="form">
 <input placeholder="message" id="message"/>
</form>

<h3>Messages</h3>
<ul id="messages-ul">
</ul>

`

