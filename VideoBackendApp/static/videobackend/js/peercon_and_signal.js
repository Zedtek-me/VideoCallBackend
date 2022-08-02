/**
 * This module contains functions for users joining and starting a video meeting call.
 */

let stunUrl= "stun3.l.google.com:19302" //google stun3 server socket I'll use later to get my ICE candidate(my public socket-> (ip and port), and my network's NAT type)
//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServer(){
    let webSocProtocol;// controls whether the connection is secure or not
    if (window.location.origin.split(':')[0] === 'http'){
        webSocProtocol = 'ws'
    }
    else{
        webSocProtocol= 'wss'
    }
    let webSocUri= `${webSocProtocol}://${window.location.host}/signal`//generate uri

    socket= new WebSocket(webSocUri)//socket instantiated for tcp conn persistence.
    socket.onopen= (e)=>{
        return //
    }

    socket.onmessage= (e)=>{
        let data= JSON.parse(e.data)
        console.log('connected user: ' + data.user)
    }

}

// SignalServer()
