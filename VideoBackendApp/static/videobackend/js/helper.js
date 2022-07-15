var csrf= document.cookie.split('=')[1]
let hiddenMsg= document.querySelector('.hidden-msgs')
let message = hiddenMsg
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
            //checks what time of action is requwsted(delete, join, or start)
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
                    hiddenMsg.style.backgroundColor= 'rgb(238, 201, 157)'
                    hiddenMsg.style.display= 'flex'
                    // window.location.pathname= 'dashboard/'
                }
                setTimeout(()=>message, 200)//displays the flash message for 2 seconds
               })
               
            }

            else if(e.target.name === 'join-meeting'){//join
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
                    if (data.join){
                        window.location.pathname= 'meeting_room/'
                        
                    }
                    else if (data.meeting_not_started){
                        hiddenMsg.textContent= data.meeting_not_started
                        hiddenMsg.style.backgroundColor="red"
                        hiddenMsg.style.color= "white"
                        hiddenMsg.style.display= "flex"
                    }
                    else{
                        hiddenMsg.textContent= "This meeting has ended!"
                        hiddenMsg.style.backgroundColor='red'
                        hiddenMsg.style.display="flex"
                    }})
                    setTimeout(()=>message, 200)//displays the flash message for 2 seconds
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
                    setTimeout(()=>message, 200)//displays the flash message for 2 seconds
                })
            }
        })
    }
}


handleSideMeetingClicks()//for meeting actions available on the side bar of dashboard
removeMeetingAction()//removing box containing choices of actions that display when a meeting is clicked
// flash messages removal
let flashMsg= document.querySelector('.flash')
let removeIcons= document.querySelector('.rmv-flash')
if (removeIcons){
    removeIcons.addEventListener('click', (e)=>flashMsg.style.display= 'none')
}

