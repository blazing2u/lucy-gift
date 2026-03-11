'use client'

import { useState, useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/* ═══════════════════════════════════════
   STORY DATA — 8 spreads
   ═══════════════════════════════════════ */

type Spread = {
  title: string
  body: string
  textSide: 'left' | 'right'
  gradient: string
  media?: string // path to image or video
  gallery?: string[] // multiple photos to click through
  collage?: string[] // side-by-side photos
  finalPage?: boolean
}

const SPREADS: Spread[] = [
  {
    textSide: 'right',
    gradient: 'linear-gradient(135deg, #c5d8ea, #b8cfdf, #d4e4f0)',
    gallery: [
      '/Page 3/20250111_201252.jpg',
      '/Page 3/IMG_20230805_143246 (1).jpg',
      '/Page 3/IMG_20230811_222715 (1).jpg',
      '/Page 3/IMG_20230813_203054.jpg',
    ],
    title: 'The One for Me',
    body: "I think you\u2019re the most beautiful girl. I\u2019m thankful to have met you.",
  },
  {
    textSide: 'left',
    gradient: 'linear-gradient(135deg, #b8cfdf, #a8c4d8, #d4e4f0)',
    gallery: [
      '/Page 6/20241014_131516.jpg',
      '/Page 6/20241016_134958.jpg',
      '/Page 6/20241019_150802 (1).jpg',
      '/Page 6/20250111_205819.jpg',
      '/Page 6/20260130_211700.jpg',
      '/Page 6/IMG_20230813_133401.jpg',
      '/Page 6/IMG_20240620_201507.jpg',
    ],
    title: 'Our Love Language',
    body: "There are 5 love languages. But I realize there\u2019s a 6th invented for you and it\u2019s food. Somehow going through all my pictures you\u2019re always mid eating something. I think it\u2019s really funny and cute.",
  },
  {
    textSide: 'left',
    gradient: 'linear-gradient(135deg, #a0bdd4, #b0c8dc, #d4e4f0)',
    media: '/Page 8/20260131_203737_1.mp4',
    title: 'Our Dynamic',
    body: "I love that when we\u2019re together we can just be our true selves. No embarrassment, no pretending. Just comfort, laughter, and the feeling that I\u2019m completely safe with you.",
  },
  {
    textSide: 'right',
    gradient: 'linear-gradient(135deg, #c0d6e8, #b4cce0, #eaf1f7)',
    collage: [
      '/Page 9/20260116_134823.jpg',
      '/Page 9/IMG_20230714_214559 (1).jpg',
    ],
    title: 'What Bonds Us Together',
    body: "One of the things I love most about you is how deeply you care for our family. You have such a gentle, loving way about you, and I know it\u2019s something special because even Coco feels safe with you. And I\u2019ve come to love Pluto like he\u2019s my own dog too\u2026 even though he attacks me the moment I walk through the door and somehow always finds a way to squeeze in between us on walks and during cuddles.",
  },
  {
    textSide: 'left',
    gradient: 'linear-gradient(135deg, #d4e4f0, #a0bdd4, #b8c8d8)',
    gallery: [
      '/Page 12/20241013_112011.jpg',
      '/Page 12/20241014_105103.jpg',
      '/Page 12/20241014_195323.jpg',
      '/Page 12/20241016_141656.jpg',
      '/Page 12/20241016_181344.jpg',
      '/Page 12/20241019_140052.jpg',
      '/Page 12/20241019_202623.jpg',
    ],
    title: 'Our Dream Vacation',
    body: "I knew this was something special when you took care of me while I was having a hard time on the plane\u2026 and when we somehow managed to survive the oily hair debacle. Our first trip together was one of my favorite memories together and one of the best trips I\u2019ve ever gone on.",
  },
  {
    textSide: 'left',
    gradient: 'linear-gradient(135deg, #c8daea, #b8cfdf, #dce8f2)',
    media: '/Page 14/20250628_115043.jpg',
    title: 'Future Adventures',
    body: "Every adventure feels more fun with you, and every trip becomes something special. I can\u2019t wait to keep exploring the world together.",
  },
  {
    textSide: 'right',
    gradient: 'linear-gradient(135deg, #c8d8e8, #a8c0d8, #dce8f4)',
    media: '/Page 15/WIN_20260311_15_54_34_Pro.mp4',
    title: 'To Our Future',
    body: '',
    finalPage: true,
  },
]

/* ═══════════════════════════════════════
   REUSABLE PIECES
   ═══════════════════════════════════════ */

function TextPage({ title, body, padSide }: { title: string; body: string; padSide: 'left' | 'right' }) {
  const paragraphs = body.split('\n\n')
  const isLong = body.length > 400

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      height: '100%',
      padding: isLong ? 'clamp(12px, 2.5vw, 28px)' : 'clamp(16px, 3.5vw, 40px)',
      ...(padSide === 'left'
        ? { paddingRight: isLong ? 'clamp(16px, 3vw, 36px)' : 'clamp(24px, 4.5vw, 50px)' }
        : { paddingLeft: isLong ? 'clamp(16px, 3vw, 36px)' : 'clamp(24px, 4.5vw, 50px)' }
      ),
      overflow: 'hidden',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 600,
        fontSize: isLong ? 'clamp(16px, 2.2vw, 26px)' : 'clamp(18px, 2.5vw, 30px)',
        lineHeight: 1.25,
        color: '#2a4060',
        marginBottom: '4px',
        flexShrink: 0,
      }}>{title}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: isLong ? 'clamp(6px, 1.2vw, 12px)' : 'clamp(10px, 1.8vw, 18px)', flexShrink: 0 }}>
        <div style={{ height: '1px', width: '28px', background: 'linear-gradient(to right, #7ba3c9, transparent)' }} />
        <span style={{ color: '#7ba3c9', fontSize: '9px' }}>&#10022;</span>
        <div style={{ height: '1px', width: '28px', background: 'linear-gradient(to left, #7ba3c9, transparent)' }} />
      </div>

      <div style={{
        fontFamily: 'var(--font-sans), sans-serif',
        fontWeight: 300,
        fontSize: isLong ? 'clamp(9.5px, 1.15vw, 12.5px)' : 'clamp(11px, 1.35vw, 14.5px)',
        lineHeight: isLong ? 1.6 : 1.75,
        color: '#546b84',
        overflow: 'hidden',
      }}>
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '0.5em' : 0 }}>{para}</p>
        ))}
      </div>
    </div>
  )
}

