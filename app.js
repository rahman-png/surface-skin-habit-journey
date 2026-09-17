const chapters=[...document.querySelectorAll('.chapter')],buttons=[...document.querySelectorAll('.steps button')];
const labels=['YOUR FRIENDLY EXPERT SKIN CLINIC.','UNIQUE EXPERIENCE SKIN.','MEET OUR TEAM OF EXPERTS.','WHAT THEY SAY ABOUT US.'];
const canvas=document.querySelector('#motion'),ctx=canvas.getContext('2d');
const journeyHeading=document.querySelector('#journey-heading');
const experienceRail=document.querySelector('.experience-rail');
const expertGrid=document.querySelector('.expert-grid');
const concernMarkers=[...document.querySelectorAll('.concern')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const clamp=v=>Math.max(0,Math.min(1,v));
const total=240, cache=new Map(),pending=new Map();
let target=0,shown=0,stage=-1,raf=0,lastTime=0,lastDrawn=-1,failed=false;
const url=i=>`assets/motion/${String(i).padStart(3,'0')}.webp`;
async function frame(i){
 if(cache.has(i))return cache.get(i);
 if(pending.has(i))return pending.get(i);
 const work=fetch(url(i),{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('Frame unavailable');return r.blob()}).then(createImageBitmap).then(b=>{cache.set(i,b);pending.delete(i);trim();return b}).catch(e=>{pending.delete(i);if(!failed){failed=true;document.querySelector('#skin-state').textContent='Animasi belum termuat. Coba refresh halaman.'}throw e});
 pending.set(i,work);return work;
}
function trim(){if(cache.size<=32)return;const center=Math.round(shown);const keys=[...cache.keys()].sort((a,b)=>Math.abs(b-center)-Math.abs(a-center));while(cache.size>32){const key=keys.shift();cache.get(key).close();cache.delete(key)}}
function draw(i){const bitmap=cache.get(i);if(!bitmap||lastDrawn===i)return;ctx.clearRect(0,0,480,854);ctx.drawImage(bitmap,0,0);lastDrawn=i;canvas.dataset.frame=i;}
function tick(now){raf=0;const dt=Math.min((now-(lastTime||now))/1000,.05);lastTime=now;shown+= (target-shown)*(reduce.matches?1:1-Math.exp(-dt/0.11));if(Math.abs(target-shown)<.08)shown=target;
 const index=Math.max(0,Math.min(total-1,Math.round(shown)));draw(index);
 frame(index).then(()=>{if(Math.abs(Math.round(shown)-index)<=1)draw(index)}).catch(()=>{});
 const direction=target>=shown?1:-1;
 for(let j=1;j<=5;j++){const n=index+j*direction;if(n>=0&&n<total)frame(n).catch(()=>{})}
 if(shown!==target)raf=requestAnimationFrame(tick);else lastTime=0;
}
function schedule(){if(!raf)raf=requestAnimationFrame(tick)}
function update(){let position=3;for(let i=0;i<3;i++){if(scrollY<chapters[i+1].offsetTop){position=i+clamp((scrollY-chapters[i].offsetTop)/(chapters[i+1].offsetTop-chapters[i].offsetTop));break}}
 target=position/3*(total-1);const next=Math.min(3,Math.round(position));document.querySelector('.progress i').style.width=`${position/3*100}%`;
 // The portrait gains colour continuously across the complete skin journey.
 canvas.style.filter=`grayscale(${(1-position/3)*100}%)`;
 const firstSectionProgress=clamp(scrollY/(chapters[1].offsetTop-chapters[0].offsetTop));
 const headingParent=journeyHeading.parentElement.getBoundingClientRect();
 const headingEnd=Math.max(0,innerWidth-24-headingParent.left-journeyHeading.offsetWidth);
 journeyHeading.style.transform=`translateX(${headingEnd*firstSectionProgress}px)`;
 concernMarkers.forEach(marker=>{const x=Number(marker.dataset.suckX)||0,y=Number(marker.dataset.suckY)||0;marker.style.opacity=String(1-firstSectionProgress);marker.style.transform=`translate(${x*firstSectionProgress}px,${y*firstSectionProgress}px) scale(${1-.35*firstSectionProgress})`});
 const experienceProgress=clamp((scrollY-chapters[1].offsetTop)/(chapters[2].offsetTop-chapters[1].offsetTop));
 if(experienceRail){
  const travel=Math.max(0,experienceRail.offsetWidth-innerWidth+45);
  experienceRail.style.transform=`translateX(${-travel*experienceProgress}px)`;
  // Finish the gallery's colour transition before the Experience chapter reaches the fixed portrait.
  const experienceColourProgress=clamp((scrollY-(chapters[1].offsetTop-innerHeight))/(innerHeight));
  experienceRail.style.filter=`grayscale(${(1-experienceColourProgress)*100}%)`;
 }
 if(next!==stage){stage=next;buttons.forEach((b,i)=>{if(i===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});if(!failed)document.querySelector('#skin-state').textContent=labels[stage]}
 schedule();
}
// Warm the browser's compressed-file cache without retaining hundreds of decoded frames.
async function warm(){let next=0;await Promise.all(Array.from({length:4},async()=>{while(next<total){const i=next++;try{const r=await fetch(url(i),{cache:'force-cache'});if(r.ok)await r.blob()}catch{}}}));canvas.dataset.loaded='true'}
frame(0).then(()=>{draw(0);update();warm()}).catch(()=>{});

document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>scrollTo({top:chapters[Number(b.dataset.step)].offsetTop,behavior:reduce.matches?'instant':'smooth'})));
addEventListener('scroll',update,{passive:true});addEventListener('resize',update);reduce.addEventListener('change',update);update();

