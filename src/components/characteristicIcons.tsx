import type { ReactNode } from 'react'
import { Radar, Zap, EyeOff, Waves, ArrowUp, Footprints, Users, Telescope } from 'lucide-react'
import type { PhysicalCharacteristic } from '../data/events'

const sizeClass = 'w-3 h-3'

/** Shared characteristic → Lucide icon map for timeline cards and filters */
export const characteristicIconMap: Partial<Record<PhysicalCharacteristic, ReactNode>> = {
  'instantaneous-acceleration': <Zap className={sizeClass} />,
  'low-observability': <EyeOff className={sizeClass} />,
  'transmedium': <Waves className={sizeClass} />,
  'anti-gravity': <ArrowUp className={sizeClass} />,
  'multi-sensor': <Radar className={sizeClass} />,
  'electromagnetic': <Zap className={sizeClass} />,
  'physical-traces': <Footprints className={sizeClass} />,
  'nuclear-association': <Zap className={sizeClass} />,
  'group-sighting': <Users className={sizeClass} />,
  'space': <Telescope className={sizeClass} />,
}
