const toggleMobile= ()=>{
    let navBar= document.querySelector('.hamburger')
    let mobileNav= document.getElementsByClassName('mobile-nav')[0]
    navBar.addEventListener('click', ()=>mobileNav.classList.toggle('m-nav'))
}

const meetingPrompt= ()=>{// funtion for meeting click events-> all meeting present in the sidebar meeting
    let meetingDetailsLists= document.querySelectorAll('#meeting')
    let meetingActionPrompts=document.querySelectorAll('.meeting-action-prompts')
    for (let i=0; i<meetingDetailsLists.length; i++){
        meetingDetailsLists[i].onclick= function(e){
            meetingActionPrompts[i].style.display= 'block'
        }
    }
}

const toggleMeetingSchedule=()=>{
    let scheduleBtn= document.querySelector("input[name='start']")
    let scheduleMeeting= document.querySelector('.schedule-meeting')
    scheduleBtn.addEventListener('click', (e)=>scheduleMeeting.classList.toggle('toggleScheduleDisplay'))
}
const removeMeetingAction= ()=>{
    let removeIcons= document.querySelectorAll('.fa-xmark')
    let actionParents= document.querySelectorAll('.meeting-action-prompts')
    for(let icon=0; icon<removeIcons.length; icon++){
        removeIcons[icon].addEventListener('click', (e)=>{
            actionParents[icon].style.display='none'
            flashMsg[icon].style.display='none'
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

const rmvFlash= ()=>{
    let flashMsg= document.querySelector('flash')
    let removeIcons= document.querySelector('.rmv-flash').addEventListener('cick', (e)=>flashMsg.style.display= 'none')

}

rmvFlash()
handleSideMeetingClicks()
removeMeetingAction()
toggleMeetingSchedule()
meetingPrompt()
toggleMobile()