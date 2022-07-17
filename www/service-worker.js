if (!self.define) {
  let e; const s={}; const a=(a, r)=>(a=new URL(a+'.js', r).href, s[a]||new Promise(((s)=>{
    if ('document'in self) {
      const e=document.createElement('script'); e.src=a, e.onload=s, document.head.appendChild(e);
    } else e=a, importScripts(a), s();
  })).then((()=>{
    const e=s[a]; if (!e) throw new Error(`Module ${a} didn’t register its module`); return e;
  }))); self.define=(r, i)=>{
    const f=e||('document'in self?document.currentScript.src:'')||location.href; if (s[f]) return; const n={}; const o=(e)=>a(e, f); const d={module: {uri: f}, exports: n, require: o}; s[f]=Promise.all(r.map(((e)=>d[e]||o(e)))).then(((e)=>(i(...e), n)));
  };
}define(['./workbox-7d6a3f4d'], (function(e) {
  'use strict'; self.addEventListener('message', ((e)=>{
    e.data&&'SKIP_WAITING'===e.data.type&&self.skipWaiting();
  })), e.precacheAndRoute([{url: 'assets/apple-touch-icon-180x180.a8a626e7.png', revision: 'ddcec43383ea7c5e82452998573573fa'}, {url: 'assets/favicon-196x196.5d69e089.png', revision: '314d13b36b4119fda98a6d7f5cd5d933'}, {url: 'assets/Framework7Icons-Regular.a42aa071.woff2', revision: '4a39aba9fb8a2f831fa437780e1a058a'}, {url: 'assets/Framework7Icons-Regular.eba1e821.woff', revision: 'd03b787b6492fa2b0141c43fb7e56689'}, {url: 'assets/index.0de8b8ea.js', revision: 'cd4956ff768bd2f4d29e927d5d9d05bc'}, {url: 'assets/index.8ca32f33.css', revision: 'f481e6234c1384a260b5a51e15845c58'}, {url: 'assets/layers-2x.066daca8.png', revision: '4f0283c6ce28e888000e978e537a6a56'}, {url: 'assets/layers.1dbbe9d0.png', revision: 'a6137456ed160d7606981aa57c559898'}, {url: 'assets/marker-icon.574c3a5c.png', revision: '2273e3d8ad9264b7daa5bdbf8e6b47f8'}, {url: 'assets/material-icons.812f3b69.woff', revision: '54dfa9d2d4cb77b80750249adc5b2d1e'}, {url: 'assets/material-icons.f082f7fa.woff2', revision: '9f5d66557035535842ac29f97e57fe62'}, {url: 'index.html', revision: '0edb0fbf3106ce6a89b27742280acebf'}], {ignoreURLParametersMatching: [/^utm_/, /^fbclid$/]});
}));
// # sourceMappingURL=service-worker.js.map