function MediaPage({ gradient, media }: { gradient: string; media?: string }) {
  const isVideo = media && /\.(mp4|webm|mov)$/i.test(media)

  if (media) {
    return (
      <div style={{
        width: '100%', height: '100%',
        background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}>
        {isVideo ? (
          <video
            src={media}
            autoPlay
            loop
            playsInline
            controls
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          />
        ) : (
          <img
            src={media}
            alt=""
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div style={{
      width: '100%', height: '100%',
      background: gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <svg width="52" height="52" viewBox="0 0 48 48" fill="none" style={{ opacity: 0.12 }}>
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="#2a4060" strokeWidth="1.2" />
        <circle cx="17" cy="21" r="4" stroke="#2a4060" strokeWidth="1.2" />
        <path d="M6 32l12-10 8 7 6-4 10 7" stroke="#2a4060" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function GalleryPage({ photos, gradient }: { photos: string[]; gradient: string }) {
  const [idx, setIdx] = useState(0)

  return (
    <div style={{
      width: '100%', height: '100%',
      background: gradient,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '16px',
      position: 'relative',
    }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '100%', minHeight: 0,
      }}>
        <img
          src={photos[idx]}
          alt=""
          style={{
            maxWidth: '100%', maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        />
      </div>
      {/* Gallery controls */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        marginTop: '10px', flexShrink: 0,
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length) }}
          style={{
            width: '26px', height: '26px', borderRadius: '50%',
            border: '1px solid rgba(123,163,201,0.4)', background: 'rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
          aria-label="Previous photo"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b8db8" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div style={{ display: 'flex', gap: '4px' }}>
          {photos.map((_, i) => (
            <div key={i} style={{
              width: idx === i ? '7px' : '5px',
              height: idx === i ? '7px' : '5px',
              borderRadius: '50%',
              background: idx === i ? '#5b8db8' : 'rgba(91,141,184,0.3)',
              transition: 'all 0.2s ease',
            }} />
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length) }}
          style={{
            width: '26px', height: '26px', borderRadius: '50%',
            border: '1px solid rgba(123,163,201,0.4)', background: 'rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
          aria-label="Next photo"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5b8db8" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 6 15 12 9 18" /></svg>
        </button>
      </div>
    </div>
  )
}

function CollagePage({ photos, gradient }: { photos: string[]; gradient: string }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: gradient,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
      gap: '8px',
    }}>
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          style={{
            flex: 1,
            minWidth: 0,
            height: '85%',
            objectFit: 'cover',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }}
        />
      ))}
    </div>
  )
}

function FinalPage({ title, media, gradient }: { title: string; media: string; gradient: string }) {
  const isVideo = /\.(mp4|webm|mov)$/i.test(media)
  return (
    <div style={{
      width: '100%', height: '100%',
      background: gradient,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      gap: '14px',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 600,
        fontSize: 'clamp(18px, 2.5vw, 28px)',
        color: '#2a4060',
        textAlign: 'center',
        flexShrink: 0,
      }}>{title}</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <div style={{ height: '1px', width: '28px', background: 'linear-gradient(to right, #7ba3c9, transparent)' }} />
        <span style={{ color: '#7ba3c9', fontSize: '9px' }}>&#10022;</span>
        <div style={{ height: '1px', width: '28px', background: 'linear-gradient(to left, #7ba3c9, transparent)' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 0 }}>
        {isVideo ? (
          <video
            src={media}
            autoPlay
            loop
            playsInline
            controls
            style={{
              maxWidth: '100%', maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            }}
          />
        ) : (
          <img src={media} alt="" style={{
            maxWidth: '100%', maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '6px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          }} />
        )}
      </div>
    </div>
  )
}

function PageContent({ spread, side }: { spread: Spread; side: 'left' | 'right' }) {
  if (spread.finalPage) {
    if (side === 'left') {
      return <FinalPage title={spread.title} media={spread.media!} gradient={spread.gradient} />
    }
    // Right side: blank endpaper
    return (
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(to left, #dce6f0, #eaf1f7)',
      }} />
    )
  }
  if (spread.textSide === side) {
    return <TextPage title={spread.title} body={spread.body} padSide={side} />
  }
  if (spread.collage) {
    return <CollagePage photos={spread.collage} gradient={spread.gradient} />
  }
  if (spread.gallery) {
    return <GalleryPage photos={spread.gallery} gradient={spread.gradient} />
  }
  return <MediaPage gradient={spread.gradient} media={spread.media} />
}

/* The inside-cover spread shown when the book first opens */
function DedicationSpread({ side }: { side: 'left' | 'right' }) {
  if (side === 'left') {
    return (
      <TextPage
        title="When We First Met"
        body={"We were both at a loss for words the day we first met. Not because we didn\u2019t have anything to say or because we were stunned, but because we decided sushi was a great idea for a first date.\n\nThe quiet moments were a little awkward. We would talk, eat a whole piece of sushi, chew quickly, and swallow before it was our turn to speak again. Somehow those moments reflected our relationship perfectly eat first, then talk later.\n\nGetting to meet Pluto for the first time was special too. And from that first day, I knew there was something about you. You felt special, and it made me so curious to get to know you more."}
        padSide="left"
      />
    )
  }
  // Right page: video
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #d4e4f0, #dfe9f3, #eaf1f7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <video
        src="/Page 1/VID_20230121_222358.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          maxWidth: '100%', maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: '6px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        }}
      />
    </div>
  )
}

/* Panel wrapper — adds the page background, curl shadow, and paper grain */
function Panel({ side, children }: { side: 'left' | 'right'; children: ReactNode }) {
  const radius = side === 'left' ? '5px 0 0 5px' : '0 5px 5px 0'
  const curl = side === 'left'
    ? 'inset -14px 0 22px -14px rgba(0,0,0,0.06)'
    : 'inset 14px 0 22px -14px rgba(0,0,0,0.06)'

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: '#eef3f8',
      borderRadius: radius,
      boxShadow: curl,
      flex: 1, minWidth: 0,
    }}>
      {children}
      {/* paper grain */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, opacity: 0.35,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'60\' height=\'60\' filter=\'url(%23n)\' opacity=\'.03\'/%3E%3C/svg%3E")',
      }} />
    </div>
  )
}

/* Page number overlay — rendered on top of the entire spread */
function PageNumbers({ leftNum, rightNum }: { leftNum: number; rightNum: number }) {
  const numStyle = (side: 'left' | 'right'): CSSProperties => ({
    position: 'absolute',
    bottom: '10px',
    ...(side === 'left' ? { left: '14px' } : { right: '14px' }),
    fontFamily: 'var(--font-sans), sans-serif',
    fontSize: '10px',
    color: 'rgba(42, 64, 96, 0.35)',
    pointerEvents: 'none',
  })

  return (
    <>
      <span style={numStyle('left')}>{leftNum}</span>
      <span style={numStyle('right')}>{rightNum}</span>
    </>
  )
}

/* ═══════════════════════════════════════
   MAIN BOOK
   ═══════════════════════════════════════ */

export default function Book() {
  /*
   * Layout: the book container is ALWAYS spread-width (880px).
   * The spine sits in the center. When closed, the cover occupies
   * the RIGHT half, and the whole book shifts left (translateX(-25%))
   * so the cover appears centered on screen. Opening slides the book
   * to center (translateX(0)) while the cover swings open to the left.
   */
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open' | 'closing'>('closed')
  const [cur, setCur] = useState(-1)
  const [flip, setFlip] = useState<null | 'fwd' | 'bwd'>(null)
  const [animKey, setAnimKey] = useState(0)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const total = SPREADS.length
  const FLIP_MS = 900
  const SLIDE_MS = 700
  const COVER_MS = 1100

  const isOpen = phase === 'open'
  const animating = phase === 'opening' || phase === 'closing'

  // Initialize audio and autoplay on first user interaction
  useEffect(() => {
    const audio = new Audio('/music/JVKE - her (official lyric video).mp3')
    audio.loop = true
    audio.volume = 0.15
    audioRef.current = audio

    // Browsers block autoplay without user gesture, so try immediately
    // and if blocked, play on first click/key/touch anywhere
    const tryPlay = () => {
      audio.play().catch(() => {})
    }
    tryPlay()

    const playOnInteraction = () => {
      if (audio.paused) tryPlay()
      window.removeEventListener('click', playOnInteraction)
      window.removeEventListener('keydown', playOnInteraction)
      window.removeEventListener('touchstart', playOnInteraction)
    }
    window.addEventListener('click', playOnInteraction)
    window.addEventListener('keydown', playOnInteraction)
    window.addEventListener('touchstart', playOnInteraction)

    return () => {
      audio.pause()
      audio.src = ''
      window.removeEventListener('click', playOnInteraction)
      window.removeEventListener('keydown', playOnInteraction)
      window.removeEventListener('touchstart', playOnInteraction)
    }
  }, [])

  // Sync muted state
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  // Fade music on final page so video audio is audible
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const target = cur === total - 1 ? 0.02 : 0.15
    const step = target > audio.volume ? 0.005 : -0.005
    const id = setInterval(() => {
      const next = audio.volume + step
      if ((step > 0 && next >= target) || (step < 0 && next <= target)) {
        audio.volume = target
        clearInterval(id)
      } else {
        audio.volume = next
      }
    }, 30)
    return () => clearInterval(id)
  }, [cur, total])

  const openBook = useCallback(() => {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => setPhase('open'), SLIDE_MS + COVER_MS * 0.4)
  }, [phase])

  const closeBook = useCallback(() => {
    if (phase !== 'open' || flip) return
    setPhase('closing')
    setTimeout(() => {
      setPhase('closed')
      setCur(-1)
    }, SLIDE_MS + COVER_MS * 0.4)
  }, [phase, flip])

  const next = useCallback(() => {
    if (flip || !isOpen || animating || cur >= total - 1) return
    setFlip('fwd')
    setAnimKey(k => k + 1)
    setTimeout(() => { setCur(c => c + 1); setFlip(null) }, FLIP_MS)
  }, [flip, isOpen, animating, cur, total])

  const prev = useCallback(() => {
    if (flip || !isOpen || animating || cur <= -1) return
    setFlip('bwd')
    setAnimKey(k => k + 1)
    setTimeout(() => { setCur(c => c - 1); setFlip(null) }, FLIP_MS)
  }, [flip, isOpen, animating, cur])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (!isOpen && phase === 'closed') {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook() }
        return
      }
      if (isOpen) {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next() }
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
        if (e.key === 'Escape') { e.preventDefault(); closeBook() }
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, phase, openBook, next, prev, closeBook])

  const getSpreadSide = (idx: number, side: 'left' | 'right') => {
    if (idx === -1) return <DedicationSpread side={side} />
    return <PageContent spread={SPREADS[idx]} side={side} />
  }

  // Page numbers: dedication spread (idx -1) = pages 1,2; spread 0 = pages 3,4; etc.
  const getPageNum = (idx: number, side: 'left' | 'right') => {
    const base = (idx + 2) * 2
    return side === 'left' ? base - 1 : base
  }

  const underIdx = flip === 'fwd'
    ? Math.min(cur + 1, total - 1)
    : flip === 'bwd'
    ? Math.max(cur - 1, -1)
    : cur

  const isClosed = phase === 'closed'
  const showSpread = phase !== 'closed'

  const bookStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '880px',
    aspectRatio: '1.82 / 1',
    borderRadius: '6px',
    margin: '0 auto',
    transform: isClosed ? 'translateX(-25%)' : 'translateX(0)',
    transition: `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
  }

  const shadowStyle: CSSProperties = {
    position: 'absolute',
    top: 0, bottom: 0,
    right: 0,
    left: isClosed ? '50%' : '0',
    borderRadius: isClosed ? '4px 12px 12px 4px' : '6px',
    boxShadow: '0 18px 55px rgba(0,0,0,0.4), 0 5px 16px rgba(0,0,0,0.25)',
    transition: `left ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-radius ${SLIDE_MS}ms ease`,
    pointerEvents: 'none',
    zIndex: 50,
  }

  const innerStyle: CSSProperties = {
    position: 'absolute', inset: 0,
    display: 'flex',
    opacity: showSpread ? 1 : 0,
    transition: `opacity ${SLIDE_MS * 0.5}ms ease`,
  }

  const spineStyle: CSSProperties = {
    width: '5px', flexShrink: 0, position: 'relative', zIndex: 10,
    background: 'linear-gradient(to right, rgba(0,0,0,0.1), #8aa4b8 30%, #8aa4b8 70%, rgba(0,0,0,0.1))',
  }

  // Keyframe animation names
  const flipFwdName = `flipFwd_${animKey}`
  const flipBwdName = `flipBwd_${animKey}`
  const shadowFwdName = `shadowFwd_${animKey}`
  const shadowBwdName = `shadowBwd_${animKey}`

  const flipLayerStyle: CSSProperties = {
    position: 'absolute', top: 0, bottom: 0,
    zIndex: 20,
    transformStyle: 'preserve-3d',
    ...(flip === 'fwd' ? {
      left: 'calc(50% + 2.5px)',
      width: 'calc(50% - 2.5px)',
      transformOrigin: 'left center',
      animation: `${flipFwdName} ${FLIP_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
    } : {
      left: 0,
      width: 'calc(50% - 2.5px)',
      transformOrigin: 'right center',
      animation: `${flipBwdName} ${FLIP_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
    }),
  }

  const faceFront: CSSProperties = {
    position: 'absolute', inset: 0,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    background: '#eef3f8',
    borderRadius: flip === 'fwd' ? '0 5px 5px 0' : '5px 0 0 5px',
    boxShadow: flip === 'fwd'
      ? 'inset 14px 0 22px -14px rgba(0,0,0,0.06)'
      : 'inset -14px 0 22px -14px rgba(0,0,0,0.06)',
  }

  const faceBack: CSSProperties = {
    position: 'absolute', inset: 0,
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    overflow: 'hidden',
    background: 'linear-gradient(to right, #dce6f0, #eaf1f7)',
    borderRadius: flip === 'fwd' ? '5px 0 0 5px' : '0 5px 5px 0',
    boxShadow: flip === 'fwd'
      ? 'inset -14px 0 22px -14px rgba(0,0,0,0.06)'
      : 'inset 14px 0 22px -14px rgba(0,0,0,0.06)',
  }

  /* ── Cover ── */
  const coverOpen = phase === 'open' || phase === 'opening'
  const coverClose = phase === 'closing'

  const coverBase: CSSProperties = {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 'calc(50% + 2.5px)',
    width: 'calc(50% - 2.5px)',
    transformOrigin: 'left center',
    transformStyle: 'preserve-3d',
    zIndex: (phase === 'open') ? -1 : 100,
    cursor: isClosed ? 'pointer' : 'default',
    pointerEvents: isClosed ? 'auto' : 'none',
    transform: 'rotateY(0deg)',
    ...(coverOpen ? {
      animation: `coverOpen ${COVER_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${SLIDE_MS * 0.3}ms forwards`,
    } : {}),
    ...(coverClose ? {
      animation: `coverClose ${COVER_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
    } : {}),
  }

  const coverFront: CSSProperties = {
    position: 'absolute', inset: 0,
    backfaceVisibility: 'hidden',
    borderRadius: '0 12px 12px 0',
    background: 'linear-gradient(145deg, #9bbcd6 0%, #7ba3c9 30%, #5b8db8 100%)',
    boxShadow: 'inset 0 0 80px rgba(0,0,0,0.12)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '2rem',
    overflow: 'hidden',
  }

  const coverBack: CSSProperties = {
    position: 'absolute', inset: 0,
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    borderRadius: '12px 0 0 12px',
    background: 'linear-gradient(to left, #d8e4ee, #eaf1f7)',
    boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.06)',
  }

  const coverSpine: CSSProperties = {
    position: 'absolute',
    top: 0, bottom: 0, left: 0,
    width: '6px',
    background: 'linear-gradient(to right, rgba(0,0,0,0.15), #5b8db8 40%, #7ba3c9 60%, rgba(0,0,0,0.08))',
    borderRadius: '4px 0 0 4px',
    zIndex: 5,
  }

  // Generate floating hearts once (stable across renders)
  const [hearts] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      left: `${5 + (i * 37 + 13) % 90}%`,
      size: 10 + (i * 3) % 8,
      duration: 14 + (i * 7) % 12,
      delay: (i * 2.3) % 10,
      opacity: 0.25 + ((i * 13) % 10) * 0.03,
    }))
  )

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '20px 16px', gap: '24px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Floating hearts */}
      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) scale(0.6) rotate(-10deg);
            opacity: 0;
          }
        }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {hearts.map((h, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: h.left,
              bottom: '-20px',
              fontSize: `${h.size}px`,
              color: '#7ba3c9',
              opacity: h.opacity,
              animation: `floatHeart ${h.duration}s ease-in-out ${h.delay}s infinite`,
            }}
          >
            &#9829;
          </div>
        ))}
      </div>

      {/* Music toggle */}
      <button
        onClick={() => setMuted(m => !m)}
        style={{
          position: 'fixed', top: '16px', right: '16px',
          width: '36px', height: '36px', borderRadius: '50%',
          border: '1.5px solid rgba(123,163,201,0.3)',
          background: 'rgba(26,37,53,0.6)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1000,
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,163,201,0.6)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(123,163,201,0.3)' }}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7ba3c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7ba3c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        )}
      </button>

      {/* Injected keyframes */}
      <style>{`
        @keyframes coverOpen {
          0%   { transform: rotateY(0deg); }
          8%   { transform: rotateY(5deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes coverClose {
          0%   { transform: rotateY(180deg); }
          92%  { transform: rotateY(5deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
      {flip && (
        <style>{`
          @keyframes ${flipFwdName} {
            0%   { transform: rotateY(0deg) scale(1); }
            6%   { transform: rotateY(-8deg) scale(1.01); }
            50%  { transform: rotateY(-90deg) scale(1.03); }
            94%  { transform: rotateY(-172deg) scale(1.01); }
            100% { transform: rotateY(-180deg) scale(1); }
          }
          @keyframes ${flipBwdName} {
            0%   { transform: rotateY(0deg) scale(1); }
            6%   { transform: rotateY(8deg) scale(1.01); }
            50%  { transform: rotateY(90deg) scale(1.03); }
            94%  { transform: rotateY(172deg) scale(1.01); }
            100% { transform: rotateY(180deg) scale(1); }
          }
          @keyframes ${shadowFwdName} {
            0%   { opacity: 0; }
            35%  { opacity: 0.8; }
            50%  { opacity: 1; }
            65%  { opacity: 0.8; }
            100% { opacity: 0; }
          }
          @keyframes ${shadowBwdName} {
            0%   { opacity: 0; }
            35%  { opacity: 0.8; }
            50%  { opacity: 1; }
            65%  { opacity: 0.8; }
            100% { opacity: 0; }
          }
        `}</style>
      )}

      {/* Book */}
      <div style={{ perspective: '2200px', width: '100%', maxWidth: '880px', padding: '0 8px' }}>
        <div style={bookStyle}>
          {/* Shadow overlay */}
          <div style={shadowStyle} />

          {/* Base spread (underneath everything) */}
          <div style={innerStyle}>
            <Panel side="left">
              {getSpreadSide(underIdx, 'left')}
            </Panel>
            <div style={spineStyle}>
              <div style={{
                position: 'absolute', left: '50%', top: '8px', bottom: '8px',
                width: '1px', transform: 'translateX(-50%)',
                background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 3px, transparent 3px, transparent 8px)',
              }} />
            </div>
            <Panel side="right">
              {getSpreadSide(underIdx, 'right')}
            </Panel>
          </div>

          {/* Page numbers — rendered as overlay on top of spread */}
          {showSpread && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 110 }}>
              <PageNumbers
                leftNum={getPageNum(underIdx, 'left')}
                rightNum={getPageNum(underIdx, 'right')}
              />
            </div>
          )}

          {/* Flipping page */}
          {flip && (
            <div key={animKey} style={flipLayerStyle}>
              <div style={faceFront}>
                {getSpreadSide(cur, flip === 'fwd' ? 'right' : 'left')}
              </div>
              <div style={faceBack}>
                {getSpreadSide(
                  flip === 'fwd' ? Math.min(cur + 1, total - 1) : Math.max(cur - 1, -1),
                  flip === 'fwd' ? 'left' : 'right'
                )}
              </div>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                background: flip === 'fwd'
                  ? 'linear-gradient(to right, rgba(0,0,0,0.14), transparent 55%)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.14), transparent 55%)',
                animation: `${flip === 'fwd' ? shadowFwdName : shadowBwdName} ${FLIP_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
              }} />
            </div>
          )}

          {/* ═══ BOOK COVER ═══ */}
          <div style={coverBase} onClick={isClosed ? openBook : undefined}>
            {/* Spine edge */}
            <div style={coverSpine} />
            {/* Front face */}
            <div style={coverFront}>
              {/* Subtle texture */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(48deg, transparent, transparent 1.5px, rgba(255,255,255,0.03) 1.5px, rgba(255,255,255,0.03) 3px)',
              }} />
              {/* Silver-blue inset border */}
              <div style={{
                position: 'absolute', top: '14px', right: '14px', bottom: '14px', left: '20px',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: '3px', pointerEvents: 'none',
              }} />
              {/* Title content */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginLeft: '6px' }}>
                <div style={{ fontSize: '28px', color: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>&#9829;</div>
                <h1 style={{
                  fontFamily: 'var(--font-serif), Georgia, serif',
                  fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  fontSize: 'clamp(22px, 4vw, 36px)',
                  marginBottom: '8px', lineHeight: 1.2,
                }}>Our Story</h1>
                <div style={{
                  width: '50px', height: '1px', margin: '0 auto 10px',
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                }} />
                <p style={{
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontWeight: 400, fontStyle: 'italic',
                  fontSize: '13px', color: 'rgba(255,255,255,0.5)',
                }}>A love story</p>
              </div>
              {/* Click hint */}
              {isClosed && !animating && (
                <p style={{
                  position: 'absolute', bottom: '20px',
                  fontFamily: 'var(--font-sans), sans-serif',
                  fontSize: '10px', letterSpacing: '0.12em', fontWeight: 500,
                  color: 'rgba(255,255,255,0.3)',
                  marginLeft: '6px',
                }}>CLICK TO OPEN</p>
              )}
            </div>
            {/* Back face (inside of cover) */}
            <div style={coverBack} />
          </div>
        </div>
      </div>

      {/* Navigation — only show when book is open */}
      {isOpen && !animating && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <button
            onClick={prev}
            disabled={cur <= -1 || !!flip}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid #7ba3c9', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', opacity: cur <= -1 || flip ? 0.2 : 1,
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { if (cur > -1) (e.currentTarget.style.transform = 'scale(1.1)') }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7ba3c9" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {Array.from({ length: total + 1 }).map((_, i) => {
              const idx = i - 1
              return (
                <div key={i} style={{
                  width: idx === cur ? '8px' : '5px',
                  height: idx === cur ? '8px' : '5px',
                  borderRadius: '50%',
                  background: idx === cur ? '#7ba3c9' : 'rgba(123,163,201,0.25)',
                  transition: 'all 0.3s ease',
                }} />
              )
            })}
          </div>

          <button
            onClick={next}
            disabled={cur >= total - 1 || !!flip}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              border: '1.5px solid #7ba3c9', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', opacity: cur >= total - 1 || flip ? 0.2 : 1,
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={e => { if (cur < total - 1) (e.currentTarget.style.transform = 'scale(1.1)') }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7ba3c9" strokeWidth="2" strokeLinecap="round"><polyline points="9 6 15 12 9 18" /></svg>
          </button>
        </nav>
      )}

      {isOpen && !animating && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <p style={{
            fontFamily: 'var(--font-sans), sans-serif',
            fontSize: '11px', color: 'rgba(123,163,201,0.5)',
            letterSpacing: '0.04em',
          }}>
            Pages {getPageNum(cur, 'left')}–{getPageNum(cur, 'right')} of {getPageNum(total - 1, 'right')}
          </p>
          <button
            onClick={closeBook}
            disabled={!!flip}
            style={{
              fontFamily: 'var(--font-sans), sans-serif',
              fontSize: '10px', letterSpacing: '0.1em', fontWeight: 500,
              color: 'rgba(123,163,201,0.55)',
              background: 'transparent',
              border: '1px solid rgba(123,163,201,0.25)',
              borderRadius: '12px',
              padding: '4px 12px',
              cursor: 'pointer',
              transition: 'opacity 0.2s, border-color 0.2s',
              opacity: flip ? 0.3 : 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(123,163,201,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(123,163,201,0.25)' }}
            aria-label="Close book"
          >
            CLOSE
          </button>
        </div>
      )}
    </div>
  )
}
