# Hướng dẫn Thiết kế Responsive & Chống lỗi Scale Màn hình (Scale-Proof Guidelines)

Tài liệu này quy định 5 quy tắc thiết kế giao diện cho dự án **KIDDO**, giúp đảm bảo tất cả các trang web mới khi phát triển đều hiển thị hoàn hảo ở mọi độ phân giải (Full HD, 2K, 4K) và mọi tỉ lệ Windows Display Scale (100%, 125%, 150%, 200%).

---

## 📐 1. Quy tắc Breakpoint trong Tailwind CSS

Độ phân giải thực tế trình duyệt nhận được khi người dùng bật Windows Scale:
- **1920x1080 (Scale 100%)**: `1920 x 1080 px` (Kích hoạt `2xl`)
- **1920x1080 (Scale 125%)**: `1536 x 864 px` (Sát ranh giới `2xl`)
- **1920x1080 (Scale 150%)**: `1280 x 720 px` (Chạm `xl`)
- **2880x1920 (Scale 200%)**: `1440 x 960 px` (Nằm ở `xl`)

👉 **Quy tắc bắt buộc**:
- **KHÔNG BỎ QUA `lg:` (1024px) VÀ `xl:` (1280px)**: Tuyệt đối không nhảy vọt từ mobile/tablet (`sm`/`md`) trực tiếp lên `2xl:` (1536px).
- Tất cả giao diện dạng bảng, lưới (Grid), danh sách hoặc menu trên máy tính **phải thiết lập kiểu dáng mặc định desktop bắt đầu từ `lg:` (1024px) hoặc `xl:` (1280px)**.

```tsx
// ✅ ĐÚNG: Hỗ trợ linh hoạt từ xl (1280px) và 2xl (1536px)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// ❌ SAI: Thiếu xl, chỉ hiện 3 cột ở 2xl làm màn 1280px (Scale 150%) bị vỡ 2 cột
<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
```

---

## 📦 2. Khung chứa chính (Page Containers)

- Sử dụng chiều rộng tối đa thống nhất `max-w-[1920px]` kết hợp `mx-auto`.
- Dùng padding co giãn linh hoạt theo breakpoint: `px-4 sm:px-6 xl:px-8 2xl:px-12`.

```tsx
<main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 xl:px-8 2xl:px-12 py-6">
  {/* Nội dung trang */}
</main>
```

---

## 🎯 3. Tỷ lệ vị trí tương đối cho Banner & Ảnh minh họa

- Khi đặt các nút bấm hoặc linh vật đè lên ảnh nền nghệ thuật (Banner / Cover Image), **dùng tỷ lệ phần trăm thuần túy (`left: 32.2%`, `top: 78%`)** hoặc CSS Flex/Grid.
- **Không dùng `calc(27% + 100px)` hoặc hằng số `px` cứng**, vì hằng số `px` sẽ làm lệch vị trí khi chiều rộng màn hình thay đổi.

```tsx
// ✅ ĐÚNG: Nút bám sát vị trí chữ trên ảnh nền ở mọi tỉ lệ Scale
<button style={{ left: '32.2%', top: '78%', transform: 'translate(-50%, -50%)' }}>
  Bắt đầu
</button>

// ❌ SAI: 100px là cố định, khiến vị trí bị đẩy lệch khi viewport co về 1280px
<button style={{ left: 'calc(27% + 100px)', top: '78%' }}>
```

---

## ↕️ 4. Xử lý chiều cao màn hình (`height: 100dvh` / `h-screen`)

Khi xem ở Scale 150%, chiều cao thực tế trình duyệt chỉ còn **720px** (trừ bớt thanh địa chỉ trình duyệt còn ~630px).

👉 **Quy tắc bắt buộc**:
- Tránh đặt `overflow: hidden` và `height: 100dvh` cứng nếu nội dung trang dài hơn 600px.
- Nếu trang dạng Dashboard full-screen, luôn kết hợp media query kiểm tra chiều cao `min-height: 760px` hoặc cho phép cuộn tự nhiên khi chiều cao bị hạn chế:

```tsx
// ✅ ĐÚNG: Chỉ khóa full-screen khi chiều cao đủ rộng, cho phép cuộn khi màn hình bị nén chiều cao
<div className="min-h-screen flex flex-col xl:min-h-dvh xl:h-auto 2xl:h-[100dvh] 2xl:overflow-hidden">
```

---

## 📝 5. Xuống dòng tự nhiên cho chữ (Fluid Text Wrapping)

- Tránh viết ngắt dòng cứng bằng `<p>Chữ phần 1</p><p>chữ phần 2</p>`.
- Để văn bản tự động cuộn dòng mượt mà theo độ rộng khung chứa:

```tsx
// ✅ ĐÚNG: Văn bản tự ngắt dòng tự nhiên
<p className="font-vietnam text-[15px] sm:text-[16px] text-[#37393e] text-center">
  Nội dung hướng dẫn học tập sinh động cho trẻ
</p>

// ❌ SAI: Ngắt dòng cứng làm chữ bị lệch khi màn hình hẹp
<div className="text-center">
  <p>Nội dung hướng dẫn học</p>
  <p>tập sinh động cho trẻ</p>
</div>
```

---

## 🛠️ Checklist khi phát triển trang mới

1. [ ] Đã test thử resize cửa sổ trình duyệt về các độ rộng: `1280px`, `1440px`, `1536px`, `1920px`.
2. [ ] Đã mở F12 thử nghiệm chiều cao màn hình ngắn (`720px`) để đảm bảo không mất nút bấm.
3. [ ] Không có cuộn ngang ngoài ý muốn (`overflow-x`).
4. [ ] Khởi chạy `npm --prefix frontend run build` xác nhận 0 lỗi TypeScript.
