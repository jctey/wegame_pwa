import { Outlet, useMatch } from 'react-router'
import { HomePagerProvider } from '../providers/homePager.tsx'
import { paths } from '../app/router/paths.ts'
import { Header } from '../components/layout/header/Header.tsx'
import { SideNav } from '../components/layout/SideNav.tsx'
import FloatingWidget from '../components/shared/FloatingButton.tsx'

export function AppLayout() {
  const onHome = useMatch({ path: paths.home, end: true }) !== null

  return (
    <HomePagerProvider>
      <div className="min-h-svh bg-ink text-white [--nav-unit:5.20833vw]">
        <Header />
        {onHome ? <SideNav /> : null}
        <Outlet />
        <FloatingWidget />
      </div>
    </HomePagerProvider>
  )
}
