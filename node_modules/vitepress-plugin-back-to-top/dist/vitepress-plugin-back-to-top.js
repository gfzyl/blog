import { defineComponent as _, ref as m, computed as h, onMounted as f, openBlock as d, createBlock as w, Transition as v, withCtx as T, unref as k, createElementBlock as g, createCommentVNode as y, pushScopeId as b, popScopeId as x, createElementVNode as a, render as B, h as C } from "vue";
const E = (e) => (b("data-v-09295527"), e = e(), x(), e), I = /* @__PURE__ */ E(() => /* @__PURE__ */ a("svg", {
  class: "icon-top",
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "currentColor",
  "stroke-width": "4",
  "stroke-linecap": "butt",
  "stroke-linejoin": "miter"
}, [
  /* @__PURE__ */ a("path", { d: "M39.6 30.557 24.043 15 8.487 30.557" })
], -1)), S = [
  I
], L = /* @__PURE__ */ _({
  __name: "back-to-top",
  props: {
    threshold: { default: 300 }
  },
  setup(e) {
    const t = e, o = m(0), c = h(() => o.value > t.threshold);
    f(() => {
      o.value = n(), window.addEventListener(
        "scroll",
        u(() => {
          o.value = n();
        }, 100)
      );
    });
    function n() {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }
    function p() {
      window.scrollTo({ top: 0, behavior: "smooth" }), o.value = 0;
    }
    function u(r, s = 100) {
      let l;
      return (...i) => {
        clearTimeout(l), l = setTimeout(() => {
          r.apply(null, i);
        }, s);
      };
    }
    return (r, s) => (d(), w(v, { name: "fade" }, {
      default: T(() => [
        k(c) ? (d(), g("div", {
          key: 0,
          class: "go-to-top",
          onClick: p
        }, S)) : y("", !0)
      ]),
      _: 1
    }));
  }
});
const M = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [c, n] of t)
    o[c] = n;
  return o;
}, N = /* @__PURE__ */ M(L, [["__scopeId", "data-v-09295527"]]), V = (e) => {
  typeof window > "u" || window.addEventListener("load", () => {
    const t = document.createElement("div");
    document.body.appendChild(t), B(
      C(N, {
        threshold: e == null ? void 0 : e.threshold
      }),
      t
    );
  });
};
export {
  V as default
};
