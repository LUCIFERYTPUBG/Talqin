import React, { useState } from 'react'
import { GraduationCap, ArrowRight, ArrowLeft, Bell, BookOpen, Brain, Check, ChevronRight, Eye, EyeOff, Headphones, Home, LockKeyhole, Mic, MicOff, Phone, Radio, Share2, Trophy, UserRound, Users, Hand, X, BookMarked, Settings, LogOut, Sparkles, Volume2, Menu, ShieldCheck } from 'lucide-react'

const slides = [
  { title:'Jonli ovozli darslar', desc:'Talabalar bilan real vaqt rejimida dars o‘ting va bilim almashing.', icon:'mic' },
  { title:'Zakovat o‘yini', desc:'Bilimingizni sinang, savollar bering va jamoa bilan bellashing.', icon:'trophy' },
  { title:'Bank ishi darslari', desc:'Bank ishi fanlarini o‘rganing, mavzularni muhokama qiling va bilimlaringizni amaliyotda mustahkamlang.', icon:'books' }
]
const rooms = [
  {title:'Bank tizimi va uning tuzilishi',host:'Dilshod S.',count:42,tag:'Bank ishi'},
  {title:'Pul-kredit siyosati',host:'Madina B.',count:38,tag:'Makroiqtisod'},
  {title:'Tijorat banklari operatsiyalari',host:'Bekzod R.',count:24,tag:'Amaliy dars'}
]
const questions = [
 {q:'O‘zbekiston bank tizimining asosiy bo‘g‘ini qaysi?',a:['Markaziy bank','Tijorat banklari','Investitsiya banklari','Sug‘urta kompaniyalari'],correct:0},
 {q:'Markaziy bankning asosiy vazifalaridan biri?',a:['Kredit karta chiqarish','Pul-kredit siyosatini yuritish','Savdo qilish','Tovar sotish'],correct:1},
 {q:'Bankning passiv operatsiyasi nimani anglatadi?',a:['Mablag‘larni jalb qilish','Kredit berish','Investitsiya qilish','Valyuta sotish'],correct:0},
 {q:'Depozit nima?',a:['Bankka qo‘yilgan omonat','Kredit turi','To‘lov terminali','Valyuta kursi'],correct:0},
 {q:'Kredit foizi nimani bildiradi?',a:['Qarzning narxi','Bank manzili','Hisob raqami','Naqd pul turi'],correct:0}
]
function MotionIcon({type='sparkle',size=22,className=''}) {
 const common={size,strokeWidth:2.2,className:'motionGlyphSvg'};
 if(type==='audio')return <span className={'motionGlyph motionAudio '+className} style={{width:size,height:size}} aria-hidden="true">{[0,1,2,3,4].map(i=><i key={i}/>)}</span>;
 const Icon=type==='book'?BookOpen:type==='cap'?GraduationCap:type==='trophy'?Trophy:type==='shield'?ShieldCheck:type==='check'?Check:type==='arrow'?ArrowRight:type==='mic'?Mic:Sparkles;
 return <span className={'motionGlyph motion-'+type+' '+className} style={{width:size,height:size}} aria-hidden="true"><Icon {...common}/>{type==='trophy'&&<Sparkles className="motionAccent" size={Math.max(8,size*.42)}/>}</span>
}
function Logo({large=false}) { return <div className={large?'brand brandLarge':'brand'}><GraduationCap/><b>TALQIN</b></div> }
function AudioIllustration() {
  return <img
    className="audioIllustration"
    src="/talqin-audio-sharp.png?v=20261127-3"
    alt="Qizil professional mikrofon, quloqchin va ovoz to‘lqinlari"
  />
}
function BankStudyIllustration(){
 return <svg className="bankStudySvg" viewBox="0 0 300 250" role="img" aria-label="Bank binosi, ochiq kitob va oltin tangalar">
  <defs>
   <linearGradient id="bankRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ef334e"/><stop offset="1" stopColor="#a90d20"/></linearGradient>
   <linearGradient id="bankPage" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#f7e5e9"/></linearGradient>
   <linearGradient id="bankGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe18a"/><stop offset="1" stopColor="#d99218"/></linearGradient>
  </defs>
  <ellipse cx="150" cy="222" rx="94" ry="13" fill="#a90d20" opacity=".10"/>
  <path d="M34 126 C78 84 117 95 150 123 C183 95 222 84 266 126" fill="none" stroke="#f3b5c0" strokeWidth="5" strokeLinecap="round"/>
  <g className="bankStudyBuilding">
   <path d="M83 72 L150 34 L217 72 Z" fill="url(#bankRed)" stroke="#8e0b1e" strokeWidth="4" strokeLinejoin="round"/>
   <rect x="87" y="73" width="126" height="12" rx="4" fill="#fff" stroke="#b70f22" strokeWidth="3"/>
   <g fill="#fff2f4" stroke="#b70f22" strokeWidth="3">
    <rect x="96" y="87" width="18" height="46" rx="7"/><rect x="141" y="87" width="18" height="46" rx="7"/><rect x="186" y="87" width="18" height="46" rx="7"/>
   </g>
   <path d="M80 137 H220 V148 H80 Z" fill="url(#bankRed)" stroke="#8e0b1e" strokeWidth="3"/>
  </g>
  <g className="bankStudyBook">
   <path d="M48 151 Q94 132 150 159 Q206 132 252 151 L252 205 Q204 190 150 216 Q96 190 48 205 Z" fill="url(#bankPage)" stroke="#a90d20" strokeWidth="4" strokeLinejoin="round"/>
   <path d="M150 159 V216" stroke="#c47a88" strokeWidth="3"/>
   <g stroke="#dfb4bd" strokeWidth="3" strokeLinecap="round"><path d="M65 166 Q99 157 126 171"/><path d="M65 179 Q99 170 126 184"/><path d="M174 171 Q201 157 235 166"/><path d="M174 184 Q201 170 235 179"/></g>
  </g>
  <g className="bankStudyCoins" stroke="#b87810" strokeWidth="2">
   <ellipse cx="231" cy="129" rx="18" ry="7" fill="url(#bankGold)"/><path d="M213 129 V145 Q231 155 249 145 V129" fill="#e8aa31"/><ellipse cx="231" cy="145" rx="18" ry="7" fill="#f7ca5b"/>
   <ellipse cx="68" cy="133" rx="15" ry="6" fill="url(#bankGold)"/><path d="M53 133 V145 Q68 153 83 145 V133" fill="#e8aa31"/><ellipse cx="68" cy="145" rx="15" ry="6" fill="#f7ca5b"/>
  </g>
  <circle cx="58" cy="83" r="13" fill="url(#bankGold)" stroke="#b87810" strokeWidth="2"/><path d="M58 76 V90 M52 83 H64" stroke="#fff3c7" strokeWidth="2.5" strokeLinecap="round"/>
 </svg>
}
function removeConnectedWhiteBackground(img){
 if(img.dataset.bgRemoved==='1'||!img.naturalWidth)return;
 img.dataset.bgRemoved='1';
 try{
  const max=720,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
  const w=Math.max(1,Math.round(img.naturalWidth*scale)),h=Math.max(1,Math.round(img.naturalHeight*scale));
  const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
  const ctx=canvas.getContext('2d',{willReadFrequently:true});if(!ctx)return;
  ctx.drawImage(img,0,0,w,h);
  const frame=ctx.getImageData(0,0,w,h),p=frame.data,n=w*h;
  const seen=new Uint8Array(n),queue=new Uint32Array(n);let head=0,tail=0;
  const isBg=i=>{const k=i*4,r=p[k],g=p[k+1],b=p[k+2];return r>242&&g>242&&b>242&&Math.max(r,g,b)-Math.min(r,g,b)<18};
  const seed=i=>{if(!seen[i]&&isBg(i)){seen[i]=1;queue[tail++]=i}};
  for(let x=0;x<w;x++){seed(x);seed((h-1)*w+x)}
  for(let y=0;y<h;y++){seed(y*w);seed(y*w+w-1)}
  while(head<tail){
   const i=queue[head++],x=i%w,y=(i/w)|0,k=i*4;
   p[k+3]=0;
   if(x>0)seed(i-1);if(x<w-1)seed(i+1);if(y>0)seed(i-w);if(y<h-1)seed(i+w);
  }
  ctx.putImageData(frame,0,0);
  img.src=canvas.toDataURL('image/png');
 }catch(e){/* Keep original image if processing is unsupported */}
}
function Art({type}) {
  const icon=type==='mic'?<AudioIllustration/>:type==='trophy'?<><img className="trophyIllustration" src="/talqin-trophy.png?v=2" alt="TALQIN Zakovat kubogi" onError={e=>{e.currentTarget.dataset.failed="true"}}/><Trophy className="trophyFallback" size={130} aria-hidden="true"/></>:type==='bank'?<LandmarkFallback/>:<img className="bankStudyImage" src="/bank-study-3d.png?v=3" alt="Bank ishi darslari: 3D bank binosi, ochiq kitob va tangalar" loading="eager" decoding="async" onLoad={e=>removeConnectedWhiteBackground(e.currentTarget)}/>
  return <div className={'art art-'+type}><div className="artHalo"/><div className="artIcon">{icon}</div><div className="artShadow"/></div>
}
function LandmarkFallback(){return <div className="bankIcon"><div className="roof"/><div className="columns"><i/><i/><i/><i/></div><div className="base"/></div>}
export default function App(){
 const [screen,setScreen]=useState('splash'),[slide,setSlide]=useState(0),[role,setRole]=useState('Talaba'),[showPass,setShowPass]=useState(false),[loginId,setLoginId]=useState(''),[loginPassword,setLoginPassword]=useState(''),[authMode,setAuthMode]=useState('login'),[studentName,setStudentName]=useState(''),[confirmPassword,setConfirmPassword]=useState(''),[room,setRoom]=useState(null),[muted,setMuted]=useState(true),[q,setQ]=useState(0),[answer,setAnswer]=useState(null),[score,setScore]=useState(0),[toast,setToast]=useState(''),[rememberMe,setRememberMe]=useState(true),[authFeedback,setAuthFeedback]=useState(null),[authBusy,setAuthBusy]=useState(false)
 const notify=(s)=>{setToast(s);window.setTimeout(()=>setToast(''),2400)}
 const runAuth=()=>{setAuthFeedback(null);if(!loginId.trim()||!loginPassword){setAuthFeedback({type:'error',text:'Login yoki email va parolni kiriting.'});return}if(role==='Talaba'&&authMode==='register'&&(!studentName.trim()||confirmPassword!==loginPassword)){setAuthFeedback({type:'error',text:'Ism-familiyani kiriting va parollar mosligini tekshiring.'});return}setAuthBusy(true);setAuthFeedback({type:'loading',text:authMode==='register'?'Hisob ma’lumotlari tekshirilmoqda…':'Kirish ma’lumotlari tekshirilmoqda…'});window.setTimeout(()=>{setAuthBusy(false);setAuthFeedback({type:'info',text:'Kirish serveri hali ulanmagan. Backend autentifikatsiyasi ulangach, hisobingiz tekshiriladi.'})},950)}
 const socialAuth=provider=>{setAuthFeedback({type:'loading',text:provider+' orqali xavfsiz ulanish ochilmoqda…'});window.setTimeout(()=>setAuthFeedback({type:'info',text:provider+' bilan kirish uchun OAuth / bot sozlamalari serverga ulanishi kerak.'}),650)}
 const startQuiz=()=>{setQ(0);setAnswer(null);setScore(0);setScreen('quiz')}
 const pick=i=>{if(answer!==null)return;setAnswer(i);if(i===questions[q%questions.length].correct)setScore(v=>v+1)}
 const next=()=>{if(q===14){setScreen('home');notify('Zakovat yakunlandi · '+score+'/15');return}setQ(v=>v+1);setAnswer(null)}
 const nav=name=>setScreen(name)
 const navItems=[['home',Home,'Bosh sahifa'],['lessons',BookOpen,'Darslar'],['quiz',Brain,'Zakovat'],['profile',UserRound,'Profil']]
 React.useEffect(()=>{if(screen==='splash'){const seen=window.localStorage.getItem('talqin_intro_seen')==='1';const t=window.setTimeout(()=>setScreen(seen?'login':'onboard'),350);return()=>window.clearTimeout(t)}},[screen])
 const bottom=()=> <nav className="bottom">{navItems.map(([key,Icon,label])=><button key={key} className={screen===key?'navOn':'navOff'} onClick={()=>nav(key)}><Icon size={20}/><span>{label}</span></button>)}</nav>
 if(screen==='splash')return <main className="splash"><div className="splashGlow"/><div className="splashBrand"><div className="splashLogoMark"><GraduationCap size={42} strokeWidth={2.2}/></div><b>TALQIN</b></div><p>Bilim · Muhokama · Zakovat</p><div className="splashDivider"><i/></div><MotionIcon type="audio" size={34} className="splashMotionIcon"/><small>Yuklanmoqda...</small></main>
 if(screen==='onboard')return <main className={`onboard onboard-slide-${slide+1}`}><div className="onboardTop"><Logo/><button className="skip" onClick={()=>{window.localStorage.setItem('talqin_intro_seen','1');setScreen('login')}}>O‘tkazib yuborish <ChevronRight size={14}/></button></div><div className="slideArt"><Art type={slides[slide].icon}/></div><div className="slideText"><h1>{slides[slide].title}</h1><p>{slides[slide].desc}</p></div><div className="dots">{slides.map((_,i)=><i key={i} className={i===slide?'dotOn':'dot'}/>)}</div><button className="primary" onClick={()=>{if(slide<2)setSlide(slide+1);else{window.localStorage.setItem('talqin_intro_seen','1');setScreen('login')}}}>{slide<2?'Davom etish':'Boshlash'} <ArrowRight size={18}/></button></main>
 if(screen==='login')return <main className="login login-redesign">
 <button className="back" onClick={()=>setScreen('onboard')}><ArrowLeft/></button>
 <Logo large/>
 <h1>{role==='O‘qituvchi'?'O‘qituvchi kabineti':authMode==='register'?'Ro‘yxatdan o‘tish':'Tizimga kirish'}</h1>
 <p className="loginSubtitle">{role==='O‘qituvchi'?'O‘qituvchilar uchun xavfsiz kabinet':'Ta’lim, muloqot va bank ishi — bir platformada'}</p>
 {role==='Talaba'&&authMode==='login'&&<div className="loginHeroVisual" aria-hidden="true"><div className="loginHeroGlow"/><img src="/bank-study-3d.png?v=4" alt="" onLoad={e=>removeConnectedWhiteBackground(e.currentTarget)}/><span className="heroOrbit heroOrbitOne"/><span className="heroOrbit heroOrbitTwo"/><i className="heroSpark heroSparkOne"/><i className="heroSpark heroSparkTwo"/></div>}
 <div className="roleSwitch">
  <button className={role==='Talaba'?'roleActive':''} onClick={()=>{setRole('Talaba');setAuthMode('login')}}>Talaba</button>
  <button className={role==='O‘qituvchi'?'roleActive':''} onClick={()=>setRole('O‘qituvchi')}>O‘qituvchi</button>
 </div>
 {role==='O‘qituvchi'?<>
  <div className="teacherAccessNote"><span className="teacherNoteIcon"><LockKeyhole size={18}/></span><div><b>O‘qituvchi kabineti</b><p>Login va parol administrator tomonidan beriladi.</p></div></div>
  <label className="field"><UserRound size={18}/><input value={loginId} onChange={e=>setLoginId(e.target.value)} placeholder="Login"/></label>
  <label className="field"><LockKeyhole size={18}/><input value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} type={showPass?'text':'password'} placeholder="Parol"/><button type="button" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff size={17}/>:<Eye size={17}/>}</button></label>
  <div className="authOptions"><label className="rememberOption"><input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)}/><span className="customCheck"><Check size={12}/></span><span>Meni eslab qolish</span></label><span className="secureCaption"><ShieldCheck size={14}/> Himoyalangan kirish</span></div>
  <button className={`primary authSubmit ${authBusy?'isLoading':''}`} disabled={authBusy} onClick={runAuth}>{authBusy?<><MotionIcon type={role==='O‘qituvchi'?'shield':'audio'} size={21}/>Tekshirilmoqda…</>:<><MotionIcon type="cap" size={21}/>Kirish <MotionIcon type="arrow" size={18}/></>}</button>
  {authFeedback&&<div className={`authFeedback ${authFeedback.type}`} key={authFeedback.text}>{authFeedback.type==='error'?<X size={16}/>:authFeedback.type==='loading'?<MotionIcon type="audio" size={18}/>:<MotionIcon type="check" size={18}/>}<span>{authFeedback.text}</span></div>}
  <p className="teacherAdminHint"><ShieldCheck size={14}/> O‘qituvchi hisobini administrator yaratadi va login-parolni beradi.</p>
 </>:<>
  <div className="authModeSwitch">
   <button className={authMode==='login'?'authModeActive':''} onClick={()=>setAuthMode('login')}>Kirish</button>
   <button className={authMode==='register'?'authModeActive':''} onClick={()=>setAuthMode('register')}>Ro‘yxatdan o‘tish</button>
  </div>
  {authMode==='register'&&<label className="field"><UserRound size={18}/><input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Ism va familiya"/></label>}
  <label className="field"><UserRound size={18}/><input value={loginId} onChange={e=>setLoginId(e.target.value)} placeholder={authMode==='register'?'Email yoki talaba ID':'Login yoki email'}/></label>
  <label className="field"><LockKeyhole size={18}/><input value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} type={showPass?'text':'password'} placeholder="Parol"/><button type="button" onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff size={17}/>:<Eye size={17}/>}</button></label>
  {authMode==='register'&&<label className="field"><LockKeyhole size={18}/><input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type="password" placeholder="Parolni tasdiqlang"/></label>}
  {authMode==='login'&&<div className="authOptions"><label className="rememberOption"><input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)}/><span className="customCheck"><Check size={12}/></span><span>Meni eslab qolish</span></label><button className="forgotLink" onClick={()=>setAuthFeedback({type:'info',text:'Parolni tiklash uchun email orqali tiklash xizmati backendga ulanishi kerak.'})}>Parolni unutdingizmi?</button></div>}
  <button className={`primary authSubmit ${authBusy?'isLoading':''}`} disabled={authBusy} onClick={runAuth}>{authBusy?<><MotionIcon type="audio" size={21}/>Tekshirilmoqda…</>:<><MotionIcon type={authMode==='register'?'check':'cap'} size={21}/>{authMode==='register'?'Hisob yaratish':'Kirish'} <MotionIcon type="arrow" size={18}/></>}</button>
  {authFeedback&&<div className={`authFeedback ${authFeedback.type}`} key={authFeedback.text}>{authFeedback.type==='error'?<X size={16}/>:authFeedback.type==='loading'?<span className="miniSpinner"/>:<ShieldCheck size={16}/>}<span>{authFeedback.text}</span></div>}
  <div className="socialDivider"><span><Sparkles size={13}/> {authMode==='register'?'Tez ro‘yxatdan o‘tish':'Yoki tez kirish'}</span></div>
  <div className="socialCircleRow">
   <button className="socialCircle googleCircle" aria-label="Google orqali" onClick={()=>socialAuth('Google')}><svg className="brandSvg" viewBox="0 0 48 48" aria-label="Google"><path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.5H3.8v5.3A20 20 0 0 0 24 44Z"/><path fill="#FBBC05" d="M12.6 27.4a12 12 0 0 1 0-6.8v-5.3H3.8a20 20 0 0 0 0 17.4l8.8-5.3Z"/><path fill="#EA4335" d="M24 8.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 2.1 29.5 0 24 0A20 20 0 0 0 3.8 15.3l8.8 5.3C14.2 11.7 18.7 8.1 24 8.1Z"/></svg></button>
   <button className="socialCircle telegramCircle" aria-label="Telegram orqali" onClick={()=>socialAuth('Telegram')}><svg className="brandSvg" viewBox="0 0 48 48" aria-label="Telegram"><circle cx="24" cy="24" r="24" fill="#229ED9"/><path fill="#fff" d="M10.3 23.2 36.1 13.3c1.2-.4 2.2.3 1.8 2L33.5 37c-.3 1.3-1.1 1.6-2.2 1L23 31.2l-4.5 4.3c-.5.5-1 .5-1.1-.2l.7-8.1 15.2-12.1c.7-.5.1-.8-.7-.3L13.8 25.2l-3.2-1c-1.4-.5-1.4-1.1-.3-1Z"/></svg></button>
   <button className="socialCircle yandexCircle" aria-label="Yandex orqali" onClick={()=>socialAuth('Yandex')}><svg className="brandSvg" viewBox="0 0 48 48" aria-label="Yandex"><path fill="#FC3F1D" d="M28.6 9H23c-7.1 0-11.5 4.2-11.5 10.8 0 5.3 2.7 8.7 7.3 10.4L9 39h8.1l10.2-14.4h.8V39h7V9h-6.5Zm-.5 9.5v9.2h-1.7c-5.3 0-7.8-2.4-7.8-7.7 0-4.8 2.5-7.3 7.5-7.3h2Z"/></svg></button>
  </div>
  <p className="authBottomText">{authMode==='register'?'Hisobingiz bormi?':'Hisobingiz yo‘qmi?'} <button onClick={()=>setAuthMode(authMode==='register'?'login':'register')}>{authMode==='register'?'Kirish':'Ro‘yxatdan o‘tish'}</button></p>
 </>}
 </main>
 return <main className="app">
 <header className="header"><Logo/><button className="avatar" onClick={()=>nav('profile')}>ZA</button></header>
 {screen==='home'&&<section className="home"><div className="greeting"><div className="userMini">ZA</div><div><small>Assalomu alaykum,</small><h2>Zoxid! 👋</h2></div><button className="bell" onClick={()=>notify('Yangi bildirishnomalar yo‘q')}><Bell size={19}/><i/></button></div><div className="bankBanner"><div><b>Bank ishi</b><p>Yo‘nalish bo‘yicha<br/>darslar va muhokamalar</p></div><Art type="bank"/></div><div className="tiles"><button className="tileRed" onClick={()=>nav('lessons')}><Mic size={29}/><b>Jonli darslar</b><small>Live Class</small></button><button className="tilePurple" onClick={startQuiz}><Brain size={29}/><b>Zakovat</b><small>O‘yini</small></button><button className="tileBlue" onClick={()=>nav('materials')}><BookOpen size={29}/><b>Darslar</b><small>Materiallar</small></button><button className="tileOrange" onClick={()=>nav('community')}><Users size={29}/><b>Hamjamiyat</b><small>Talabalar</small></button></div><div className="sectionTitle"><h3>Jonli darslar</h3><button onClick={()=>nav('lessons')}>Barchasi <ChevronRight size={15}/></button></div>{rooms.slice(0,2).map(r=><button className="roomRow" key={r.title} onClick={()=>setRoom(r)}><span className="roomIcon"><Radio/></span><span className="roomDetails"><b>{r.title}</b><small>{r.host} · {r.count} tinglovchi</small></span><span className="liveBadge"><MotionIcon type="audio" size={14}/> Live</span></button>)}</section>}
 {screen==='lessons'&&<section className="content"><p className="eyebrow">TALQIN LIVE</p><h1>Jonli dars</h1><p className="sub">Bank tizimi va uning tuzilmasi</p><div className="roomList">{rooms.map(r=><button className="roomRow" key={r.title} onClick={()=>setRoom(r)}><span className="roomIcon"><Radio/></span><span className="roomDetails"><b>{r.title}</b><small>{r.host} · {r.count} tinglovchi</small></span><span className="liveBadge"><MotionIcon type="audio" size={14}/> Live</span></button>)}</div><button className="primary" onClick={()=>notify('Dars yaratish keyingi versiyada')}>＋ Yangi dars yaratish</button></section>}
 {screen==='quiz'&&<section className="content"><p className="eyebrow">TALQIN CHALLENGE</p><h1>Zakovat o‘yini</h1><div className="quizHero"><Art type="trophy"/><div><b>Bank ishi Zakovat</b><small>15 savol · 25 soniya</small></div></div><button className="primary" onClick={startQuiz}>O‘yinni boshlash <ArrowRight size={18}/></button></section>}
 {screen==='materials'&&<section className="content"><p className="eyebrow">BANK ISHI</p><h1>Darslar</h1><div className="materialHero"><Art type="books"/></div>{['Bank tizimiga kirish','Pul va kredit','Tijorat banklari','Markaziy bank'].map((x,i)=><button className="materialRow" key={x} onClick={()=>notify(x+' materiali tez orada')}><MotionIcon type="book" size={20}/><span><b>{x}</b><small>{i+1}-mavzu · Konspekt va muhokama</small></span><ChevronRight/></button>)}</section>}
 {screen==='community'&&<section className="content"><p className="eyebrow">TALQIN COMMUNITY</p><h1>Hamjamiyat</h1><div className="communityHero"><Art type="bank"/><b>Bilim birlashganda kuchayadi.</b></div>{['Madina B.','Dilshod S.','Bekzod R.','Zoxid A.'].map((x,i)=><div className="member" key={x}><span>{x.split(' ').map(v=>v[0]).join('')}</span><div><b>{x}</b><small>Bank ishi · {i+1}-kurs</small></div><i/></div>)}</section>}
 {screen==='profile'&&<section className="content"><p className="eyebrow">TALQIN ACCOUNT</p><h1>Profil</h1><div className="profileCard"><div className="profileAvatar">ZA</div><h2>Zoxid Abdokimov</h2><p>Bank ishi · Talaba</p><span>Talqin a’zosi</span></div><div className="stats"><div><b>320 XP</b><small>Ball</small></div><div><b>8</b><small>Zakovat</small></div><div><b>12 soat</b><small>Darslar</small></div></div><button className="materialRow" onClick={()=>notify('Sozlamalar keyingi versiyada')}><Settings/><b>Sozlamalar</b><ChevronRight/></button><button className="materialRow" onClick={()=>setScreen('login')}><LogOut/><b>Chiqish</b><ChevronRight/></button></section>}
 {bottom()}
 {room&&<div className="roomOverlay"><div className="roomModal"><div className="modalTop"><button onClick={()=>setRoom(null)}><X/></button><span className="liveBadge">● LIVE</span><button onClick={()=>notify('Ulashish')}><Share2/></button></div><h2>{room.title}</h2><p>Ovozli dars · {room.count} tinglovchi</p><div className="speaker"><div className="speakerPhoto">DS</div><b>{room.host}</b><small>O‘qituvchi</small><div className="wave">{Array.from({length:22},(_,i)=><i key={i} style={{height:8+(i*13)%27}}/>)}</div></div><div className="people"><span>ZA</span><span>MB</span><span>BR</span><span>+38</span></div><div className="controls"><button onClick={()=>setMuted(!muted)}>{muted?<MicOff/>:<Mic/>}<small>{muted?'Mikrofon o‘chiq':'Mikrofon yoqilgan'}</small></button><button onClick={()=>notify('Qo‘l ko‘tarildi')}><Hand/><small>Qo‘l ko‘tarish</small></button><button className="hangup" onClick={()=>setRoom(null)}><Phone/><small>Chiqish</small></button></div><small className="demo">Demo xona · Jonli audio hali ulanmagan</small></div></div>}
 {screen==='quiz'&&<div className="quizOverlay"><div className="quizCard"><div className="quizTop"><button onClick={()=>nav('home')}><ArrowLeft/></button><b>Zakovat o‘yini</b><span>{q+1}/15</span></div><div className="progress"><i style={{width:(q+1)/15*100+'%'}}/></div><span className="questionNo">SAVOL {q+1}</span><h2>{questions[q%questions.length].q}</h2><span className="timer">◷ 00:25</span><div className="answers">{questions[q%questions.length].a.map((a,i)=><button key={a} onClick={()=>pick(i)} className={answer!==null&&i===questions[q%questions.length].correct?'correct':answer===i?'incorrect':''}><span>{String.fromCharCode(65+i)}</span>{a}{answer!==null&&i===questions[q%questions.length].correct&&<MotionIcon type="check" size={17}/>}</button>)}</div><div className="quizBottom"><span>{score} ball</span><button disabled={answer===null} onClick={next}>{q===14?'Yakunlash':'Keyingi savol'} <ArrowRight size={17}/></button></div></div></div>}
 {toast&&<div className="toast"><Sparkles size={16}/>{toast}</div>}
 </main>
}
