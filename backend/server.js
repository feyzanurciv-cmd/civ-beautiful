const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB bağlandı");
})
.catch((err) => {
    console.log("MongoDB hata:", err);
});

const KullaniciSchema = new mongoose.Schema({
    adsoyad: String,
    email: String,
    sifre: String
});

const SiparisSchema = new mongoose.Schema({
    email: String,
    urunler: Array,
    toplam: Number,
    tarih: {
        type: Date,
        default: Date.now
    }
});

const Kullanici = mongoose.model("Kullanici", KullaniciSchema);
const Siparis = mongoose.model("Siparis", SiparisSchema);

app.get("/", (req, res) => {
    res.send("Civ Beautiful Backend Çalışıyor");
});

app.post("/kayit", async (req, res) => {
    try {
        const yeniKullanici = new Kullanici(req.body);
        await yeniKullanici.save();

        res.json({
            mesaj: "Kayıt başarılı"
        });
    } catch (err) {
        res.status(500).json({
            mesaj: "Kayıt hatası",
            hata: err.message
        });
    }
});

app.post("/giris", async (req, res) => {
    try {
        const kullanici = await Kullanici.findOne({
            email: req.body.email,
            sifre: req.body.sifre
        });

        if (kullanici) {
            res.json({
                basarili: true,
                kullanici: kullanici
            });
        } else {
            res.json({
                basarili: false
            });
        }
    } catch (err) {
        res.status(500).json({
            mesaj: "Giriş hatası",
            hata: err.message
        });
    }
});

app.post("/siparis", async (req, res) => {
    try {
        const yeniSiparis = new Siparis(req.body);
        await yeniSiparis.save();

        res.json({
            mesaj: "Sipariş kaydedildi"
        });
    } catch (err) {
        res.status(500).json({
            mesaj: "Sipariş hatası",
            hata: err.message
        });
    }
});

app.get("/siparisler", async (req, res) => {
    try {
        const siparisler = await Siparis.find();
        res.json(siparisler);
    } catch (err) {
        res.status(500).json({
            mesaj: "Siparişler alınamadı",
            hata: err.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server çalışıyor: " + PORT);
});
