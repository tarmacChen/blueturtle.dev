export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col mx-auto p-4 gap-4 items-center">
      {children}
    </div>
  )
}
