/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Çap 60 cm: 100 turda kaç metre?', en: '60 cm across: how far in 100 turns?',
      note: 'Bir bisiklet tekerleğinin çapı 60 santimetre. Tekerlek 100 tur dönünce bisiklet kaç metre yol alır?' },
    { scene: 2, start: 10.8, end: 19.6, tr: '1 tur = çember uzunluğu kadar yol', en: 'One turn covers one circumference',
      note: 'Bileşenleri belirleyelim: çap, tur sayısı ve gidilen yol. Tekerlek bir tur dönünce, çemberinin uzunluğu kadar yol alır.' },
    { scene: 2, start: 20.0, end: 27.8, tr: 'Tahmin: yaklaşık 180 m', en: 'Estimate: about 180 m',
      note: 'Tahmin edelim: pi yerine 3 kullanırsak bir tur yaklaşık 3 çarpı 60, 180 santimetre. 100 tur yaklaşık 180 metre.' },
    { scene: 3, start: 28.6, end: 36.6, tr: '3,14 × 60 = 188,4 cm; × 100', en: '3.14 × 60 = 188.4 cm; × 100',
      note: 'Şimdi hesaplayalım: bir tur 3,14 çarpı 60, 188,4 santimetre. 100 tur, 18 840 santimetre, yani 188,4 metre.' },
    { scene: 3, start: 37.0, end: 45.8, tr: 'Kontrol: tahmine yakın', en: 'Check: close to the estimate',
      note: 'Kontrol edelim: tahminimiz 180 metreydi, sonuç 188,4 metre. Pi, 3’ten biraz büyük olduğu için sonuç da biraz büyük: tutarlı.' },
    { scene: 4, start: 46.6, end: 54.0, tr: 'Yarıçapla: 2 × 3,14 × 30', en: 'With the radius: 2 × 3.14 × 30',
      note: 'Başka bir yol: yarıçap 30 santimetre. Çember uzunluğu 2 çarpı 3,14 çarpı 30, yine 188,4 santimetre.' },
    { scene: 4, start: 54.4, end: 61.8, tr: 'İki yol, aynı sonuç', en: 'Two ways, the same answer',
      note: 'Çap yarıçapın iki katı olduğu için iki yol da aynı sonucu verir: 188,4 metre.' },
    { scene: 5, start: 62.6, end: 70.8, tr: '942 m için 500 tur', en: '500 turns for 942 m',
      note: 'Stratejiyi ters bir probleme uygulayalım: bisiklet 942 metre gittiyse kaç tur dönmüştür? 94 200 santimetreyi 188,4’e bölelim: 500 tur.' },
    { scene: 5, start: 71.2, end: 79.8, tr: 'Çap 50 cm: 100 turda 157 m', en: '50 cm across: 157 m in 100 turns',
      note: 'Başka bir tekerlek: çapı 50 santimetre. 100 turda 3,14 çarpı 50 çarpı 100, 15 700 santimetre, yani 157 metre. Yol, tur sayısı çarpı pi çarpı çap: her tekerlekte geçerli.' },
    { scene: 6, start: 80.6, end: 86.4, tr: '1 tur = π × çap', en: 'One turn = π × diameter',
      note: 'Aklında kalsın: tekerleğin bir turu, çember uzunluğu kadardır: pi çarpı çap. Tahmin için pi yerine 3 kullanabilirsin.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Yol = tur × π × çap!', en: 'Distance = turns × π × diameter!',
      note: 'Yol, tur sayısı çarpı pi çarpı çap!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
