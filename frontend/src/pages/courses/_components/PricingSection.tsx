import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

type Plan = {
  id: string
  key: string
  name: string
  price: number
  period: string
  features: string[]
  isPopular: boolean
}

export default function PricingSection() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, upgradeSubscription } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadError, setLoadError] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    fetch(`${API_URL}/api/subscription-plans`)
      .then(async res => {
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          throw new Error(data?.message || `Không thể tải gói cước (${res.status})`)
        }
        if (!Array.isArray(data)) {
          throw new Error('Dữ liệu gói cước không đúng định dạng')
        }
        return data as Plan[]
      })
      .then(data => {
        setPlans(data)
      })
      .catch(err => {
        console.error('Không thể tải gói cước:', err)
        setPlans([])
        setLoadError(err instanceof Error ? err.message : 'Không thể tải danh sách gói học phí')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [API_URL])

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      navigate('/login', { state: { from: location } })
      return
    }
    if (user.isPaid) {
      alert('Tài khoản của bé đã được kích hoạt khóa học rồi!')
      return
    }
    setSelectedPlan(plan)
  }

  const handleConfirmPayment = async () => {
    if (!selectedPlan) return
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      await upgradeSubscription()
      setShowSuccessAlert(true)
      setSelectedPlan(null)
    } catch (err: any) {
      setErrorMessage(err.message || 'Có lỗi xảy ra khi nâng cấp tài khoản.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPlanStyles = (key: string) => {
    if (key === 'month_1') {
      return {
        bgClass: 'bg-[#f4fafd]',
        borderClass: 'border border-[#7bc9ff]',
        icon: '/assets/3c3f39995745105cf6008eb2eb4c0fb2a25ba1bb.svg',
        iconBg: 'bg-[#c9e6ff]',
        checkIcon: '/assets/dfc0fd4a7226ab8dabdc2a5e582c88014bad289a.svg',
        buttonBg: 'bg-[#0a7ad8] hover:bg-[#085fb0]',
        textColor: 'text-[#0a7ad8]'
      }
    } else if (key === 'month_3') {
      return {
        bgClass: 'bg-[#fef9ed]',
        borderClass: 'border border-[#ffdc64]',
        icon: '/assets/6b00c04b54d964442be7b81612e99371c9b695d0.svg',
        iconBg: 'bg-[#ffdc64]',
        checkIcon: '/assets/5ff06334161ed0621fed80bef95568a1a034d49f.svg',
        buttonBg: 'bg-[#fea01f] hover:bg-[#e58f1a]',
        textColor: 'text-[#fea01f]'
      }
    } else {
      return {
        bgClass: 'bg-[#f2fbef]',
        borderClass: 'border border-[#9de4af]',
        icon: '/assets/d5df2987e88f6150a8448d212afd90bae454497f.svg',
        iconBg: 'bg-[#c3ffd0]',
        checkIcon: '/assets/0b40b5852870bd86ba33ba6078e2bd0b4b0b6bad.svg',
        buttonBg: 'bg-[#339e4a] hover:bg-[#2a853e]',
        textColor: 'text-[#339e4a]'
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const getPaymentAmount = (plan: Plan) => {
    if (plan.key === 'month_3') return plan.price * 3
    if (plan.key === 'month_12') return plan.price * 12
    return plan.price
  }

  if (loading) {
    return (
      <div className="w-full text-center py-20 text-gray-500 font-vietnam font-medium bg-white rounded-3xl border border-gray-100 shadow-sm">
        Đang tải thông tin gói cước học phí...
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="w-full rounded-3xl border border-[#ffd3d8] bg-[#fff7f8] px-6 py-12 text-center font-vietnam">
        <p className="font-bold text-[#e83552]">Không thể tải thông tin gói học phí</p>
        <p className="mt-2 text-[14px] text-[#575e70]">{loadError}</p>
      </div>
    )
  }

  return (
    <section className="w-full pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full justify-center">
        {plans.map((plan) => {
          const styles = getPlanStyles(plan.key)
          return (
            <div 
              key={plan.id} 
              className={`relative rounded-[24px] ${styles.bgClass} ${styles.borderClass} ${plan.isPopular ? 'border-4 border-[#fea01f]' : ''} p-4 sm:p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 items-center justify-between shadow-sm w-full max-w-[400px] lg:max-w-none mx-auto`}
            >
              {/* popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-[16px] md:-top-[18px] left-1/2 -translate-x-1/2 bg-[#fea01f] flex gap-1 items-center px-4 py-1 rounded-[40px] text-white font-vietnam font-medium text-[12px] md:text-[14px] whitespace-nowrap animate-bounce">
                  <img width="14" height="19"
                    alt="Popular"
                    className="w-4 h-4 md:w-5 md:h-5 object-contain"
                    src="/assets/ac919f35d87a1eccc24123b31500eba2cfa34cee.svg"
                    loading="lazy" decoding="async"
                  />
                  <span>Phổ biến nhất</span>
                </div>
              )}

              {/* Header info */}
              <div className="flex flex-col gap-2.5 lg:gap-3 items-center">
                {/* icon */}
                <div className={`p-1.5 lg:p-2 rounded-[100px] shrink-0 ${styles.iconBg}`}>
                  <img
                    alt=""
                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                    src={styles.icon}
                    loading="lazy" decoding="async"
                  />
                </div>

                {/* name and price */}
                <div className="flex flex-col items-center">
                  <span className="font-vietnam font-bold text-[16px] lg:text-[18px] text-black">
                    {plan.name}
                  </span>
                  <div className="flex gap-1 md:gap-1.5 items-end">
                    <span className={`font-baloo text-[36px] md:text-[32px] lg:text-[40px] xl:text-[48px] ${styles.textColor} leading-none font-bold`}>
                      {formatPrice(plan.price)}
                    </span>
                    <span className={`font-baloo text-[13px] md:text-[12px] lg:text-[14px] xl:text-[16px] ${styles.textColor} mb-1 lg:mb-2`}>
                      {plan.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="flex flex-col gap-2.5 lg:gap-3 w-full max-w-[240px] align-start">
                {((plan.features as string[]) || []).map((feat, fIdx) => (
                  <div key={fIdx} className="flex gap-2 items-center w-full">
                    <img
                      alt="check"
                      className="w-6 h-6 lg:w-7 lg:h-7 object-contain shrink-0"
                      src={styles.checkIcon}
                      loading="lazy" decoding="async"
                    />
                    <span className="font-vietnam font-medium text-[14px] lg:text-[16px] text-[#313235] leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => handleSelectPlan(plan)}
                className={`${styles.buttonBg} text-white font-baloo text-[18px] lg:text-[20px] py-2 w-full rounded-[40px] transition-colors duration-150`}
              >
                {user?.isPaid ? 'Đã kích hoạt' : 'Chọn gói'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] rounded-[24px] border border-[#BAE6FD] bg-white p-6 shadow-xl flex flex-col gap-5 animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-baloo text-[20px] font-bold text-[#004c6e]">Thông tin thanh toán</h3>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="text-gray-400 hover:text-gray-600 font-bold text-[18px]"
              >
                ✕
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[15px]">
                <span className="text-gray-500">Khóa học đăng ký:</span>
                <span className="font-bold text-[#313235]">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-[15px]">
                <span className="text-gray-500">Số tiền thanh toán:</span>
                <span className="font-bold text-[#e83552] text-[18px]">
                  {formatPrice(getPaymentAmount(selectedPlan))}
                </span>
              </div>
            </div>

            {/* VietQR Bank Info */}
            <div className="bg-[#f5fbfd] border border-[#d0ecff] rounded-xl p-4 flex flex-col gap-2.5">
              <div className="flex flex-col items-center gap-3">
                {/* VietQR Image */}
                <img 
                  src={`https://img.vietqr.io/image/MB-0842486222-compact2.png?amount=${
                    getPaymentAmount(selectedPlan)
                  }&addInfo=KIDDO_${user?.email?.split('@')[0]}_${selectedPlan.name.replace(/\s+/g, '')}&accountName=KIDDO%20LEARNING`}
                  alt="VietQR Payment Code"
                  className="w-[200px] h-[200px] object-contain rounded-lg border border-gray-100 bg-white p-1"
                />
                <span className="text-[12px] text-gray-400 text-center">Quét mã QR để chuyển khoản nhanh</span>
              </div>

              <div className="border-t border-[#d0ecff] pt-2.5 flex flex-col gap-1.5 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ngân hàng:</span>
                  <span className="font-semibold text-gray-700">MB Bank (Ngân hàng Quân đội)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Số tài khoản:</span>
                  <span className="font-semibold text-[#0a7ad8] font-mono">0842486222</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Chủ tài khoản:</span>
                  <span className="font-semibold text-gray-700">KIDDO LEARNING</span>
                </div>
                <div className="flex flex-col gap-1 mt-1 bg-[#fff8e8] border border-[#ffe09e] rounded p-2">
                  <span className="text-gray-500 text-[13px]">Nội dung chuyển khoản (bắt buộc):</span>
                  <span className="font-bold text-[#fea01f] font-mono text-[14px] break-all select-all">
                    {`KIDDO_${user?.email?.split('@')[0]}_${selectedPlan.name.replace(/\s+/g, '')}`}
                  </span>
                </div>
              </div>
            </div>

            {errorMessage && (
              <span className="text-sm text-red-500 font-medium">{errorMessage}</span>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="flex-1 py-2.5 rounded-[40px] border border-gray-300 font-vietnam font-medium text-[15px] text-gray-600 hover:bg-gray-50"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-[40px] bg-[#0a7ad8] hover:bg-[#0860ab] text-white font-baloo text-[16px] font-bold shadow-md transition-colors"
              >
                {isSubmitting ? 'Đang kích hoạt...' : 'Tôi đã chuyển khoản'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Success Alert Modal */}
      {showSuccessAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[450px] rounded-[24px] border border-[#c3ffd0] bg-white p-6 shadow-xl flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-[72px] h-[72px] rounded-full bg-[#e6ffeb] border-2 border-[#339e4a] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#339e4a" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-baloo text-[22px] font-bold text-[#339e4a]">Kích hoạt thành công!</h3>
            <p className="font-vietnam text-[15px] text-[#575e70] leading-relaxed">
              Cảm ơn bố mẹ đã tin tưởng! Gói học của bé đã được kích hoạt thành công trên hệ thống. Bé có thể bắt đầu tham gia mọi bài học thú vị của OTTOPIA ngay bây giờ.
            </p>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="w-full py-2.5 rounded-[40px] bg-[#339e4a] hover:bg-[#2a823d] text-white font-baloo text-[16px] font-bold shadow-md transition-colors"
            >
              Bắt đầu học ngay
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
