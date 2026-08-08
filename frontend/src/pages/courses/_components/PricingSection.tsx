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
  durationMonths: number
  baseName?: string
  basePrice?: number
}

const BASE_PLANS: Record<string, { name: string; price: number }> = {
  month_1: { name: 'Gói 1 tháng', price: 139000 },
  month_3: { name: 'Gói 6 tháng', price: 499000 },
  month_12: { name: 'Gói 12 tháng', price: 799000 }
}

const cleanPlanNameForDisplay = (name: string) => {
  if (!name) return ''
  let clean = name.replace(/\s+từ\s+\d{2}:\d{2}\s+\d{2}\/\d{2}\/\d{4}\s+đến\s+\d{2}:\d{2}\s+\d{2}\/\d{2}\/\d{4}/g, '')
  clean = clean.replace(/\s+từ\s+\d{2}\/\d{2}\/\d{4}\s+đến\s+\d{2}\/\d{2}\/\d{4}/g, '')
  clean = clean.replace(/gi[aả]\u0309?m\s+(\d+)%\s*(?:-\s*)?gi[aả]\u0309?m\s+(\d+)%/gi, 'GIẢM $1%')
  return clean
}

export default function PricingSection() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, syncProfile, requestUpgradeSubscription, cancelUpgradeSubscription } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadError, setLoadError] = useState('')
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [copiedContent, setCopiedContent] = useState(false)

  const copyToClipboard = (text: string, type: 'account' | 'content') => {
    navigator.clipboard.writeText(text)
    if (type === 'account') {
      setCopiedAccount(true)
      setTimeout(() => setCopiedAccount(false), 2000)
    } else {
      setCopiedContent(true)
      setTimeout(() => setCopiedContent(false), 2000)
    }
  }
  const [bankSettings, setBankSettings] = useState({
    bankName: 'MB Bank (Ngân hàng Quân đội)',
    bankAccountNumber: '0842486222',
    bankAccountName: 'KIDDO LEARNING',
    bankCode: 'MB'
  })

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    if (syncProfile) {
      syncProfile().catch(err => console.error('Lỗi đồng bộ thông tin tài khoản:', err))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetch(`${API_URL}/api/store-settings`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setBankSettings({
            bankName: data.bank_name || 'MB Bank (Ngân hàng Quân đội)',
            bankAccountNumber: data.bank_account_number || '0842486222',
            bankAccountName: data.bank_account_name || 'KIDDO LEARNING',
            bankCode: data.bank_code || 'MB'
          })
        }
      })
      .catch(err => {
        console.error('Không thể tải cấu hình ngân hàng:', err)
      })
  }, [API_URL])

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

  const getTransferContent = () => {
    if (!selectedPlan) return ''
    const baseName = selectedPlan.baseName || BASE_PLANS[selectedPlan.key]?.name || selectedPlan.name
    const cleanName = baseName.replace(/\s*\(.*\)/g, '')
    const planNameClean = cleanName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toUpperCase()
    const contactInfo = user?.phone || user?.email?.split('@')[0] || ''
    return `${contactInfo} ${planNameClean}`.trim().replace(/\s+/g, ' ')
  }

  const handleConfirmPayment = async () => {
    if (!selectedPlan) return
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      // Manual payment flow: Do not auto-activate immediately.
      // Call requestUpgradeSubscription to set pending status in database.
      if (requestUpgradeSubscription) {
        await requestUpgradeSubscription(selectedPlan.id)
      }
      setShowSuccessAlert(true)
      setSelectedPlan(null)
    } catch (err: any) {
      setErrorMessage(err.message || 'Có lỗi xảy ra khi xử lý yêu cầu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPlanStyles = (key: string) => {
    if (key === 'month_1') {
      return {
        bgClass: 'bg-white',
        borderClass: 'border-[#a7e3b9]',
        banner: '/assets/cham_dieu_hay.jpg',
        checkIcon: '/assets/0b40b5852870bd86ba33ba6078e2bd0b4b0b6bad.svg',
        buttonBg: 'bg-[#339e4a] hover:bg-[#2a853e]',
        textColor: 'text-[#339e4a]'
      }
    } else if (key === 'month_3') {
      return {
        bgClass: 'bg-white',
        borderClass: 'border-[#ffdc64]',
        banner: '/assets/hanh_trinh_lon_khon.jpg',
        checkIcon: '/assets/5ff06334161ed0621fed80bef95568a1a034d49f.svg',
        buttonBg: 'bg-[#fea01f] hover:bg-[#e58f1a]',
        textColor: 'text-[#fea01f]'
      }
    } else {
      return {
        bgClass: 'bg-white',
        borderClass: 'border-[#7bc9ff]',
        banner: '/assets/vuon_canh_truong_thanh.jpg',
        checkIcon: '/assets/dfc0fd4a7226ab8dabdc2a5e582c88014bad289a.svg',
        buttonBg: 'bg-[#0a7ad8] hover:bg-[#085fb0]',
        textColor: 'text-[#0a7ad8]'
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const getPaymentAmount = (plan: Plan) => {
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
              className={`relative rounded-[32px] ${styles.bgClass} border-2 ${styles.borderClass} flex flex-col justify-between shadow-md hover:shadow-lg transition-all duration-200 w-full max-w-[400px] lg:max-w-none mx-auto pb-6`}
            >
              {/* popular badge */}
              {plan.isPopular && (
                <div 
                  className="absolute -top-3.5 z-10"
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  <div className="bg-[#fea01f] flex gap-1 items-center px-4 py-1.5 rounded-[40px] text-white font-vietnam font-bold text-[12px] md:text-[13px] whitespace-nowrap shadow-md animate-bounce">
                    <span className="text-[14px]">★</span>
                    <span>Phổ biến nhất</span>
                  </div>
                </div>
              )}

              {/* Banner image with wave mask at bottom */}
              <div className="relative w-full aspect-[4/3] rounded-t-[30px] overflow-hidden">
                <img 
                  src={styles.banner} 
                  alt={plan.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                  decoding="async"
                />
                <svg 
                  className="absolute bottom-0 left-0 w-full h-[32px] text-white fill-current" 
                  viewBox="0 0 1440 100" 
                  preserveAspectRatio="none"
                >
                  <path d="M0,50 Q360,95 720,50 T1440,50 L1440,100 L0,100 Z"></path>
                </svg>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow px-5 sm:px-6 pt-3 items-center justify-between gap-5 w-full">
                {/* name and price */}
                <div className="flex flex-col items-center gap-2 text-center w-full">
                  <span className="font-vietnam font-extrabold text-[18px] lg:text-[20px] text-[#313235]">
                    {cleanPlanNameForDisplay(plan.name)}
                  </span>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex gap-1 md:gap-1.5 items-end justify-center">
                      <span className={`font-baloo text-[36px] md:text-[32px] lg:text-[40px] xl:text-[48px] ${styles.textColor} leading-none font-bold`}>
                        {formatPrice(plan.price)}
                      </span>
                      <span className={`font-baloo text-[13px] md:text-[12px] lg:text-[14px] xl:text-[16px] ${styles.textColor} mb-1 lg:mb-2`}>
                        {plan.durationMonths === 1 ? '/ tháng' : `/ ${plan.durationMonths} tháng`}
                      </span>
                    </div>
                    {(() => {
                      const basePlan = BASE_PLANS[plan.key]
                      if (basePlan && plan.price < basePlan.price) {
                        const discountAmount = basePlan.price - plan.price
                        const discountPercent = Math.round((discountAmount / basePlan.price) * 100)
                        return (
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 mt-0.5 text-center">
                            <span className="text-gray-400 line-through text-[13px] font-semibold">
                              Gốc: {formatPrice(basePlan.price)}
                            </span>
                            <span className="bg-red-50 text-[#e83552] text-[11px] font-bold px-2 py-0.5 rounded-full border border-red-100 whitespace-nowrap">
                              Giảm {discountPercent}% (Tiết kiệm {formatPrice(discountAmount)})
                            </span>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>

                {/* Features list */}
                <div className="w-full flex justify-center flex-grow py-2">
                  <div className="flex flex-col gap-2.5 lg:gap-3 items-start justify-center">
                    {((plan.features as string[]) || []).map((feat, fIdx) => (
                      <div key={fIdx} className="flex gap-2.5 items-center w-full">
                        <img
                          alt="check"
                          className="w-5 h-5 lg:w-6 lg:h-6 object-contain shrink-0"
                          src={styles.checkIcon}
                          loading="lazy" decoding="async"
                        />
                        <span className="font-vietnam font-medium text-[14px] lg:text-[15px] text-[#313235] leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/login', { state: { from: location } })
                      return
                    }
                    if (user.isPaid) {
                      return
                    }
                    if (user.isPendingPaid) {
                      setShowSuccessAlert(true)
                      return
                    }
                    handleSelectPlan(plan)
                  }}
                  className={`${
                    user?.isPaid 
                      ? styles.buttonBg + ' opacity-75 cursor-default' 
                      : user?.isPendingPaid 
                        ? 'bg-[#fea01f] hover:bg-[#e58f1a] cursor-pointer' 
                        : styles.buttonBg + ' cursor-pointer'
                  } text-white font-baloo text-[18px] lg:text-[20px] py-2.5 w-full rounded-[40px] transition-colors duration-150 shadow-sm`}
                >
                  {user?.isPaid ? 'Đã kích hoạt' : user?.isPendingPaid ? 'Chờ xác nhận' : 'Chọn gói'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-[500px] max-h-[calc(100vh-32px)] overflow-y-auto rounded-[24px] border border-[#BAE6FD] bg-white p-5 sm:p-6 shadow-xl flex flex-col gap-4 sm:gap-5 animate-in fade-in zoom-in duration-200">
            
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
            <div className="flex flex-col gap-2 bg-[#f4fafd] rounded-xl p-3 border border-[#d0ecff] text-[15px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Khóa học đăng ký:</span>
                <span className="font-bold text-[#004c6e]">
                  {selectedPlan.baseName || BASE_PLANS[selectedPlan.key]?.name || selectedPlan.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Số tiền thanh toán:</span>
                <span className="font-bold text-[#e83552] text-[20px]">
                  {formatPrice(getPaymentAmount(selectedPlan))}
                </span>
              </div>
            </div>

            {/* VietQR Bank Info */}
            <div className="flex flex-col items-center gap-3">
              {/* VietQR Image - Larger & Fully Responsive */}
              <div className="relative p-2 bg-white border border-[#d0ecff] rounded-2xl shadow-sm flex items-center justify-center w-full max-w-[260px] mx-auto aspect-square">
                <img 
                  src={`https://img.vietqr.io/image/${bankSettings.bankCode}-${bankSettings.bankAccountNumber}-compact2.png?amount=${
                    getPaymentAmount(selectedPlan)
                  }&addInfo=${encodeURIComponent(getTransferContent())}&accountName=${encodeURIComponent(bankSettings.bankAccountName)}`}
                  alt="VietQR Payment Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <span className="text-[12px] sm:text-[13px] text-gray-400 font-medium text-center px-2">Quét mã QR bằng ứng dụng ngân hàng để chuyển khoản nhanh</span>
            </div>

            {/* Copyable Details */}
            <div className="space-y-3">
              {/* Số tài khoản */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[12px] sm:text-[13px] text-gray-500">
                  <span>Số tài khoản ({bankSettings.bankName}):</span>
                </div>
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 justify-between gap-2">
                  <span className="font-semibold text-[#0a7ad8] font-mono text-[14px] sm:text-[16px] break-all">{bankSettings.bankAccountNumber}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(bankSettings.bankAccountNumber, 'account')}
                    className="text-[11px] sm:text-[12px] text-white bg-[#0a7ad8] hover:bg-[#0860ab] px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0"
                  >
                    {copiedAccount ? 'Đã sao chép' : 'Sao chép'}
                  </button>
                </div>
              </div>

              {/* Nội dung */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[12px] sm:text-[13px] text-gray-500">
                  <span>Nội dung chuyển khoản (bắt buộc):</span>
                </div>
                <div className="flex items-center bg-[#fff8e8] border border-[#ffe09e] rounded-xl px-3 py-2 justify-between gap-2">
                  <span className="font-bold text-[#fea01f] font-mono text-[13px] sm:text-[15px] break-all">{getTransferContent()}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(getTransferContent(), 'content')}
                    className="text-[11px] sm:text-[12px] text-white bg-[#fea01f] hover:bg-[#e58f1a] px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0"
                  >
                    {copiedContent ? 'Đã sao chép' : 'Sao chép'}
                  </button>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-[450px] max-h-[calc(100vh-32px)] overflow-y-auto rounded-[24px] border border-[#ffebc3] bg-white p-5 sm:p-6 shadow-xl flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-[72px] h-[72px] rounded-full bg-[#fffcf5] border-2 border-[#fea01f] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#fea01f" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="font-baloo text-[22px] font-bold text-[#fea01f]">Đang chờ xác nhận chuyển khoản</h3>
            <p className="font-vietnam text-[15px] text-[#575e70] leading-relaxed">
              Yêu cầu kích hoạt gói học của bé đã được gửi lên hệ thống. Bố mẹ vui lòng chờ từ 5-10 phút để ban quản trị đối soát giao dịch chuyển khoản và kích hoạt tài khoản cho bé nhé!
            </p>
            <div className="flex flex-col gap-2.5 w-full mt-2">
              <button
                type="button"
                onClick={() => setShowSuccessAlert(false)}
                className="w-full py-2.5 rounded-[40px] bg-[#fea01f] hover:bg-[#e58f1a] text-white font-baloo text-[16px] font-bold shadow-md transition-colors cursor-pointer"
              >
                Đồng ý
              </button>
              <button
                type="button"
                onClick={async () => {
                  setIsSubmitting(true)
                  try {
                    if (cancelUpgradeSubscription) {
                      await cancelUpgradeSubscription()
                    }
                    setShowSuccessAlert(false)
                  } catch (err: any) {
                    alert(err.message || 'Không thể hủy yêu cầu.')
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-[40px] border border-red-200 hover:bg-red-50 text-red-500 font-baloo text-[16px] font-bold transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Đang hủy...' : 'Chưa thanh toán (Hủy yêu cầu)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
