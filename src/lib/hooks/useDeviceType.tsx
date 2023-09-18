import { useWindowSize } from "usehooks-ts"

const MOBILE_MAX_WIDTH = 768
const TABLET_MIN_WIDTH = 768
const TABLET_MAX_WIDTH = 1024
const DESKTOP_MIN_WIDTH = 1024

export default function useDeviceType() {
  const { width } = useWindowSize()

  const isMobile = width < MOBILE_MAX_WIDTH
  const isTablet = width >= TABLET_MIN_WIDTH && width < TABLET_MAX_WIDTH
  const isDesktop = width >= DESKTOP_MIN_WIDTH

  return { isMobile, isTablet, isDesktop }
}