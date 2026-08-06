/**
 * Payment Account Information Modal — edit bank details for checkout QR generation.
 */
import { Label, TextInput, Select } from 'flowbite-react';
import BaseDialog from '../../../components/shared/BaseDialog';
import { type PaymentAccountInfo } from '../constants';

interface PaymentAccountModalProps {
    open: boolean;
    onClose: () => void;
    paymentAccountInfo: PaymentAccountInfo;
    onChange: (info: PaymentAccountInfo) => void;
    onSave: () => void;
}

const POPULAR_BANKS = [
    { code: 'MB', name: 'MB Bank (Ngân hàng Quân đội)' },
    { code: 'VCB', name: 'Vietcombank (Ngân hàng Ngoại thương Việt Nam)' },
    { code: 'TCB', name: 'Techcombank (Ngân hàng Kỹ thương Việt Nam)' },
    { code: 'ICB', name: 'VietinBank (Ngân hàng Công thương Việt Nam)' },
    { code: 'BIDV', name: 'BIDV (Ngân hàng Đầu tư và Phát triển Việt Nam)' },
    { code: 'VBA', name: 'Agribank (Ngân hàng Nông nghiệp & Phát triển Nông thôn Việt Nam)' },
    { code: 'TPB', name: 'TPBank (Ngân hàng Tiên Phong)' },
    { code: 'VPB', name: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)' },
    { code: 'ACB', name: 'ACB (Ngân hàng Á Châu)' },
    { code: 'STB', name: 'Sacombank (Ngân hàng Sài Gòn Thương Tín)' },
    { code: 'SHB', name: 'SHB (Ngân hàng Sài Gòn - Hà Nội)' },
    { code: 'HDB', name: 'HDBank (Ngân hàng Phát triển TP.HCM)' },
    { code: 'MSB', name: 'MSB (Ngân hàng Hàng Hải)' },
    { code: 'VIB', name: 'VIB (Ngân hàng Quốc tế)' },
    { code: 'OCB', name: 'OCB (Ngân hàng Phương Đông)' },
    { code: 'LPB', name: 'LPBank (Ngân hàng Lộc Phát Việt Nam)' },
    { code: 'SEAB', name: 'SeABank (Ngân hàng Đông Nam Á)' },
];

const PaymentAccountModal = ({ open, onClose, paymentAccountInfo, onChange, onSave }: PaymentAccountModalProps) => {
    const isPopular = POPULAR_BANKS.some(b => b.code === paymentAccountInfo.bankCode);
    const selectValue = isPopular ? paymentAccountInfo.bankCode : (paymentAccountInfo.bankCode ? 'OTHER' : 'MB');

    const handleSelectChange = (val: string) => {
        if (val === 'OTHER') {
            onChange({
                ...paymentAccountInfo,
                bankCode: '',
                bankName: '',
            });
        } else {
            const selected = POPULAR_BANKS.find(b => b.code === val);
            if (selected) {
                onChange({
                    ...paymentAccountInfo,
                    bankCode: selected.code,
                    bankName: selected.name,
                });
            }
        }
    };

    return (
        <BaseDialog
            open={open}
            onClose={onClose}
            title="Thiết lập tài khoản thanh toán"
            size="2xl"
            onConfirm={onSave}
            confirmText="Lưu"
            bodyClassName="space-y-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Select bank dropdown */}
                <div className="flex flex-col gap-1 md:col-span-2">
                    <Label htmlFor="bank_select" className="text-gray-700 dark:text-gray-300">
                        Chọn ngân hàng
                    </Label>
                    <Select
                        id="bank_select"
                        value={selectValue}
                        onChange={(e) => handleSelectChange(e.target.value)}
                    >
                        {POPULAR_BANKS.map((b) => (
                            <option key={b.code} value={b.code}>
                                {b.name}
                            </option>
                        ))}
                        <option value="OTHER">Khác (Tự nhập thủ công)</option>
                    </Select>
                </div>

                {/* Show Bank Name & Code inputs ONLY if 'OTHER' is selected to keep UI clean */}
                {selectValue === 'OTHER' && (
                    <>
                        {/* Bank Name */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bank_name" className="text-gray-700 dark:text-gray-300">
                                Tên ngân hàng
                            </Label>
                            <TextInput
                                id="bank_name"
                                type="text"
                                placeholder="Ví dụ: MB Bank (Ngân hàng Quân đội)"
                                value={paymentAccountInfo.bankName || ''}
                                onChange={(e) => onChange({ ...paymentAccountInfo, bankName: e.target.value })}
                            />
                        </div>

                        {/* Bank Code */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bank_code" className="text-gray-700 dark:text-gray-300">
                                Mã ngân hàng (VietQR)
                            </Label>
                            <TextInput
                                id="bank_code"
                                type="text"
                                placeholder="Ví dụ: MB, VCB"
                                value={paymentAccountInfo.bankCode || ''}
                                onChange={(e) => onChange({ ...paymentAccountInfo, bankCode: e.target.value })}
                            />
                            <span className="text-[11px] text-gray-400 dark:text-gray-500">
                                Dùng để tạo ảnh mã QR thanh toán động
                            </span>
                        </div>
                    </>
                )}

                {/* Bank Account Number */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="bank_account_number" className="text-gray-700 dark:text-gray-300">
                        Số tài khoản
                    </Label>
                    <TextInput
                        id="bank_account_number"
                        type="text"
                        placeholder="Ví dụ: 0842486222"
                        value={paymentAccountInfo.bankAccountNumber || ''}
                        onChange={(e) => onChange({ ...paymentAccountInfo, bankAccountNumber: e.target.value })}
                    />
                </div>

                {/* Bank Account Name */}
                <div className="flex flex-col gap-1">
                    <Label htmlFor="bank_account_name" className="text-gray-700 dark:text-gray-300">
                        Tên chủ tài khoản
                    </Label>
                    <TextInput
                        id="bank_account_name"
                        type="text"
                        placeholder="Ví dụ: KIDDO LEARNING"
                        value={paymentAccountInfo.bankAccountName || ''}
                        onChange={(e) => onChange({ ...paymentAccountInfo, bankAccountName: e.target.value })}
                    />
                </div>
            </div>
        </BaseDialog>
    );
};

export default PaymentAccountModal;
