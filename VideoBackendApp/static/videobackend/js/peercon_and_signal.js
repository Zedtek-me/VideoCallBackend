//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
let webSocProtocol;// controls whether the connection is secure or not
if (window.location.origin.split(':')[0] === 'http'){
    webSocProtocol = 'ws'
}
else{
    webSocProtocol= 'wss'
}
let webSocUri= `${webSocProtocol}://${window.location.host}/signal`

socket= new WebSocket(webSocUri)//socket instantiated for tcp conn persistence.
socket.onopen= (e)=>{
    let data= JSON.stringigy(e.data)
    console.log('websocket connection opened... connected user: ' + data.user)
}