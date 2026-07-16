import { AcademySidebar } from '@/components/dashboard/AcademySidebar'

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    // Break out of the parent max-w-5xl padding so the sidebar reaches the content edge
    <div className="flex -mx-4 sm:-mx-6 lg:-mx-8 -mt-8 -mb-8 min-h-screen">
      <AcademySidebar />
      {/* Content — re-applies vertical padding, right padding only (sidebar covers left) */}
      <div className="flex-1 min-w-0 py-8 pr-4 sm:pr-6 lg:pr-8 pl-6 lg:pl-8">
        {children}
      </div>
    </div>
  )
}
