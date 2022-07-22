//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServer(){
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
}

SignalServer()

function videoConnections(){
    /**
     * function that encapsulates all peer-2-peer video interactions, 
     * including connecting to ICE server; ICE candidate generation; 
     * creating and accepting offers with SDP.
     */
    let staticVidEl= document.querySelector('#user-vid')//vid element in the meeting_room(all vid elements will be dynamically created for every peer joining a conversation)
    let camBtn= document.querySelector('#toggle-display')
    let userDvc= navigator.mediaDevices.getUserMedia({'video':true,
    'audio': true})
    userDvc.then((streams)=> {
        console.log(streams)
        staticVidEl.srcObject= streams
        camBtn.addEventListener('click', (e)=>{
            if (streams.active === true){
                streams.active= false;
                console.log(streams)
                camBtn.textContent= 'Turn on camera'
            }
            else{streams.active = true;
            camBtn.textContent= 'Turn off camera'}
        })
    })
   
}

videoConnections()


