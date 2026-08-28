import { useState, useRef, useCallback, useEffect } from 'react'
import { Music, VolumeX } from 'lucide-react'
import { assetUrl } from '../lib/utils'

/**
 * Cornfield Chase 背景音乐播放器（原声 MP3）
 * 页面加载后尝试自动播放；若被浏览器策略阻止，静默等待首次用户交互后播放。
 * 导航栏按钮可随时手动开关，不展示开场浮层。
 */
const BGM_SRC = assetUrl('/music/cornfield-chase.mp3')
const BGM_VOLUME = 0.5

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsGesture, setNeedsGesture] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const autoStartedRef = useRef(false)
  const userStoppedRef = useRef(false)

  useEffect(() => {
    const audio = new Audio(BGM_SRC)
    audio.loop = true
    audio.volume = BGM_VOLUME
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const startAudio = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await audio.play()
      setIsPlaying(true)
      setNeedsGesture(false)
      return true
    } catch {
      return false
    }
  }, [])

  const stopAudio = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopAudio()
      userStoppedRef.current = true
      setNeedsGesture(false)
    } else {
      userStoppedRef.current = false
      startAudio()
    }
  }, [isPlaying, startAudio, stopAudio])

  useEffect(() => {
    const tryAutoPlay = async () => {
      if (userStoppedRef.current || autoStartedRef.current) return

      const started = await startAudio()
      if (started) {
        autoStartedRef.current = true
        return
      }

      setNeedsGesture(true)
    }

    const timer = setTimeout(tryAutoPlay, 500)
    return () => clearTimeout(timer)
  }, [startAudio])

  useEffect(() => {
    if (!needsGesture || userStoppedRef.current) return

    const handleInteraction = () => {
      if (userStoppedRef.current || autoStartedRef.current) return
      startAudio().then((started) => {
        if (started) autoStartedRef.current = true
      })
    }

    const events = ['click', 'touchstart', 'keydown'] as const
    events.forEach((e) => document.addEventListener(e, handleInteraction, { once: true }))

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
    }
  }, [needsGesture, startAudio])

  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        audio.pause()
      } else if (isPlaying) {
        audio.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [isPlaying])

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-500 hover:bg-[rgba(48,176,208,0.15)]"
      style={{
        background: isPlaying ? 'rgba(48, 176, 208, 0.08)' : 'transparent',
        color: isPlaying ? '#30B0D0' : '#8A99A8',
        border: isPlaying ? '1px solid rgba(48, 176, 208, 0.25)' : '1px solid transparent',
      }}
      title={isPlaying ? '点击暂停 Cornfield Chase' : '点击播放 Cornfield Chase'}
    >
      <span className="relative flex items-center justify-center w-4 h-4">
        {isPlaying ? (
          <>
            <Music className="w-3.5 h-3.5" />
            <span
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
              style={{
                background: '#30B0D0',
                animation: 'bgm-breathe 2.5s ease-in-out infinite',
                boxShadow: '0 0 6px #30B0D0',
              }}
            />
          </>
        ) : (
          <VolumeX className="w-3.5 h-3.5" />
        )}
      </span>
      <span className="hidden md:inline">
        {isPlaying ? 'Cornfield Chase' : '播放 BGM'}
      </span>

      <style>{`
        @keyframes bgm-breathe {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </button>
  )
}
