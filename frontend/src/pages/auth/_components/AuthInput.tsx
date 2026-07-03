interface AuthInputProps {
  icon?: React.ReactNode
  suffix?: React.ReactNode
  children: React.ReactNode
}

export default function AuthInput({ icon, suffix, children }: AuthInputProps) {
  return (
    <div className="bg-white border border-[#8690a7] flex gap-2 items-center px-4 py-3 rounded-[24px] w-full focus-within:border-[#0a7ad8] focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150">
      {icon}
      {children}
      {suffix}
    </div>
  )
}
