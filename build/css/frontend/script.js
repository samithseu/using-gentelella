(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const l of t.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && n(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
})();
const d = document.querySelector("#navlink"),
  c = document.querySelector("#cta"),
  a = document.querySelector("#toggle"),
  s = document.querySelector("header > nav"),
  u = document.querySelectorAll("h1,h2,h3,h4,div");
window.innerWidth < 768 &&
  (d.classList.add("hidden"), c.classList.add("hidden"));
window.addEventListener("resize", () => {
  window.innerWidth > 768
    ? (d.classList.remove("hidden"), c.classList.remove("hidden"))
    : (d.classList.add("hidden"), c.classList.add("hidden"));
});
a.addEventListener("click", (i) => {
  window.innerWidth < 768 &&
    (d.classList.toggle("hidden"), c.classList.toggle("hidden"));
});
window.addEventListener("scroll", () => {
  window.scrollY > 60
    ? (s.classList.remove("py-6"),
      s.classList.add("py-4"),
      s.parentElement.classList.add("bg-white/60"),
      s.parentElement.classList.add("shadow-sm"))
    : (s.classList.add("py-6"),
      s.parentElement.classList.remove("bg-white/60"),
      s.parentElement.classList.remove("shadow-sm"));
});
const h = new IntersectionObserver(
  (i, o) => {
    i.forEach((r, n) => {
      r.isIntersecting &&
        (r.target.style.setProperty("--delay", `${n * 50}ms`),
        r.target.classList.add("scroll-show"),
        o.unobserve(r.target));
    });
  },
  { threshold: 0.15 }
);
u.forEach((i) => h.observe(i));
