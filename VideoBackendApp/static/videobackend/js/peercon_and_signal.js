/**
 * This module contains functions for users joining and starting a video meeting call.
 */

var stunConfig= {'iceServer':[{'urls':"stun3.l.google.com:19302"}]} //google stun3 server socket I'll use later to get my ICE candidate(my public socket-> (ip and port), and my network's NAT type)
//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServerAndVideoConn(){
    // let isHost = document.getElementById('host-status')//to get the host status, as passed down into the context of meeting_room.html
    let vidDisplayContainer= document.querySelector('.gridDisp')
    let webSocProtocol;// controls whether the connection is secure or not
    let offer;//setting variables in the global scope for access in the child scopes
    let answer;
    let vidEl;
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
    socket.onopen= async (e)=>{
        /**when the websocket connection is open here, create the video element for the user, and start getting their media stream
         * before other things come on
        */
        vidEl= document.createElement('VIDEO')//video element created and id is set on it
        vidEl.id= 'user-vid'
        vidEl.autoplay= 'true'
        let mediaStream= await navigator.mediaDevices.getUserMedia({video:true, audio:true})//get user media stream and add it to vidEl
        vidEl.srcObject =mediaStream
        vidDisplayContainer.appendChild(vidEl)
        //get media tracks here, and start adding them to the connection session immediately without waiting for an offer or answer
        let localStream= mediaStream.getTracks()
        localStream.map((track)=>{
            peerConn.addTrack(track, mediaStream)
        })
    }

    socket.onmessage= async (e)=>{// when a message is detected, check whether it's an offer or an answer. Then, perform acts accordingly.
        let data= JSON.parse(e.data)
        let user= data.user
        let isHost= data.host_status// as gotten from the websocket server on the backend 
        //deciding whether to create an answer or an offer.
        if (isHost){ //the host being the caller
            if(data.answer){
                let remoteSession= new RTCSessionDescription(data.answer)
                peerConn.setRemoteDescription(remoteSession)
                peerConn.addEventListener('track', (e)=>{
                    //first, create the remote video when the client starts sending track
                    let remoteVideo= document.createElement('VIDEO')
                    remoteVideo.id= 'remote-vid'
                    // the next thing to do here is to start adding remote tracks as the source objects for this video element. I'll come back to this.
                })
            }
            let offer = await peerConn.createOffer()//create offer 
            peerConn.setLocalDescription(offer)//set to local description
            setTimeout(()=>socket.send(JSON.stringify({'offer': offer})), 1000)
        }
        else{// this person is the callee, not the host/caller.
            //listening for the offer of the reomte peer.
            if (data.offer){// an offer has been sent, then
                let remoteOffer = new RTCSessionDescription(data.offer)
                peerConn.setRemoteDescription(remoteOffer)
                peerConn.addEventListener('track', (e)=>{
                    //first, create the remote video when the client starts sending track
                    let remoteVideo= document.createElement('VIDEO')
                    remoteVideo.id= 'remote-vid'
                    // the next thing to do here is to start adding remote tracks as the source objects for this video element. I'll come back to this.
                })
            }
            let answer= peerConn.createAnswer()
            peerConn.setLocalDescription(answer)//set my answer as my local description
            socket.send(JSON.stringify({'answer':answer}))//send my answer to the offerer
        }
        //listen for when the ICE candidates(public socket/IP Address and Port number) are ready
        peerConn.onicecandidate= (e)=>{
            socket.send(JSON.stringify())
        }
    }

    socket.onclose= (e)=>{
        vidDisplayContainer.removeChild(vidEl)
    }

}

SignalServerAndVideoConn()
