# Zab Siam Website Chatbot

## ติดตั้ง
อัปโหลด `zabsiam-chatbot.js` แล้ววางโค้ดนี้ก่อน `</body>`:

```html
<script>
window.ZABSIAM_CHATBOT_CONFIG = {
  contactEmail: "info@zabsiam.com",
  bookingUrl: "/event-catering#booking"
};
</script>
<script src="/path/zabsiam-chatbot.js"></script>
```

บอทตอบเรื่อง Package 1–3, ราคา, จำนวนแขก, ทีมงาน, เมนู, ข้อจำกัด Package 1, มัดจำ, การเดินทาง, สารก่อภูมิแพ้ และ edible flowers ได้ทันที

## ต่อ AI หลังบ้าน
ตั้งค่า `apiEndpoint: "/api/zabsiam-chat"` ใน config โดย endpoint รับ JSON `{ "message": "...", "knowledge": {} }` และตอบ `{ "reply": "..." }`

ห้ามใส่ API key ใน JavaScript หน้าเว็บ เพราะผู้เข้าชมสามารถมองเห็นได้
