import defaultSettings from '@/settings'

const title = defaultSettings.title || "`Kev's Zone"

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
