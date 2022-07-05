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
meetingPrompt()
toggleMobile()