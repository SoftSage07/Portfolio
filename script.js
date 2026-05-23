'use strict';

/* ── EMAILJS ── */
const EMAILJS_PUBLIC_KEY  = '99nFurDyW1GS1oo1B';
const EMAILJS_SERVICE_ID  = 'service_uxevgnd';
const EMAILJS_TEMPLATE_ID = 'template_1b1ntdh';
(function(){ if(EMAILJS_PUBLIC_KEY!=='YOUR_PUBLIC_KEY') emailjs.init({publicKey:EMAILJS_PUBLIC_KEY}); })();

window.handleSend = async function(btn){
  const fname=document.getElementById('f_fname').value.trim();
  const lname=document.getElementById('f_lname').value.trim();
  const email=document.getElementById('f_email').value.trim();
  const subject=document.getElementById('f_subject').value.trim();
  const message=document.getElementById('f_message').value.trim();
  const status=document.getElementById('fstatus');
  if(!fname||!email||!message){status.textContent='⚠ Please fill in your name, email, and message.';status.className='fstatus err';return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent='⚠ Please enter a valid email address.';status.className='fstatus err';return;}
  if(EMAILJS_PUBLIC_KEY==='YOUR_PUBLIC_KEY'){status.textContent='⚠ Contact form not configured. Email harshprabha95@gmail.com directly.';status.className='fstatus err';return;}
  btn.textContent='Sending...';btn.disabled=true;status.className='fstatus';
  try{
    await emailjs.send(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,{from_name:`${fname} ${lname}`.trim(),from_email:email,subject:subject||'Portfolio Contact',message});
    status.textContent='✓ Message sent! I\'ll get back to you soon.';status.className='fstatus ok';btn.textContent='✓ Sent!';
    ['f_fname','f_lname','f_email','f_subject','f_message'].forEach(id=>document.getElementById(id).value='');
    setTimeout(()=>{btn.textContent='Send Message →';btn.disabled=false;},4000);
  }catch(err){
    console.error(err);status.textContent='✗ Something went wrong. Email harshprabha95@gmail.com directly.';status.className='fstatus err';btn.textContent='Send Message →';btn.disabled=false;
  }
}

/* ── LOADER ── */
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('gone'),2000));

/* ── CURSOR ── */
const ring=document.getElementById('cur-ring'),dot=document.getElementById('cur-dot');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function raf(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(raf);})();
document.querySelectorAll('a,button,.tc2,.pcard,.acard,.sl,.atag,.skcp,.scard,.tlc').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
});

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll',()=>{document.getElementById('spb').style.transform=`scaleX(${window.scrollY/(document.body.scrollHeight-window.innerHeight)})`;},{passive:true});

/* ── NAV GLASS ── */
window.addEventListener('scroll',()=>document.getElementById('nav').classList.toggle('stuck',window.scrollY>60),{passive:true});

/* ── MOBILE MENU ── */
window.toggleMenu = function(){document.getElementById('mmenu').classList.toggle('on');document.getElementById('ham').classList.toggle('on');}

/* ── TYPING ── */
const phrases=['NLP Engineer','LLM Systems Builder','Agentic AI Researcher','AI Governance Enthusiast','ECE Student · IGDTUW'];
let pi=0,ci=0,del=false;
const te=document.getElementById('tout');
function type(){
  const c=phrases[pi];
  te.textContent=del?c.slice(0,ci-1):c.slice(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci===c.length){del=true;setTimeout(type,2400);return;}
  if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;setTimeout(type,420);return;}
  setTimeout(type,del?42:70);
}
setTimeout(type,2600);

/* ── SCROLL REVEAL ── */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('vs');}),{threshold:0.05,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el=>ro.observe(el));

/* ── COUNTERS ── */
function easeOut(t){return 1-Math.pow(1-t,3);}
function animCnt(el){
  const tgt=+el.dataset.target,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
  const dur=1500,t0=performance.now();
  (function tick(now){const p=Math.min((now-t0)/dur,1);el.textContent=pre+Math.round(easeOut(p)*tgt)+suf;if(p<1)requestAnimationFrame(tick);})(t0);
}
const co=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-target]').forEach(animCnt);co.unobserve(e.target);}}),{threshold:.3});
document.querySelectorAll('.astats').forEach(el=>co.observe(el));

/* ── 3D TILT ── */
document.querySelectorAll('.tilt').forEach(c=>{
  c.addEventListener('mousemove',e=>{
    const r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    c.style.transition='transform .1s ease,border-color .3s,box-shadow .4s';
    c.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*8}deg) scale3d(1.025,1.025,1.025)`;
  });
  c.addEventListener('mouseleave',()=>{
    c.style.transition='transform .6s cubic-bezier(0.16,1,0.3,1),border-color .3s,box-shadow .4s';
    c.style.transform='perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
  });
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.magbtn').forEach(b=>{
  b.addEventListener('mousemove',e=>{
    const r=b.getBoundingClientRect();
    b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.35}px,${(e.clientY-r.top-r.height/2)*.35}px) scale(1.04)`;
    document.body.classList.add('cm');
  });
  b.addEventListener('mouseleave',()=>{b.style.transform='';document.body.classList.remove('cm');});
});

/* ── PARALLAX ORBS ── */
let ticking=false;
const oa=document.querySelector('.horb-a'),ob=document.querySelector('.horb-b'),oc=document.querySelector('.horb-c');
function doP(){const y=window.scrollY;if(oa)oa.style.transform=`translateY(${y*.1}px)`;if(ob)ob.style.transform=`translateY(${-y*.07}px)`;if(oc)oc.style.transform=`translate(-50%,-50%) translateY(${y*.04}px)`;ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(doP);ticking=true;}},{passive:true});

/* ── HERO CANVAS (floating particles) ── */
(function(){
  const cv=document.getElementById('hcanvas');
  if(!cv)return;
  const ctx=cv.getContext('2d');
  let W,H,stars=[],active=true;
  function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;}
  function mk(){return{x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.2,a:Math.random(),s:(Math.random()-.5)*.0018,c:Math.random()<.5?'82,107,88':'196,93,37'};}
  function init(){resize();stars=Array.from({length:120},mk);}
  function draw(){
    if(!active){requestAnimationFrame(draw);return;}
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{s.a+=s.s;if(s.a<=0||s.a>=1)s.s*=-1;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(${s.c},${s.a*.5})`;ctx.fill();});
    requestAnimationFrame(draw);
  }
  window.addEventListener('scroll',()=>{active=window.scrollY<window.innerHeight*1.2;},{passive:true});
  window.addEventListener('resize',init);
  init();draw();
})();

/* ── FLOATING PARTICLES ── */
const pc=document.getElementById('ptcl');
function mkp(){
  if(window.scrollY>window.innerHeight)return;
  const p=document.createElement('div');p.className='ptcl';
  const d=12+Math.random()*16,dl=Math.random()*10,sz=Math.random()<.2?2.5:1.5;
  const colors=['var(--vdl)','var(--olive)','var(--flame-d)'];
  p.style.cssText=`left:${Math.random()*100}vw;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random()*3)]};animation-duration:${d}s;animation-delay:${dl}s`;
  pc.appendChild(p);setTimeout(()=>p.remove(),(d+dl)*1000);
}
for(let i=0;i<18;i++)mkp();
setInterval(mkp,1400);

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
});
