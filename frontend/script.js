function sepeteEkle(ad,fiyat){

let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

sepet.push({
ad:ad,
fiyat:fiyat
});

localStorage.setItem("sepet",JSON.stringify(sepet));

alert(ad + " sepete eklendi 🛒");

}

function sepetiGoster(){

let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

let alan = document.getElementById("sepetAlani");

let toplam = 0;

if(!alan) return;

alan.innerHTML = "";

if(sepet.length == 0){

alan.innerHTML = "<h2>Sepetiniz boş</h2>";

document.getElementById("toplam").innerText = "Toplam: 0 TL";

return;

}

sepet.forEach((urun)=>{

toplam += urun.fiyat;

alan.innerHTML += `

<div class="cart-item">

<h2>${urun.ad}</h2>

<p>${urun.fiyat} TL</p>

</div>

`;

});

document.getElementById("toplam").innerText =
"Toplam: " + toplam + " TL";

}

function favoriyeEkle(ad,fiyat){

let favoriler =
JSON.parse(localStorage.getItem("favoriler")) || [];

favoriler.push({
ad: ad,
fiyat: fiyat
});

localStorage.setItem("favoriler",
JSON.stringify(favoriler));

alert(ad + " favorilere eklendi ❤️");

}

function favorileriGoster(){

let favoriler =
JSON.parse(localStorage.getItem("favoriler")) || [];

let alan =
document.getElementById("favoriAlani");

if(!alan) return;

alan.innerHTML = "";

if(favoriler.length == 0){

alan.innerHTML = "<h2>Favori ürün bulunamadı</h2>";

return;

}

favoriler.forEach((urun)=>{

alan.innerHTML += `

<div class="cart-item">

<h2>${urun.ad}</h2>

<p>${urun.fiyat} TL</p>

<button onclick="sepeteEkle('${urun.ad}',${urun.fiyat})">
Sepete Ekle
</button>

</div>

`;

});

}

function odemeYap(){

let sepet =
JSON.parse(localStorage.getItem("sepet")) || [];

if(sepet.length == 0){

alert("Sepet boş, ödeme yapılamaz");

return;

}

let siparisler =
JSON.parse(localStorage.getItem("siparisler")) || [];

let yeniSiparis = {
tarih: new Date().toLocaleString("tr-TR"),
urunler: sepet
};

siparisler.push(yeniSiparis);

localStorage.setItem("siparisler",
JSON.stringify(siparisler));

alert("Ödeme alınmıştır teşekkürler ❤️");

localStorage.removeItem("sepet");

window.location.href = "siparislerim.html";

}

function siparisleriGoster(){

let siparisler =
JSON.parse(localStorage.getItem("siparisler")) || [];

let alan =
document.getElementById("siparisAlani");

if(!alan) return;

alan.innerHTML = "";

if(siparisler.length == 0){

alan.innerHTML = "<h2>Henüz sipariş bulunmuyor</h2>";

return;

}

siparisler.forEach((siparis,index)=>{

let toplam = 0;

let urunHTML = "";

siparis.urunler.forEach((urun)=>{

toplam += urun.fiyat;

urunHTML += `
<p>${urun.ad} - ${urun.fiyat} TL</p>
`;

});

alan.innerHTML += `

<div class="card" style="margin-bottom:25px;">

<h2>Sipariş No: ${index + 1}</h2>

<p><b>Tarih:</b> ${siparis.tarih}</p>

<br>

${urunHTML}

<br>

<h3>Toplam: ${toplam} TL</h3>

</div>

`;

});

}