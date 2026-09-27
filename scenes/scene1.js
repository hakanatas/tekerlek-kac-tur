/* SAHNE 1 — BİSİKLET TEKERLEĞİ (0–10 s)  A wheel 60 cm across rolls along the road.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);
  const TAU = Math.PI * 2;

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Bisiklet tekerleği yolda dönüyor'],
      [10.6, 27.8, 'Problemi anlayalım ve tahmin edelim'],
      [28.4, 45.8, 'Strateji: bir turdaki yolu bul, 100 ile çarp'],
      [46.4, 61.8, 'Başka bir yol: yarıçapla hesapla'],
      [62.4, 79.8, 'Stratejiyi başka problemlerde deneyelim'],
    ]);
  }

  /** a bicycle wheel: rim, tyre, eight spokes, hub */
  function wheel(ctx, C, r, th, a, seed) {
    const f = F();
    f.circle(ctx, C, r, 1, a, seed, { w: 9 });
    f.circle(ctx, C, r * 0.88, 1, a * 0.6, seed + 1, { w: 3 });
    for (let i = 0; i < 4; i++) { const o = th + i * Math.PI / 4, d = [Math.cos(o), Math.sin(o)]; Ink.path(ctx, [[C[0] - d[0] * r * 0.86, C[1] - d[1] * r * 0.86], [C[0] + d[0] * r * 0.86, C[1] + d[1] * r * 0.86]], { w: 2, alpha: a * 0.5, seed: seed + 2 + i, taper: [0, 0] }); }
    Ink.dot(ctx, C[0], C[1], 7, { seed: seed + 9, alpha: a });
  }

  function road(ctx, env, t) {
    const L = KD.L(env), G = L.G, f = F(), a = END(t) * (1 - seg(t, 79.8, 80.4)); if (a <= 0) return;
    const r = G.r, turn = TAU * r;
    // two turns in scene 1; the wheel then waits at the end
    const th = 2 * TAU * inOut(seg(t, 5.0, 9.6)), w = f.roll(G.x0, G.gy, r, th), len = r * th;
    Ink.path(ctx, [[G.x0 - 120, G.gy], [G.x0 + 2 * turn + r + 120, G.gy]], { w: 4, alpha: a * 0.6 * seg(t, 4.4, 5.0), seed: 2800, taper: [0.1, 0.1] });
    if (len > 1) Ink.path(ctx, [[G.x0, G.gy], [G.x0 + len, G.gy]], { w: 8, alpha: a, color: LI.AMBER_RGB, seed: 2801, taper: [0, 0] });
    const k = seg(t, 4.4, 5.0) * a;
    if (k > 0) {
      wheel(ctx, w.C, r, th, k, 2810);
      ctx.fillStyle = `rgba(${LI.AMBER_RGB},${k})`; ctx.beginPath(); ctx.arc(w.P[0], w.P[1], 9, 0, TAU); ctx.fill();
      [0, 1, 2].forEach((i) => { if (len >= i * turn - 1) { const x = G.x0 + i * turn; Ink.path(ctx, [[x, G.gy - 14], [x, G.gy + 14]], { w: 4, alpha: k, seed: 2820 + i, taper: [0, 0] }); } });
      if (t > 5.0 && t < 28.0) f.T(ctx, `tur: ${(th / TAU).toFixed(1).replace('.', ',')}`, w.C[0], w.C[1] - r - 40, Object.assign({ size: G.s * 0.75, alpha: k * win(t, 5.0, 28.0), halo: true }, f.AMB));
    }
    const C = w.C;
    // the diameter (60 cm), later the radius (30 cm)
    const dk = win(t, 11.2, 45.8) * a;
    if (dk > 0) { Ink.path(ctx, [[C[0] - r, C[1]], [C[0] + r, C[1]]], { w: 5, alpha: dk, color: LI.AMBER_RGB, seed: 2830, taper: [0, 0] }); f.T(ctx, 'çap 60 cm', C[0], C[1] - 26, Object.assign({ size: G.s * 0.62, alpha: dk, halo: true }, f.AMB)); }
    const rk = win(t, 47.4, 61.8) * a;
    if (rk > 0) { Ink.path(ctx, [C, [C[0] + r, C[1]]], { w: 5, alpha: rk, color: LI.AMBER_RGB, seed: 2831, taper: [0, 0] }); f.T(ctx, 'yarıçap 30 cm', C[0] + r / 2, C[1] - 26, Object.assign({ size: G.s * 0.55, alpha: rk, halo: true }, f.AMB)); }
    // one turn = one circumference, then its length
    const b1 = win(t, 13.4, 61.8) * a;
    f.bracket(ctx, G.x0, G.x0 + turn, G.gy + 30, t > 30.0 ? '1 tur = 188,4 cm' : '1 tur = çember uzunluğu', b1, 2840, true);
    f.bracket(ctx, G.x0 + turn, G.x0 + 2 * turn, G.gy + 30, t > 30.0 ? '188,4 cm' : '', win(t, 30.4, 61.8) * a, 2841, true);
    if (t > 34.0 && t < 45.8) f.T(ctx, '× 100 tur', C[0], G.gy + 64, Object.assign({ size: G.s * 0.72, alpha: win(t, 34.0, 45.8) * a, halo: true }, f.AMB));
    if (t > 39.0 && t < 45.8) f.tick(ctx, L.W.x + (env.V ? 400 : 560), L.W.y[2], seg(t, 39.0, 39.6), win(t, 39.0, 45.8));
    // generalisation: a counter for the reverse problem
    const g = win(t, 63.0, 79.8) * a;
    if (g > 0) { const n = Math.round(500 * inOut(seg(t, 66.6, 68.6))); f.T(ctx, `${n} tur`, C[0], C[1] - r - 44, Object.assign({ size: G.s * 0.9, alpha: g * seg(t, 66.6, 67.0), halo: true }, f.AMB)); }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.2, 10.2, 'Çapı 60 cm. 100 turda kaç metre gider?'], [11.2, 27.8, 'Bileşenler: çap, tur sayısı, gidilen yol'],
      [29.4, 45.8, '1 tur: 3,14 × 60 = 188,4 cm'], [47.4, 61.8, 'Yarıçap 30 cm: 2 × 3,14 × 30 = 188,4 cm'],
      [63.0, 70.8, 'Bisiklet 942 m gitti. Kaç tur döndü?'], [71.4, 79.8, 'Çapı 50 cm olan tekerlek 100 turda: 3,14 × 50 × 100 = 15 700 cm = 157 m']]);
    exprs(ctx, t, at(W, 1), [[13.4, 27.8, '1 tur dönünce çember uzunluğu kadar yol alır'], [33.0, 45.8, '100 tur: 188,4 × 100 = 18 840 cm = 188,4 m'],
      [50.2, 61.8, 'Çap = 2 × yarıçap olduğu için sonuç aynı'], [66.6, 70.8, '94 200 cm ÷ 188,4 cm = 500 tur'],
      [74.0, 79.8, 'Yol = tur sayısı × π × çap: her tekerlekte geçerli', true]]);
    exprs(ctx, t, at(W, 2), [[20.0, 27.8, 'Tahmin: 1 tur yaklaşık 3 × 60 = 180 cm, 100 tur yaklaşık 180 m', true],
      [37.0, 45.8, 'Kontrol: tahmin 180 m, sonuç 188,4 m: yakın', true], [54.4, 61.8, 'İki yol da 188,4 m buldu', true],
      [68.8, 70.8, 'Ters problem: böl!', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['1 tur = çember uzunluğu = π × çap', 80.6], ['Tahmin et: π yerine 3 kullan', 81.6], ['Çap ya da yarıçap: 2 × π × yarıçap', 82.6], ['Yol = tur sayısı × π × çap', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); road(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A bicycle wheel', nameTr: 'Bisiklet tekerleği', concept: '60 cm across', conceptTr: 'Çapı 60 cm', render });
})(window.LI = window.LI || {});
