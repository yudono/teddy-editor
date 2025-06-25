import be, { forwardRef as ge, createElement as re, useState as j, useEffect as Z, useRef as fe } from "react";
var W = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ce;
function xe() {
  if (ce) return Y;
  ce = 1;
  var e = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function i(n, c, s) {
    var l = null;
    if (s !== void 0 && (l = "" + s), c.key !== void 0 && (l = "" + c.key), "key" in c) {
      s = {};
      for (var a in c)
        a !== "key" && (s[a] = c[a]);
    } else s = c;
    return c = s.ref, {
      $$typeof: e,
      type: n,
      key: l,
      ref: c !== void 0 ? c : null,
      props: s
    };
  }
  return Y.Fragment = o, Y.jsx = i, Y.jsxs = i, Y;
}
var J = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ie;
function ye() {
  return ie || (ie = 1, process.env.NODE_ENV !== "production" && function() {
    function e(r) {
      if (r == null) return null;
      if (typeof r == "function")
        return r.$$typeof === w ? null : r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case C:
          return "Fragment";
        case F:
          return "Profiler";
        case U:
          return "StrictMode";
        case x:
          return "Suspense";
        case R:
          return "SuspenseList";
        case b:
          return "Activity";
      }
      if (typeof r == "object")
        switch (typeof r.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), r.$$typeof) {
          case V:
            return "Portal";
          case g:
            return (r.displayName || "Context") + ".Provider";
          case $:
            return (r._context.displayName || "Context") + ".Consumer";
          case _:
            var m = r.render;
            return r = r.displayName, r || (r = m.displayName || m.name || "", r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef"), r;
          case T:
            return m = r.displayName || null, m !== null ? m : e(r.type) || "Memo";
          case y:
            m = r._payload, r = r._init;
            try {
              return e(r(m));
            } catch {
            }
        }
      return null;
    }
    function o(r) {
      return "" + r;
    }
    function i(r) {
      try {
        o(r);
        var m = !1;
      } catch {
        m = !0;
      }
      if (m) {
        m = console;
        var f = m.error, N = typeof Symbol == "function" && Symbol.toStringTag && r[Symbol.toStringTag] || r.constructor.name || "Object";
        return f.call(
          m,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          N
        ), o(r);
      }
    }
    function n(r) {
      if (r === C) return "<>";
      if (typeof r == "object" && r !== null && r.$$typeof === y)
        return "<...>";
      try {
        var m = e(r);
        return m ? "<" + m + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function c() {
      var r = v.A;
      return r === null ? null : r.getOwner();
    }
    function s() {
      return Error("react-stack-top-frame");
    }
    function l(r) {
      if (A.call(r, "key")) {
        var m = Object.getOwnPropertyDescriptor(r, "key").get;
        if (m && m.isReactWarning) return !1;
      }
      return r.key !== void 0;
    }
    function a(r, m) {
      function f() {
        z || (z = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          m
        ));
      }
      f.isReactWarning = !0, Object.defineProperty(r, "key", {
        get: f,
        configurable: !0
      });
    }
    function d() {
      var r = e(this.type);
      return I[r] || (I[r] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), r = this.props.ref, r !== void 0 ? r : null;
    }
    function u(r, m, f, N, H, M, Q, K) {
      return f = M.ref, r = {
        $$typeof: P,
        type: r,
        key: m,
        props: M,
        _owner: H
      }, (f !== void 0 ? f : null) !== null ? Object.defineProperty(r, "ref", {
        enumerable: !1,
        get: d
      }) : Object.defineProperty(r, "ref", { enumerable: !1, value: null }), r._store = {}, Object.defineProperty(r._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(r, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(r, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Q
      }), Object.defineProperty(r, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: K
      }), Object.freeze && (Object.freeze(r.props), Object.freeze(r)), r;
    }
    function h(r, m, f, N, H, M, Q, K) {
      var E = m.children;
      if (E !== void 0)
        if (N)
          if (S(E)) {
            for (N = 0; N < E.length; N++)
              p(E[N]);
            Object.freeze && Object.freeze(E);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else p(E);
      if (A.call(m, "key")) {
        E = e(r);
        var D = Object.keys(m).filter(function(pe) {
          return pe !== "key";
        });
        N = 0 < D.length ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}", le[E + N] || (D = 0 < D.length ? "{" + D.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          N,
          E,
          D,
          E
        ), le[E + N] = !0);
      }
      if (E = null, f !== void 0 && (i(f), E = "" + f), l(m) && (i(m.key), E = "" + m.key), "key" in m) {
        f = {};
        for (var ee in m)
          ee !== "key" && (f[ee] = m[ee]);
      } else f = m;
      return E && a(
        f,
        typeof r == "function" ? r.displayName || r.name || "Unknown" : r
      ), u(
        r,
        E,
        M,
        H,
        c(),
        f,
        Q,
        K
      );
    }
    function p(r) {
      typeof r == "object" && r !== null && r.$$typeof === P && r._store && (r._store.validated = 1);
    }
    var L = be, P = Symbol.for("react.transitional.element"), V = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), U = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), $ = Symbol.for("react.consumer"), g = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), b = Symbol.for("react.activity"), w = Symbol.for("react.client.reference"), v = L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = Object.prototype.hasOwnProperty, S = Array.isArray, O = console.createTask ? console.createTask : function() {
      return null;
    };
    L = {
      "react-stack-bottom-frame": function(r) {
        return r();
      }
    };
    var z, I = {}, B = L["react-stack-bottom-frame"].bind(
      L,
      s
    )(), se = O(n(s)), le = {};
    J.Fragment = C, J.jsx = function(r, m, f, N, H) {
      var M = 1e4 > v.recentlyCreatedOwnerStacks++;
      return h(
        r,
        m,
        f,
        !1,
        N,
        H,
        M ? Error("react-stack-top-frame") : B,
        M ? O(n(r)) : se
      );
    }, J.jsxs = function(r, m, f, N, H) {
      var M = 1e4 > v.recentlyCreatedOwnerStacks++;
      return h(
        r,
        m,
        f,
        !0,
        N,
        H,
        M ? Error("react-stack-top-frame") : B,
        M ? O(n(r)) : se
      );
    };
  }()), J;
}
var de;
function Ne() {
  return de || (de = 1, process.env.NODE_ENV === "production" ? W.exports = xe() : W.exports = ye()), W.exports;
}
var t = Ne();
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ee = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ke = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (o, i, n) => n ? n.toUpperCase() : i.toLowerCase()
), ue = (e) => {
  const o = ke(e);
  return o.charAt(0).toUpperCase() + o.slice(1);
}, he = (...e) => e.filter((o, i, n) => !!o && o.trim() !== "" && n.indexOf(o) === i).join(" ").trim(), we = (e) => {
  for (const o in e)
    if (o.startsWith("aria-") || o === "role" || o === "title")
      return !0;
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var ve = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = ge(
  ({
    color: e = "currentColor",
    size: o = 24,
    strokeWidth: i = 2,
    absoluteStrokeWidth: n,
    className: c = "",
    children: s,
    iconNode: l,
    ...a
  }, d) => re(
    "svg",
    {
      ref: d,
      ...ve,
      width: o,
      height: o,
      stroke: e,
      strokeWidth: n ? Number(i) * 24 / Number(o) : i,
      className: he("lucide", c),
      ...!s && !we(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...l.map(([u, h]) => re(u, h)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k = (e, o) => {
  const i = ge(
    ({ className: n, ...c }, s) => re(je, {
      ref: s,
      iconNode: o,
      className: he(
        `lucide-${Ee(ue(e))}`,
        `lucide-${e}`,
        n
      ),
      ...c
    })
  );
  return i.displayName = ue(e), i;
};
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ce = [
  ["path", { d: "M17 12H7", key: "16if0g" }],
  ["path", { d: "M19 18H5", key: "18s9l3" }],
  ["path", { d: "M21 6H3", key: "1jwq7v" }]
], Re = k("align-center", Ce);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Te = [
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 18h18", key: "1h113x" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }]
], _e = k("align-justify", Te);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = [
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M17 18H3", key: "1amg6g" }],
  ["path", { d: "M21 6H3", key: "1jwq7v" }]
], Le = k("align-left", Ae);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Se = [
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M21 18H7", key: "1ygte8" }],
  ["path", { d: "M21 6H3", key: "1jwq7v" }]
], Me = k("align-right", Se);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oe = [
  [
    "path",
    { d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8", key: "mg9rjx" }
  ]
], Ie = k("bold", Oe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pe = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], He = k("chevron-down", Pe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
], ze = k("code", $e);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Ue = k("image", Ve);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = [
  ["line", { x1: "19", x2: "10", y1: "4", y2: "4", key: "15jd3p" }],
  ["line", { x1: "14", x2: "5", y1: "20", y2: "20", key: "bu0au3" }],
  ["line", { x1: "15", x2: "9", y1: "4", y2: "20", key: "uljnxc" }]
], De = k("italic", Fe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
], Ye = k("link", qe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Je = [
  ["path", { d: "M10 12h11", key: "6m4ad9" }],
  ["path", { d: "M10 18h11", key: "11hvi2" }],
  ["path", { d: "M10 6h11", key: "c7qv1k" }],
  ["path", { d: "M4 10h2", key: "16xx2s" }],
  ["path", { d: "M4 6h1v4", key: "cnovpq" }],
  ["path", { d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1", key: "m9a95d" }]
], We = k("list-ordered", Je);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
], Ge = k("list", Xe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ze = [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
], Be = k("strikethrough", Ze);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qe = [
  ["path", { d: "M6 4v6a6 6 0 0 0 12 0V4", key: "9kb039" }],
  ["line", { x1: "4", x2: "20", y1: "20", y2: "20", key: "nun2al" }]
], Ke = k("underline", Qe);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const et = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], tt = k("video", et);
/**
 * @license lucide-react v0.523.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nt = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], oe = k("x", nt), X = (e, o, i) => {
  const n = window.getSelection();
  if (!n || n.rangeCount === 0 || !o.current) return;
  const c = n.getRangeAt(0);
  if (c.toString())
    try {
      const s = () => {
        let u = c.commonAncestorContainer;
        for (; u && u !== o.current; ) {
          if (u.nodeType === Node.ELEMENT_NODE) {
            const h = u;
            if (h.tagName.toLowerCase() === e.toLowerCase())
              return { isFormatted: !0, formatElement: h };
          }
          u = u.parentNode;
        }
        return { isFormatted: !1, formatElement: null };
      }, { isFormatted: l, formatElement: a } = s();
      let d = null;
      if (l && a) {
        const u = a.parentNode, h = document.createTextNode(a.textContent || "");
        u?.replaceChild(h, a), u?.normalize();
        const p = document.createRange();
        p.selectNodeContents(h), n.removeAllRanges(), n.addRange(p);
      } else {
        d = document.createElement(e);
        try {
          c.surroundContents(d);
          const u = document.createRange();
          u.selectNodeContents(d), n.removeAllRanges(), n.addRange(u);
        } catch {
          const h = c.extractContents();
          d.appendChild(h), c.insertNode(d);
          const p = document.createRange();
          p.selectNodeContents(d), n.removeAllRanges(), n.addRange(p);
        }
      }
      i();
    } catch (s) {
      console.warn("Error applying format:", s), i();
    }
}, rt = ({
  editorRef: e,
  activeFormats: o,
  updateActiveFormats: i,
  getButtonClass: n
}) => /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1", children: [
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => X("strong", e, i),
      className: n(o.bold),
      title: "Bold",
      children: /* @__PURE__ */ t.jsx(Ie, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => X("em", e, i),
      className: n(o.italic),
      title: "Italic",
      children: /* @__PURE__ */ t.jsx(De, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => X("u", e, i),
      className: n(o.underline),
      title: "Underline",
      children: /* @__PURE__ */ t.jsx(Ke, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => X("s", e, i),
      className: n(o.strikethrough),
      title: "Strikethrough",
      children: /* @__PURE__ */ t.jsx(Be, { size: 18 })
    }
  )
] }), G = (e, o) => {
  const i = window.getSelection();
  if (!i || i.rangeCount === 0) return;
  let c = i.getRangeAt(0).commonAncestorContainer;
  for (; c && c.nodeType !== Node.ELEMENT_NODE; )
    c = c.parentNode;
  if (c && c.nodeType === Node.ELEMENT_NODE) {
    const s = c;
    s.style.textAlign = e === "left" ? "" : e, o();
  }
}, ot = ({
  activeFormats: e,
  updateActiveFormats: o,
  getButtonClass: i
}) => /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1", children: [
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => G("left", o),
      className: i(e.alignLeft),
      title: "Align Left",
      children: /* @__PURE__ */ t.jsx(Le, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => G("center", o),
      className: i(e.alignCenter),
      title: "Align Center",
      children: /* @__PURE__ */ t.jsx(Re, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => G("right", o),
      className: i(e.alignRight),
      title: "Align Right",
      children: /* @__PURE__ */ t.jsx(Me, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => G("justify", o),
      className: i(e.alignJustify),
      title: "Justify",
      children: /* @__PURE__ */ t.jsx(_e, { size: 18 })
    }
  )
] }), me = (e, o, i) => {
  const n = window.getSelection();
  if (!n || n.rangeCount === 0 || !o.current) return;
  const c = n.getRangeAt(0);
  let s = c.commonAncestorContainer;
  s.nodeType === Node.TEXT_NODE && (s = s.parentNode);
  let l = s;
  for (; l && l !== o.current && !["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "UL", "OL"].includes(
    l.tagName
  ); )
    l = l.parentElement;
  if (!l || l === o.current) {
    const a = document.createElement(e), d = document.createElement("li");
    d.textContent = n.toString() || "List item", a.appendChild(d), c.deleteContents(), c.insertNode(a);
    const u = document.createRange();
    u.setStart(d, 0), u.setEnd(d, d.childNodes.length), n.removeAllRanges(), n.addRange(u);
  } else if (l.tagName === "LI") {
    const a = l.parentElement;
    if (a.tagName.toLowerCase() === e) {
      const d = document.createElement("p");
      d.innerHTML = l.innerHTML, a.parentNode?.replaceChild(d, a);
    } else {
      const d = document.createElement(e);
      d.innerHTML = a.innerHTML, a.parentNode?.replaceChild(d, a);
    }
  } else {
    const a = document.createElement(e), d = document.createElement("li");
    d.innerHTML = l.innerHTML, a.appendChild(d), l.parentNode?.replaceChild(a, l);
  }
  i();
}, at = ({
  editorRef: e,
  activeFormats: o,
  updateActiveFormats: i,
  getButtonClass: n
}) => /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1", children: [
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => {
        e?.current && me("ul", e, i);
      },
      className: n(o.bulletList),
      title: "Bullet List",
      children: /* @__PURE__ */ t.jsx(Ge, { size: 18 })
    }
  ),
  /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => {
        e?.current && me("ol", e, i);
      },
      className: n(o.numberedList),
      title: "Numbered List",
      children: /* @__PURE__ */ t.jsx(We, { size: 18 })
    }
  )
] });
let q = null;
const te = () => {
  const e = window.getSelection();
  e && e.rangeCount > 0 && (q = e.getRangeAt(0).cloneRange());
}, ae = () => {
  if (q) {
    const e = window.getSelection();
    e?.removeAllRanges(), e?.addRange(q);
  }
}, ne = () => {
  const e = window.getSelection();
  if (!e || e.rangeCount === 0) return null;
  let i = e.getRangeAt(0).commonAncestorContainer;
  i.nodeType === Node.TEXT_NODE && (i = i.parentNode);
  let n = i;
  for (; n && n !== document.body; ) {
    if (n.nodeType === Node.ELEMENT_NODE) {
      const c = n, s = c.tagName.toLowerCase();
      if (s === "a")
        return {
          type: "link",
          url: c.getAttribute("href") || "",
          text: c.textContent || ""
        };
      if (s === "img")
        return {
          type: "image",
          src: c.getAttribute("src") || "",
          alt: c.getAttribute("alt") || ""
        };
      if (s === "iframe")
        return {
          type: "video",
          src: c.getAttribute("src") || ""
        };
    }
    n = n.parentNode;
  }
  return null;
}, st = (e, o) => {
  ae();
  const i = window.getSelection();
  if (!i || i.rangeCount === 0) {
    const l = document.querySelector(
      '[contenteditable="true"]'
    );
    if (l) {
      const a = document.createElement("a");
      a.href = e, a.textContent = o || e, a.target = "_blank", a.rel = "noopener noreferrer", a.className = "text-blue-600 underline hover:text-blue-800", l.appendChild(a);
      const d = document.createTextNode(" ");
      l.appendChild(d);
      const u = document.createRange();
      u.setStartAfter(d), u.collapse(!0), i && (i.removeAllRanges(), i.addRange(u));
    }
    return;
  }
  const n = i.getRangeAt(0);
  let c = null, s = n.commonAncestorContainer;
  for (; s && s !== document.body; ) {
    if (s.nodeType === Node.ELEMENT_NODE && s.tagName.toLowerCase() === "a") {
      c = s;
      break;
    }
    s = s.parentNode;
  }
  if (c)
    c.setAttribute("href", e), c.textContent = o || e;
  else {
    const l = document.createElement("a");
    l.href = e, l.textContent = o || e, l.target = "_blank", l.rel = "noopener noreferrer", l.className = "text-blue-600 underline hover:text-blue-800", n.deleteContents(), n.insertNode(l);
    const a = document.createRange();
    a.setStartAfter(l), a.collapse(!0), i.removeAllRanges(), i.addRange(a);
  }
  q = null;
}, lt = (e, o = "Inserted image") => {
  ae();
  const i = window.getSelection();
  if (!i || i.rangeCount === 0) {
    const l = document.querySelector(
      '[contenteditable="true"]'
    );
    if (l) {
      const a = document.createElement("img");
      a.src = e, a.alt = o, a.className = "max-w-full h-auto rounded shadow-sm", l.appendChild(a);
      const d = document.createElement("br");
      l.appendChild(d);
      const u = document.createRange();
      u.setStartAfter(d), u.collapse(!0), i && (i.removeAllRanges(), i.addRange(u));
    }
    return;
  }
  const n = i.getRangeAt(0);
  let c = null, s = n.commonAncestorContainer;
  for (; s && s !== document.body; ) {
    if (s.nodeType === Node.ELEMENT_NODE && s.tagName.toLowerCase() === "img") {
      c = s;
      break;
    }
    s = s.parentNode;
  }
  if (c)
    c.setAttribute("src", e), c.setAttribute("alt", o);
  else {
    const l = document.createElement("img");
    l.src = e, l.alt = o, l.className = "max-w-full h-auto rounded shadow-sm", n.deleteContents(), n.insertNode(l);
    const a = document.createRange();
    a.setStartAfter(l), a.collapse(!0), i.removeAllRanges(), i.addRange(a);
  }
  q = null;
}, ct = (e) => {
  ae();
  const o = window.getSelection();
  if (!o || o.rangeCount === 0) {
    const s = document.querySelector(
      '[contenteditable="true"]'
    );
    if (s) {
      const l = document.createElement("iframe");
      l.src = e, l.width = "560", l.height = "315", l.className = "max-w-full rounded shadow-sm", l.setAttribute("frameborder", "0"), l.setAttribute("allowfullscreen", "true"), s.appendChild(l);
      const a = document.createElement("br");
      s.appendChild(a);
      const d = document.createRange();
      d.setStartAfter(a), d.collapse(!0), o && (o.removeAllRanges(), o.addRange(d));
    }
    return;
  }
  const i = o.getRangeAt(0);
  let n = null, c = i.commonAncestorContainer;
  for (; c && c !== document.body; ) {
    if (c.nodeType === Node.ELEMENT_NODE && c.tagName.toLowerCase() === "iframe") {
      n = c;
      break;
    }
    c = c.parentNode;
  }
  if (n)
    n.setAttribute("src", e);
  else {
    const s = document.createElement("iframe");
    s.src = e, s.width = "560", s.height = "315", s.className = "max-w-full rounded shadow-sm", s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", "true"), i.deleteContents(), i.insertNode(s);
    const l = document.createRange();
    l.setStartAfter(s), l.collapse(!0), o.removeAllRanges(), o.addRange(l);
  }
  q = null;
}, it = ({
  isOpen: e,
  onClose: o,
  onInsert: i,
  initialData: n
}) => {
  const [c, s] = j(""), [l, a] = j("");
  Z(() => {
    e && n ? (s(n.url), a(n.text)) : e && !n && (s(""), a(""));
  }, [e, n]);
  const d = (u) => {
    u.preventDefault(), c.trim() && (i(c.trim(), l.trim()), s(""), a(""), o());
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg p-6 w-96 max-w-full mx-4", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-semibold", children: n ? "Edit Link" : "Insert Link" }),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: o,
          className: "text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ t.jsx(oe, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("form", { onSubmit: d, children: [
      /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "URL" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "url",
            value: c,
            onChange: (u) => s(u.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "https://example.com",
            required: !0,
            autoFocus: !0
          }
        )
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Link Text (optional)" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "text",
            value: l,
            onChange: (u) => a(u.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "Link text"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "button",
            onClick: o,
            className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
            children: n ? "Update Link" : "Insert Link"
          }
        )
      ] })
    ] })
  ] }) }) : null;
}, dt = ({
  isOpen: e,
  onClose: o,
  onInsert: i,
  initialData: n
}) => {
  const [c, s] = j(""), [l, a] = j(""), d = fe(null);
  Z(() => {
    e && n ? (s(n.alt), a(n.src)) : e && !n && (s(""), a(""));
  }, [e, n]);
  const u = (L) => {
    const P = L.target.files?.[0];
    if (P) {
      const V = new FileReader();
      V.onload = (C) => {
        const U = C.target?.result;
        i(U, c || P.name), s(""), a(""), o(), d.current && (d.current.value = "");
      }, V.readAsDataURL(P);
    }
  }, h = () => {
    n && l && (i(l, c), s(""), a(""), o());
  }, p = () => {
    d.current && d.current.click();
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg p-6 w-96 max-w-full mx-4", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-semibold", children: n ? "Edit Image" : "Insert Image" }),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: o,
          className: "text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ t.jsx(oe, { size: 20 })
        }
      )
    ] }),
    n && /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ t.jsx(
        "img",
        {
          src: l,
          alt: c,
          className: "max-w-full h-32 object-contain rounded border"
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          type: "button",
          onClick: p,
          className: "mt-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200",
          children: "Replace Image"
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx(
      "input",
      {
        ref: d,
        type: "file",
        accept: "image/*",
        onChange: u,
        className: "hidden"
      }
    ),
    !n && /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Select Image File" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          onChange: u,
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Alt Text (optional)" }),
      /* @__PURE__ */ t.jsx(
        "input",
        {
          type: "text",
          value: c,
          onChange: (L) => s(L.target.value),
          className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          placeholder: "Image description",
          autoFocus: !!n
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: o,
          className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
          children: "Cancel"
        }
      ),
      n && /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: h,
          className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
          children: "Update Image"
        }
      )
    ] })
  ] }) }) : null;
}, ut = ({
  isOpen: e,
  onClose: o,
  onInsert: i,
  initialData: n
}) => {
  const [c, s] = j("");
  Z(() => {
    e && n ? s(n.src) : e && !n && s("");
  }, [e, n]);
  const l = (d) => {
    const u = d.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/
    );
    if (u)
      return `https://www.youtube.com/embed/${u[1]}`;
    const h = d.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return h ? `https://player.vimeo.com/video/${h[1]}` : d;
  }, a = (d) => {
    if (d.preventDefault(), c.trim()) {
      const u = l(c.trim());
      i(u), s(""), o();
    }
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg p-6 w-96 max-w-full mx-4", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-semibold", children: n ? "Edit Video" : "Insert Video" }),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: o,
          className: "text-gray-500 hover:text-gray-700",
          children: /* @__PURE__ */ t.jsx(oe, { size: 20 })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsxs("form", { onSubmit: a, children: [
      /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Video URL" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "url",
            value: c,
            onChange: (d) => s(d.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "YouTube, Vimeo, or embed URL",
            required: !0,
            autoFocus: !0
          }
        ),
        /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Supports YouTube, Vimeo, and direct embed URLs" })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "button",
            onClick: o,
            className: "px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700",
            children: n ? "Update Video" : "Insert Video"
          }
        )
      ] })
    ] })
  ] }) }) : null;
}, mt = () => {
  const [e, o] = j(!1), [i, n] = j(!1), [c, s] = j(!1), [l, a] = j(null), d = () => {
    te();
    const p = ne();
    a(p?.type === "link" ? p : null), o(!0);
  }, u = () => {
    te();
    const p = ne();
    a(p?.type === "image" ? p : null), n(!0);
  }, h = () => {
    te();
    const p = ne();
    a(p?.type === "video" ? p : null), s(!0);
  };
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: d,
          className: "p-2 rounded transition-colors hover:bg-gray-200",
          title: "Insert Link",
          children: /* @__PURE__ */ t.jsx(Ye, { size: 18 })
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: u,
          className: "p-2 rounded transition-colors hover:bg-gray-200",
          title: "Insert Image",
          children: /* @__PURE__ */ t.jsx(Ue, { size: 18 })
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: h,
          className: "p-2 rounded transition-colors hover:bg-gray-200",
          title: "Insert Video",
          children: /* @__PURE__ */ t.jsx(tt, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx(
      it,
      {
        isOpen: e,
        onClose: () => {
          o(!1), a(null);
        },
        onInsert: st,
        initialData: l?.type === "link" ? {
          url: l.url,
          text: l.text
        } : null
      }
    ),
    /* @__PURE__ */ t.jsx(
      dt,
      {
        isOpen: i,
        onClose: () => {
          n(!1), a(null);
        },
        onInsert: lt,
        initialData: l?.type === "image" ? {
          src: l.src,
          alt: l.alt
        } : null
      }
    ),
    /* @__PURE__ */ t.jsx(
      ut,
      {
        isOpen: c,
        onClose: () => {
          s(!1), a(null);
        },
        onInsert: ct,
        initialData: l?.type === "video" ? {
          src: l.src
        } : null
      }
    )
  ] });
}, gt = () => {
  const e = fe(null), [o, i] = j({
    bold: !1,
    italic: !1,
    underline: !1,
    strikethrough: !1,
    alignLeft: !1,
    alignCenter: !1,
    alignRight: !1,
    alignJustify: !1,
    bulletList: !1,
    numberedList: !1
  }), [n, c] = j("p"), [s, l] = j(!1), [a, d] = j(!1), [u, h] = j(""), p = [
    { value: "p", label: "Paragraph", tag: "p" },
    { value: "h1", label: "Heading 1", tag: "h1" },
    { value: "h2", label: "Heading 2", tag: "h2" },
    { value: "h3", label: "Heading 3", tag: "h3" },
    { value: "h4", label: "Heading 4", tag: "h4" },
    { value: "h5", label: "Heading 5", tag: "h5" },
    { value: "h6", label: "Heading 6", tag: "h6" }
  ], L = (g) => {
    const _ = window.getSelection();
    if (!_ || _.rangeCount === 0) return;
    const x = _.getRangeAt(0);
    let R = x.commonAncestorContainer;
    R.nodeType === Node.TEXT_NODE && (R = R.parentNode);
    let T = null, y = R;
    for (; y && y !== e.current; ) {
      if (y.nodeType === Node.ELEMENT_NODE) {
        const b = y, w = b.tagName.toLowerCase();
        if (["p", "h1", "h2", "h3", "h4", "h5", "h6", "div"].includes(w)) {
          T = b;
          break;
        }
      }
      y = y.parentNode;
    }
    if (T && T !== e.current) {
      const b = document.createElement(g);
      b.innerHTML = T.innerHTML, T.style.textAlign && (b.style.textAlign = T.style.textAlign), T.parentNode?.replaceChild(b, T), c(g), l(!1);
      const w = document.createRange();
      w.selectNodeContents(b), _.removeAllRanges(), _.addRange(w);
    } else {
      const b = document.createElement(g);
      if (x.toString())
        try {
          x.surroundContents(b);
        } catch {
          const v = x.extractContents();
          b.appendChild(v), x.insertNode(b);
        }
      else {
        b.innerHTML = "<br>", x.insertNode(b);
        const w = document.createRange();
        w.setStart(b, 0), w.collapse(!0), _.removeAllRanges(), _.addRange(w);
      }
      c(g), l(!1);
    }
    setTimeout(() => C(), 10);
  }, P = () => {
    if (e.current)
      if (a)
        e.current.innerHTML = u, e.current.contentEditable = "true", d(!1);
      else {
        const g = e.current.innerHTML;
        h(g), e.current.contentEditable = "false", e.current.textContent = g, d(!0);
      }
  }, V = () => {
    a && e.current && h(e.current.textContent || "");
  }, C = () => {
    const g = window.getSelection();
    if (!g || g.rangeCount === 0)
      return;
    let x = g.getRangeAt(0).commonAncestorContainer;
    x.nodeType === Node.TEXT_NODE && (x = x.parentNode);
    let R = x, T = "p";
    for (; R && R !== e.current; ) {
      if (["H1", "H2", "H3", "H4", "H5", "H6", "P"].includes(
        R.tagName
      )) {
        T = R.tagName.toLowerCase();
        break;
      }
      R = R.parentElement;
    }
    c(T);
    let y = x, b = !1, w = !1;
    for (; y && y !== e.current; ) {
      if (y.tagName === "UL") {
        b = !0;
        break;
      } else if (y.tagName === "OL") {
        w = !0;
        break;
      }
      y = y.parentElement;
    }
    const v = (z) => {
      let I = x;
      for (; I && I !== e.current; ) {
        if (I.nodeType === Node.ELEMENT_NODE && I.tagName.toLowerCase() === z.toLowerCase())
          return !0;
        I = I.parentNode;
      }
      return !1;
    };
    let A = x;
    for (; A && A !== e.current; ) {
      if (A.nodeType === Node.ELEMENT_NODE) {
        const z = A.tagName.toLowerCase();
        if (["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(z)) {
          c(z);
          break;
        }
      }
      A = A.parentNode;
    }
    (A === e.current || !A) && c("p");
    let S = x;
    for (; S && S !== e.current && S.nodeType !== Node.ELEMENT_NODE; )
      S = S.parentNode;
    const O = S && S.nodeType === Node.ELEMENT_NODE ? S.style.textAlign : "";
    i({
      bold: v("strong") || v("b"),
      italic: v("em") || v("i"),
      underline: v("u"),
      strikethrough: v("s") || v("strike") || v("del"),
      alignLeft: O === "" || O === "left",
      alignCenter: O === "center",
      alignRight: O === "right",
      alignJustify: O === "justify",
      bulletList: b,
      numberedList: w
    });
  }, U = () => {
    const g = window.getSelection();
    if (g && g.rangeCount > 0) {
      const _ = g.getRangeAt(0);
      e.current?.contains(_.commonAncestorContainer) && C();
    }
  };
  Z(() => (document.addEventListener("selectionchange", U), () => {
    document.removeEventListener("selectionchange", U);
  }), []);
  const F = (g) => `p-2 rounded transition-colors ${g ? "bg-blue-500 text-white hover:bg-blue-600" : "hover:bg-gray-200"}`, $ = () => /* @__PURE__ */ t.jsx("div", { className: "w-px h-6 bg-gray-300 mx-1" });
  return /* @__PURE__ */ t.jsxs("div", { className: "w-full max-w-4xl mx-auto p-4", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => l(!s),
            className: "flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 min-w-[120px] justify-between",
            disabled: a,
            children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-sm", children: p.find((g) => g.value === n)?.label || "Paragraph" }),
              /* @__PURE__ */ t.jsx(He, { size: 14 })
            ]
          }
        ),
        s && !a && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-[120px]", children: p.map((g) => /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => L(g.tag),
            className: `w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${n === g.value ? "bg-blue-50 text-blue-600" : ""}`,
            children: g.label
          },
          g.value
        )) })
      ] }),
      /* @__PURE__ */ t.jsx($, {}),
      /* @__PURE__ */ t.jsx("div", { className: a ? "opacity-50 pointer-events-none" : "", children: /* @__PURE__ */ t.jsx(
        rt,
        {
          editorRef: e,
          activeFormats: {
            bold: o.bold,
            italic: o.italic,
            underline: o.underline,
            strikethrough: o.strikethrough
          },
          updateActiveFormats: C,
          getButtonClass: F
        }
      ) }),
      /* @__PURE__ */ t.jsx($, {}),
      /* @__PURE__ */ t.jsx("div", { className: a ? "opacity-50 pointer-events-none" : "", children: /* @__PURE__ */ t.jsx(
        ot,
        {
          activeFormats: {
            alignLeft: o.alignLeft,
            alignCenter: o.alignCenter,
            alignRight: o.alignRight,
            alignJustify: o.alignJustify
          },
          updateActiveFormats: C,
          getButtonClass: F
        }
      ) }),
      /* @__PURE__ */ t.jsx($, {}),
      /* @__PURE__ */ t.jsx("div", { className: a ? "opacity-50 pointer-events-none" : "", children: /* @__PURE__ */ t.jsx(
        at,
        {
          editorRef: e,
          activeFormats: {
            bulletList: o.bulletList,
            numberedList: o.numberedList
          },
          updateActiveFormats: C,
          getButtonClass: F
        }
      ) }),
      /* @__PURE__ */ t.jsx($, {}),
      /* @__PURE__ */ t.jsx("div", { className: a ? "opacity-50 pointer-events-none" : "", children: /* @__PURE__ */ t.jsx(mt, {}) }),
      /* @__PURE__ */ t.jsx($, {}),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: P,
          className: F(a),
          title: a ? "Switch to Visual View" : "Switch to Code View",
          children: /* @__PURE__ */ t.jsx(ze, { size: 16 })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx(
      "div",
      {
        ref: e,
        contentEditable: !a,
        className: `overflow-auto w-full p-4 border border-gray-300 border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${a ? "font-mono text-sm bg-gray-50 whitespace-pre-wrap" : "prose prose-headings:mt-0 prose-headings:mb-2"}`,
        style: {
          whiteSpace: "pre-wrap"
        },
        onMouseUp: a ? void 0 : C,
        onKeyUp: a ? void 0 : C,
        onClick: () => l(!1),
        onInput: a ? V : void 0
      }
    )
  ] });
};
function ht() {
  return /* @__PURE__ */ t.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ t.jsx(gt, {}) });
}
export {
  ht as default
};
