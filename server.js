const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let products = []; // تخزين المنتجات
let clients = []; // تخزين العملاء المتصلين

// إرسال التحديثات إلى العملاء
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream'); // نوع المحتوى
    res.setHeader('Cache-Control', 'no-cache'); // تعطيل الكاش
    res.setHeader('Connection', 'keep-alive'); // إبقاء الاتصال مفتوحًا
    res.flushHeaders();

    const clientId = Date.now(); // إنشاء معرف فريد للعميل
    const newClient = {
        id: clientId,
        res
    };
    clients.push(newClient); // إضافة العميل إلى القائمة

    // عند إغلاق الاتصال، قم بإزالة العميل من القائمة
    req.on('close', () => {
        clients = clients.filter(client => client.id !== clientId);
    });
});

// إضافة منتج جديد
app.post('/products', (req, res) => {
    const product = req.body; // البيانات المرسلة من العميل
    products.push(product); // إضافة المنتج إلى القائمة
    sendEventsToAll(product); // إرسال التحديث إلى جميع العملاء
    res.status(201).send(product); // إرسال استجابة ناجحة
});

// إرسال التحديثات إلى جميع العملاء
function sendEventsToAll(product) {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(product)}\n\n`));
}

// الحصول على جميع المنتجات
app.get('/products', (req, res) => {
    res.json(products); // إرسال قائمة المنتجات كـ JSON
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});