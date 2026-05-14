const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB bağlantısı başarılı"))
.catch((err) => console.log(err));

const UrunSchema = new mongoose.Schema({
ad:String,
fiyat:Number,
kategori:String,
resim:String,
aciklama:String
});

const KullaniciSchema = new mongoose.Schema({
adsoyad:String,
email:String,
sifre:String
});

const SiparisSchema = new mongoose.Schema({
email:String,
urunler:Array,
toplam:Number,
tarih:{
type:Date,
default:Date.now
}
});

const Urun = mongoose.model("Urun",UrunSchema);

const Kullanici =
mongoose.model("Kullanici",KullaniciSchema);

const Siparis =
mongoose.model("Siparis",SiparisSchema);

app.get("/",(req,res)=>{

res.send("Civ Beautiful Backend Çalışıyor");

});

app.get("/urunler",async(req,res)=>{

const urunler = await Urun.find();

res.json(urunler);

});

app.post("/kayit",async(req,res)=>{

const yeniKullanici =
new Kullanici(req.body);

await yeniKullanici.save();

res.json({
mesaj:"Kayıt başarılı"
});

});

app.post("/giris",async(req,res)=>{

const kullanici = await Kullanici.findOne({
email:req.body.email,
sifre:req.body.sifre
});

if(kullanici){

res.json({
basarili:true,
kullanici:kullanici
});

}else{

res.json({
basarili:false
});

}

});

app.post("/siparis",async(req,res)=>{

const yeniSiparis =
new Siparis(req.body);

await yeniSiparis.save();

res.json({
mesaj:"Sipariş kaydedildi"
});

});

app.get("/siparisler",async(req,res)=>{

const siparisler =
await Siparis.find();

res.json(siparisler);

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

console.log("Server çalışıyor: " + PORT);

});
