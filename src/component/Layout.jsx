import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0C11]">
      <Header />
      <div className="px-5 lg:px-40">
        <div className="pt-[112px]">
          {children}
        </div>
      </div>
    </div>
  )
}
