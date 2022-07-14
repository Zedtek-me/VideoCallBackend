const removeMeetingAction= ()=>{//icon to remove the dialogue box displaying meeting action choices on a meeting
    let removeIcons= document.querySelectorAll('.fa-xmark')
    let actionParents= document.querySelectorAll('.meeting-action-prompts')
    for(let icon=0; icon<removeIcons.length; icon++){
        removeIcons[icon].addEventListener('click', (e)=>{
            actionParents[icon].style.display='none'
        })
}
}
const handleSideMeetingClicks= ()=>{
    let meetingChoices = document.querySelectorAll('.meeting-choice')//gets all the elements that are meant for deleting, starting or joining meetings
    for(let i= 0; i<meetingChoices.length; i++){
        meetingChoices[i].addEventListener('click', (e)=>{
            e.target.value= ''
            if(e.target.name === 'delete-meeting'){//checks what time of action is requwsted(delete, join, or start)
               //do something accordingly
            }

            else if(e.target.name === 'join-meeting'){
                //do something accordingly
            }
            else{
                //Means start the meeting: do other things accordingly...
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

