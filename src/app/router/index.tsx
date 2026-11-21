import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '../../layouts/AppLayout.tsx'
import { HomePage } from '../../pages/HomePage.tsx'
import { OfflinePage } from '../../pages/OfflinePage.tsx'
import { StorePage } from '../../pages/StorePage.tsx'
import { paths } from './paths.ts'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={paths.home} replace />} />
      <Route path={paths.offline} element={<OfflinePage />} />
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.store} element={<StorePage />} />
      </Route>
      <Route path="*" element={<Navigate to={paths.home} replace />} />
    </Routes>
  )
}
