/**
 * This module contains functions for users joining and starting a video meeting call.
 */

var stunConfig= {'iceServer':[{'urls':"stun3.l.google.com:19302"}]} //google stun3 server socket I'll use later to get my ICE candidate(my public socket-> (ip and port), and my network's NAT type)
//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServerAndVideoConn(){
    // let isHost = document.getElementById('host-status')//to get the host status, as passed down into the context of meeting_room.html
    let vidDisplayContainer= document.querySelector('.gridDisp')
    let localVid= doucument.querySelector('#user-vid')
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
        let mediaStream= await navigator.mediaDevices.getUserMedia({video:true, audio:true})//get user media stream and add it to vidEl
        localVid.srcObject =mediaStream// give the local vide element the incoming stream
        localVid.style.display= 'flex'
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
            }
            // create offer if it's not an answer
            let offer = await peerConn.createOffer()//create offer 
            peerConn.setLocalDescription(offer)//set to local description
            setTimeout(()=>socket.send(JSON.stringify({'offer': offer})), 1000)
        }
        
        // this person is the callee, not the host/caller.
        else{
            //listening for the offer of the reomte peer.
            if (data.offer){// an offer has been sent, then
                let remoteOffer = new RTCSessionDescription(data.offer)
                peerConn.setRemoteDescription(remoteOffer)
                //first, get my own media streams, and then add them to the local video element
                let answerStreams= await navigator.mediaDevices.getUSerMedia({video:true, audio:true})
                localVid.srcObject= answerStreams
                //now create my answer to the offer 
                let answer= peerConn.createAnswer()
                peerConn.setLocalDescription(answer)//set my answer as my local description
                socket.send(JSON.stringify({'answer':answer}))//send my answer to the offerer

            }
        }
        //listen for other RTC events here
        peerConn.onicecandidate= (e)=>{//ICE candidates (IP and PORTS combined)
            socket.send(JSON.stringify())
        }

        peerConn.track= (e)=>{ //when remote tracks come in 
            //create remote video and start adding the incoming media streams
            let remoteVid= document.createElement('VIDEO')
            remoteVid.id= 'remote-vid'
            remoteVid.autoplay= true
            let remoteTracks= e.streams
            remoteVid.srcObject= remoteTracks
        }
    }

    socket.onclose= (e)=>{
        vidDisplayContainer.removeChild(vidEl)
    }

}

SignalServerAndVideoConn()









