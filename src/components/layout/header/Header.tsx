import { useState } from 'react'
import { useMatch } from 'react-router'
import { paths } from '../../../app/router/paths.ts'
import { UndevelopedDialog } from '../../shared/UndevelopedDialog.tsx'
import { Header as DesktopHeader } from './desktop/Header.tsx'
import { Header as MobileHeader } from './mobile/Header.tsx'

const shellClass =
  'fixed inset-x-0 top-0 z-40 h-16 font-header font-bold after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 after:content-[""] md:h-20'

export function Header() {
  const onHome = useMatch({ path: paths.home, end: true }) !== null
  const [noticeOpen, setNoticeOpen] = useState(false)
  const showNotice = () => setNoticeOpen(true)

  return (
    <header className={`${shellClass} ${onHome ? 'bg-transparent' : 'bg-ink'}`}>
      <DesktopHeader onUndeveloped={showNotice} />
      <MobileHeader onUndeveloped={showNotice} />
      <UndevelopedDialog open={noticeOpen} onClose={() => setNoticeOpen(false)} />
    </header>
  )
}
