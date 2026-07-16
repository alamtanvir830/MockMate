import { AcademyMobileMenu } from '@/components/dashboard/AcademySidebar'

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AcademyMobileMenu />
      {children}
    </div>
  )
}
