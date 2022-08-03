/**
 * This module contains functions for users joining and starting a video meeting call.
 */

var stunConfig= {'iceServer':[{'stun':"stun3.l.google.com:19302"}]} //google stun3 server socket I'll use later to get my ICE candidate(my public socket-> (ip and port), and my network's NAT type)
//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServerAndVideoConn(){
    // let isHost = document.getElementById('host-status')//to get the host status, as passed down into the context of meeting_room.html
    let vidDisplayContainer= document.querySelector('.videoDispCont')
    let webSocProtocol;// controls whether the connection is secure or not
    let offer;//setting variables in the global scope for access in the child scopes
    let answer;
    // check the schema of the current http protocol before instanciating the websocket client
    if (window.location.origin.split(':')[0] === 'http'){
        webSocProtocol = 'ws'
    }
    else{
        webSocProtocol= 'wss'
    }
    let webSocUri= `${webSocProtocol}://${window.location.host}/signal`//generate uri
    
    // websocet and other connection below.
    socket= new WebSocket(webSocUri)//socket instantiated for tcp conn persistence.
    
    // instantiate RTCPeerConnection Here 
    let peerConn= new RTCPeerConnection(stunConfig)
    console.log(peerConn.iceConnectionState)
    socket.onopen= async (e)=>{
        /**when the connection is open here, create the video element for the user, and start getting their media stream
         * before other things come on
        */
        let vidEl= document.createElement('VID')//video element created and id is set on it
        vidEl.id= 'user-vid'
        let mediaStream= await navigator.mediaDevices.getUserMedia({video:true, audio:true})//get user media stream and add it to vidEl
        vidEl.srcObject= mediaStream
        vidDisplayContainer.appendChild(vidEl)
        console.log(vidDisplayContainer)
    }

    socket.onmessage= (e)=>{
        let data= JSON.parse(e.data)
        let user= data.user
        let isHost= data.host_status// as gotten from the websocket server on the backend 
        if (isHost){
            let offer = peerConn.createOffer()//create offer 
            peerConn.setLocalDescription(offer)//set to local description
            socket.send(JSON.stringify({'offer': offer}))//send offer to other peers
        }
        //perform 
        if (data.message){

        }
    }

}

SignalServerAndVideoConn()
