export const useHeaderCallbacks = (path: string) => {
  const scrollToRef = (ref: HTMLElement | null) => {
    if (ref) {
      window.scrollTo({
        top: ref.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }
  const choseScroll = (link: string, handleBurguer?: () => void) => {
    let time = 0
    if (link === 'servicios' || link === 'sobrenosotros') {
      if (path !== '/') {
        time = 300
      }
      setTimeout(() => {
        scrollToRef(document.getElementById(link))
        if (handleBurguer) handleBurguer()
      }, time)
    }
  }
  const optionLink = (link: string) => {
    return link === 'servicios' || link === 'sobrenosotros'
      ? path !== '/'
        ? '/'
        : null
      : link
  }

  return { choseScroll, optionLink }
}

export default useHeaderCallbacks
