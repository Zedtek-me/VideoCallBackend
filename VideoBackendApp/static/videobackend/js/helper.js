var csrf= document.cookie.split('=')[1]
let hiddenMsg= document.querySelector('.hidden-msgs')
let message = null
const removeMeetingAction= ()=>{//icon to remove the dialogue box displaying meeting action choices on a meeting
    let removeIcons= document.querySelectorAll('.fa-xmark')
    let actionParents= document.querySelectorAll('.meeting-action-prompts')
    for(let icon=0; icon<actionParents.length; icon++){
        removeIcons[icon].addEventListener('click', (e)=>{
            actionParents[icon].style.display='none'
        })
}
}
const handleSideMeetingClicks= ()=>{
    let meetingChoices = document.querySelectorAll('.meeting-choice')//gets all the elements that are meant for deleting, starting or joining meetings
    let meetingIdz= document.querySelectorAll("input[name='meeting-id']")
    for(let i= 0; i<meetingChoices.length; i++){
        meetingChoices[i].addEventListener('click', (e)=>{
            //checks what type of action is requested(delete, join, or start)
            let meetingId=meetingIdz[i].value
            if(e.target.name === 'delete-meeting'){//delete
               fetch('http://127.0.0.1:9000/delete/', {
                method: 'POST',
                body: JSON.stringify(meetingId),
                headers:{
                    'content-type': 'application/json',
                    'X-CSRFTOKEN': csrf,
                }
               })
               .then((resp)=>resp.json())
               .then((data)=>{
                if (data.deleted){
                    hiddenMsg.textContent= 'Meeting deleted successfully. reload to refresh page.'
                    hiddenMsg.style.backgroundColor= 'yellowgreen'
                    hiddenMsg.style.color= 'white'
                    hiddenMsg.style.display= 'flex'
                }

                else if (data.not_authorized){//not authorized to delete the meeting
                    hiddenMsg.textContent= data.not_authorized
                    hiddenMsg.style.backgroundColor= 'red'
                    hiddenMsg.style.color= 'white'
                    hiddenMsg.style.display= 'flex'
                    
                }

                else{//other error occured
                    hiddenMsg.textContent= "error deleting this meeting. Try again later."
                    hiddenMsg.style.backgroundColor= 'red'
                    hiddenMsg.style.color= 'white'
                    hiddenMsg.style.display= 'flex'
                }
                setTimeout(()=>hiddenMsg.style.display= "none", 4000)//displays the flash message for 4 seconds
               })
               
            }

            else if(e.target.name === 'join-meeting'){//join
                if (meetingId){
                    fetch('http://127.0.0.1:9000/join/', {
                        method: 'POST',
                        body: JSON.stringify(meetingId),
                        headers:{
                            'content-type': 'application/json',
                            'X-CSRFTOKEN': csrf,
                        }
                    })
                    .then((resp)=>resp.json())
                    .then((data)=>{
                        if (data.join){//can join meeting. Then, go to meeting page
                            window.location.pathname= 'meeting_cred'
                            
                        }
                        else if (data.meeting_not_started){
                            hiddenMsg.textContent= data.meeting_not_started
                            hiddenMsg.style.backgroundColor="red"
                            hiddenMsg.style.color= "white"
                            hiddenMsg.style.display= "flex"
                        }
                        else{
                            hiddenMsg.textContent= "The meeting has ended!"
                            hiddenMsg.style.backgroundColor='red'
                            hiddenMsg.style.color= "white"
                            hiddenMsg.style.display="flex"
                        }})
                    setTimeout(()=>hiddenMsg.style.display= "none", 4000)//displays the flash message for 4 seconds
                    }//end of the if in this block
                }
            else{//start
                //Means start the meeting: do other things accordingly...
                fetch('http://127.0.0.1:9000/meeting_room/', {
                    method: 'POST',
                    body: JSON.stringify(meetingId),
                    headers:{
                        'content-type': 'application/json',
                        'X-CSRFTOKEN': csrf,
                    }
                   })
                .then((resp)=>resp.json())
                .then((data)=>{
                    if (data.start){
                        window.location.pathname= "meeting_room"
                    }
                    else{
                        hiddenMsg.textContent= data.not_host
                        hiddenMsg.style.backgroundColor="red"
                        hiddenMsg.style.color="white"
                        hiddenMsg.style.display= "flex"
                    }
                    setTimeout(()=>hiddenMsg.style.display= "none", 4000)//displays the flash message for 4 seconds
                })
            }
        })
    }
}

// flash messages removal
const rmvFlash= ()=>{
    let flashMsg= document.querySelector('.flash')
    let removeIcons= document.querySelector('.rmv-flash')
    if (removeIcons){
    removeIcons.addEventListener('click', (e)=>flashMsg.style.display= 'none')
    }
}

// meeting credentials handler for meeting info form at the meeting page
const handleMeetingCredForm= ()=>{
    let joinBtn= document.querySelector('#join-meeting-btn')
    let ongoingMeetingId= document.querySelector('#join-meeting-id')
    let ongoinMeetingPass= document.querySelector('#join-meeting-pass')
    joinBtn.onclick= (e)=>{
        e.preventDefault()
        let meetingCred= {meeting_id: ongoingMeetingId.value, password: ongoinMeetingPass.value}//collect meeting credentials
        fetch('http://127.0.0.1:9000/join/', {//send credentials to the backend for validation
            method:'POST',
            body: JSON.stringify(meetingCred),
            headers:{
                'Content-type' :'application/json',
                'X-CSRFToken': csrf,
                'To-Join-Meeting': true,
            }
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            if(data.meeting){
                let meetingDetails= data.meeting
                setTimeout(()=>window.location.pathname='meeting_room', 1000)
            }//meeting available

            else{//no meeting with the given credentials
                hiddenMsg.textContent= data.doesNotExist
                hiddenMsg.style.backgroundColor= 'red'
                hiddenMsg.style.color= 'white'
                hiddenMsg.style.display= 'flex'
                hiddenMsg.style.margin= '10px'
            }
        })
        .catch((err)=>console.log('got error: ' + err))
        setTimeout(()=>hiddenMsg.style.display= "none", 4000)//displays the flash message for 2 seconds
    }
}

handleMeetingCredForm()//meeting credentials handler
handleSideMeetingClicks()//for meeting actions available on the side bar of dashboard
removeMeetingAction()//removing box containing choices of actions that display when a meeting is clicked