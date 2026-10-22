const header=document.querySelector(".site-header");
const menus=[...document.querySelectorAll(".mega-menu")];
const menuButtons=[...document.querySelectorAll("[data-menu]")];
function closeMenus(){menus.forEach(menu=>menu.hidden=true);menuButtons.forEach(button=>button.setAttribute("aria-expanded","false"))}
menuButtons.forEach(button=>button.addEventListener("click",()=>{const menu=document.getElementById("menu-"+button.dataset.menu);const opening=menu.hidden;closeMenus();menu.hidden=!opening;button.setAttribute("aria-expanded",String(opening))}));
document.addEventListener("click",event=>{if(!event.target.closest(".mega-menu,.has-menu"))closeMenus()});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeMenus();document.querySelector(".search-panel").hidden=true;header.classList.remove("mobile-open")}});
document.querySelectorAll(".mega-menu a").forEach(link=>link.addEventListener("click",closeMenus));
const mobileToggle=document.querySelector(".mobile-menu-toggle");
mobileToggle.addEventListener("click",()=>{const open=header.classList.toggle("mobile-open");mobileToggle.setAttribute("aria-expanded",String(open))});
document.querySelectorAll(".site-header a").forEach(link=>link.addEventListener("click",()=>{header.classList.remove("mobile-open");mobileToggle.setAttribute("aria-expanded","false")}));
const searchPanel=document.querySelector(".search-panel");
document.querySelector(".search-toggle").addEventListener("click",()=>{searchPanel.hidden=!searchPanel.hidden;if(!searchPanel.hidden)document.querySelector("#site-search").focus()});
document.querySelector(".search-close").addEventListener("click",()=>searchPanel.hidden=true);
document.querySelector("#site-search").addEventListener("keydown",event=>{if(event.key!=="Enter")return;const value=event.target.value.trim().toLowerCase();if(!value)return;const target=[...document.querySelectorAll("main section")].find(section=>section.textContent.toLowerCase().includes(value));if(target){target.scrollIntoView({behavior:"smooth"});searchPanel.hidden=true}else{event.target.setCustomValidity("No matching section in this homepage mockup.");event.target.reportValidity();setTimeout(()=>event.target.setCustomValidity(""),2000)}});
const reviews=[
  {name:"Yunita Irawan",image:"assets/official/review-yunita.jpg",quote:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."},
  {name:"Sarah Andreas",image:"assets/official/review-sarah.jpg",quote:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper."},
  {name:"Sandra Lubis",image:"assets/official/review-sandra.jpg",quote:"Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat. Lorem ipsum dolor sit amet."},
  {name:"Prinka Cassey",image:"assets/official/review-prinka.jpg",quote:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet."}
];
let reviewIndex=0;
function renderReview(){document.querySelector("#review-name").textContent=reviews[reviewIndex].name;document.querySelector("#review-quote").textContent=reviews[reviewIndex].quote;document.querySelector("#review-image").src=reviews[reviewIndex].image;document.querySelector("#review-image").alt=reviews[reviewIndex].name;document.querySelector("#review-dots").innerHTML=reviews.map((_,i)=>'<span class="'+(i===reviewIndex?"active":"")+'">●</span>').join("")}
const doctors=[
  {name:"Dr. Riska Melanie",image:"assets/official/doctor-riska.png"},
  {name:"Dr. Evans Sibarani",image:"assets/official/doctor-evans.png"},
  {name:"Dr. Ajeng Hana Ajani",image:"assets/official/doctor-ajeng.png"},
  {name:"Dr. Siti Aisyah Devitri",image:"assets/official/doctor-siti.png"}
];
let teamIndex=0;
function renderTeam(){const visible=Array.from({length:4},(_,i)=>doctors[(teamIndex+i)%doctors.length]);document.querySelector("#team-grid").innerHTML=visible.map(doctor=>'<article><img src="'+doctor.image+'" alt="'+doctor.name+'"><h3>'+doctor.name+'</h3><p>Doctor</p></article>').join("");document.querySelector("#team-dots").innerHTML=doctors.map((_,i)=>'<span class="'+(i===teamIndex?"active":"")+'">●</span>').join("")}
document.querySelectorAll("[data-carousel]").forEach(button=>button.addEventListener("click",()=>{const step=button.dataset.direction==="next"?1:-1;if(button.dataset.carousel==="review"){reviewIndex=(reviewIndex+step+reviews.length)%reviews.length;renderReview()}else{teamIndex=(teamIndex+step+doctors.length)%doctors.length;renderTeam()}}));
renderReview();renderTeam();
const faqData={
  booking:["How to book?","I booked through your website, hotline, or phone but never received a confirmation email.","I want to cancel my booking.","I am too late for my treatment, can I still come?","Do you have a loyalty program?"],
  covid:["What health protocols are in place?","Can I reschedule if I feel unwell?"],
  general:["What should I expect at my first visit?","How do I choose the right treatment?","Are consultations available?"],
  packages:["Can I buy a treatment package?","How do vouchers work?"],
  payment:["What payment methods are accepted?","Can I pay at the clinic?"]
};
const faqList=document.querySelector("#faq-list");
function renderFaq(category){faqList.innerHTML=faqData[category].map(question=>'<div class="faq-item"><button type="button" aria-expanded="false">'+question+'<span>+</span></button><p hidden>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p></div>').join("");faqList.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{const expanded=button.getAttribute("aria-expanded")==="true";button.setAttribute("aria-expanded",String(!expanded));button.nextElementSibling.hidden=expanded;button.querySelector("span").textContent=expanded?"+":"−"}))}
document.querySelectorAll("[data-faq-tab]").forEach(button=>button.addEventListener("click",()=>{document.querySelectorAll("[data-faq-tab]").forEach(tab=>tab.classList.remove("active"));button.classList.add("active");renderFaq(button.dataset.faqTab)}));
renderFaq("booking");
document.querySelector("#newsletter").addEventListener("submit",event=>{event.preventDefault();document.querySelector(".form-status").textContent="This form is a visual mockup; sign-up is not connected yet."});
