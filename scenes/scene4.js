/* SAHNE 4 — BAŞKA BİR YOL (46–62 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 4, start: 46, end: 62, name: 'Another way', nameTr: 'Başka bir yol', concept: 'With the radius', conceptTr: 'Yarıçapla', render });
})(window.LI = window.LI || {});
