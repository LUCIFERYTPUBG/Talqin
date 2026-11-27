import React, { useState } from 'react'
import { GraduationCap, ArrowRight, ArrowLeft, Eye, EyeOff, UserRound, LockKeyhole, Mail, Sparkles, ShieldCheck, BookOpen, Mic2 } from 'lucide-react'

const providers = [
  { name: 'Google', mark: 'G', className: 'google' },
  { name: 'Telegram', mark: '➤', className: 'telegram' },
  { name: 'Yandex', mark: 'Я', className: 'yandex' },
]

function Brand({ large = false }) {
  return <div className={`talqinBrand ${large ? 'talqinBrandLarge' : ''}`}><GraduationCap aria-hidden="true"/><span>TALQIN</span></div>
}

export default function App() {
  const [role, setRole] = useState('student')
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notice, setNotice] = useState('')

  const isRegister = mode === 'register'
  const isReset = mode === 'reset'

  function handleSubmit(event) {
    event.preventDefault()
    setNotice('')
    if (isRegister && password !== confirmPassword) {
      setNotice('Parollar bir xil emas. Qayta tekshiring.')
      return
    }
    if (isReset) {
      setNotice('Parolni tiklash xizmati backend ulangandan keyin faollashadi.')
      return
    }
    setNotice('Kirish tizimi hozir dizayn bosqichida. Backend ulanishi keyingi bosqichda qo‘shiladi.')
  }

  function chooseRole(nextRole) {
    setRole(nextRole)
    setMode('login')
    setNotice('')
  }

  return (
    <main className="authPage">
      <div className="authAmbient authAmbientOne" aria-hidden="true"/>
      <div className="authAmbient authAmbientTwo" aria-hidden="true"/>
      <div className="authShell">
        <section className="authIntro">
          <Brand large />
          <div className="introCopy">
            <span className="eyebrow"><Sparkles size={14}/> TA’LIM • MULOQOT • BILIM</span>
            <h1>Bilimni tingla.<br/><em>Fikrni bildir.</em></h1>
            <p>Ta’lim, muloqot va bank ishi — barchasi bir platformada.</p>
          </div>
          <div className="introArt" aria-hidden="true">
            <div className="artHalo artHaloA"/><div className="artHalo artHaloB"/>
            <div className="artCore"><Mic2 size={44}/><span className="artSound"><i/><i/><i/><i/><i/></span></div>
            <div className="artBook"><BookOpen size={38}/></div>
            <span className="artSpark artSparkA">✦</span><span className="artSpark artSparkB">✧</span>
          </div>
          <div className="introFoot"><ShieldCheck size={15}/> Talabalar uchun zamonaviy bilim maydoni</div>
        </section>

        <section className="authCard" aria-label="TALQIN autentifikatsiya">
          <div className="mobileBrand"><Brand/></div>
          <div className="authCardHeader">
            <span className="authBadge"><GraduationCap size={15}/> TALQIN ACCOUNT</span>
            <h2>{isReset ? 'Parolni tiklash' : isRegister ? 'Hisob yarating' : 'Tizimga kirish'}</h2>
            <p>{isReset ? 'Email manzilingizni kiriting, tiklash yo‘riqnomasi yuboriladi.' : isRegister ? 'TALQIN bilimlar hamjamiyatiga qo‘shiling.' : 'Davom etish uchun hisobingizga kiring.'}</p>
          </div>

          {!isReset && <div className="roleTabs" role="tablist" aria-label="Foydalanuvchi turi">
            <button type="button" className={role === 'student' ? 'active' : ''} onClick={() => chooseRole('student')} role="tab" aria-selected={role === 'student'}>Talaba</button>
            <button type="button" className={role === 'teacher' ? 'active' : ''} onClick={() => chooseRole('teacher')} role="tab" aria-selected={role === 'teacher'}>O‘qituvchi</button>
          </div>}

          {!isReset && role === 'student' && <div className="modeTabs" role="tablist" aria-label="Kirish yoki ro‘yxatdan o‘tish">
            <button type="button" className={!isRegister ? 'active' : ''} onClick={() => {setMode('login');setNotice('')}} role="tab" aria-selected={!isRegister}>Kirish</button>
            <button type="button" className={isRegister ? 'active' : ''} onClick={() => {setMode('register');setNotice('')}} role="tab" aria-selected={isRegister}>Ro‘yxatdan o‘tish</button>
          </div>}

          {role === 'teacher' && !isReset && <div className="teacherNotice"><ShieldCheck size={17}/><span>O‘qituvchi akkaunti administrator tomonidan beriladi.</span></div>}

          <form className="authForm" onSubmit={handleSubmit}>
            {isRegister && <label className="formField"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Ism va familiya" autoComplete="name" required/></label>}
            <label className="formField"><Mail size={17}/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email manzilingiz" autoComplete="email" required/></label>
            {!isReset && <label className="formField"><LockKeyhole size={17}/><input value={password} onChange={e=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Parol" autoComplete={isRegister ? 'new-password' : 'current-password'} required/><button className="fieldEye" type="button" aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko‘rsatish'} onClick={()=>setShowPassword(v=>!v)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></label>}
            {isRegister && <label className="formField"><LockKeyhole size={17}/><input value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Parolni tasdiqlang" autoComplete="new-password" required/></label>}
            {!isRegister && !isReset && role === 'student' && <div className="formOptions"><label className="remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><span className="checkMark"/>Meni eslab qolish</label><button type="button" className="textLink" onClick={()=>{setMode('reset');setNotice('')}}>Parolni unutdingizmi?</button></div>}
            {isRegister && <label className="termsCheck"><input type="checkbox" required/><span>Foydalanish shartlari va maxfiylik siyosatiga roziman</span></label>}
            <button className="primaryAction" type="submit">{isReset ? 'Tiklash havolasini yuborish' : isRegister ? 'Hisob yaratish' : 'Kirish'}<ArrowRight size={18}/></button>
            {notice && <p className="authNotice" role="status">{notice}</p>}
          </form>

          {!isReset && role === 'student' && !isRegister && <>
            <div className="socialCaption"><span/> <small>Yoki tez kirish</small> <span/></div>
            <div className="socialProviders">{providers.map(provider=><button type="button" key={provider.name} className="providerButton" aria-label={provider.name+' orqali kirish'} onClick={()=>setNotice(provider.name+' orqali kirish OAuth sozlangandan keyin faollashadi.')}><span className={`providerMark ${provider.className}`}>{provider.mark}</span></button>)}</div>
          </>}
          <div className="authBottom">{isReset ? <><span>Esingizga tushdimi?</span><button type="button" onClick={()=>{setMode('login');setNotice('')}}>Kirishga qaytish</button></> : isRegister ? <><span>Hisobingiz bormi?</span><button type="button" onClick={()=>{setMode('login');setNotice('')}}>Kirish</button></> : role === 'student' ? <><span>Hisobingiz yo‘qmi?</span><button type="button" onClick={()=>{setMode('register');setNotice('')}}>Ro‘yxatdan o‘tish</button></> : <><span>Talabamisiz?</span><button type="button" onClick={()=>chooseRole('student')}>Talaba kirishi</button></>}</div>
        </section>
      </div>
      <footer className="pageFooter">© 2026 TALQIN <span>Bilimni tingla. Fikrni bildir.</span></footer>
    </main>
  )
}
