(()=>{"use strict";var e=document.cookie.split("=")[1];let t=document.querySelector(".hidden-msgs");(()=>{let e=document.querySelector(".flash"),t=document.querySelector(".rmv-flash");t&&t.addEventListener("click",(t=>e.style.display="none"))})(),(()=>{let o=document.querySelector("#join-meeting-btn"),n=document.querySelector("#join-meeting-id"),l=document.querySelector("#join-meeting-pass");o&&(o.onclick=o=>{o.preventDefault();let i={meeting_id:n.value,password:l.value};fetch(`${window.location.host}/join/`,{method:"POST",body:JSON.stringify(i),headers:{"Content-type":"application/json","X-CSRFToken":e,"To-Join-Meeting":!0}}).then((e=>e.json())).then((e=>{e.meeting?(e.meeting,setTimeout((()=>window.location.pathname="meeting_room"),1e3)):(t.textContent=e.doesNotExist,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex",t.style.margin="10px")})).catch((e=>console.log("got error: "+e))),setTimeout((()=>t.style.display="none"),2e3)})})(),(()=>{let o=document.querySelectorAll(".meeting-choice"),n=document.querySelectorAll("input[name='meeting-id']");for(let l=0;l<o.length;l++)o[l].addEventListener("click",(o=>{let i=n[l].value;"delete-meeting"===o.target.name?fetch(`${window.location.host}/delete/`,{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json","X-CSRFToken":e}}).then((e=>e.json())).then((e=>{e.deleted?(t.textContent="Meeting deleted successfully. reload to refresh page.",t.style.backgroundColor="yellowgreen",t.style.color="white",t.style.display="flex"):e.not_authorized?(t.textContent=e.not_authorized,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"):(t.textContent="error deleting this meeting. Try again later.",t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"),setTimeout((()=>t.style.display="none"),4e3)})):"join-meeting"===o.target.name?i&&(fetch(`${window.location.host}/join/`,{method:"POST",body:JSON.stringify(i),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>e.json())).then((e=>{e.join?window.location.pathname="meeting_cred":e.meeting_not_started?(t.textContent=e.meeting_not_started,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"):(t.textContent="The meeting has ended!",t.style.backgroundColor="red",t.style.color="white",t.style.display="flex")})),setTimeout((()=>t.style.display="none"),4e3)):fetch(`${window.location.host}/meeting_room/`,{method:"POST",body:JSON.stringify(i),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>e.json())).then((e=>{e.start?setTimeout((()=>window.location.pathname="meeting_room"),1e3):(t.textContent=e.not_host,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"),setTimeout((()=>t.style.display="none"),4e3)}))}))})(),(()=>{let e=document.querySelectorAll(".fa-xmark"),t=document.querySelectorAll(".meeting-action-prompts");for(let o=0;o<t.length;o++)e[o].addEventListener("click",(e=>{t[o].style.display="none"}))})(),(()=>{let e=document.querySelector("input[name='start']"),t=document.querySelector(".schedule-meeting");e.addEventListener("click",(e=>t.classList.toggle("toggleScheduleDisplay")))})(),(()=>{let e=document.querySelectorAll("#meeting"),t=document.querySelectorAll(".meeting-action-prompts");for(let o=0;o<e.length;o++)e[o].onclick=function(e){t[o].style.display="block"}})(),(()=>{let e=document.querySelector(".hamburger"),t=document.getElementsByClassName("mobile-nav")[0];e.addEventListener("click",(()=>t.classList.toggle("m-nav")))})()})();