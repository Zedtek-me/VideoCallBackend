(()=>{var e={369:()=>{var e=document.cookie.split("=")[1];let t=document.querySelector(".hidden-msgs"),o=t;(()=>{let n=document.querySelectorAll(".meeting-choice"),l=document.querySelectorAll("input[name='meeting-id']");for(let r=0;r<n.length;r++)n[r].addEventListener("click",(n=>{if("delete-meeting"===n.target.name){let n=l[r].value;fetch("http://127.0.0.1:9000/delete/",{method:"POST",body:JSON.stringify(n),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>e.json())).then((e=>{e.deleted&&(t.textContent="Meeting deleted successfully. reload to refresh page.",t.style.backgroundColor="rgb(238, 201, 157)",t.style.display="flex"),setTimeout((()=>o),200)}))}else"join-meeting"===n.target.name?(fetch("http://127.0.0.1:9000/join/",{method:"POST",body:JSON.stringify(meetingId),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>e.json())).then((e=>{e.join?window.location.pathname="meeting_room/":e.meeting_not_started?(t.textContent=e.meeting_not_started,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"):(t.textContent="The meeting has ended!",t.style.backgroundColor="red",t.style.color="white",t.style.display="flex")})),setTimeout((()=>o),200)):fetch("http://127.0.0.1:9000/meeting_room/",{method:"POST",body:JSON.stringify(meetingId),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>e.json())).then((e=>{e.start?window.location.pathname="meeting_room":(t.textContent=e.not_host,t.style.backgroundColor="red",t.style.color="white",t.style.display="flex"),setTimeout((()=>o),200)}))}))})(),(()=>{let e=document.querySelectorAll(".fa-xmark"),t=document.querySelectorAll(".meeting-action-prompts");for(let o=0;o<t.length;o++)e[o].addEventListener("click",(e=>{t[o].style.display="none"}))})();let n=document.querySelector(".flash"),l=document.querySelector(".rmv-flash");l&&l.addEventListener("click",(e=>n.style.display="none"))}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";o(369),(()=>{let e=document.querySelector("input[name='start']"),t=document.querySelector(".schedule-meeting");e.addEventListener("click",(e=>t.classList.toggle("toggleScheduleDisplay")))})(),(()=>{let e=document.querySelectorAll("#meeting"),t=document.querySelectorAll(".meeting-action-prompts");for(let o=0;o<e.length;o++)e[o].onclick=function(e){t[o].style.display="block"}})(),(()=>{let e=document.querySelector(".hamburger"),t=document.getElementsByClassName("mobile-nav")[0];e.addEventListener("click",(()=>t.classList.toggle("m-nav")))})()})()})();