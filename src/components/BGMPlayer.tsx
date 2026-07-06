import { useState, useRef, useCallback, useEffect } from 'react'
import { Music, VolumeX } from 'lucide-react'
import { assetUrl } from '../lib/utils'

/**
 * Cornfield Chase 背景音乐播放器（原声 MP3）
 * 页面加载后自动播放，浏览器策略阻止时显示首次交互浮层
 */
const BGM_SRC = assetUrl('/music/cornfield-chase.mp3')
// 背景音乐音量（0-1），原声录音无需衰减合成器那样的极小值
const BGM_VOLUME = 0.5

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const autoStartedRef = useRef(false)
  const userStoppedRef = useRef(false)

  // 创建 audio 元素，组件卸载时释放资源
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
    if (!audio) return
    try {
      await audio.play()
      setIsPlaying(true)
      setNeedsInteraction(false)
    } catch (err) {
      // 浏览器阻止自动播放，显示交互浮层
      setNeedsInteraction(true)
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
    } else {
      startAudio()
    }
  }, [isPlaying, startAudio, stopAudio])

  // 自动播放逻辑：页面加载后自动尝试播放
  useEffect(() => {
    const tryAutoPlay = async () => {
      if (userStoppedRef.current) return
      if (autoStartedRef.current) return

      try {
        await startAudio()
        autoStartedRef.current = true
      } catch (err) {
        // 浏览器阻止自动播放，显示交互浮层
        setNeedsInteraction(true)
      }
    }

    const timer = setTimeout(tryAutoPlay, 500)
    return () => clearTimeout(timer)
  }, [startAudio])

  // 用户首次交互时解锁并播放
  useEffect(() => {
    if (!needsInteraction) return
    if (userStoppedRef.current) return

    const handleInteraction = () => {
      startAudio()
      autoStartedRef.current = true
    }

    const events = ['click', 'touchstart', 'keydown']
    events.forEach((e) => document.addEventListener(e, handleInteraction, { once: true }))

    return () => {
      events.forEach((e) => document.removeEventListener(e, handleInteraction))
    }
  }, [needsInteraction, startAudio])

  // 页面可见性变化时暂停/恢复
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
    <>
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

      {/* 首次交互提示浮层 — 浏览器阻止自动播放时显示 */}
      {needsInteraction && !isPlaying && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          style={{ background: 'rgba(5, 10, 15, 0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => { startAudio() }}
        >
          <div className="text-center">
            <Music className="w-10 h-10 mx-auto mb-4" style={{ color: '#30B0D0', opacity: 0.6 }} />
            <p className="font-serif-display text-xl mb-2" style={{ color: '#EDE8E4' }}>
              Cornfield Chase
            </p>
            <p className="text-sm mb-6" style={{ color: '#8A99A8' }}>
              点击任意位置开启探索之旅
            </p>
            <button
              className="px-5 py-2 rounded-md text-sm font-medium transition-all hover:opacity-90"
              style={{ background: '#30B0D0', color: '#050A0F' }}
            >
              开始体验
            </button>
          </div>
        </div>
      )}
    </>
  )
}
