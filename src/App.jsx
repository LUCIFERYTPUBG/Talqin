import React, { useState } from 'react'
import { GraduationCap, ArrowRight, ArrowLeft, Bell, BookOpen, Brain, Check, ChevronRight, Eye, EyeOff, Headphones, Home, LockKeyhole, Mic, MicOff, Phone, Radio, Share2, Trophy, UserRound, Users, Hand, X, BookMarked, Settings, LogOut, Sparkles, Volume2, Menu } from 'lucide-react'

const slides = [
  { title:'Jonli ovozli darslar', desc:'Talabalar bilan real vaqt rejimida dars o‘ting va bilim almashing.', icon:'mic' },
  { title:'Zakovat o‘yini', desc:'Bilimingizni sinang, savollar bering va jamoa bilan bellashing.', icon:'trophy' },
  { title:'Bank ishi darslari', desc:'Yo‘nalishingiz bo‘yicha darslar, muhokamalar va amaliy bilimlar bir joyda.', icon:'books' }
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
function Logo({large=false}) { return <div className={large?'brand brandLarge':'brand'}><GraduationCap/><b>TALQIN</b></div> }
function AudioIllustration() {
  return <img
    className="audioIllustration"
    src="/talqin-audio-original.jpg?v=20261125-1"
    alt="Qizil professional mikrofon, quloqchin va ovoz to‘lqinlari"
  />
}
function Art({type}) {
  const icon=type==='mic'?<AudioIllustration/>:type==='trophy'?<Trophy size={130}/>:type==='bank'?<LandmarkFallback/>:<BookOpen size={130}/>
  return <div className={'art art-'+type}><div className="artHalo"/><div className="artIcon">{icon}</div><div className="artShadow"/></div>
}
function LandmarkFallback(){return <div className="bankIcon"><div className="roof"/><div className="columns"><i/><i/><i/><i/></div><div className="base"/></div>}
export default function App(){
 const [screen,setScreen]=useState('splash'),[slide,setSlide]=useState(0),[role,setRole]=useState('Talaba'),[showPass,setShowPass]=useState(false),[room,setRoom]=useState(null),[muted,setMuted]=useState(true),[q,setQ]=useState(0),[answer,setAnswer]=useState(null),[score,setScore]=useState(0),[toast,setToast]=useState('')
 const notify=(s)=>{setToast(s);window.setTimeout(()=>setToast(''),2400)}
 const startQuiz=()=>{setQ(0);setAnswer(null);setScore(0);setScreen('quiz')}
 const pick=i=>{if(answer!==null)return;setAnswer(i);if(i===questions[q%questions.length].correct)setScore(v=>v+1)}
 const next=()=>{if(q===14){setScreen('home');notify('Zakovat yakunlandi · '+score+'/15');return}setQ(v=>v+1);setAnswer(null)}
 const nav=name=>setScreen(name)
 const navItems=[['home',Home,'Bosh sahifa'],['lessons',BookOpen,'Darslar'],['quiz',Brain,'Zakovat'],['profile',UserRound,'Profil']]
 React.useEffect(()=>{if(screen==='splash'){const t=setTimeout(()=>setScreen('onboard'),1300);return()=>clearTimeout(t)}},[screen])
 const bottom=()=> <nav className="bottom">{navItems.map(([key,Icon,label])=><button key={key} className={screen===key?'navOn':'navOff'} onClick={()=>nav(key)}><Icon size={20}/><span>{label}</span></button>)}</nav>
 if(screen==='splash')return <main className="splash"><div className="splashGlow"/><div className="splashBrand"><div className="splashLogoMark"><GraduationCap size={42} strokeWidth={2.2}/></div><b>TALQIN</b></div><p>Bilim · Muhokama · Zakovat</p><div className="splashDivider"><i/></div><div className="loader"/><small>Yuklanmoqda...</small></main>
 if(screen==='onboard')return <main className="onboard"><button className="skip" onClick={()=>setScreen('login')}>O‘tkazib yuborish</button><div className="slideArt"><Art type={slides[slide].icon}/></div><div className="slideText"><h1>{slides[slide].title}</h1><p>{slides[slide].desc}</p></div><div className="dots">{slides.map((_,i)=><i key={i} className={i===slide?'dotOn':'dot'}/>)}</div><button className="primary" onClick={()=>slide<2?setSlide(slide+1):setScreen('login')}>{slide<2?'Davom etish':'Boshlash'} <ArrowRight size={18}/></button></main>
 if(screen==='login')return <main className="login"><button className="back" onClick={()=>setScreen('onboard')}><ArrowLeft/></button><Logo large/><h1>Tizimga kirish</h1><div className="roleSwitch"><button className={role==='Talaba'?'roleActive':''} onClick={()=>setRole('Talaba')}>Talaba</button><button className={role==='O‘qituvchi'?'roleActive':''} onClick={()=>setRole('O‘qituvchi')}>O‘qituvchi</button></div><label className="field"><UserRound size={18}/><input placeholder="Talaba ID (yoki telefon)"/></label><label className="field"><LockKeyhole size={18}/><input type={showPass?'text':'password'} placeholder="Parol"/><button onClick={()=>setShowPass(!showPass)}>{showPass?<EyeOff size={17}/>:<Eye size={17}/>}</button></label><button className="primary" onClick={()=>setScreen('home')}>Kirish <ArrowRight size={18}/></button><div className="or">Yoki kirish</div><div className="social"><button onClick={()=>notify('Google orqali kirish keyingi versiyada')}>G</button><button onClick={()=>notify('Telegram orqali kirish keyingi versiyada')}>➤</button></div><p className="register">Hisobingiz yo‘qmi? <button onClick={()=>notify('Ro‘yxatdan o‘tish keyingi bosqichda')}>Ro‘yxatdan o‘tish</button></p></main>
 return <main className="app">
 <header className="header"><Logo/><button className="avatar" onClick={()=>nav('profile')}>ZA</button></header>
 {screen==='home'&&<section className="home"><div className="greeting"><div className="userMini">ZA</div><div><small>Assalomu alaykum,</small><h2>Zoxid! 👋</h2></div><button className="bell" onClick={()=>notify('Yangi bildirishnomalar yo‘q')}><Bell size={19}/><i/></button></div><div className="bankBanner"><div><b>Bank ishi</b><p>Yo‘nalish bo‘yicha<br/>darslar va muhokamalar</p></div><Art type="bank"/></div><div className="tiles"><button className="tileRed" onClick={()=>nav('lessons')}><Mic size={29}/><b>Jonli darslar</b><small>Live Class</small></button><button className="tilePurple" onClick={startQuiz}><Brain size={29}/><b>Zakovat</b><small>O‘yini</small></button><button className="tileBlue" onClick={()=>nav('materials')}><BookOpen size={29}/><b>Darslar</b><small>Materiallar</small></button><button className="tileOrange" onClick={()=>nav('community')}><Users size={29}/><b>Hamjamiyat</b><small>Talabalar</small></button></div><div className="sectionTitle"><h3>Jonli darslar</h3><button onClick={()=>nav('lessons')}>Barchasi <ChevronRight size={15}/></button></div>{rooms.slice(0,2).map(r=><button className="roomRow" key={r.title} onClick={()=>setRoom(r)}><span className="roomIcon"><Radio/></span><span className="roomDetails"><b>{r.title}</b><small>{r.host} · {r.count} tinglovchi</small></span><span className="liveBadge">● Live</span></button>)}</section>}
 {screen==='lessons'&&<section className="content"><p className="eyebrow">TALQIN LIVE</p><h1>Jonli dars</h1><p className="sub">Bank tizimi va uning tuzilmasi</p><div className="roomList">{rooms.map(r=><button className="roomRow" key={r.title} onClick={()=>setRoom(r)}><span className="roomIcon"><Radio/></span><span className="roomDetails"><b>{r.title}</b><small>{r.host} · {r.count} tinglovchi</small></span><span className="liveBadge">● Live</span></button>)}</div><button className="primary" onClick={()=>notify('Dars yaratish keyingi versiyada')}>＋ Yangi dars yaratish</button></section>}
 {screen==='quiz'&&<section className="content"><p className="eyebrow">TALQIN CHALLENGE</p><h1>Zakovat o‘yini</h1><div className="quizHero"><Art type="trophy"/><div><b>Bank ishi Zakovat</b><small>15 savol · 25 soniya</small></div></div><button className="primary" onClick={startQuiz}>O‘yinni boshlash <ArrowRight size={18}/></button></section>}
 {screen==='materials'&&<section className="content"><p className="eyebrow">BANK ISHI</p><h1>Darslar</h1><div className="materialHero"><Art type="books"/></div>{['Bank tizimiga kirish','Pul va kredit','Tijorat banklari','Markaziy bank'].map((x,i)=><button className="materialRow" key={x} onClick={()=>notify(x+' materiali tez orada')}><BookMarked/><span><b>{x}</b><small>{i+1}-mavzu · Konspekt va muhokama</small></span><ChevronRight/></button>)}</section>}
 {screen==='community'&&<section className="content"><p className="eyebrow">TALQIN COMMUNITY</p><h1>Hamjamiyat</h1><div className="communityHero"><Art type="bank"/><b>Bilim birlashganda kuchayadi.</b></div>{['Madina B.','Dilshod S.','Bekzod R.','Zoxid A.'].map((x,i)=><div className="member" key={x}><span>{x.split(' ').map(v=>v[0]).join('')}</span><div><b>{x}</b><small>Bank ishi · {i+1}-kurs</small></div><i/></div>)}</section>}
 {screen==='profile'&&<section className="content"><p className="eyebrow">TALQIN ACCOUNT</p><h1>Profil</h1><div className="profileCard"><div className="profileAvatar">ZA</div><h2>Zoxid Abdokimov</h2><p>Bank ishi · Talaba</p><span>Talqin a’zosi</span></div><div className="stats"><div><b>320 XP</b><small>Ball</small></div><div><b>8</b><small>Zakovat</small></div><div><b>12 soat</b><small>Darslar</small></div></div><button className="materialRow" onClick={()=>notify('Sozlamalar keyingi versiyada')}><Settings/><b>Sozlamalar</b><ChevronRight/></button><button className="materialRow" onClick={()=>setScreen('login')}><LogOut/><b>Chiqish</b><ChevronRight/></button></section>}
 {bottom()}
 {room&&<div className="roomOverlay"><div className="roomModal"><div className="modalTop"><button onClick={()=>setRoom(null)}><X/></button><span className="liveBadge">● LIVE</span><button onClick={()=>notify('Ulashish')}><Share2/></button></div><h2>{room.title}</h2><p>Ovozli dars · {room.count} tinglovchi</p><div className="speaker"><div className="speakerPhoto">DS</div><b>{room.host}</b><small>O‘qituvchi</small><div className="wave">{Array.from({length:22},(_,i)=><i key={i} style={{height:8+(i*13)%27}}/>)}</div></div><div className="people"><span>ZA</span><span>MB</span><span>BR</span><span>+38</span></div><div className="controls"><button onClick={()=>setMuted(!muted)}>{muted?<MicOff/>:<Mic/>}<small>{muted?'Mikrofon o‘chiq':'Mikrofon yoqilgan'}</small></button><button onClick={()=>notify('Qo‘l ko‘tarildi')}><Hand/><small>Qo‘l ko‘tarish</small></button><button className="hangup" onClick={()=>setRoom(null)}><Phone/><small>Chiqish</small></button></div><small className="demo">Demo xona · Jonli audio hali ulanmagan</small></div></div>}
 {screen==='quiz'&&<div className="quizOverlay"><div className="quizCard"><div className="quizTop"><button onClick={()=>nav('home')}><ArrowLeft/></button><b>Zakovat o‘yini</b><span>{q+1}/15</span></div><div className="progress"><i style={{width:(q+1)/15*100+'%'}}/></div><span className="questionNo">SAVOL {q+1}</span><h2>{questions[q%questions.length].q}</h2><span className="timer">◷ 00:25</span><div className="answers">{questions[q%questions.length].a.map((a,i)=><button key={a} onClick={()=>pick(i)} className={answer!==null&&i===questions[q%questions.length].correct?'correct':answer===i?'incorrect':''}><span>{String.fromCharCode(65+i)}</span>{a}{answer!==null&&i===questions[q%questions.length].correct&&<Check/>}</button>)}</div><div className="quizBottom"><span>{score} ball</span><button disabled={answer===null} onClick={next}>{q===14?'Yakunlash':'Keyingi savol'} <ArrowRight size={17}/></button></div></div></div>}
 {toast&&<div className="toast"><Sparkles size={16}/>{toast}</div>}
 </main>
}
