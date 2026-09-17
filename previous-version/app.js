const journey=document.querySelector('#journey');
const stories=[...document.querySelectorAll('.story')];
const steps=[...document.querySelectorAll('.steps button')];
const clear=document.querySelector('.clear'),after=document.querySelector('.after');
const labels=['Kulit apa adanya.','Sedikit demi sedikit.','Rona mulai bersinar.','Hello, happy skin.'];
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v)};
let queued=false,current=-1;
function render(){
 queued=false;
 const range=journey.offsetHeight-window.innerHeight;
 const p=clamp(-journey.getBoundingClientRect().top/range);
 clear.style.opacity=ease(p/.62);
 after.style.opacity=ease((p-.60)/.36);
 document.querySelector('.image-progress i').style.width=`${p*100}%`;
 const stage=Math.min(3,Math.floor(p*3+.5));
 if(stage!==current){current=stage;stories.forEach((s,i)=>{s.classList.toggle('active',i===stage);s.inert=i!==stage});steps.forEach((s,i)=>{s.classList.toggle('selected',i===stage);if(i===stage)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current')});document.querySelector('#skin-state').textContent=labels[stage];document.querySelector('#stage-number').textContent=`0${stage+1}`;}
}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{const range=journey.offsetHeight-window.innerHeight;window.scrollTo({top:journey.offsetTop+Number(b.dataset.step)/3*range,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}));
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);render();
