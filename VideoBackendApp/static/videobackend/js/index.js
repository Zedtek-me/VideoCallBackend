const toggleMobile= ()=>{//hamburger toggling for mobile devices 
    let navBar= document.querySelector('.hamburger')
    let mobileNav= document.getElementsByClassName('mobile-nav')[0]
    navBar.addEventListener('click', ()=>mobileNav.classList.toggle('m-nav'))
}

const meetingPrompt= ()=>{// funtion for meeting click events-> all meeting present in the sidebar meeting, to display available actions choices for a meeting
    let meetingDetailsLists= document.querySelectorAll('#meeting')
    let meetingActionPrompts=document.querySelectorAll('.meeting-action-prompts')
    for (let i=0; i<meetingDetailsLists.length; i++){
        meetingDetailsLists[i].onclick= function(e){
            meetingActionPrompts[i].style.display= 'block'
        }
    }
}

const toggleMeetingSchedule=()=>{//to toggle the display of the meeting scheduling form 
    let scheduleBtn= document.querySelector("input[name='start']")
    let scheduleMeeting= document.querySelector('.schedule-meeting')
    scheduleBtn.addEventListener('click', (e)=>scheduleMeeting.classList.toggle('toggleScheduleDisplay'))
}
toggleMeetingSchedule()//displays/hide meeting scheduling form.
meetingPrompt()//displaying box containing meeting action choices-> opposite of 'removeMeetingAction'
toggleMobile()//for mobile