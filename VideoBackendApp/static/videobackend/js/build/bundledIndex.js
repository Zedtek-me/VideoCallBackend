(()=>{var e={369:()=>{var e=document.cookie.split("=")[1];(()=>{let t=document.querySelectorAll(".meeting-choice"),n=document.querySelectorAll("input[name='meeting-id']");for(let o=0;o<t.length;o++)t[o].addEventListener("click",(t=>{let l=n[o].value;"delete-meeting"===t.target.name?fetch("http://127.0.0.1:9000/delete/",{method:"POST",body:JSON.stringify(l),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>console.log(e.data))):"join-meeting"===t.target.name?fetch("http://127.0.0.1:9000/join/",{method:"POST",body:JSON.stringify(l),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>console.log(e.data))):fetch("http://127.0.0.1:9000/start/",{method:"POST",body:JSON.stringify(l),headers:{"content-type":"application/json","X-CSRFTOKEN":e}}).then((e=>console.log(e.data)))}))})(),(()=>{let e=document.querySelectorAll(".fa-xmark"),t=document.querySelectorAll(".meeting-action-prompts");for(let n=0;n<t.length;n++)e[n].addEventListener("click",(e=>{t[n].style.display="none"}))})();let t=document.querySelector(".flash"),n=document.querySelector(".rmv-flash");n&&n.addEventListener("click",(e=>t.style.display="none"))}},t={};function n(o){var l=t[o];if(void 0!==l)return l.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(369),(()=>{let e=document.querySelector("input[name='start']"),t=document.querySelector(".schedule-meeting");e.addEventListener("click",(e=>t.classList.toggle("toggleScheduleDisplay")))})(),(()=>{let e=document.querySelectorAll("#meeting"),t=document.querySelectorAll(".meeting-action-prompts");for(let n=0;n<e.length;n++)e[n].onclick=function(e){t[n].style.display="block"}})(),(()=>{let e=document.querySelector(".hamburger"),t=document.getElementsByClassName("mobile-nav")[0];e.addEventListener("click",(()=>t.classList.toggle("m-nav")))})()})()})();