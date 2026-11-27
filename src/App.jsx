import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GraduationCap, ArrowRight, ArrowLeft, Eye, EyeOff, UserRound, LockKeyhole, Mail, Sparkles, ShieldCheck, BookOpen, Mic2 } from 'lucide-react'

const providers = [
  { name: 'Google', mark: 'G', className: 'google' },
  { name: 'Telegram', mark: '➤', className: 'telegram' },
  { name: 'Yandex', mark: 'Я', className: 'yandex' },
]

function ThreeHero() {
  const hostRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      host.classList.add('threeFallback')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))
    renderer.setSize(host.clientWidth, host.clientHeight, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, host.clientWidth / host.clientHeight, 0.1, 100)
    camera.position.set(0, 0.65, 7.8)
    const group = new THREE.Group()
    scene.add(group)

    scene.add(new THREE.HemisphereLight(0xffeaf0, 0x4c1222, 2.1))
    const key = new THREE.DirectionalLight(0xffffff, 3.2)
    key.position.set(-3, 5, 5)
    key.castShadow = true
    scene.add(key)
    const rim = new THREE.PointLight(0xff315b, 18, 12)
    rim.position.set(3, 1, -2)
    scene.add(rim)
    const fill = new THREE.PointLight(0xffb3c6, 8, 10)
    fill.position.set(-4, 0, 3)
    scene.add(fill)

    const red = new THREE.MeshPhysicalMaterial({ color: 0xc91538, metalness: 0.72, roughness: 0.23, clearcoat: 0.9 })
    const darkRed = new THREE.MeshPhysicalMaterial({ color: 0x65091e, metalness: 0.65, roughness: 0.27, clearcoat: 0.8 })
    const rose = new THREE.MeshStandardMaterial({ color: 0xff5078, metalness: 0.45, roughness: 0.32 })
    const black = new THREE.MeshStandardMaterial({ color: 0x21151b, metalness: 0.25, roughness: 0.38 })
    const gold = new THREE.MeshStandardMaterial({ color: 0xf4c66d, metalness: 0.78, roughness: 0.22 })
    const white = new THREE.MeshStandardMaterial({ color: 0xfff7fa, metalness: 0.15, roughness: 0.28 })

    const addMesh = (geometry, material, position, parent = group) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      parent.add(mesh)
      return mesh
    }
    // Rounded microphone body, grille and support
    addMesh(new THREE.CylinderGeometry(0.62, 0.56, 1.35, 48, 1, false), red, [0, 0.35, 0])
    addMesh(new THREE.SphereGeometry(0.56, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), darkRed, [0, 1.02, 0])
    addMesh(new THREE.SphereGeometry(0.49, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), rose, [0, 1.02, 0.02])
    // Grille perforations as small dark dots arranged around the capsule
    for (let row = 0; row < 6; row++) {
      const y = 0.65 + row * 0.13
      const radius = 0.49 * Math.sqrt(Math.max(0.12, 1 - ((y - 1.02) / 0.58) ** 2))
      for (let col = 0; col < 18; col++) {
        const angle = (col / 18) * Math.PI * 2
        const dot = addMesh(new THREE.SphereGeometry(0.025, 8, 8), black, [Math.sin(angle) * radius, y, Math.cos(angle) * radius + 0.035])
        dot.scale.set(1, 1, 0.55)
      }
    }
    addMesh(new THREE.TorusGeometry(0.58, 0.055, 12, 48), gold, [0, 0.28, 0],).rotation.x = Math.PI / 2
    addMesh(new THREE.CylinderGeometry(0.1, 0.12, 0.85, 24), darkRed, [0, -0.72, 0])
    addMesh(new THREE.CylinderGeometry(0.68, 0.76, 0.16, 48), red, [0, -1.17, 0])
    addMesh(new THREE.CylinderGeometry(0.5, 0.58, 0.08, 48), darkRed, [0, -1.28, 0])

    // Headphone arch and ear cups
    const arch = addMesh(new THREE.TorusGeometry(1.18, 0.13, 18, 64, Math.PI), darkRed, [0, 0.72, -0.02])
    arch.rotation.z = Math.PI
    const archHighlight = addMesh(new THREE.TorusGeometry(1.18, 0.035, 10, 64, Math.PI), rose, [0, 0.72, 0.08])
    archHighlight.rotation.z = Math.PI
    for (const side of [-1, 1]) {
      const cup = addMesh(new THREE.CapsuleGeometry(0.29, 0.58, 8, 18), darkRed, [side * 1.08, 0.15, 0.1])
      cup.rotation.z = side * -0.12
      addMesh(new THREE.CapsuleGeometry(0.23, 0.43, 8, 18), black, [side * 1.12, 0.15, 0.19])
      addMesh(new THREE.CylinderGeometry(0.16, 0.16, 0.07, 32), gold, [side * 1.28, 0.15, 0.19]).rotation.z = Math.PI / 2
    }

    // Floating sound-wave bars and a soft ground halo
    const waveGroup = new THREE.Group()
    group.add(waveGroup)
    for (const side of [-1, 1]) {
      for (let i = 0; i < 5; i++) {
        const height = [0.32, 0.58, 0.92, 0.68, 0.42][i]
        const bar = addMesh(new THREE.CapsuleGeometry(0.055, height, 4, 8), rose, [side * (1.65 + i * 0.17), 0.1, -0.12], waveGroup)
        bar.userData.baseY = 0.1
        bar.userData.phase = i * 0.7 + (side > 0 ? 0.8 : 0)
      }
    }
    const halo = addMesh(new THREE.TorusGeometry(2.2, 0.018, 8, 100), gold, [0, -1.32, 0])
    halo.rotation.x = Math.PI / 2
    halo.rotation.z = -0.15
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(2.1, 64), new THREE.MeshBasicMaterial({ color: 0xe52a50, transparent: true, opacity: 0.07 }))
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -1.37
    group.add(shadow)

    let frame = 0
    const clock = new THREE.Clock()
    const resize = () => {
      const width = Math.max(1, host.clientWidth)
      const height = Math.max(1, host.clientHeight)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    const onPointer = event => {
      const rect = host.getBoundingClientRect()
      pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35
      pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.2
    }
    host.addEventListener('pointermove', onPointer)
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    const animate = () => {
      frame = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      group.rotation.y += (pointerRef.current.x + Math.sin(t * 0.35) * 0.06 - group.rotation.y) * 0.035
      group.rotation.x += (-pointerRef.current.y + Math.sin(t * 0.5) * 0.025 - group.rotation.x) * 0.035
      group.position.y = Math.sin(t * 0.8) * 0.07
      waveGroup.children.forEach(bar => {
        bar.scale.y = 0.75 + (Math.sin(t * 2.5 + bar.userData.phase) + 1) * 0.24
      })
      renderer.render(scene, camera)
    }
    animate()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      host.removeEventListener('pointermove', onPointer)
      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(mat => mat.dispose())
          else obj.material.dispose()
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div className="threeHero" ref={hostRef} role="img" aria-label="TALQIN uchun animatsiyali 3D mikrofon va quloqchin modeli"><div className="threeGlow"/></div>
}

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
          <ThreeHero />
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
