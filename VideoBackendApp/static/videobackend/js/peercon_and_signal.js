/**
 * This module contains functions for users joining and starting a video meeting call.
 */

var stunConfig= {'iceServer':[{'urls':"stun3.l.google.com:19302"}]} //google stun3 server socket I'll use later to get my ICE candidate(my public socket-> (ip and port), and my network's NAT type)
//set up my signaling server with websocket to determine interraction type and communicate ICE candidates and SDPs accordingly.
function SignalServerAndVideoConn(){
    // let isHost = document.getElementById('host-status')//to get the host status, as passed down into the context of meeting_room.html
    let vidDisplayContainer= document.querySelector('.gridDisp')
    let localVid= document.querySelector('#user-vid')
    let remoteVid; //set this to hold the remote video element when it'll be created soon.
    let webSocProtocol;// controls whether the connection is secure or not
    let offer;//I'll use this offers and answers created elsewhere, in case of invite to the and removal from/to the meeting
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
    socket.onopen= async (e)=>{
        /**when the websocket connection is open here, create the video element for the user, and start getting their media stream
         * before other things come on.
         * Rightfully, I should check if the connected user is a host here, to create the offer immediately. But since the backend
         * sends a message immediately after connection, the logic of creating offer and answers should be handled by the on message event.
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

    socket.onmessage= async (e)=>{
        // A message is expected to be sent at initial connection to the websocket backend; therefore, check messages accordingly.
        let data= JSON.parse(e.data)
        let user= data.user
        let isHost= data.host_status ? data.host_status : '' // as gotten from the backend immediately at connection
        //deciding whether to create an answer or an offer.
        if(isHost){
            //create an offer if this is the host of the meeting
            offer= await peerConn.createOffer()
            peerConn.setLocalDescription(offer)//set local description and send offer to the room.
            socket.send(JSON.stringify({offer:offer}))
        }


        // now check the contents of the message and respond accordingly
        if (data.offer){
            //respond to this as the guest.
            remoteVid= document.createElement('VIDEO')
            remoteVid.id= 'remote-vid'
            vidDisplayContainer.appendChild(remoteVid)//video element created, and added to the meeting video cont..
            //now onto answer
            answer= await peerConn.createAnswer()
            let remoteOffer= new RTCSessionDescription(data.offer)
            await peerConn.setRemoteDescription(remoteOffer)
            await peerConn.setLocalDescription(answer)
            socket.send(JSON.stringify({answer:answer}))
        }

        else if (data.answer){
            //now respond to this as the host, since you expect an answer from any user who wants to connect.
            let remoteAnswer = new RTCSessionDescription(data.answer)
            await peerConn.setRemoteDescription(remoteAnswer)
        }
        //now below, should handle other messages that are neither offers nor answers
        else{
            console.log(data)
        }//All that my signaling server should handle for now.

        //now onto several events from rtc
        peerConn.ontrack= async (e)=>{
            let remoteStreams= e.streams
            //when remote streams start comming in, start adding the streams to it for the remote user
            remoteVid.srcObject= remoteStreams
        }
    }

    socket.onclose= (e)=>{
        vidDisplayContainer.removeChild(localVid)
    }

}

SignalServerAndVideoConn()









