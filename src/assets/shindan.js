/*! For license information please see shindan.js.LICENSE.txt */
(() => {
  var t = {
      3573: (t) => {
        function e(t) {
          return (
            (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            e(t)
          );
        }
        function i(t, e) {
          var i =
            ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
            t["@@iterator"];
          if (!i) {
            if (
              Array.isArray(t) ||
              (i = (function (t, e) {
                if (t) {
                  if ("string" == typeof t) return n(t, e);
                  var i = {}.toString.call(t).slice(8, -1);
                  return (
                    "Object" === i && t.constructor && (i = t.constructor.name),
                    "Map" === i || "Set" === i
                      ? Array.from(t)
                      : "Arguments" === i ||
                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                        ? n(t, e)
                        : void 0
                  );
                }
              })(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              i && (t = i);
              var s = 0,
                o = function () {};
              return {
                s: o,
                n: function () {
                  return s >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[s++] };
                },
                e: function (t) {
                  throw t;
                },
                f: o,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          }
          var a,
            r = !0,
            l = !1;
          return {
            s: function () {
              i = i.call(t);
            },
            n: function () {
              var t = i.next();
              return ((r = t.done), t);
            },
            e: function (t) {
              ((l = !0), (a = t));
            },
            f: function () {
              try {
                r || null == i.return || i.return();
              } finally {
                if (l) throw a;
              }
            },
          };
        }
        function n(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
          return n;
        }
        function s(t, e) {
          var i = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            (e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              i.push.apply(i, n));
          }
          return i;
        }
        function o(t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? s(Object(i), !0).forEach(function (e) {
                  a(t, e, i[e]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(i),
                  )
                : s(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(i, e),
                    );
                  });
          }
          return t;
        }
        function a(t, i, n) {
          return (
            (i = (function (t) {
              var i = (function (t, i) {
                if ("object" != e(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var s = n.call(t, i || "default");
                  if ("object" != e(s)) return s;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value.",
                  );
                }
                return ("string" === i ? String : Number)(t);
              })(t, "string");
              return "symbol" == e(i) ? i : i + "";
            })(i)) in t
              ? Object.defineProperty(t, i, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[i] = n),
            t
          );
        }
        function r(t, e, i, n, s, o, a, r) {
          return !(
            t + i / 2 < s - a / 2 ||
            t - i / 2 > s + a / 2 ||
            e + n / 2 < o - r / 2 ||
            e - n / 2 > o + r / 2
          );
        }
        function l(t, e, i, n, s, o, a) {
          var r = Math.max(t - i / 2, Math.min(s, t + i / 2)) - s,
            l = Math.max(e - n / 2, Math.min(o, e + n / 2)) - o;
          return r * r + l * l < a * a;
        }
        function c(t, e, i, n, s, o, a) {
          for (
            var r = 6 * a,
              l = 28 * a,
              c = Math.min(80 * a, (n / (s * o)) * 0.9),
              h = Math.max(l, c),
              u = null;
            h >= r;

          ) {
            t.font = "bold ".concat(h, "px sans-serif");
            var d = b(e),
              f = [];
            if (2 === o && d.length >= 4)
              if (
                d.every(function (t) {
                  return 1 === t.length && !t.match(/[a-zA-Z0-9]/);
                }) &&
                d.length % 2 == 0
              ) {
                var p = d.length / 2,
                  g = d.slice(0, p).join(""),
                  m = d.slice(p).join(""),
                  x = t.measureText(g).width,
                  y = t.measureText(m).width;
                x <= 0.95 * i && y <= 0.95 * i && (f = [g, m]);
              }
            if (0 === f.length) {
              for (var v = "", _ = 0; _ < d.length; _++) {
                var w = d[_],
                  k = v ? v + w : w;
                if (t.measureText(k).width > 0.95 * i)
                  if (v) (f.push(v.trim()), (v = w));
                  else if (w.length > 1)
                    if (/^[a-zA-Z]+$/.test(w)) {
                      for (var M = "", S = 0; S < w.length; S++) {
                        var D = w[S],
                          P = M + D + "-";
                        t.measureText(P).width > 0.95 * i && M.length > 0
                          ? (f.push(M + "-"), (M = D))
                          : (M += D);
                      }
                      v = M;
                    } else
                      for (var C = 0; C < w.length; C++) {
                        var E = w[C],
                          T = v + E;
                        t.measureText(T).width > 0.95 * i
                          ? v
                            ? (f.push(v), (v = E))
                            : (f.push(E), (v = ""))
                          : (v = T);
                      }
                  else (f.push(w), (v = ""));
                else v = k;
              }
              v && f.push(v.trim());
            }
            var A = h * s * f.length;
            if (f.length <= o && A <= 0.95 * n) {
              u = { lines: f, fontSize: h };
              break;
            }
            h -= 1;
          }
          u ||
            ((t.font = "bold ".concat(r, "px sans-serif")),
            (u = { lines: [e.substring(0, 10) + "..."], fontSize: r }));
          return u;
        }
        function h(t, e, i) {
          var n = t.x - t.width / 2,
            s = t.x + t.width / 2,
            o = t.y - t.height / 2,
            a = t.y + t.height / 2,
            r = e.x - e.width / 2,
            l = e.x + e.width / 2,
            c = e.y - e.height / 2,
            h = e.y + e.height / 2;
          return !(s + i < r || n - i > l || a + i < c || o - i > h);
        }
        function u(t, e, i, n, s) {
          for (
            var o = t.x - t.width / 2 - s,
              a = t.x + t.width / 2 + s,
              r = t.y - t.height / 2 - s,
              l = t.y + t.height / 2 + s,
              c = 0;
            c <= 20;
            c++
          ) {
            var h = c / 20,
              u = (1 - h) * (1 - h) * e.x + 2 * (1 - h) * h * i.x + h * h * n.x,
              d = (1 - h) * (1 - h) * e.y + 2 * (1 - h) * h * i.y + h * h * n.y;
            if (u >= o && u <= a && d >= r && d <= l) return !0;
          }
          return !1;
        }
        function d(t, e, n, s, o) {
          for (var a = 0, r = 0; r < n; r++) {
            a += 100 * f(t, e[r]);
          }
          for (var l = 0; l < e.length; l++)
            if (l !== n) {
              var c = e[l];
              a += p(t, c.arrowStart, c.arrowControl, c.arrowEnd);
            }
          var h,
            u = i(s);
          try {
            for (u.s(); !(h = u.n()).done; ) {
              a += 200 * g(t, h.value);
            }
          } catch (t) {
            u.e(t);
          } finally {
            u.f();
          }
          return a;
        }
        function f(t, e) {
          var i = t.x - t.width / 2,
            n = t.x + t.width / 2,
            s = t.y - t.height / 2,
            o = t.y + t.height / 2,
            a = e.x - e.width / 2,
            r = e.x + e.width / 2,
            l = e.y - e.height / 2,
            c = e.y + e.height / 2;
          return (
            Math.max(0, Math.min(n, r) - Math.max(i, a)) *
            Math.max(0, Math.min(o, c) - Math.max(s, l))
          );
        }
        function p(t, e, i, n) {
          for (
            var s = t.x - t.width / 2,
              o = t.x + t.width / 2,
              a = t.y - t.height / 2,
              r = t.y + t.height / 2,
              l = 0,
              c = 0;
            c < 20;
            c++
          ) {
            var h = c / 20,
              u = (c + 1) / 20,
              d = (1 - h) * (1 - h) * e.x + 2 * (1 - h) * h * i.x + h * h * n.x,
              f = (1 - h) * (1 - h) * e.y + 2 * (1 - h) * h * i.y + h * h * n.y,
              p = (1 - u) * (1 - u) * e.x + 2 * (1 - u) * u * i.x + u * u * n.x,
              g = (1 - u) * (1 - u) * e.y + 2 * (1 - u) * u * i.y + u * u * n.y;
            if (
              (d >= s && d <= o && f >= a && f <= r) ||
              (p >= s && p <= o && g >= a && g <= r)
            )
              l += Math.sqrt((p - d) * (p - d) + (g - f) * (g - f));
          }
          return l;
        }
        function g(t, e) {
          var i = t.x - e.x,
            n = t.y - e.y,
            s = Math.sqrt(i * i + n * n),
            o = Math.sqrt(
              (t.width / 2) * (t.width / 2) + (t.height / 2) * (t.height / 2),
            ),
            a = e.radius + o;
          return s >= a ? 0 : a - s;
        }
        function m(t, e, i) {
          var n = t.x - e.x,
            s = t.y - e.y,
            o = Math.sqrt(n * n + s * s),
            a = Math.sqrt(
              (t.width / 2) * (t.width / 2) + (t.height / 2) * (t.height / 2),
            );
          return o < e.radius + a + i;
        }
        function b(t) {
          for (var e = Array.from(t), i = [], n = 0; n < e.length; ) {
            var s = e[n];
            if (/[a-zA-Z0-9]/.test(s)) {
              var o = s;
              for (n++; n < e.length && /[a-zA-Z0-9]/.test(e[n]); )
                ((o += e[n]), n++);
              i.push(o);
            } else {
              var a = s;
              for (
                n++;
                n < e.length && /[\u0E31\u0E33-\u0E3A\u0E47-\u0E4E]/.test(e[n]);

              )
                ((a += e[n]), n++);
              i.push(a);
            }
          }
          return i;
        }
        function x(t) {
          var e, i, n;
          if (t.startsWith("#")) {
            var s = t.slice(1);
            3 === s.length
              ? ((e = parseInt(s[0] + s[0], 16)),
                (i = parseInt(s[1] + s[1], 16)),
                (n = parseInt(s[2] + s[2], 16)))
              : ((e = parseInt(s.slice(0, 2), 16)),
                (i = parseInt(s.slice(2, 4), 16)),
                (n = parseInt(s.slice(4, 6), 16)));
          } else {
            if (!t.startsWith("rgb")) return !1;
            var o = t.match(/\d+/g);
            ((e = parseInt(o[0])), (i = parseInt(o[1])), (n = parseInt(o[2])));
          }
          var a = e / 255,
            r = i / 255,
            l = n / 255;
          return (
            0.2126 *
              (a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4)) +
              0.7152 *
                (r <= 0.03928
                  ? r / 12.92
                  : Math.pow((r + 0.055) / 1.055, 2.4)) +
              0.0722 *
                (l <= 0.03928
                  ? l / 12.92
                  : Math.pow((l + 0.055) / 1.055, 2.4)) >
            0.5
          );
        }
        function y(t, e, i) {
          ((t /= 255), (e /= 255), (i /= 255));
          var n,
            s,
            o = Math.max(t, e, i),
            a = Math.min(t, e, i),
            r = (o + a) / 2;
          if (o === a) n = s = 0;
          else {
            var l = o - a;
            switch (((s = r > 0.5 ? l / (2 - o - a) : l / (o + a)), o)) {
              case t:
                n = ((e - i) / l + (e < i ? 6 : 0)) / 6;
                break;
              case e:
                n = ((i - t) / l + 2) / 6;
                break;
              case i:
                n = ((t - e) / l + 4) / 6;
            }
          }
          return {
            h: Math.round(360 * n),
            s: Math.round(100 * s),
            l: Math.round(100 * r),
          };
        }
        function v(t, e, i) {
          var n, s, o;
          if (((t /= 360), (i /= 100), 0 === (e /= 100))) n = s = o = i;
          else {
            var a = function (t, e, i) {
                return (
                  i < 0 && (i += 1),
                  i > 1 && (i -= 1),
                  i < 1 / 6
                    ? t + 6 * (e - t) * i
                    : i < 0.5
                      ? e
                      : i < 2 / 3
                        ? t + (e - t) * (2 / 3 - i) * 6
                        : t
                );
              },
              r = i < 0.5 ? i * (1 + e) : i + e - i * e,
              l = 2 * i - r;
            ((n = a(l, r, t + 1 / 3)),
              (s = a(l, r, t)),
              (o = a(l, r, t - 1 / 3)));
          }
          return {
            r: Math.round(255 * n),
            g: Math.round(255 * s),
            b: Math.round(255 * o),
          };
        }
        function _(t, e) {
          var i, n, s;
          if (t.startsWith("#")) {
            var o = t.slice(1);
            3 === o.length
              ? ((i = parseInt(o[0] + o[0], 16)),
                (n = parseInt(o[1] + o[1], 16)),
                (s = parseInt(o[2] + o[2], 16)))
              : ((i = parseInt(o.slice(0, 2), 16)),
                (n = parseInt(o.slice(2, 4), 16)),
                (s = parseInt(o.slice(4, 6), 16)));
          } else {
            if (!t.startsWith("rgb")) return "#000000";
            var a = t.match(/\d+/g);
            ((i = parseInt(a[0])), (n = parseInt(a[1])), (s = parseInt(a[2])));
          }
          var r = y(i, n, s);
          r.l = Math.max(0, r.l * (1 - e));
          var l = v(r.h, r.s, r.l);
          return "#"
            .concat(l.r.toString(16).padStart(2, "0"))
            .concat(l.g.toString(16).padStart(2, "0"))
            .concat(l.b.toString(16).padStart(2, "0"));
        }
        var w = {
          drawCorrelationChart: function (t, e) {
            var n,
              s,
              a =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {};
            "number" == typeof a && (a = { scale: a });
            var f = a && a.ctx ? a.ctx : t.getContext("2d");
            if (!f) throw new Error("Canvas 2D context is required");
            var p = t.width,
              g = t.height,
              b = null !== (n = a.baseDisplayWidth) && void 0 !== n ? n : 500,
              y = "number" == typeof a.scale ? a.scale : Math.max(1, p / b),
              v = !1 !== a.resizeCanvas,
              w = a.backgroundColor || "#ffffff",
              k = a.verticalAlign || "top",
              M = null !== (s = a.offsetY) && void 0 !== s ? s : 0;
            f.clearRect(0, 0, p, g);
            var S = e.correlationData || {},
              D = S.characters || [],
              P = S.centerCharacter;
            if (0 === D.length)
              return (
                (f.fillStyle = "#666"),
                (f.font = "28px sans-serif"),
                (f.textAlign = "center"),
                (f.textBaseline = "middle"),
                void f.fillText("登場人物を追加してください", p / 2, g / 2)
              );
            var C,
              E = p / 2,
              T = g / 2,
              A = void 0 !== P && P >= 0 && P < D.length,
              O = D.length;
            C =
              1 === O
                ? 65 * y
                : 2 === O
                  ? 60 * y
                  : 3 === O
                    ? 55 * y
                    : 4 === O
                      ? 50 * y
                      : 5 === O
                        ? 45 * y
                        : 40 * y;
            var I = [];
            if (A) {
              var F = D[P],
                L = D.filter(function (t, e) {
                  return e !== P;
                }),
                R = Math.min(p, g) / 2.8;
              (I.push(
                o(
                  o({}, F),
                  {},
                  { x: E, y: T, originalIndex: P, isCenter: !0, radius: C },
                ),
              ),
                L.forEach(function (t, e) {
                  var i = (e / L.length) * 2 * Math.PI - Math.PI / 2,
                    n = E + R * Math.cos(i),
                    s = T + R * Math.sin(i),
                    a = D.findIndex(function (e) {
                      return e === t;
                    });
                  I.push(
                    o(
                      o({}, t),
                      {},
                      { x: n, y: s, originalIndex: a, isCenter: !1, radius: C },
                    ),
                  );
                }));
            } else {
              var z = p / 2 - C - (6 === O ? 40 : 0),
                B = D.map(function (t, e) {
                  var i = (e / D.length) * 2 * Math.PI - Math.PI / 2,
                    n = z * Math.cos(i),
                    s = z * Math.sin(i);
                  return (
                    6 === D.length &&
                      ((1 !== e && 2 !== e && 4 !== e && 5 !== e) ||
                        (n *= 1.15)),
                    { x: n, y: s, char: t, index: e }
                  );
                }),
                j = C + 1 * y,
                V = 1 / 0,
                W = -1 / 0,
                N = 1 / 0,
                H = -1 / 0;
              B.forEach(function (t) {
                ((V = Math.min(V, t.x - j)),
                  (W = Math.max(W, t.x + j)),
                  (N = Math.min(N, t.y - j)),
                  (H = Math.max(H, t.y + j)));
              });
              var $ = E - (V + W) / 2,
                q = T - (N + H) / 2;
              B.forEach(function (t) {
                I.push(
                  o(
                    o({}, t.char),
                    {},
                    {
                      x: t.x + $,
                      y: t.y + q,
                      originalIndex: t.index,
                      isCenter: !1,
                      radius: C,
                    },
                  ),
                );
              });
            }
            var Y = 1 * y,
              U = 1 / 0,
              X = -1 / 0,
              G = 1 / 0,
              Z = -1 / 0;
            I.forEach(function (t) {
              var e = t.radius + Y;
              ((U = Math.min(U, t.x - e)),
                (X = Math.max(X, t.x + e)),
                (G = Math.min(G, t.y - e)),
                (Z = Math.max(Z, t.y + e)));
            });
            var K = X - U,
              J = Z - G,
              Q = M + J,
              tt = g;
            if (v) {
              var et = Math.max(1, Math.ceil(Q));
              (et !== t.height && (t.height = et), (tt = g = t.height));
            } else tt = g;
            (((f = a && a.ctx ? a.ctx : t.getContext("2d")).fillStyle = w),
              f.fillRect(0, 0, p, tt));
            var it = Math.max(0, tt - Q),
              nt = 0;
            "center" === k ? (nt = it / 2) : "bottom" === k && (nt = it);
            var st = M - G + nt;
            I.forEach(function (t) {
              t.y += st;
            });
            var ot = new Set();
            I.forEach(function (t) {
              t.feelings &&
                0 !== t.feelings.length &&
                t.feelings.forEach(function (e) {
                  var i = parseInt(e.target);
                  if (!isNaN(i)) {
                    var n = I.find(function (t) {
                      return t.originalIndex === i;
                    });
                    if (n && n.feelings)
                      if (
                        n.feelings.some(function (e) {
                          return parseInt(e.target) === t.originalIndex;
                        })
                      ) {
                        var s = [
                          Math.min(t.originalIndex, i),
                          Math.max(t.originalIndex, i),
                        ].join("-");
                        ot.add(s);
                      }
                  }
                });
            });
            var at = [];
            return (
              I.forEach(function (t) {
                t.feelings &&
                  0 !== t.feelings.length &&
                  t.feelings.forEach(function (e) {
                    var i = parseInt(e.target);
                    if (!isNaN(i)) {
                      var n = I.find(function (t) {
                        return t.originalIndex === i;
                      });
                      if (n) {
                        var s = e.emotion || "";
                        if ("" !== s.trim()) {
                          var o = [
                              Math.min(t.originalIndex, i),
                              Math.max(t.originalIndex, i),
                            ].join("-"),
                            a = ot.has(o),
                            r = a && t.originalIndex > i,
                            l = (function (t, e, i, n) {
                              var s =
                                  arguments.length > 4 &&
                                  void 0 !== arguments[4]
                                    ? arguments[4]
                                    : 1,
                                o =
                                  arguments.length > 5 &&
                                  void 0 !== arguments[5] &&
                                  arguments[5],
                                a =
                                  arguments.length > 6 &&
                                  void 0 !== arguments[6] &&
                                  arguments[6],
                                r = e.x,
                                l = e.y,
                                c = i.x,
                                h = i.y,
                                u = c - r,
                                d = h - l,
                                f = Math.sqrt(u * u + d * d);
                              if (0 === f) return;
                              var p,
                                g,
                                m = u / f,
                                b = d / f,
                                y = 4 * s,
                                v = -b * y,
                                w = m * y,
                                k = e.radius + 1 * s,
                                M = i.radius + 1 * s,
                                S = r + m * k + v,
                                D = l + b * k + w,
                                P = c - m * M + v,
                                C = h - b * M + w,
                                E = (S + P) / 2,
                                T = (D + C) / 2;
                              if (o) {
                                var A,
                                  O,
                                  I = Math.min(0.25 * f, 50 * s);
                                e.originalIndex < i.originalIndex
                                  ? ((A = e), (O = i))
                                  : ((A = i), (O = e));
                                var F = O.x - A.x,
                                  L = O.y - A.y,
                                  R = Math.sqrt(F * F + L * L);
                                if (0 === R) ((p = E), (g = T));
                                else {
                                  var z = a ? -1 : 1;
                                  ((p = E + -(L / R) * I * z),
                                    (g = T + (F / R) * I * z));
                                }
                              } else {
                                var B = -b,
                                  j = m,
                                  V = Math.min(0.15 * f, 30 * s);
                                ((p = E + B * V), (g = T + j * V));
                              }
                              var W = e.color || "#666",
                                N = x(W) ? _(W, 0.3) : W;
                              ((t.strokeStyle = "#ffffff"),
                                (t.lineWidth = 6 * s),
                                t.beginPath(),
                                t.moveTo(S, D),
                                t.quadraticCurveTo(p, g, P, C),
                                t.stroke(),
                                (t.globalAlpha = 0.7),
                                (t.strokeStyle = N),
                                (t.lineWidth = 2 * s),
                                t.beginPath(),
                                t.moveTo(S, D),
                                t.quadraticCurveTo(p, g, P, C),
                                t.stroke());
                              var H = 14 * s,
                                $ = Math.atan2(C - g, P - p);
                              ((t.globalAlpha = 1),
                                (t.fillStyle = "#ffffff"),
                                (t.strokeStyle = "#ffffff"),
                                (t.lineWidth = 2 * s),
                                t.beginPath(),
                                t.moveTo(P, C),
                                t.lineTo(
                                  P - H * Math.cos($ - Math.PI / 6),
                                  C - H * Math.sin($ - Math.PI / 6),
                                ),
                                t.lineTo(
                                  P - H * Math.cos($ + Math.PI / 6),
                                  C - H * Math.sin($ + Math.PI / 6),
                                ),
                                t.closePath(),
                                t.fill(),
                                t.stroke(),
                                (t.globalAlpha = 0.7),
                                (t.fillStyle = N),
                                t.beginPath(),
                                t.moveTo(P, C),
                                t.lineTo(
                                  P - H * Math.cos($ - Math.PI / 6),
                                  C - H * Math.sin($ - Math.PI / 6),
                                ),
                                t.lineTo(
                                  P - H * Math.cos($ + Math.PI / 6),
                                  C - H * Math.sin($ + Math.PI / 6),
                                ),
                                t.closePath(),
                                t.fill(),
                                (t.globalAlpha = 1));
                              var q = 0.5;
                              return {
                                x:
                                  (1 - q) * (1 - q) * S +
                                  2 * (1 - q) * q * p +
                                  q * q * P,
                                y:
                                  (1 - q) * (1 - q) * D +
                                  2 * (1 - q) * q * g +
                                  q * q * C,
                                emotion: n,
                                color: W,
                                scale: s,
                                arrowStart: { x: S, y: D },
                                arrowControl: { x: p, y: g },
                                arrowEnd: { x: P, y: C },
                                fromIndex: e.originalIndex,
                                toIndex: i.originalIndex,
                              };
                            })(f, t, n, s, y, a, r);
                          l && at.push(l);
                        }
                      }
                    }
                  });
              }),
              (function (t, e, n, s, a, f, p) {
                var g, b;
                f <= 2
                  ? ((g = 90 * a), (b = 50 * a))
                  : 3 === f
                    ? ((g = 75 * a), (b = 42 * a))
                    : 4 === f
                      ? ((g = 68 * a), (b = 38 * a))
                      : ((g = 60 * a), (b = 35 * a));
                for (
                  var y = 1.1,
                    v = 2,
                    w = e.map(function (e) {
                      var i = e.emotion;
                      t.font = "bold 28px sans-serif";
                      var n = 10 * t.measureText("あ").width;
                      if (t.measureText(i).width > n) {
                        for (
                          var s = i;
                          t.measureText(s + "...").width > n && s.length > 0;

                        )
                          s = s.substring(0, s.length - 1);
                        i = s + "...";
                      }
                      var r = c(t, i, g, b, y, v, a);
                      return o(
                        o({}, e),
                        {},
                        {
                          lines: r.lines,
                          fontSize: r.fontSize,
                          lineHeight: y,
                          width: g,
                          height: b,
                          x: e.x,
                          y: e.y,
                          arrowStart: e.arrowStart,
                          arrowControl: e.arrowControl,
                          arrowEnd: e.arrowEnd,
                          fromIndex: e.fromIndex,
                          toIndex: e.toIndex,
                        },
                      );
                    }),
                    k = 0;
                  k < w.length;
                  k++
                )
                  for (var M = w[k], S = k + 1; S < w.length; S++) {
                    var D = w[S];
                    if (
                      M.fromIndex === D.toIndex &&
                      M.toIndex === D.fromIndex
                    ) {
                      var P = M.arrowStart.x,
                        C = M.arrowStart.y,
                        E = M.arrowControl.x,
                        T = M.arrowControl.y,
                        A = M.arrowEnd.x,
                        O = M.arrowEnd.y,
                        I = 0.25 * P + 0.5 * E + 0.25 * A,
                        F = 0.25 * C + 0.5 * T + 0.25 * O,
                        L = D.arrowStart.x,
                        R = D.arrowStart.y,
                        z = D.arrowControl.x,
                        B = D.arrowControl.y,
                        j = D.arrowEnd.x,
                        V = D.arrowEnd.y,
                        W = 0.25 * L + 0.5 * z + 0.25 * j,
                        N = 0.25 * R + 0.5 * B + 0.25 * V,
                        H = P - I,
                        $ = C - F,
                        q = L - W,
                        Y = R - N,
                        U = 0.3;
                      if (
                        ((M.x = I + H * U),
                        (M.y = F + $ * U),
                        (D.x = W + q * U),
                        (D.y = N + Y * U),
                        f <= 3)
                      ) {
                        var X =
                            -2 * (1 - U) * P + 2 * (1 - 2 * U) * E + 2 * U * A,
                          G =
                            -2 * (1 - U) * C + 2 * (1 - 2 * U) * T + 2 * U * O,
                          Z = Math.sqrt(X * X + G * G),
                          K = -G / Z,
                          J = X / Z,
                          Q =
                            -2 * (1 - U) * L + 2 * (1 - 2 * U) * z + 2 * U * j,
                          tt =
                            -2 * (1 - U) * R + 2 * (1 - 2 * U) * B + 2 * U * V,
                          et = Math.sqrt(Q * Q + tt * tt),
                          it = -tt / et,
                          nt = Q / et,
                          st = void 0;
                        ((st = 2 === f ? 20 * a : 15 * a),
                          (M.x += K * st),
                          (M.y += J * st),
                          (D.x += it * st),
                          (D.y += nt * st));
                      }
                      ((M.isMutualEmotion = !0), (D.isMutualEmotion = !0));
                    }
                  }
                for (var ot = 2 * a, at = 5 * a, rt = 0; rt < w.length; rt++) {
                  for (
                    var lt = w[rt], ct = lt.x, ht = lt.y, ut = !1, dt = 0;
                    dt < rt;
                    dt++
                  ) {
                    if (h(lt, w[dt], ot)) {
                      ut = !0;
                      break;
                    }
                  }
                  if (!lt.isMutualEmotion || ut) {
                    for (var ft = !1, pt = 0; pt < w.length; pt++)
                      if (rt !== pt) {
                        var gt = w[pt];
                        if (
                          u(lt, gt.arrowStart, gt.arrowControl, gt.arrowEnd, at)
                        ) {
                          ft = !0;
                          break;
                        }
                      }
                    var mt,
                      bt = !1,
                      xt = i(p);
                    try {
                      for (xt.s(); !(mt = xt.n()).done; ) {
                        if (m(lt, mt.value, ot)) {
                          bt = !0;
                          break;
                        }
                      }
                    } catch (t) {
                      xt.e(t);
                    } finally {
                      xt.f();
                    }
                    if (ut || ft || bt) {
                      for (
                        var yt = null,
                          vt = 1 / 0,
                          _t = 0,
                          wt = [
                            0.5, 0.4, 0.6, 0.3, 0.7, 0.2, 0.8, 0.1, 0.9, 0.45,
                            0.55, 0.35, 0.65, 0.25, 0.75, 0.15, 0.85, 0.05,
                            0.95,
                          ];
                        _t < wt.length;
                        _t++
                      ) {
                        var kt = wt[_t],
                          Mt = lt.arrowStart.x,
                          St = lt.arrowStart.y,
                          Dt = lt.arrowControl.x,
                          Pt = lt.arrowControl.y,
                          Ct =
                            (1 - kt) * (1 - kt) * Mt +
                            2 * (1 - kt) * kt * Dt +
                            kt * kt * lt.arrowEnd.x,
                          Et =
                            (1 - kt) * (1 - kt) * St +
                            2 * (1 - kt) * kt * Pt +
                            kt * kt * lt.arrowEnd.y;
                        ((lt.x = Ct), (lt.y = Et));
                        var Tt = d(lt, w, rt, p, at);
                        if (0 === Tt) {
                          ((yt = { x: Ct, y: Et }), (vt = 0));
                          break;
                        }
                        Tt < vt && ((vt = Tt), (yt = { x: Ct, y: Et }));
                      }
                      yt
                        ? ((lt.x = yt.x), (lt.y = yt.y))
                        : ((lt.x = ct), (lt.y = ht));
                    }
                  }
                }
                ((function (t, e, n, s, o, a, h, u) {
                  for (
                    var d = 1.8,
                      f = 0.05,
                      p = e.map(function (t, e) {
                        return {
                          index: e,
                          width: t.width,
                          height: t.height,
                          fontSize: t.fontSize,
                          lines: t.lines,
                          emotion: t.emotion,
                          x: t.x,
                          y: t.y,
                        };
                      }),
                      g = 1,
                      m = p.map(function (t) {
                        return {
                          index: t.index,
                          width: t.width,
                          height: t.height,
                          fontSize: t.fontSize,
                          lines: t.lines,
                        };
                      }),
                      b = 1 + f;
                    b <= d;
                    b += f
                  ) {
                    var x,
                      y = !1,
                      v = [],
                      _ = i(p);
                    try {
                      for (_.s(); !(x = _.n()).done; ) {
                        var w = x.value,
                          k = w.width * b,
                          M = w.height * b,
                          S = c(t, w.emotion, k, M, o, a, s);
                        v.push({
                          index: w.index,
                          width: k,
                          height: M,
                          fontSize: S.fontSize,
                          lines: S.lines,
                          x: w.x,
                          y: w.y,
                        });
                      }
                    } catch (t) {
                      _.e(t);
                    } finally {
                      _.f();
                    }
                    for (var D = 0; D < v.length; D++) {
                      for (var P = v[D], C = D + 1; C < v.length; C++) {
                        var E = v[C];
                        if (
                          r(
                            P.x,
                            P.y,
                            P.width,
                            P.height,
                            E.x,
                            E.y,
                            E.width,
                            E.height,
                          )
                        ) {
                          y = !0;
                          break;
                        }
                      }
                      if (y) break;
                      if (!y) {
                        var T,
                          A = i(n);
                        try {
                          for (A.s(); !(T = A.n()).done; ) {
                            var O = T.value,
                              I = O.radius || 40 * s;
                            if (l(P.x, P.y, P.width, P.height, O.x, O.y, I)) {
                              y = !0;
                              break;
                            }
                          }
                        } catch (t) {
                          A.e(t);
                        } finally {
                          A.f();
                        }
                      }
                      if (!y) {
                        var F = P.x - P.width / 2,
                          L = P.x + P.width / 2,
                          R = P.y - P.height / 2,
                          z = P.y + P.height / 2;
                        (F < 0 || L > h || R < 0 || z > u) && (y = !0);
                      }
                      if (y) break;
                    }
                    if (y) break;
                    ((g = b), (m = v));
                  }
                  (100 * (g - 1)).toFixed(0);
                  m.forEach(function (t) {
                    p[t.index];
                    ((e[t.index].width = t.width),
                      (e[t.index].height = t.height),
                      (e[t.index].fontSize = t.fontSize),
                      (e[t.index].lines = t.lines));
                  });
                })(t, w, p, a, y, v, n, s),
                  w.forEach(function (e) {
                    var i = e.x,
                      n = e.y,
                      s = e.lines,
                      o = e.fontSize,
                      a = e.lineHeight,
                      r = e.color,
                      l = e.width;
                    e.height;
                    ((t.font = "bold ".concat(o, "px sans-serif")),
                      (t.textAlign = "left"),
                      (t.textBaseline = "middle"));
                    var c = n - (o * a * s.length) / 2 + o / 2,
                      h = i - l / 2;
                    s.forEach(function (e, i) {
                      var n = c + o * a * i,
                        s = x(r) ? _(r, 0.6) : r;
                      ((t.strokeStyle = "#ffffff"),
                        (t.lineWidth = Math.max(4, 0.25 * o)),
                        (t.lineJoin = "round"),
                        t.strokeText(e, h, n),
                        (t.fillStyle = s),
                        t.fillText(e, h, n));
                    });
                  }));
              })(f, at, p, tt, y, O, I),
              I.forEach(function (t) {
                !(function (t, e) {
                  var i =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : 1,
                    n = e.x,
                    s = e.y,
                    o = e.radius,
                    a = e.color || "#666";
                  ((t.fillStyle = a),
                    (t.strokeStyle = _(a, 0.4)),
                    (t.lineWidth = 1 * i),
                    t.beginPath(),
                    t.arc(n, s, o, 0, 2 * Math.PI),
                    t.fill(),
                    t.stroke());
                  var r = e.name || "";
                  if (!r) return;
                  var l = 12;
                  r.length > l && (r = r.slice(0, l) + "...");
                  var c = 2 * o * 0.85,
                    h = 2 * o * 0.7,
                    u = e.isCenter ? 32 * i : 28 * i,
                    d = 10 * i,
                    f = x(a) ? "#000000" : "#ffffff";
                  if (
                    ((t.fillStyle = f),
                    (t.textAlign = "center"),
                    (t.textBaseline = "middle"),
                    r.length > 5)
                  ) {
                    for (
                      var p = Math.ceil(r.length / 2),
                        g = r.slice(0, p),
                        m = r.slice(p),
                        b = !1;
                      u > d && !b;

                    ) {
                      t.font = "bold ".concat(u, "px sans-serif");
                      var y = t.measureText(g).width,
                        v = t.measureText(m).width;
                      Math.max(y, v) <= c && 2.2 * u <= h ? (b = !0) : (u -= 1);
                    }
                    t.font = "bold ".concat(u, "px sans-serif");
                    var w = 0.6 * u;
                    ((t.fillStyle = f),
                      t.fillText(g, n, s - w),
                      t.fillText(m, n, s + w));
                  } else {
                    for (var k = !1; u > d && !k; ) {
                      ((t.font = "bold ".concat(u, "px sans-serif")),
                        t.measureText(r).width <= c ? (k = !0) : (u -= 1));
                    }
                    ((t.font = "bold ".concat(u, "px sans-serif")),
                      (t.fillStyle = f),
                      t.fillText(r, n, s));
                  }
                })(f, t, y);
              }),
              {
                width: t.width,
                height: t.height,
                chartWidth: K,
                chartHeight: J,
                offsetY: M,
                scale: y,
              }
            );
          },
          calculateTitleSize: function (t, e) {
            var i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 30,
              n =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 12;
            if (!t) return { displayTitle: "", fontSize: i };
            var s =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : null;
            if (
              (s ||
                ("undefined" != typeof document &&
                  "function" == typeof document.createElement &&
                  (s = document.createElement("canvas").getContext("2d"))),
              !s)
            )
              return {
                displayTitle: t.length > 20 ? t.substring(0, 20) + "…" : t,
                fontSize: n,
              };
            var o = i;
            s.font = "bold ".concat(o, "px sans-serif");
            var a = t,
              r = s.measureText(a).width;
            if (r > e)
              for (; a.length > 0; ) {
                var l = (a = a.slice(0, -1)) + "…";
                if ((r = s.measureText(l).width) <= e) {
                  a = l;
                  break;
                }
              }
            for (
              s.font = "bold ".concat(o, "px sans-serif"),
                r = s.measureText(a).width;
              r > e && o > n;

            )
              ((o -= 1),
                (s.font = "bold ".concat(o, "px sans-serif")),
                (r = s.measureText(a).width));
            return { displayTitle: a, fontSize: o };
          },
        };
        (t.exports && (t.exports = w),
          "undefined" != typeof window && (window.correlationChartCommon = w));
      },
      7059: (t, e, i) => {
        "use strict";
        function n() {}
        i.d(e, { P: () => _a });
        const s = (function () {
          let t = 0;
          return function () {
            return t++;
          };
        })();
        function o(t) {
          return null == t;
        }
        function a(t) {
          if (Array.isArray && Array.isArray(t)) return !0;
          const e = Object.prototype.toString.call(t);
          return "[object" === e.slice(0, 7) && "Array]" === e.slice(-6);
        }
        function r(t) {
          return (
            null !== t &&
            "[object Object]" === Object.prototype.toString.call(t)
          );
        }
        const l = (t) =>
          ("number" == typeof t || t instanceof Number) && isFinite(+t);
        function c(t, e) {
          return l(t) ? t : e;
        }
        function h(t, e) {
          return void 0 === t ? e : t;
        }
        const u = (t, e) =>
          "string" == typeof t && t.endsWith("%")
            ? (parseFloat(t) / 100) * e
            : +t;
        function d(t, e, i) {
          if (t && "function" == typeof t.call) return t.apply(i, e);
        }
        function f(t, e, i, n) {
          let s, o, l;
          if (a(t))
            if (((o = t.length), n))
              for (s = o - 1; s >= 0; s--) e.call(i, t[s], s);
            else for (s = 0; s < o; s++) e.call(i, t[s], s);
          else if (r(t))
            for (l = Object.keys(t), o = l.length, s = 0; s < o; s++)
              e.call(i, t[l[s]], l[s]);
        }
        function p(t, e) {
          let i, n, s, o;
          if (!t || !e || t.length !== e.length) return !1;
          for (i = 0, n = t.length; i < n; ++i)
            if (
              ((s = t[i]),
              (o = e[i]),
              s.datasetIndex !== o.datasetIndex || s.index !== o.index)
            )
              return !1;
          return !0;
        }
        function g(t) {
          if (a(t)) return t.map(g);
          if (r(t)) {
            const e = Object.create(null),
              i = Object.keys(t),
              n = i.length;
            let s = 0;
            for (; s < n; ++s) e[i[s]] = g(t[i[s]]);
            return e;
          }
          return t;
        }
        function m(t) {
          return -1 === ["__proto__", "prototype", "constructor"].indexOf(t);
        }
        function b(t, e, i, n) {
          if (!m(t)) return;
          const s = e[t],
            o = i[t];
          r(s) && r(o) ? x(s, o, n) : (e[t] = g(o));
        }
        function x(t, e, i) {
          const n = a(e) ? e : [e],
            s = n.length;
          if (!r(t)) return t;
          const o = (i = i || {}).merger || b;
          for (let a = 0; a < s; ++a) {
            if (!r((e = n[a]))) continue;
            const s = Object.keys(e);
            for (let n = 0, a = s.length; n < a; ++n) o(s[n], t, e, i);
          }
          return t;
        }
        function y(t, e) {
          return x(t, e, { merger: v });
        }
        function v(t, e, i) {
          if (!m(t)) return;
          const n = e[t],
            s = i[t];
          r(n) && r(s)
            ? y(n, s)
            : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = g(s));
        }
        const _ = { "": (t) => t, x: (t) => t.x, y: (t) => t.y };
        function w(t, e) {
          const i =
            _[e] ||
            (_[e] = (function (t) {
              const e = (function (t) {
                const e = t.split("."),
                  i = [];
                let n = "";
                for (const t of e)
                  ((n += t),
                    n.endsWith("\\")
                      ? (n = n.slice(0, -1) + ".")
                      : (i.push(n), (n = "")));
                return i;
              })(t);
              return (t) => {
                for (const i of e) {
                  if ("" === i) break;
                  t = t && t[i];
                }
                return t;
              };
            })(e));
          return i(t);
        }
        function k(t) {
          return t.charAt(0).toUpperCase() + t.slice(1);
        }
        const M = (t) => void 0 !== t,
          S = (t) => "function" == typeof t,
          D = (t, e) => {
            if (t.size !== e.size) return !1;
            for (const i of t) if (!e.has(i)) return !1;
            return !0;
          };
        const P = Math.PI,
          C = 2 * P,
          E = C + P,
          T = Number.POSITIVE_INFINITY,
          A = P / 180,
          O = P / 2,
          I = P / 4,
          F = (2 * P) / 3,
          L = Math.log10,
          R = Math.sign;
        function z(t) {
          const e = Math.round(t);
          t = j(t, e, t / 1e3) ? e : t;
          const i = Math.pow(10, Math.floor(L(t))),
            n = t / i;
          return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * i;
        }
        function B(t) {
          return !isNaN(parseFloat(t)) && isFinite(t);
        }
        function j(t, e, i) {
          return Math.abs(t - e) < i;
        }
        function V(t, e, i) {
          let n, s, o;
          for (n = 0, s = t.length; n < s; n++)
            ((o = t[n][i]),
              isNaN(o) ||
                ((e.min = Math.min(e.min, o)), (e.max = Math.max(e.max, o))));
        }
        function W(t) {
          return t * (P / 180);
        }
        function N(t) {
          return t * (180 / P);
        }
        function H(t) {
          if (!l(t)) return;
          let e = 1,
            i = 0;
          for (; Math.round(t * e) / e !== t; ) ((e *= 10), i++);
          return i;
        }
        function $(t, e) {
          const i = e.x - t.x,
            n = e.y - t.y,
            s = Math.sqrt(i * i + n * n);
          let o = Math.atan2(n, i);
          return (o < -0.5 * P && (o += C), { angle: o, distance: s });
        }
        function q(t, e) {
          return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
        }
        function Y(t, e) {
          return ((t - e + E) % C) - P;
        }
        function U(t) {
          return ((t % C) + C) % C;
        }
        function X(t, e, i, n) {
          const s = U(t),
            o = U(e),
            a = U(i),
            r = U(o - s),
            l = U(a - s),
            c = U(s - o),
            h = U(s - a);
          return s === o || s === a || (n && o === a) || (r > l && c < h);
        }
        function G(t, e, i) {
          return Math.max(e, Math.min(i, t));
        }
        function Z(t, e, i, n = 1e-6) {
          return t >= Math.min(e, i) - n && t <= Math.max(e, i) + n;
        }
        function K(t, e, i) {
          i = i || ((i) => t[i] < e);
          let n,
            s = t.length - 1,
            o = 0;
          for (; s - o > 1; ) ((n = (o + s) >> 1), i(n) ? (o = n) : (s = n));
          return { lo: o, hi: s };
        }
        const J = (t, e, i, n) =>
            K(t, i, n ? (n) => t[n][e] <= i : (n) => t[n][e] < i),
          Q = (t, e, i) => K(t, i, (n) => t[n][e] >= i);
        const tt = ["push", "pop", "shift", "splice", "unshift"];
        function et(t, e) {
          const i = t._chartjs;
          if (!i) return;
          const n = i.listeners,
            s = n.indexOf(e);
          (-1 !== s && n.splice(s, 1),
            n.length > 0 ||
              (tt.forEach((e) => {
                delete t[e];
              }),
              delete t._chartjs));
        }
        function it(t) {
          const e = new Set();
          let i, n;
          for (i = 0, n = t.length; i < n; ++i) e.add(t[i]);
          return e.size === n ? t : Array.from(e);
        }
        const nt =
          "undefined" == typeof window
            ? function (t) {
                return t();
              }
            : window.requestAnimationFrame;
        function st(t, e, i) {
          const n = i || ((t) => Array.prototype.slice.call(t));
          let s = !1,
            o = [];
          return function (...i) {
            ((o = n(i)),
              s ||
                ((s = !0),
                nt.call(window, () => {
                  ((s = !1), t.apply(e, o));
                })));
          };
        }
        const ot = (t) =>
            "start" === t ? "left" : "end" === t ? "right" : "center",
          at = (t, e, i) => ("start" === t ? e : "end" === t ? i : (e + i) / 2);
        function rt(t, e, i) {
          const n = e.length;
          let s = 0,
            o = n;
          if (t._sorted) {
            const { iScale: a, _parsed: r } = t,
              l = a.axis,
              {
                min: c,
                max: h,
                minDefined: u,
                maxDefined: d,
              } = a.getUserBounds();
            (u &&
              (s = G(
                Math.min(
                  J(r, a.axis, c).lo,
                  i ? n : J(e, l, a.getPixelForValue(c)).lo,
                ),
                0,
                n - 1,
              )),
              (o = d
                ? G(
                    Math.max(
                      J(r, a.axis, h, !0).hi + 1,
                      i ? 0 : J(e, l, a.getPixelForValue(h), !0).hi + 1,
                    ),
                    s,
                    n,
                  ) - s
                : n - s));
          }
          return { start: s, count: o };
        }
        function lt(t) {
          const { xScale: e, yScale: i, _scaleRanges: n } = t,
            s = { xmin: e.min, xmax: e.max, ymin: i.min, ymax: i.max };
          if (!n) return ((t._scaleRanges = s), !0);
          const o =
            n.xmin !== e.min ||
            n.xmax !== e.max ||
            n.ymin !== i.min ||
            n.ymax !== i.max;
          return (Object.assign(n, s), o);
        }
        const ct = (t) => 0 === t || 1 === t,
          ht = (t, e, i) =>
            -Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - e) * C) / i),
          ut = (t, e, i) =>
            Math.pow(2, -10 * t) * Math.sin(((t - e) * C) / i) + 1,
          dt = {
            linear: (t) => t,
            easeInQuad: (t) => t * t,
            easeOutQuad: (t) => -t * (t - 2),
            easeInOutQuad: (t) =>
              (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
            easeInCubic: (t) => t * t * t,
            easeOutCubic: (t) => (t -= 1) * t * t + 1,
            easeInOutCubic: (t) =>
              (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
            easeInQuart: (t) => t * t * t * t,
            easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
            easeInOutQuart: (t) =>
              (t /= 0.5) < 1
                ? 0.5 * t * t * t * t
                : -0.5 * ((t -= 2) * t * t * t - 2),
            easeInQuint: (t) => t * t * t * t * t,
            easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
            easeInOutQuint: (t) =>
              (t /= 0.5) < 1
                ? 0.5 * t * t * t * t * t
                : 0.5 * ((t -= 2) * t * t * t * t + 2),
            easeInSine: (t) => 1 - Math.cos(t * O),
            easeOutSine: (t) => Math.sin(t * O),
            easeInOutSine: (t) => -0.5 * (Math.cos(P * t) - 1),
            easeInExpo: (t) => (0 === t ? 0 : Math.pow(2, 10 * (t - 1))),
            easeOutExpo: (t) => (1 === t ? 1 : 1 - Math.pow(2, -10 * t)),
            easeInOutExpo: (t) =>
              ct(t)
                ? t
                : t < 0.5
                  ? 0.5 * Math.pow(2, 10 * (2 * t - 1))
                  : 0.5 * (2 - Math.pow(2, -10 * (2 * t - 1))),
            easeInCirc: (t) => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
            easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
            easeInOutCirc: (t) =>
              (t /= 0.5) < 1
                ? -0.5 * (Math.sqrt(1 - t * t) - 1)
                : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
            easeInElastic: (t) => (ct(t) ? t : ht(t, 0.075, 0.3)),
            easeOutElastic: (t) => (ct(t) ? t : ut(t, 0.075, 0.3)),
            easeInOutElastic(t) {
              const e = 0.1125;
              return ct(t)
                ? t
                : t < 0.5
                  ? 0.5 * ht(2 * t, e, 0.45)
                  : 0.5 + 0.5 * ut(2 * t - 1, e, 0.45);
            },
            easeInBack(t) {
              const e = 1.70158;
              return t * t * ((e + 1) * t - e);
            },
            easeOutBack(t) {
              const e = 1.70158;
              return (t -= 1) * t * ((e + 1) * t + e) + 1;
            },
            easeInOutBack(t) {
              let e = 1.70158;
              return (t /= 0.5) < 1
                ? t * t * ((1 + (e *= 1.525)) * t - e) * 0.5
                : 0.5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
            },
            easeInBounce: (t) => 1 - dt.easeOutBounce(1 - t),
            easeOutBounce(t) {
              const e = 7.5625,
                i = 2.75;
              return t < 1 / i
                ? e * t * t
                : t < 2 / i
                  ? e * (t -= 1.5 / i) * t + 0.75
                  : t < 2.5 / i
                    ? e * (t -= 2.25 / i) * t + 0.9375
                    : e * (t -= 2.625 / i) * t + 0.984375;
            },
            easeInOutBounce: (t) =>
              t < 0.5
                ? 0.5 * dt.easeInBounce(2 * t)
                : 0.5 * dt.easeOutBounce(2 * t - 1) + 0.5,
          };
        function ft(t) {
          return (t + 0.5) | 0;
        }
        const pt = (t, e, i) => Math.max(Math.min(t, i), e);
        function gt(t) {
          return pt(ft(2.55 * t), 0, 255);
        }
        function mt(t) {
          return pt(ft(255 * t), 0, 255);
        }
        function bt(t) {
          return pt(ft(t / 2.55) / 100, 0, 1);
        }
        function xt(t) {
          return pt(ft(100 * t), 0, 100);
        }
        const yt = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            a: 10,
            b: 11,
            c: 12,
            d: 13,
            e: 14,
            f: 15,
          },
          vt = [..."0123456789ABCDEF"],
          _t = (t) => vt[15 & t],
          wt = (t) => vt[(240 & t) >> 4] + vt[15 & t],
          kt = (t) => (240 & t) >> 4 == (15 & t);
        function Mt(t) {
          var e = ((t) => kt(t.r) && kt(t.g) && kt(t.b) && kt(t.a))(t)
            ? _t
            : wt;
          return t
            ? "#" +
                e(t.r) +
                e(t.g) +
                e(t.b) +
                ((t, e) => (t < 255 ? e(t) : ""))(t.a, e)
            : void 0;
        }
        const St =
          /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
        function Dt(t, e, i) {
          const n = e * Math.min(i, 1 - i),
            s = (e, s = (e + t / 30) % 12) =>
              i - n * Math.max(Math.min(s - 3, 9 - s, 1), -1);
          return [s(0), s(8), s(4)];
        }
        function Pt(t, e, i) {
          const n = (n, s = (n + t / 60) % 6) =>
            i - i * e * Math.max(Math.min(s, 4 - s, 1), 0);
          return [n(5), n(3), n(1)];
        }
        function Ct(t, e, i) {
          const n = Dt(t, 1, 0.5);
          let s;
          for (
            e + i > 1 && ((s = 1 / (e + i)), (e *= s), (i *= s)), s = 0;
            s < 3;
            s++
          )
            ((n[s] *= 1 - e - i), (n[s] += e));
          return n;
        }
        function Et(t) {
          const e = t.r / 255,
            i = t.g / 255,
            n = t.b / 255,
            s = Math.max(e, i, n),
            o = Math.min(e, i, n),
            a = (s + o) / 2;
          let r, l, c;
          return (
            s !== o &&
              ((c = s - o),
              (l = a > 0.5 ? c / (2 - s - o) : c / (s + o)),
              (r = (function (t, e, i, n, s) {
                return t === s
                  ? (e - i) / n + (e < i ? 6 : 0)
                  : e === s
                    ? (i - t) / n + 2
                    : (t - e) / n + 4;
              })(e, i, n, c, s)),
              (r = 60 * r + 0.5)),
            [0 | r, l || 0, a]
          );
        }
        function Tt(t, e, i, n) {
          return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, n)).map(mt);
        }
        function At(t, e, i) {
          return Tt(Dt, t, e, i);
        }
        function Ot(t) {
          return ((t % 360) + 360) % 360;
        }
        function It(t) {
          const e = St.exec(t);
          let i,
            n = 255;
          if (!e) return;
          e[5] !== i && (n = e[6] ? gt(+e[5]) : mt(+e[5]));
          const s = Ot(+e[2]),
            o = +e[3] / 100,
            a = +e[4] / 100;
          return (
            (i =
              "hwb" === e[1]
                ? (function (t, e, i) {
                    return Tt(Ct, t, e, i);
                  })(s, o, a)
                : "hsv" === e[1]
                  ? (function (t, e, i) {
                      return Tt(Pt, t, e, i);
                    })(s, o, a)
                  : At(s, o, a)),
            { r: i[0], g: i[1], b: i[2], a: n }
          );
        }
        const Ft = {
            x: "dark",
            Z: "light",
            Y: "re",
            X: "blu",
            W: "gr",
            V: "medium",
            U: "slate",
            A: "ee",
            T: "ol",
            S: "or",
            B: "ra",
            C: "lateg",
            D: "ights",
            R: "in",
            Q: "turquois",
            E: "hi",
            P: "ro",
            O: "al",
            N: "le",
            M: "de",
            L: "yello",
            F: "en",
            K: "ch",
            G: "arks",
            H: "ea",
            I: "ightg",
            J: "wh",
          },
          Lt = {
            OiceXe: "f0f8ff",
            antiquewEte: "faebd7",
            aqua: "ffff",
            aquamarRe: "7fffd4",
            azuY: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "0",
            blanKedOmond: "ffebcd",
            Xe: "ff",
            XeviTet: "8a2be2",
            bPwn: "a52a2a",
            burlywood: "deb887",
            caMtXe: "5f9ea0",
            KartYuse: "7fff00",
            KocTate: "d2691e",
            cSO: "ff7f50",
            cSnflowerXe: "6495ed",
            cSnsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "ffff",
            xXe: "8b",
            xcyan: "8b8b",
            xgTMnPd: "b8860b",
            xWay: "a9a9a9",
            xgYF: "6400",
            xgYy: "a9a9a9",
            xkhaki: "bdb76b",
            xmagFta: "8b008b",
            xTivegYF: "556b2f",
            xSange: "ff8c00",
            xScEd: "9932cc",
            xYd: "8b0000",
            xsOmon: "e9967a",
            xsHgYF: "8fbc8f",
            xUXe: "483d8b",
            xUWay: "2f4f4f",
            xUgYy: "2f4f4f",
            xQe: "ced1",
            xviTet: "9400d3",
            dAppRk: "ff1493",
            dApskyXe: "bfff",
            dimWay: "696969",
            dimgYy: "696969",
            dodgerXe: "1e90ff",
            fiYbrick: "b22222",
            flSOwEte: "fffaf0",
            foYstWAn: "228b22",
            fuKsia: "ff00ff",
            gaRsbSo: "dcdcdc",
            ghostwEte: "f8f8ff",
            gTd: "ffd700",
            gTMnPd: "daa520",
            Way: "808080",
            gYF: "8000",
            gYFLw: "adff2f",
            gYy: "808080",
            honeyMw: "f0fff0",
            hotpRk: "ff69b4",
            RdianYd: "cd5c5c",
            Rdigo: "4b0082",
            ivSy: "fffff0",
            khaki: "f0e68c",
            lavFMr: "e6e6fa",
            lavFMrXsh: "fff0f5",
            lawngYF: "7cfc00",
            NmoncEffon: "fffacd",
            ZXe: "add8e6",
            ZcSO: "f08080",
            Zcyan: "e0ffff",
            ZgTMnPdLw: "fafad2",
            ZWay: "d3d3d3",
            ZgYF: "90ee90",
            ZgYy: "d3d3d3",
            ZpRk: "ffb6c1",
            ZsOmon: "ffa07a",
            ZsHgYF: "20b2aa",
            ZskyXe: "87cefa",
            ZUWay: "778899",
            ZUgYy: "778899",
            ZstAlXe: "b0c4de",
            ZLw: "ffffe0",
            lime: "ff00",
            limegYF: "32cd32",
            lRF: "faf0e6",
            magFta: "ff00ff",
            maPon: "800000",
            VaquamarRe: "66cdaa",
            VXe: "cd",
            VScEd: "ba55d3",
            VpurpN: "9370db",
            VsHgYF: "3cb371",
            VUXe: "7b68ee",
            VsprRggYF: "fa9a",
            VQe: "48d1cc",
            VviTetYd: "c71585",
            midnightXe: "191970",
            mRtcYam: "f5fffa",
            mistyPse: "ffe4e1",
            moccasR: "ffe4b5",
            navajowEte: "ffdead",
            navy: "80",
            Tdlace: "fdf5e6",
            Tive: "808000",
            TivedBb: "6b8e23",
            Sange: "ffa500",
            SangeYd: "ff4500",
            ScEd: "da70d6",
            pOegTMnPd: "eee8aa",
            pOegYF: "98fb98",
            pOeQe: "afeeee",
            pOeviTetYd: "db7093",
            papayawEp: "ffefd5",
            pHKpuff: "ffdab9",
            peru: "cd853f",
            pRk: "ffc0cb",
            plum: "dda0dd",
            powMrXe: "b0e0e6",
            purpN: "800080",
            YbeccapurpN: "663399",
            Yd: "ff0000",
            Psybrown: "bc8f8f",
            PyOXe: "4169e1",
            saddNbPwn: "8b4513",
            sOmon: "fa8072",
            sandybPwn: "f4a460",
            sHgYF: "2e8b57",
            sHshell: "fff5ee",
            siFna: "a0522d",
            silver: "c0c0c0",
            skyXe: "87ceeb",
            UXe: "6a5acd",
            UWay: "708090",
            UgYy: "708090",
            snow: "fffafa",
            sprRggYF: "ff7f",
            stAlXe: "4682b4",
            tan: "d2b48c",
            teO: "8080",
            tEstN: "d8bfd8",
            tomato: "ff6347",
            Qe: "40e0d0",
            viTet: "ee82ee",
            JHt: "f5deb3",
            wEte: "ffffff",
            wEtesmoke: "f5f5f5",
            Lw: "ffff00",
            LwgYF: "9acd32",
          };
        let Rt;
        function zt(t) {
          Rt ||
            ((Rt = (function () {
              const t = {},
                e = Object.keys(Lt),
                i = Object.keys(Ft);
              let n, s, o, a, r;
              for (n = 0; n < e.length; n++) {
                for (a = r = e[n], s = 0; s < i.length; s++)
                  ((o = i[s]), (r = r.replace(o, Ft[o])));
                ((o = parseInt(Lt[a], 16)),
                  (t[r] = [(o >> 16) & 255, (o >> 8) & 255, 255 & o]));
              }
              return t;
            })()),
            (Rt.transparent = [0, 0, 0, 0]));
          const e = Rt[t.toLowerCase()];
          return (
            e && { r: e[0], g: e[1], b: e[2], a: 4 === e.length ? e[3] : 255 }
          );
        }
        const Bt =
          /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
        const jt = (t) =>
            t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055,
          Vt = (t) =>
            t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
        function Wt(t, e, i) {
          if (t) {
            let n = Et(t);
            ((n[e] = Math.max(0, Math.min(n[e] + n[e] * i, 0 === e ? 360 : 1))),
              (n = At(n)),
              (t.r = n[0]),
              (t.g = n[1]),
              (t.b = n[2]));
          }
        }
        function Nt(t, e) {
          return t ? Object.assign(e || {}, t) : t;
        }
        function Ht(t) {
          var e = { r: 0, g: 0, b: 0, a: 255 };
          return (
            Array.isArray(t)
              ? t.length >= 3 &&
                ((e = { r: t[0], g: t[1], b: t[2], a: 255 }),
                t.length > 3 && (e.a = mt(t[3])))
              : ((e = Nt(t, { r: 0, g: 0, b: 0, a: 1 })).a = mt(e.a)),
            e
          );
        }
        function $t(t) {
          return "r" === t.charAt(0)
            ? (function (t) {
                const e = Bt.exec(t);
                let i,
                  n,
                  s,
                  o = 255;
                if (e) {
                  if (e[7] !== i) {
                    const t = +e[7];
                    o = e[8] ? gt(t) : pt(255 * t, 0, 255);
                  }
                  return (
                    (i = +e[1]),
                    (n = +e[3]),
                    (s = +e[5]),
                    (i = 255 & (e[2] ? gt(i) : pt(i, 0, 255))),
                    (n = 255 & (e[4] ? gt(n) : pt(n, 0, 255))),
                    (s = 255 & (e[6] ? gt(s) : pt(s, 0, 255))),
                    { r: i, g: n, b: s, a: o }
                  );
                }
              })(t)
            : It(t);
        }
        class qt {
          constructor(t) {
            if (t instanceof qt) return t;
            const e = typeof t;
            let i;
            var n, s, o;
            ("object" === e
              ? (i = Ht(t))
              : "string" === e &&
                ((o = (n = t).length),
                "#" === n[0] &&
                  (4 === o || 5 === o
                    ? (s = {
                        r: 255 & (17 * yt[n[1]]),
                        g: 255 & (17 * yt[n[2]]),
                        b: 255 & (17 * yt[n[3]]),
                        a: 5 === o ? 17 * yt[n[4]] : 255,
                      })
                    : (7 !== o && 9 !== o) ||
                      (s = {
                        r: (yt[n[1]] << 4) | yt[n[2]],
                        g: (yt[n[3]] << 4) | yt[n[4]],
                        b: (yt[n[5]] << 4) | yt[n[6]],
                        a: 9 === o ? (yt[n[7]] << 4) | yt[n[8]] : 255,
                      })),
                (i = s || zt(t) || $t(t))),
              (this._rgb = i),
              (this._valid = !!i));
          }
          get valid() {
            return this._valid;
          }
          get rgb() {
            var t = Nt(this._rgb);
            return (t && (t.a = bt(t.a)), t);
          }
          set rgb(t) {
            this._rgb = Ht(t);
          }
          rgbString() {
            return this._valid
              ? (t = this._rgb) &&
                  (t.a < 255
                    ? `rgba(${t.r}, ${t.g}, ${t.b}, ${bt(t.a)})`
                    : `rgb(${t.r}, ${t.g}, ${t.b})`)
              : void 0;
            var t;
          }
          hexString() {
            return this._valid ? Mt(this._rgb) : void 0;
          }
          hslString() {
            return this._valid
              ? (function (t) {
                  if (!t) return;
                  const e = Et(t),
                    i = e[0],
                    n = xt(e[1]),
                    s = xt(e[2]);
                  return t.a < 255
                    ? `hsla(${i}, ${n}%, ${s}%, ${bt(t.a)})`
                    : `hsl(${i}, ${n}%, ${s}%)`;
                })(this._rgb)
              : void 0;
          }
          mix(t, e) {
            if (t) {
              const i = this.rgb,
                n = t.rgb;
              let s;
              const o = e === s ? 0.5 : e,
                a = 2 * o - 1,
                r = i.a - n.a,
                l = ((a * r === -1 ? a : (a + r) / (1 + a * r)) + 1) / 2;
              ((s = 1 - l),
                (i.r = 255 & (l * i.r + s * n.r + 0.5)),
                (i.g = 255 & (l * i.g + s * n.g + 0.5)),
                (i.b = 255 & (l * i.b + s * n.b + 0.5)),
                (i.a = o * i.a + (1 - o) * n.a),
                (this.rgb = i));
            }
            return this;
          }
          interpolate(t, e) {
            return (
              t &&
                (this._rgb = (function (t, e, i) {
                  const n = Vt(bt(t.r)),
                    s = Vt(bt(t.g)),
                    o = Vt(bt(t.b));
                  return {
                    r: mt(jt(n + i * (Vt(bt(e.r)) - n))),
                    g: mt(jt(s + i * (Vt(bt(e.g)) - s))),
                    b: mt(jt(o + i * (Vt(bt(e.b)) - o))),
                    a: t.a + i * (e.a - t.a),
                  };
                })(this._rgb, t._rgb, e)),
              this
            );
          }
          clone() {
            return new qt(this.rgb);
          }
          alpha(t) {
            return ((this._rgb.a = mt(t)), this);
          }
          clearer(t) {
            return ((this._rgb.a *= 1 - t), this);
          }
          greyscale() {
            const t = this._rgb,
              e = ft(0.3 * t.r + 0.59 * t.g + 0.11 * t.b);
            return ((t.r = t.g = t.b = e), this);
          }
          opaquer(t) {
            return ((this._rgb.a *= 1 + t), this);
          }
          negate() {
            const t = this._rgb;
            return (
              (t.r = 255 - t.r),
              (t.g = 255 - t.g),
              (t.b = 255 - t.b),
              this
            );
          }
          lighten(t) {
            return (Wt(this._rgb, 2, t), this);
          }
          darken(t) {
            return (Wt(this._rgb, 2, -t), this);
          }
          saturate(t) {
            return (Wt(this._rgb, 1, t), this);
          }
          desaturate(t) {
            return (Wt(this._rgb, 1, -t), this);
          }
          rotate(t) {
            return (
              (function (t, e) {
                var i = Et(t);
                ((i[0] = Ot(i[0] + e)),
                  (i = At(i)),
                  (t.r = i[0]),
                  (t.g = i[1]),
                  (t.b = i[2]));
              })(this._rgb, t),
              this
            );
          }
        }
        function Yt(t) {
          return new qt(t);
        }
        function Ut(t) {
          if (t && "object" == typeof t) {
            const e = t.toString();
            return (
              "[object CanvasPattern]" === e || "[object CanvasGradient]" === e
            );
          }
          return !1;
        }
        function Xt(t) {
          return Ut(t) ? t : Yt(t);
        }
        function Gt(t) {
          return Ut(t) ? t : Yt(t).saturate(0.5).darken(0.1).hexString();
        }
        const Zt = Object.create(null),
          Kt = Object.create(null);
        function Jt(t, e) {
          if (!e) return t;
          const i = e.split(".");
          for (let e = 0, n = i.length; e < n; ++e) {
            const n = i[e];
            t = t[n] || (t[n] = Object.create(null));
          }
          return t;
        }
        function Qt(t, e, i) {
          return "string" == typeof e ? x(Jt(t, e), i) : x(Jt(t, ""), e);
        }
        var te = new (class {
          constructor(t) {
            ((this.animation = void 0),
              (this.backgroundColor = "rgba(0,0,0,0.1)"),
              (this.borderColor = "rgba(0,0,0,0.1)"),
              (this.color = "#666"),
              (this.datasets = {}),
              (this.devicePixelRatio = (t) =>
                t.chart.platform.getDevicePixelRatio()),
              (this.elements = {}),
              (this.events = [
                "mousemove",
                "mouseout",
                "click",
                "touchstart",
                "touchmove",
              ]),
              (this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null,
              }),
              (this.hover = {}),
              (this.hoverBackgroundColor = (t, e) => Gt(e.backgroundColor)),
              (this.hoverBorderColor = (t, e) => Gt(e.borderColor)),
              (this.hoverColor = (t, e) => Gt(e.color)),
              (this.indexAxis = "x"),
              (this.interaction = {
                mode: "nearest",
                intersect: !0,
                includeInvisible: !1,
              }),
              (this.maintainAspectRatio = !0),
              (this.onHover = null),
              (this.onClick = null),
              (this.parsing = !0),
              (this.plugins = {}),
              (this.responsive = !0),
              (this.scale = void 0),
              (this.scales = {}),
              (this.showLine = !0),
              (this.drawActiveElementsOnTop = !0),
              this.describe(t));
          }
          set(t, e) {
            return Qt(this, t, e);
          }
          get(t) {
            return Jt(this, t);
          }
          describe(t, e) {
            return Qt(Kt, t, e);
          }
          override(t, e) {
            return Qt(Zt, t, e);
          }
          route(t, e, i, n) {
            const s = Jt(this, t),
              o = Jt(this, i),
              a = "_" + e;
            Object.defineProperties(s, {
              [a]: { value: s[e], writable: !0 },
              [e]: {
                enumerable: !0,
                get() {
                  const t = this[a],
                    e = o[n];
                  return r(t) ? Object.assign({}, e, t) : h(t, e);
                },
                set(t) {
                  this[a] = t;
                },
              },
            });
          }
        })({
          _scriptable: (t) => !t.startsWith("on"),
          _indexable: (t) => "events" !== t,
          hover: { _fallback: "interaction" },
          interaction: { _scriptable: !1, _indexable: !1 },
        });
        function ee(t, e, i, n, s) {
          let o = e[s];
          return (
            o || ((o = e[s] = t.measureText(s).width), i.push(s)),
            o > n && (n = o),
            n
          );
        }
        function ie(t, e, i, n) {
          let s = ((n = n || {}).data = n.data || {}),
            o = (n.garbageCollect = n.garbageCollect || []);
          (n.font !== e &&
            ((s = n.data = {}), (o = n.garbageCollect = []), (n.font = e)),
            t.save(),
            (t.font = e));
          let r = 0;
          const l = i.length;
          let c, h, u, d, f;
          for (c = 0; c < l; c++)
            if (((d = i[c]), null != d && !0 !== a(d))) r = ee(t, s, o, r, d);
            else if (a(d))
              for (h = 0, u = d.length; h < u; h++)
                ((f = d[h]), null == f || a(f) || (r = ee(t, s, o, r, f)));
          t.restore();
          const p = o.length / 2;
          if (p > i.length) {
            for (c = 0; c < p; c++) delete s[o[c]];
            o.splice(0, p);
          }
          return r;
        }
        function ne(t, e, i) {
          const n = t.currentDevicePixelRatio,
            s = 0 !== i ? Math.max(i / 2, 0.5) : 0;
          return Math.round((e - s) * n) / n + s;
        }
        function se(t, e) {
          ((e = e || t.getContext("2d")).save(),
            e.resetTransform(),
            e.clearRect(0, 0, t.width, t.height),
            e.restore());
        }
        function oe(t, e, i, n) {
          ae(t, e, i, n, null);
        }
        function ae(t, e, i, n, s) {
          let o, a, r, l, c, h;
          const u = e.pointStyle,
            d = e.rotation,
            f = e.radius;
          let p = (d || 0) * A;
          if (
            u &&
            "object" == typeof u &&
            ((o = u.toString()),
            "[object HTMLImageElement]" === o ||
              "[object HTMLCanvasElement]" === o)
          )
            return (
              t.save(),
              t.translate(i, n),
              t.rotate(p),
              t.drawImage(u, -u.width / 2, -u.height / 2, u.width, u.height),
              void t.restore()
            );
          if (!(isNaN(f) || f <= 0)) {
            switch ((t.beginPath(), u)) {
              default:
                (s ? t.ellipse(i, n, s / 2, f, 0, 0, C) : t.arc(i, n, f, 0, C),
                  t.closePath());
                break;
              case "triangle":
                (t.moveTo(i + Math.sin(p) * f, n - Math.cos(p) * f),
                  (p += F),
                  t.lineTo(i + Math.sin(p) * f, n - Math.cos(p) * f),
                  (p += F),
                  t.lineTo(i + Math.sin(p) * f, n - Math.cos(p) * f),
                  t.closePath());
                break;
              case "rectRounded":
                ((c = 0.516 * f),
                  (l = f - c),
                  (a = Math.cos(p + I) * l),
                  (r = Math.sin(p + I) * l),
                  t.arc(i - a, n - r, c, p - P, p - O),
                  t.arc(i + r, n - a, c, p - O, p),
                  t.arc(i + a, n + r, c, p, p + O),
                  t.arc(i - r, n + a, c, p + O, p + P),
                  t.closePath());
                break;
              case "rect":
                if (!d) {
                  ((l = Math.SQRT1_2 * f),
                    (h = s ? s / 2 : l),
                    t.rect(i - h, n - l, 2 * h, 2 * l));
                  break;
                }
                p += I;
              case "rectRot":
                ((a = Math.cos(p) * f),
                  (r = Math.sin(p) * f),
                  t.moveTo(i - a, n - r),
                  t.lineTo(i + r, n - a),
                  t.lineTo(i + a, n + r),
                  t.lineTo(i - r, n + a),
                  t.closePath());
                break;
              case "crossRot":
                p += I;
              case "cross":
                ((a = Math.cos(p) * f),
                  (r = Math.sin(p) * f),
                  t.moveTo(i - a, n - r),
                  t.lineTo(i + a, n + r),
                  t.moveTo(i + r, n - a),
                  t.lineTo(i - r, n + a));
                break;
              case "star":
                ((a = Math.cos(p) * f),
                  (r = Math.sin(p) * f),
                  t.moveTo(i - a, n - r),
                  t.lineTo(i + a, n + r),
                  t.moveTo(i + r, n - a),
                  t.lineTo(i - r, n + a),
                  (p += I),
                  (a = Math.cos(p) * f),
                  (r = Math.sin(p) * f),
                  t.moveTo(i - a, n - r),
                  t.lineTo(i + a, n + r),
                  t.moveTo(i + r, n - a),
                  t.lineTo(i - r, n + a));
                break;
              case "line":
                ((a = s ? s / 2 : Math.cos(p) * f),
                  (r = Math.sin(p) * f),
                  t.moveTo(i - a, n - r),
                  t.lineTo(i + a, n + r));
                break;
              case "dash":
                (t.moveTo(i, n),
                  t.lineTo(i + Math.cos(p) * f, n + Math.sin(p) * f));
            }
            (t.fill(), e.borderWidth > 0 && t.stroke());
          }
        }
        function re(t, e, i) {
          return (
            (i = i || 0.5),
            !e ||
              (t &&
                t.x > e.left - i &&
                t.x < e.right + i &&
                t.y > e.top - i &&
                t.y < e.bottom + i)
          );
        }
        function le(t, e) {
          (t.save(),
            t.beginPath(),
            t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top),
            t.clip());
        }
        function ce(t) {
          t.restore();
        }
        function he(t, e, i, n, s) {
          if (!e) return t.lineTo(i.x, i.y);
          if ("middle" === s) {
            const n = (e.x + i.x) / 2;
            (t.lineTo(n, e.y), t.lineTo(n, i.y));
          } else
            ("after" === s) != !!n ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);
          t.lineTo(i.x, i.y);
        }
        function ue(t, e, i, n) {
          if (!e) return t.lineTo(i.x, i.y);
          t.bezierCurveTo(
            n ? e.cp1x : e.cp2x,
            n ? e.cp1y : e.cp2y,
            n ? i.cp2x : i.cp1x,
            n ? i.cp2y : i.cp1y,
            i.x,
            i.y,
          );
        }
        function de(t, e, i, n, s, r = {}) {
          const l = a(e) ? e : [e],
            c = r.strokeWidth > 0 && "" !== r.strokeColor;
          let h, u;
          for (
            t.save(),
              t.font = s.string,
              (function (t, e) {
                e.translation &&
                  t.translate(e.translation[0], e.translation[1]);
                o(e.rotation) || t.rotate(e.rotation);
                e.color && (t.fillStyle = e.color);
                e.textAlign && (t.textAlign = e.textAlign);
                e.textBaseline && (t.textBaseline = e.textBaseline);
              })(t, r),
              h = 0;
            h < l.length;
            ++h
          )
            ((u = l[h]),
              c &&
                (r.strokeColor && (t.strokeStyle = r.strokeColor),
                o(r.strokeWidth) || (t.lineWidth = r.strokeWidth),
                t.strokeText(u, i, n, r.maxWidth)),
              t.fillText(u, i, n, r.maxWidth),
              fe(t, i, n, u, r),
              (n += s.lineHeight));
          t.restore();
        }
        function fe(t, e, i, n, s) {
          if (s.strikethrough || s.underline) {
            const o = t.measureText(n),
              a = e - o.actualBoundingBoxLeft,
              r = e + o.actualBoundingBoxRight,
              l = i - o.actualBoundingBoxAscent,
              c = i + o.actualBoundingBoxDescent,
              h = s.strikethrough ? (l + c) / 2 : c;
            ((t.strokeStyle = t.fillStyle),
              t.beginPath(),
              (t.lineWidth = s.decorationWidth || 2),
              t.moveTo(a, h),
              t.lineTo(r, h),
              t.stroke());
          }
        }
        function pe(t, e) {
          const { x: i, y: n, w: s, h: o, radius: a } = e;
          (t.arc(i + a.topLeft, n + a.topLeft, a.topLeft, -O, P, !0),
            t.lineTo(i, n + o - a.bottomLeft),
            t.arc(
              i + a.bottomLeft,
              n + o - a.bottomLeft,
              a.bottomLeft,
              P,
              O,
              !0,
            ),
            t.lineTo(i + s - a.bottomRight, n + o),
            t.arc(
              i + s - a.bottomRight,
              n + o - a.bottomRight,
              a.bottomRight,
              O,
              0,
              !0,
            ),
            t.lineTo(i + s, n + a.topRight),
            t.arc(i + s - a.topRight, n + a.topRight, a.topRight, 0, -O, !0),
            t.lineTo(i + a.topLeft, n));
        }
        const ge = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/),
          me = new RegExp(
            /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/,
          );
        function be(t, e) {
          const i = ("" + t).match(ge);
          if (!i || "normal" === i[1]) return 1.2 * e;
          switch (((t = +i[2]), i[3])) {
            case "px":
              return t;
            case "%":
              t /= 100;
          }
          return e * t;
        }
        const xe = (t) => +t || 0;
        function ye(t, e) {
          const i = {},
            n = r(e),
            s = n ? Object.keys(e) : e,
            o = r(t) ? (n ? (i) => h(t[i], t[e[i]]) : (e) => t[e]) : () => t;
          for (const t of s) i[t] = xe(o(t));
          return i;
        }
        function ve(t) {
          return ye(t, { top: "y", right: "x", bottom: "y", left: "x" });
        }
        function _e(t) {
          return ye(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
        }
        function we(t) {
          const e = ve(t);
          return (
            (e.width = e.left + e.right),
            (e.height = e.top + e.bottom),
            e
          );
        }
        function ke(t, e) {
          ((t = t || {}), (e = e || te.font));
          let i = h(t.size, e.size);
          "string" == typeof i && (i = parseInt(i, 10));
          let n = h(t.style, e.style);
          n && !("" + n).match(me) && (n = "");
          const s = {
            family: h(t.family, e.family),
            lineHeight: be(h(t.lineHeight, e.lineHeight), i),
            size: i,
            style: n,
            weight: h(t.weight, e.weight),
            string: "",
          };
          return (
            (s.string = (function (t) {
              return !t || o(t.size) || o(t.family)
                ? null
                : (t.style ? t.style + " " : "") +
                    (t.weight ? t.weight + " " : "") +
                    t.size +
                    "px " +
                    t.family;
            })(s)),
            s
          );
        }
        function Me(t, e, i, n) {
          let s,
            o,
            r,
            l = !0;
          for (s = 0, o = t.length; s < o; ++s)
            if (
              ((r = t[s]),
              void 0 !== r &&
                (void 0 !== e &&
                  "function" == typeof r &&
                  ((r = r(e)), (l = !1)),
                void 0 !== i && a(r) && ((r = r[i % r.length]), (l = !1)),
                void 0 !== r))
            )
              return (n && !l && (n.cacheable = !1), r);
        }
        function Se(t, e) {
          return Object.assign(Object.create(t), e);
        }
        function De(t, e = [""], i = t, n, s = () => t[0]) {
          M(n) || (n = ze("_fallback", t));
          const o = {
            [Symbol.toStringTag]: "Object",
            _cacheable: !0,
            _scopes: t,
            _rootScopes: i,
            _fallback: n,
            _getTarget: s,
            override: (s) => De([s, ...t], e, i, n),
          };
          return new Proxy(o, {
            deleteProperty: (e, i) => (
              delete e[i],
              delete e._keys,
              delete t[0][i],
              !0
            ),
            get: (i, n) =>
              Ae(i, n, () =>
                (function (t, e, i, n) {
                  let s;
                  for (const o of e)
                    if (((s = ze(Ee(o, t), i)), M(s)))
                      return Te(t, s) ? Le(i, n, t, s) : s;
                })(n, e, t, i),
              ),
            getOwnPropertyDescriptor: (t, e) =>
              Reflect.getOwnPropertyDescriptor(t._scopes[0], e),
            getPrototypeOf: () => Reflect.getPrototypeOf(t[0]),
            has: (t, e) => Be(t).includes(e),
            ownKeys: (t) => Be(t),
            set(t, e, i) {
              const n = t._storage || (t._storage = s());
              return ((t[e] = n[e] = i), delete t._keys, !0);
            },
          });
        }
        function Pe(t, e, i, n) {
          const s = {
            _cacheable: !1,
            _proxy: t,
            _context: e,
            _subProxy: i,
            _stack: new Set(),
            _descriptors: Ce(t, n),
            setContext: (e) => Pe(t, e, i, n),
            override: (s) => Pe(t.override(s), e, i, n),
          };
          return new Proxy(s, {
            deleteProperty: (e, i) => (delete e[i], delete t[i], !0),
            get: (t, e, i) =>
              Ae(t, e, () =>
                (function (t, e, i) {
                  const {
                    _proxy: n,
                    _context: s,
                    _subProxy: o,
                    _descriptors: l,
                  } = t;
                  let c = n[e];
                  S(c) &&
                    l.isScriptable(e) &&
                    (c = (function (t, e, i, n) {
                      const {
                        _proxy: s,
                        _context: o,
                        _subProxy: a,
                        _stack: r,
                      } = i;
                      if (r.has(t))
                        throw new Error(
                          "Recursion detected: " +
                            Array.from(r).join("->") +
                            "->" +
                            t,
                        );
                      (r.add(t),
                        (e = e(o, a || n)),
                        r.delete(t),
                        Te(t, e) && (e = Le(s._scopes, s, t, e)));
                      return e;
                    })(e, c, t, i));
                  a(c) &&
                    c.length &&
                    (c = (function (t, e, i, n) {
                      const {
                        _proxy: s,
                        _context: o,
                        _subProxy: a,
                        _descriptors: l,
                      } = i;
                      if (M(o.index) && n(t)) e = e[o.index % e.length];
                      else if (r(e[0])) {
                        const i = e,
                          n = s._scopes.filter((t) => t !== i);
                        e = [];
                        for (const r of i) {
                          const i = Le(n, s, t, r);
                          e.push(Pe(i, o, a && a[t], l));
                        }
                      }
                      return e;
                    })(e, c, t, l.isIndexable));
                  Te(e, c) && (c = Pe(c, s, o && o[e], l));
                  return c;
                })(t, e, i),
              ),
            getOwnPropertyDescriptor: (e, i) =>
              e._descriptors.allKeys
                ? Reflect.has(t, i)
                  ? { enumerable: !0, configurable: !0 }
                  : void 0
                : Reflect.getOwnPropertyDescriptor(t, i),
            getPrototypeOf: () => Reflect.getPrototypeOf(t),
            has: (e, i) => Reflect.has(t, i),
            ownKeys: () => Reflect.ownKeys(t),
            set: (e, i, n) => ((t[i] = n), delete e[i], !0),
          });
        }
        function Ce(t, e = { scriptable: !0, indexable: !0 }) {
          const {
            _scriptable: i = e.scriptable,
            _indexable: n = e.indexable,
            _allKeys: s = e.allKeys,
          } = t;
          return {
            allKeys: s,
            scriptable: i,
            indexable: n,
            isScriptable: S(i) ? i : () => i,
            isIndexable: S(n) ? n : () => n,
          };
        }
        const Ee = (t, e) => (t ? t + k(e) : e),
          Te = (t, e) =>
            r(e) &&
            "adapters" !== t &&
            (null === Object.getPrototypeOf(e) || e.constructor === Object);
        function Ae(t, e, i) {
          if (Object.prototype.hasOwnProperty.call(t, e)) return t[e];
          const n = i();
          return ((t[e] = n), n);
        }
        function Oe(t, e, i) {
          return S(t) ? t(e, i) : t;
        }
        const Ie = (t, e) =>
          !0 === t ? e : "string" == typeof t ? w(e, t) : void 0;
        function Fe(t, e, i, n, s) {
          for (const o of e) {
            const e = Ie(i, o);
            if (e) {
              t.add(e);
              const o = Oe(e._fallback, i, s);
              if (M(o) && o !== i && o !== n) return o;
            } else if (!1 === e && M(n) && i !== n) return null;
          }
          return !1;
        }
        function Le(t, e, i, n) {
          const s = e._rootScopes,
            o = Oe(e._fallback, i, n),
            l = [...t, ...s],
            c = new Set();
          c.add(n);
          let h = Re(c, l, i, o || i, n);
          return (
            null !== h &&
            (!M(o) || o === i || ((h = Re(c, l, o, h, n)), null !== h)) &&
            De(Array.from(c), [""], s, o, () =>
              (function (t, e, i) {
                const n = t._getTarget();
                e in n || (n[e] = {});
                const s = n[e];
                if (a(s) && r(i)) return i;
                return s;
              })(e, i, n),
            )
          );
        }
        function Re(t, e, i, n, s) {
          for (; i; ) i = Fe(t, e, i, n, s);
          return i;
        }
        function ze(t, e) {
          for (const i of e) {
            if (!i) continue;
            const e = i[t];
            if (M(e)) return e;
          }
        }
        function Be(t) {
          let e = t._keys;
          return (
            e ||
              (e = t._keys =
                (function (t) {
                  const e = new Set();
                  for (const i of t)
                    for (const t of Object.keys(i).filter(
                      (t) => !t.startsWith("_"),
                    ))
                      e.add(t);
                  return Array.from(e);
                })(t._scopes)),
            e
          );
        }
        function je(t, e, i, n) {
          const { iScale: s } = t,
            { key: o = "r" } = this._parsing,
            a = new Array(n);
          let r, l, c, h;
          for (r = 0, l = n; r < l; ++r)
            ((c = r + i), (h = e[c]), (a[r] = { r: s.parse(w(h, o), c) }));
          return a;
        }
        const Ve = Number.EPSILON || 1e-14,
          We = (t, e) => e < t.length && !t[e].skip && t[e],
          Ne = (t) => ("x" === t ? "y" : "x");
        function He(t, e, i, n) {
          const s = t.skip ? e : t,
            o = e,
            a = i.skip ? e : i,
            r = q(o, s),
            l = q(a, o);
          let c = r / (r + l),
            h = l / (r + l);
          ((c = isNaN(c) ? 0 : c), (h = isNaN(h) ? 0 : h));
          const u = n * c,
            d = n * h;
          return {
            previous: { x: o.x - u * (a.x - s.x), y: o.y - u * (a.y - s.y) },
            next: { x: o.x + d * (a.x - s.x), y: o.y + d * (a.y - s.y) },
          };
        }
        function $e(t, e = "x") {
          const i = Ne(e),
            n = t.length,
            s = Array(n).fill(0),
            o = Array(n);
          let a,
            r,
            l,
            c = We(t, 0);
          for (a = 0; a < n; ++a)
            if (((r = l), (l = c), (c = We(t, a + 1)), l)) {
              if (c) {
                const t = c[e] - l[e];
                s[a] = 0 !== t ? (c[i] - l[i]) / t : 0;
              }
              o[a] = r
                ? c
                  ? R(s[a - 1]) !== R(s[a])
                    ? 0
                    : (s[a - 1] + s[a]) / 2
                  : s[a - 1]
                : s[a];
            }
          (!(function (t, e, i) {
            const n = t.length;
            let s,
              o,
              a,
              r,
              l,
              c = We(t, 0);
            for (let h = 0; h < n - 1; ++h)
              ((l = c),
                (c = We(t, h + 1)),
                l &&
                  c &&
                  (j(e[h], 0, Ve)
                    ? (i[h] = i[h + 1] = 0)
                    : ((s = i[h] / e[h]),
                      (o = i[h + 1] / e[h]),
                      (r = Math.pow(s, 2) + Math.pow(o, 2)),
                      r <= 9 ||
                        ((a = 3 / Math.sqrt(r)),
                        (i[h] = s * a * e[h]),
                        (i[h + 1] = o * a * e[h])))));
          })(t, s, o),
            (function (t, e, i = "x") {
              const n = Ne(i),
                s = t.length;
              let o,
                a,
                r,
                l = We(t, 0);
              for (let c = 0; c < s; ++c) {
                if (((a = r), (r = l), (l = We(t, c + 1)), !r)) continue;
                const s = r[i],
                  h = r[n];
                (a &&
                  ((o = (s - a[i]) / 3),
                  (r[`cp1${i}`] = s - o),
                  (r[`cp1${n}`] = h - o * e[c])),
                  l &&
                    ((o = (l[i] - s) / 3),
                    (r[`cp2${i}`] = s + o),
                    (r[`cp2${n}`] = h + o * e[c])));
              }
            })(t, o, e));
        }
        function qe(t, e, i) {
          return Math.max(Math.min(t, i), e);
        }
        function Ye(t, e, i, n, s) {
          let o, a, r, l;
          if (
            (e.spanGaps && (t = t.filter((t) => !t.skip)),
            "monotone" === e.cubicInterpolationMode)
          )
            $e(t, s);
          else {
            let i = n ? t[t.length - 1] : t[0];
            for (o = 0, a = t.length; o < a; ++o)
              ((r = t[o]),
                (l = He(
                  i,
                  r,
                  t[Math.min(o + 1, a - (n ? 0 : 1)) % a],
                  e.tension,
                )),
                (r.cp1x = l.previous.x),
                (r.cp1y = l.previous.y),
                (r.cp2x = l.next.x),
                (r.cp2y = l.next.y),
                (i = r));
          }
          e.capBezierPoints &&
            (function (t, e) {
              let i,
                n,
                s,
                o,
                a,
                r = re(t[0], e);
              for (i = 0, n = t.length; i < n; ++i)
                ((a = o),
                  (o = r),
                  (r = i < n - 1 && re(t[i + 1], e)),
                  o &&
                    ((s = t[i]),
                    a &&
                      ((s.cp1x = qe(s.cp1x, e.left, e.right)),
                      (s.cp1y = qe(s.cp1y, e.top, e.bottom))),
                    r &&
                      ((s.cp2x = qe(s.cp2x, e.left, e.right)),
                      (s.cp2y = qe(s.cp2y, e.top, e.bottom)))));
            })(t, i);
        }
        function Ue() {
          return "undefined" != typeof window && "undefined" != typeof document;
        }
        function Xe(t) {
          let e = t.parentNode;
          return (
            e && "[object ShadowRoot]" === e.toString() && (e = e.host),
            e
          );
        }
        function Ge(t, e, i) {
          let n;
          return (
            "string" == typeof t
              ? ((n = parseInt(t, 10)),
                -1 !== t.indexOf("%") && (n = (n / 100) * e.parentNode[i]))
              : (n = t),
            n
          );
        }
        const Ze = (t) => window.getComputedStyle(t, null);
        const Ke = ["top", "right", "bottom", "left"];
        function Je(t, e, i) {
          const n = {};
          i = i ? "-" + i : "";
          for (let s = 0; s < 4; s++) {
            const o = Ke[s];
            n[o] = parseFloat(t[e + "-" + o + i]) || 0;
          }
          return (
            (n.width = n.left + n.right),
            (n.height = n.top + n.bottom),
            n
          );
        }
        function Qe(t, e) {
          if ("native" in t) return t;
          const { canvas: i, currentDevicePixelRatio: n } = e,
            s = Ze(i),
            o = "border-box" === s.boxSizing,
            a = Je(s, "padding"),
            r = Je(s, "border", "width"),
            {
              x: l,
              y: c,
              box: h,
            } = (function (t, e) {
              const i = t.touches,
                n = i && i.length ? i[0] : t,
                { offsetX: s, offsetY: o } = n;
              let a,
                r,
                l = !1;
              if (
                ((t, e, i) => (t > 0 || e > 0) && (!i || !i.shadowRoot))(
                  s,
                  o,
                  t.target,
                )
              )
                ((a = s), (r = o));
              else {
                const t = e.getBoundingClientRect();
                ((a = n.clientX - t.left), (r = n.clientY - t.top), (l = !0));
              }
              return { x: a, y: r, box: l };
            })(t, i),
            u = a.left + (h && r.left),
            d = a.top + (h && r.top);
          let { width: f, height: p } = e;
          return (
            o && ((f -= a.width + r.width), (p -= a.height + r.height)),
            {
              x: Math.round((((l - u) / f) * i.width) / n),
              y: Math.round((((c - d) / p) * i.height) / n),
            }
          );
        }
        const ti = (t) => Math.round(10 * t) / 10;
        function ei(t, e, i, n) {
          const s = Ze(t),
            o = Je(s, "margin"),
            a = Ge(s.maxWidth, t, "clientWidth") || T,
            r = Ge(s.maxHeight, t, "clientHeight") || T,
            l = (function (t, e, i) {
              let n, s;
              if (void 0 === e || void 0 === i) {
                const o = Xe(t);
                if (o) {
                  const t = o.getBoundingClientRect(),
                    a = Ze(o),
                    r = Je(a, "border", "width"),
                    l = Je(a, "padding");
                  ((e = t.width - l.width - r.width),
                    (i = t.height - l.height - r.height),
                    (n = Ge(a.maxWidth, o, "clientWidth")),
                    (s = Ge(a.maxHeight, o, "clientHeight")));
                } else ((e = t.clientWidth), (i = t.clientHeight));
              }
              return {
                width: e,
                height: i,
                maxWidth: n || T,
                maxHeight: s || T,
              };
            })(t, e, i);
          let { width: c, height: h } = l;
          if ("content-box" === s.boxSizing) {
            const t = Je(s, "border", "width"),
              e = Je(s, "padding");
            ((c -= e.width + t.width), (h -= e.height + t.height));
          }
          return (
            (c = Math.max(0, c - o.width)),
            (h = Math.max(0, n ? Math.floor(c / n) : h - o.height)),
            (c = ti(Math.min(c, a, l.maxWidth))),
            (h = ti(Math.min(h, r, l.maxHeight))),
            c && !h && (h = ti(c / 2)),
            { width: c, height: h }
          );
        }
        function ii(t, e, i) {
          const n = e || 1,
            s = Math.floor(t.height * n),
            o = Math.floor(t.width * n);
          ((t.height = s / n), (t.width = o / n));
          const a = t.canvas;
          return (
            a.style &&
              (i || (!a.style.height && !a.style.width)) &&
              ((a.style.height = `${t.height}px`),
              (a.style.width = `${t.width}px`)),
            (t.currentDevicePixelRatio !== n ||
              a.height !== s ||
              a.width !== o) &&
              ((t.currentDevicePixelRatio = n),
              (a.height = s),
              (a.width = o),
              t.ctx.setTransform(n, 0, 0, n, 0, 0),
              !0)
          );
        }
        const ni = (function () {
          let t = !1;
          try {
            const e = {
              get passive() {
                return ((t = !0), !1);
              },
            };
            (window.addEventListener("test", null, e),
              window.removeEventListener("test", null, e));
          } catch (t) {}
          return t;
        })();
        function si(t, e) {
          const i = (function (t, e) {
              return Ze(t).getPropertyValue(e);
            })(t, e),
            n = i && i.match(/^(\d+)(\.\d+)?px$/);
          return n ? +n[1] : void 0;
        }
        function oi(t, e, i, n) {
          return { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) };
        }
        function ai(t, e, i, n) {
          return {
            x: t.x + i * (e.x - t.x),
            y:
              "middle" === n
                ? i < 0.5
                  ? t.y
                  : e.y
                : "after" === n
                  ? i < 1
                    ? t.y
                    : e.y
                  : i > 0
                    ? e.y
                    : t.y,
          };
        }
        function ri(t, e, i, n) {
          const s = { x: t.cp2x, y: t.cp2y },
            o = { x: e.cp1x, y: e.cp1y },
            a = oi(t, s, i),
            r = oi(s, o, i),
            l = oi(o, e, i),
            c = oi(a, r, i),
            h = oi(r, l, i);
          return oi(c, h, i);
        }
        const li = new Map();
        function ci(t, e, i) {
          return (function (t, e) {
            e = e || {};
            const i = t + JSON.stringify(e);
            let n = li.get(i);
            return (n || ((n = new Intl.NumberFormat(t, e)), li.set(i, n)), n);
          })(e, i).format(t);
        }
        function hi(t, e, i) {
          return t
            ? (function (t, e) {
                return {
                  x: (i) => t + t + e - i,
                  setWidth(t) {
                    e = t;
                  },
                  textAlign: (t) =>
                    "center" === t ? t : "right" === t ? "left" : "right",
                  xPlus: (t, e) => t - e,
                  leftForLtr: (t, e) => t - e,
                };
              })(e, i)
            : {
                x: (t) => t,
                setWidth(t) {},
                textAlign: (t) => t,
                xPlus: (t, e) => t + e,
                leftForLtr: (t, e) => t,
              };
        }
        function ui(t, e) {
          let i, n;
          ("ltr" !== e && "rtl" !== e) ||
            ((i = t.canvas.style),
            (n = [
              i.getPropertyValue("direction"),
              i.getPropertyPriority("direction"),
            ]),
            i.setProperty("direction", e, "important"),
            (t.prevTextDirection = n));
        }
        function di(t, e) {
          void 0 !== e &&
            (delete t.prevTextDirection,
            t.canvas.style.setProperty("direction", e[0], e[1]));
        }
        function fi(t) {
          return "angle" === t
            ? { between: X, compare: Y, normalize: U }
            : { between: Z, compare: (t, e) => t - e, normalize: (t) => t };
        }
        function pi({ start: t, end: e, count: i, loop: n, style: s }) {
          return {
            start: t % i,
            end: e % i,
            loop: n && (e - t + 1) % i == 0,
            style: s,
          };
        }
        function gi(t, e, i) {
          if (!i) return [t];
          const { property: n, start: s, end: o } = i,
            a = e.length,
            { compare: r, between: l, normalize: c } = fi(n),
            {
              start: h,
              end: u,
              loop: d,
              style: f,
            } = (function (t, e, i) {
              const { property: n, start: s, end: o } = i,
                { between: a, normalize: r } = fi(n),
                l = e.length;
              let c,
                h,
                { start: u, end: d, loop: f } = t;
              if (f) {
                for (
                  u += l, d += l, c = 0, h = l;
                  c < h && a(r(e[u % l][n]), s, o);
                  ++c
                )
                  (u--, d--);
                ((u %= l), (d %= l));
              }
              return (
                d < u && (d += l),
                { start: u, end: d, loop: f, style: t.style }
              );
            })(t, e, i),
            p = [];
          let g,
            m,
            b,
            x = !1,
            y = null;
          const v = () => x || (l(s, b, g) && 0 !== r(s, b)),
            _ = () => !x || 0 === r(o, g) || l(o, b, g);
          for (let t = h, i = h; t <= u; ++t)
            ((m = e[t % a]),
              m.skip ||
                ((g = c(m[n])),
                g !== b &&
                  ((x = l(g, s, o)),
                  null === y && v() && (y = 0 === r(g, s) ? t : i),
                  null !== y &&
                    _() &&
                    (p.push(
                      pi({ start: y, end: t, loop: d, count: a, style: f }),
                    ),
                    (y = null)),
                  (i = t),
                  (b = g))));
          return (
            null !== y &&
              p.push(pi({ start: y, end: u, loop: d, count: a, style: f })),
            p
          );
        }
        function mi(t, e) {
          const i = [],
            n = t.segments;
          for (let s = 0; s < n.length; s++) {
            const o = gi(n[s], t.points, e);
            o.length && i.push(...o);
          }
          return i;
        }
        function bi(t, e, i, n) {
          return n && n.setContext && i
            ? (function (t, e, i, n) {
                const s = t._chart.getContext(),
                  o = xi(t.options),
                  {
                    _datasetIndex: a,
                    options: { spanGaps: r },
                  } = t,
                  l = i.length,
                  c = [];
                let h = o,
                  u = e[0].start,
                  d = u;
                function f(t, e, n, s) {
                  const o = r ? -1 : 1;
                  if (t !== e) {
                    for (t += l; i[t % l].skip; ) t -= o;
                    for (; i[e % l].skip; ) e += o;
                    t % l !== e % l &&
                      (c.push({ start: t % l, end: e % l, loop: n, style: s }),
                      (h = s),
                      (u = e % l));
                  }
                }
                for (const t of e) {
                  u = r ? u : t.start;
                  let e,
                    o = i[u % l];
                  for (d = u + 1; d <= t.end; d++) {
                    const r = i[d % l];
                    ((e = xi(
                      n.setContext(
                        Se(s, {
                          type: "segment",
                          p0: o,
                          p1: r,
                          p0DataIndex: (d - 1) % l,
                          p1DataIndex: d % l,
                          datasetIndex: a,
                        }),
                      ),
                    )),
                      yi(e, h) && f(u, d - 1, t.loop, h),
                      (o = r),
                      (h = e));
                  }
                  u < d - 1 && f(u, d - 1, t.loop, h);
                }
                return c;
              })(t, e, i, n)
            : e;
        }
        function xi(t) {
          return {
            backgroundColor: t.backgroundColor,
            borderCapStyle: t.borderCapStyle,
            borderDash: t.borderDash,
            borderDashOffset: t.borderDashOffset,
            borderJoinStyle: t.borderJoinStyle,
            borderWidth: t.borderWidth,
            borderColor: t.borderColor,
          };
        }
        function yi(t, e) {
          return e && JSON.stringify(t) !== JSON.stringify(e);
        }
        var vi = new (class {
          constructor() {
            ((this._request = null),
              (this._charts = new Map()),
              (this._running = !1),
              (this._lastDate = void 0));
          }
          _notify(t, e, i, n) {
            const s = e.listeners[n],
              o = e.duration;
            s.forEach((n) =>
              n({
                chart: t,
                initial: e.initial,
                numSteps: o,
                currentStep: Math.min(i - e.start, o),
              }),
            );
          }
          _refresh() {
            this._request ||
              ((this._running = !0),
              (this._request = nt.call(window, () => {
                (this._update(),
                  (this._request = null),
                  this._running && this._refresh());
              })));
          }
          _update(t = Date.now()) {
            let e = 0;
            (this._charts.forEach((i, n) => {
              if (!i.running || !i.items.length) return;
              const s = i.items;
              let o,
                a = s.length - 1,
                r = !1;
              for (; a >= 0; --a)
                ((o = s[a]),
                  o._active
                    ? (o._total > i.duration && (i.duration = o._total),
                      o.tick(t),
                      (r = !0))
                    : ((s[a] = s[s.length - 1]), s.pop()));
              (r && (n.draw(), this._notify(n, i, t, "progress")),
                s.length ||
                  ((i.running = !1),
                  this._notify(n, i, t, "complete"),
                  (i.initial = !1)),
                (e += s.length));
            }),
              (this._lastDate = t),
              0 === e && (this._running = !1));
          }
          _getAnims(t) {
            const e = this._charts;
            let i = e.get(t);
            return (
              i ||
                ((i = {
                  running: !1,
                  initial: !0,
                  items: [],
                  listeners: { complete: [], progress: [] },
                }),
                e.set(t, i)),
              i
            );
          }
          listen(t, e, i) {
            this._getAnims(t).listeners[e].push(i);
          }
          add(t, e) {
            e && e.length && this._getAnims(t).items.push(...e);
          }
          has(t) {
            return this._getAnims(t).items.length > 0;
          }
          start(t) {
            const e = this._charts.get(t);
            e &&
              ((e.running = !0),
              (e.start = Date.now()),
              (e.duration = e.items.reduce(
                (t, e) => Math.max(t, e._duration),
                0,
              )),
              this._refresh());
          }
          running(t) {
            if (!this._running) return !1;
            const e = this._charts.get(t);
            return !!(e && e.running && e.items.length);
          }
          stop(t) {
            const e = this._charts.get(t);
            if (!e || !e.items.length) return;
            const i = e.items;
            let n = i.length - 1;
            for (; n >= 0; --n) i[n].cancel();
            ((e.items = []), this._notify(t, e, Date.now(), "complete"));
          }
          remove(t) {
            return this._charts.delete(t);
          }
        })();
        const _i = "transparent",
          wi = {
            boolean: (t, e, i) => (i > 0.5 ? e : t),
            color(t, e, i) {
              const n = Xt(t || _i),
                s = n.valid && Xt(e || _i);
              return s && s.valid ? s.mix(n, i).hexString() : e;
            },
            number: (t, e, i) => t + (e - t) * i,
          };
        class ki {
          constructor(t, e, i, n) {
            const s = e[i];
            n = Me([t.to, n, s, t.from]);
            const o = Me([t.from, s, n]);
            ((this._active = !0),
              (this._fn = t.fn || wi[t.type || typeof o]),
              (this._easing = dt[t.easing] || dt.linear),
              (this._start = Math.floor(Date.now() + (t.delay || 0))),
              (this._duration = this._total = Math.floor(t.duration)),
              (this._loop = !!t.loop),
              (this._target = e),
              (this._prop = i),
              (this._from = o),
              (this._to = n),
              (this._promises = void 0));
          }
          active() {
            return this._active;
          }
          update(t, e, i) {
            if (this._active) {
              this._notify(!1);
              const n = this._target[this._prop],
                s = i - this._start,
                o = this._duration - s;
              ((this._start = i),
                (this._duration = Math.floor(Math.max(o, t.duration))),
                (this._total += s),
                (this._loop = !!t.loop),
                (this._to = Me([t.to, e, n, t.from])),
                (this._from = Me([t.from, n, e])));
            }
          }
          cancel() {
            this._active &&
              (this.tick(Date.now()), (this._active = !1), this._notify(!1));
          }
          tick(t) {
            const e = t - this._start,
              i = this._duration,
              n = this._prop,
              s = this._from,
              o = this._loop,
              a = this._to;
            let r;
            if (((this._active = s !== a && (o || e < i)), !this._active))
              return ((this._target[n] = a), void this._notify(!0));
            e < 0
              ? (this._target[n] = s)
              : ((r = (e / i) % 2),
                (r = o && r > 1 ? 2 - r : r),
                (r = this._easing(Math.min(1, Math.max(0, r)))),
                (this._target[n] = this._fn(s, a, r)));
          }
          wait() {
            const t = this._promises || (this._promises = []);
            return new Promise((e, i) => {
              t.push({ res: e, rej: i });
            });
          }
          _notify(t) {
            const e = t ? "res" : "rej",
              i = this._promises || [];
            for (let t = 0; t < i.length; t++) i[t][e]();
          }
        }
        te.set("animation", {
          delay: void 0,
          duration: 1e3,
          easing: "easeOutQuart",
          fn: void 0,
          from: void 0,
          loop: void 0,
          to: void 0,
          type: void 0,
        });
        const Mi = Object.keys(te.animation);
        (te.describe("animation", {
          _fallback: !1,
          _indexable: !1,
          _scriptable: (t) =>
            "onProgress" !== t && "onComplete" !== t && "fn" !== t,
        }),
          te.set("animations", {
            colors: {
              type: "color",
              properties: ["color", "borderColor", "backgroundColor"],
            },
            numbers: {
              type: "number",
              properties: ["x", "y", "borderWidth", "radius", "tension"],
            },
          }),
          te.describe("animations", { _fallback: "animation" }),
          te.set("transitions", {
            active: { animation: { duration: 400 } },
            resize: { animation: { duration: 0 } },
            show: {
              animations: {
                colors: { from: "transparent" },
                visible: { type: "boolean", duration: 0 },
              },
            },
            hide: {
              animations: {
                colors: { to: "transparent" },
                visible: {
                  type: "boolean",
                  easing: "linear",
                  fn: (t) => 0 | t,
                },
              },
            },
          }));
        class Si {
          constructor(t, e) {
            ((this._chart = t),
              (this._properties = new Map()),
              this.configure(e));
          }
          configure(t) {
            if (!r(t)) return;
            const e = this._properties;
            Object.getOwnPropertyNames(t).forEach((i) => {
              const n = t[i];
              if (!r(n)) return;
              const s = {};
              for (const t of Mi) s[t] = n[t];
              ((a(n.properties) && n.properties) || [i]).forEach((t) => {
                (t !== i && e.has(t)) || e.set(t, s);
              });
            });
          }
          _animateOptions(t, e) {
            const i = e.options,
              n = (function (t, e) {
                if (!e) return;
                let i = t.options;
                if (!i) return void (t.options = e);
                i.$shared &&
                  (t.options = i =
                    Object.assign({}, i, { $shared: !1, $animations: {} }));
                return i;
              })(t, i);
            if (!n) return [];
            const s = this._createAnimations(n, i);
            return (
              i.$shared &&
                (function (t, e) {
                  const i = [],
                    n = Object.keys(e);
                  for (let e = 0; e < n.length; e++) {
                    const s = t[n[e]];
                    s && s.active() && i.push(s.wait());
                  }
                  return Promise.all(i);
                })(t.options.$animations, i).then(
                  () => {
                    t.options = i;
                  },
                  () => {},
                ),
              s
            );
          }
          _createAnimations(t, e) {
            const i = this._properties,
              n = [],
              s = t.$animations || (t.$animations = {}),
              o = Object.keys(e),
              a = Date.now();
            let r;
            for (r = o.length - 1; r >= 0; --r) {
              const l = o[r];
              if ("$" === l.charAt(0)) continue;
              if ("options" === l) {
                n.push(...this._animateOptions(t, e));
                continue;
              }
              const c = e[l];
              let h = s[l];
              const u = i.get(l);
              if (h) {
                if (u && h.active()) {
                  h.update(u, c, a);
                  continue;
                }
                h.cancel();
              }
              u && u.duration
                ? ((s[l] = h = new ki(u, t, l, c)), n.push(h))
                : (t[l] = c);
            }
            return n;
          }
          update(t, e) {
            if (0 === this._properties.size) return void Object.assign(t, e);
            const i = this._createAnimations(t, e);
            return i.length ? (vi.add(this._chart, i), !0) : void 0;
          }
        }
        function Di(t, e) {
          const i = (t && t.options) || {},
            n = i.reverse,
            s = void 0 === i.min ? e : 0,
            o = void 0 === i.max ? e : 0;
          return { start: n ? o : s, end: n ? s : o };
        }
        function Pi(t, e) {
          const i = [],
            n = t._getSortedDatasetMetas(e);
          let s, o;
          for (s = 0, o = n.length; s < o; ++s) i.push(n[s].index);
          return i;
        }
        function Ci(t, e, i, n = {}) {
          const s = t.keys,
            o = "single" === n.mode;
          let a, r, c, h;
          if (null !== e) {
            for (a = 0, r = s.length; a < r; ++a) {
              if (((c = +s[a]), c === i)) {
                if (n.all) continue;
                break;
              }
              ((h = t.values[c]),
                l(h) && (o || 0 === e || R(e) === R(h)) && (e += h));
            }
            return e;
          }
        }
        function Ei(t, e) {
          const i = t && t.options.stacked;
          return i || (void 0 === i && void 0 !== e.stack);
        }
        function Ti(t, e, i) {
          const n = t[e] || (t[e] = {});
          return n[i] || (n[i] = {});
        }
        function Ai(t, e, i, n) {
          for (const s of e.getMatchingVisibleMetas(n).reverse()) {
            const e = t[s.index];
            if ((i && e > 0) || (!i && e < 0)) return s.index;
          }
          return null;
        }
        function Oi(t, e) {
          const { chart: i, _cachedMeta: n } = t,
            s = i._stacks || (i._stacks = {}),
            { iScale: o, vScale: a, index: r } = n,
            l = o.axis,
            c = a.axis,
            h = (function (t, e, i) {
              return `${t.id}.${e.id}.${i.stack || i.type}`;
            })(o, a, n),
            u = e.length;
          let d;
          for (let t = 0; t < u; ++t) {
            const i = e[t],
              { [l]: o, [c]: u } = i;
            ((d = (i._stacks || (i._stacks = {}))[c] = Ti(s, h, o)),
              (d[r] = u),
              (d._top = Ai(d, a, !0, n.type)),
              (d._bottom = Ai(d, a, !1, n.type)));
          }
        }
        function Ii(t, e) {
          const i = t.scales;
          return Object.keys(i)
            .filter((t) => i[t].axis === e)
            .shift();
        }
        function Fi(t, e) {
          const i = t.controller.index,
            n = t.vScale && t.vScale.axis;
          if (n) {
            e = e || t._parsed;
            for (const t of e) {
              const e = t._stacks;
              if (!e || void 0 === e[n] || void 0 === e[n][i]) return;
              delete e[n][i];
            }
          }
        }
        const Li = (t) => "reset" === t || "none" === t,
          Ri = (t, e) => (e ? t : Object.assign({}, t));
        class zi {
          constructor(t, e) {
            ((this.chart = t),
              (this._ctx = t.ctx),
              (this.index = e),
              (this._cachedDataOpts = {}),
              (this._cachedMeta = this.getMeta()),
              (this._type = this._cachedMeta.type),
              (this.options = void 0),
              (this._parsing = !1),
              (this._data = void 0),
              (this._objectData = void 0),
              (this._sharedOptions = void 0),
              (this._drawStart = void 0),
              (this._drawCount = void 0),
              (this.enableOptionSharing = !1),
              (this.supportsDecimation = !1),
              (this.$context = void 0),
              (this._syncList = []),
              this.initialize());
          }
          initialize() {
            const t = this._cachedMeta;
            (this.configure(),
              this.linkScales(),
              (t._stacked = Ei(t.vScale, t)),
              this.addElements());
          }
          updateIndex(t) {
            (this.index !== t && Fi(this._cachedMeta), (this.index = t));
          }
          linkScales() {
            const t = this.chart,
              e = this._cachedMeta,
              i = this.getDataset(),
              n = (t, e, i, n) => ("x" === t ? e : "r" === t ? n : i),
              s = (e.xAxisID = h(i.xAxisID, Ii(t, "x"))),
              o = (e.yAxisID = h(i.yAxisID, Ii(t, "y"))),
              a = (e.rAxisID = h(i.rAxisID, Ii(t, "r"))),
              r = e.indexAxis,
              l = (e.iAxisID = n(r, s, o, a)),
              c = (e.vAxisID = n(r, o, s, a));
            ((e.xScale = this.getScaleForId(s)),
              (e.yScale = this.getScaleForId(o)),
              (e.rScale = this.getScaleForId(a)),
              (e.iScale = this.getScaleForId(l)),
              (e.vScale = this.getScaleForId(c)));
          }
          getDataset() {
            return this.chart.data.datasets[this.index];
          }
          getMeta() {
            return this.chart.getDatasetMeta(this.index);
          }
          getScaleForId(t) {
            return this.chart.scales[t];
          }
          _getOtherScale(t) {
            const e = this._cachedMeta;
            return t === e.iScale ? e.vScale : e.iScale;
          }
          reset() {
            this._update("reset");
          }
          _destroy() {
            const t = this._cachedMeta;
            (this._data && et(this._data, this), t._stacked && Fi(t));
          }
          _dataCheck() {
            const t = this.getDataset(),
              e = t.data || (t.data = []),
              i = this._data;
            if (r(e))
              this._data = (function (t) {
                const e = Object.keys(t),
                  i = new Array(e.length);
                let n, s, o;
                for (n = 0, s = e.length; n < s; ++n)
                  ((o = e[n]), (i[n] = { x: o, y: t[o] }));
                return i;
              })(e);
            else if (i !== e) {
              if (i) {
                et(i, this);
                const t = this._cachedMeta;
                (Fi(t), (t._parsed = []));
              }
              (e &&
                Object.isExtensible(e) &&
                ((s = this),
                (n = e)._chartjs
                  ? n._chartjs.listeners.push(s)
                  : (Object.defineProperty(n, "_chartjs", {
                      configurable: !0,
                      enumerable: !1,
                      value: { listeners: [s] },
                    }),
                    tt.forEach((t) => {
                      const e = "_onData" + k(t),
                        i = n[t];
                      Object.defineProperty(n, t, {
                        configurable: !0,
                        enumerable: !1,
                        value(...t) {
                          const s = i.apply(this, t);
                          return (
                            n._chartjs.listeners.forEach((i) => {
                              "function" == typeof i[e] && i[e](...t);
                            }),
                            s
                          );
                        },
                      });
                    }))),
                (this._syncList = []),
                (this._data = e));
            }
            var n, s;
          }
          addElements() {
            const t = this._cachedMeta;
            (this._dataCheck(),
              this.datasetElementType &&
                (t.dataset = new this.datasetElementType()));
          }
          buildOrUpdateElements(t) {
            const e = this._cachedMeta,
              i = this.getDataset();
            let n = !1;
            this._dataCheck();
            const s = e._stacked;
            ((e._stacked = Ei(e.vScale, e)),
              e.stack !== i.stack && ((n = !0), Fi(e), (e.stack = i.stack)),
              this._resyncElements(t),
              (n || s !== e._stacked) && Oi(this, e._parsed));
          }
          configure() {
            const t = this.chart.config,
              e = t.datasetScopeKeys(this._type),
              i = t.getOptionScopes(this.getDataset(), e, !0);
            ((this.options = t.createResolver(i, this.getContext())),
              (this._parsing = this.options.parsing),
              (this._cachedDataOpts = {}));
          }
          parse(t, e) {
            const { _cachedMeta: i, _data: n } = this,
              { iScale: s, _stacked: o } = i,
              l = s.axis;
            let c,
              h,
              u,
              d = (0 === t && e === n.length) || i._sorted,
              f = t > 0 && i._parsed[t - 1];
            if (!1 === this._parsing)
              ((i._parsed = n), (i._sorted = !0), (u = n));
            else {
              u = a(n[t])
                ? this.parseArrayData(i, n, t, e)
                : r(n[t])
                  ? this.parseObjectData(i, n, t, e)
                  : this.parsePrimitiveData(i, n, t, e);
              const s = () => null === h[l] || (f && h[l] < f[l]);
              for (c = 0; c < e; ++c)
                ((i._parsed[c + t] = h = u[c]),
                  d && (s() && (d = !1), (f = h)));
              i._sorted = d;
            }
            o && Oi(this, u);
          }
          parsePrimitiveData(t, e, i, n) {
            const { iScale: s, vScale: o } = t,
              a = s.axis,
              r = o.axis,
              l = s.getLabels(),
              c = s === o,
              h = new Array(n);
            let u, d, f;
            for (u = 0, d = n; u < d; ++u)
              ((f = u + i),
                (h[u] = { [a]: c || s.parse(l[f], f), [r]: o.parse(e[f], f) }));
            return h;
          }
          parseArrayData(t, e, i, n) {
            const { xScale: s, yScale: o } = t,
              a = new Array(n);
            let r, l, c, h;
            for (r = 0, l = n; r < l; ++r)
              ((c = r + i),
                (h = e[c]),
                (a[r] = { x: s.parse(h[0], c), y: o.parse(h[1], c) }));
            return a;
          }
          parseObjectData(t, e, i, n) {
            const { xScale: s, yScale: o } = t,
              { xAxisKey: a = "x", yAxisKey: r = "y" } = this._parsing,
              l = new Array(n);
            let c, h, u, d;
            for (c = 0, h = n; c < h; ++c)
              ((u = c + i),
                (d = e[u]),
                (l[c] = { x: s.parse(w(d, a), u), y: o.parse(w(d, r), u) }));
            return l;
          }
          getParsed(t) {
            return this._cachedMeta._parsed[t];
          }
          getDataElement(t) {
            return this._cachedMeta.data[t];
          }
          applyStack(t, e, i) {
            const n = this.chart,
              s = this._cachedMeta,
              o = e[t.axis];
            return Ci(
              { keys: Pi(n, !0), values: e._stacks[t.axis] },
              o,
              s.index,
              { mode: i },
            );
          }
          updateRangeFromParsed(t, e, i, n) {
            const s = i[e.axis];
            let o = null === s ? NaN : s;
            const a = n && i._stacks[e.axis];
            (n && a && ((n.values = a), (o = Ci(n, s, this._cachedMeta.index))),
              (t.min = Math.min(t.min, o)),
              (t.max = Math.max(t.max, o)));
          }
          getMinMax(t, e) {
            const i = this._cachedMeta,
              n = i._parsed,
              s = i._sorted && t === i.iScale,
              o = n.length,
              a = this._getOtherScale(t),
              r = ((t, e, i) =>
                t &&
                !e.hidden &&
                e._stacked && { keys: Pi(i, !0), values: null })(
                e,
                i,
                this.chart,
              ),
              c = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY,
              },
              { min: h, max: u } = (function (t) {
                const {
                  min: e,
                  max: i,
                  minDefined: n,
                  maxDefined: s,
                } = t.getUserBounds();
                return {
                  min: n ? e : Number.NEGATIVE_INFINITY,
                  max: s ? i : Number.POSITIVE_INFINITY,
                };
              })(a);
            let d, f;
            function p() {
              f = n[d];
              const e = f[a.axis];
              return !l(f[t.axis]) || h > e || u < e;
            }
            for (
              d = 0;
              d < o && (p() || (this.updateRangeFromParsed(c, t, f, r), !s));
              ++d
            );
            if (s)
              for (d = o - 1; d >= 0; --d)
                if (!p()) {
                  this.updateRangeFromParsed(c, t, f, r);
                  break;
                }
            return c;
          }
          getAllParsedValues(t) {
            const e = this._cachedMeta._parsed,
              i = [];
            let n, s, o;
            for (n = 0, s = e.length; n < s; ++n)
              ((o = e[n][t.axis]), l(o) && i.push(o));
            return i;
          }
          getMaxOverflow() {
            return !1;
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              i = e.iScale,
              n = e.vScale,
              s = this.getParsed(t);
            return {
              label: i ? "" + i.getLabelForValue(s[i.axis]) : "",
              value: n ? "" + n.getLabelForValue(s[n.axis]) : "",
            };
          }
          _update(t) {
            const e = this._cachedMeta;
            (this.update(t || "default"),
              (e._clip = (function (t) {
                let e, i, n, s;
                return (
                  r(t)
                    ? ((e = t.top), (i = t.right), (n = t.bottom), (s = t.left))
                    : (e = i = n = s = t),
                  { top: e, right: i, bottom: n, left: s, disabled: !1 === t }
                );
              })(
                h(
                  this.options.clip,
                  (function (t, e, i) {
                    if (!1 === i) return !1;
                    const n = Di(t, i),
                      s = Di(e, i);
                    return {
                      top: s.end,
                      right: n.end,
                      bottom: s.start,
                      left: n.start,
                    };
                  })(e.xScale, e.yScale, this.getMaxOverflow()),
                ),
              )));
          }
          update(t) {}
          draw() {
            const t = this._ctx,
              e = this.chart,
              i = this._cachedMeta,
              n = i.data || [],
              s = e.chartArea,
              o = [],
              a = this._drawStart || 0,
              r = this._drawCount || n.length - a,
              l = this.options.drawActiveElementsOnTop;
            let c;
            for (
              i.dataset && i.dataset.draw(t, s, a, r), c = a;
              c < a + r;
              ++c
            ) {
              const e = n[c];
              e.hidden || (e.active && l ? o.push(e) : e.draw(t, s));
            }
            for (c = 0; c < o.length; ++c) o[c].draw(t, s);
          }
          getStyle(t, e) {
            const i = e ? "active" : "default";
            return void 0 === t && this._cachedMeta.dataset
              ? this.resolveDatasetElementOptions(i)
              : this.resolveDataElementOptions(t || 0, i);
          }
          getContext(t, e, i) {
            const n = this.getDataset();
            let s;
            if (t >= 0 && t < this._cachedMeta.data.length) {
              const e = this._cachedMeta.data[t];
              ((s =
                e.$context ||
                (e.$context = (function (t, e, i) {
                  return Se(t, {
                    active: !1,
                    dataIndex: e,
                    parsed: void 0,
                    raw: void 0,
                    element: i,
                    index: e,
                    mode: "default",
                    type: "data",
                  });
                })(this.getContext(), t, e))),
                (s.parsed = this.getParsed(t)),
                (s.raw = n.data[t]),
                (s.index = s.dataIndex = t));
            } else
              ((s =
                this.$context ||
                (this.$context = (function (t, e) {
                  return Se(t, {
                    active: !1,
                    dataset: void 0,
                    datasetIndex: e,
                    index: e,
                    mode: "default",
                    type: "dataset",
                  });
                })(this.chart.getContext(), this.index))),
                (s.dataset = n),
                (s.index = s.datasetIndex = this.index));
            return ((s.active = !!e), (s.mode = i), s);
          }
          resolveDatasetElementOptions(t) {
            return this._resolveElementOptions(this.datasetElementType.id, t);
          }
          resolveDataElementOptions(t, e) {
            return this._resolveElementOptions(this.dataElementType.id, e, t);
          }
          _resolveElementOptions(t, e = "default", i) {
            const n = "active" === e,
              s = this._cachedDataOpts,
              o = t + "-" + e,
              a = s[o],
              r = this.enableOptionSharing && M(i);
            if (a) return Ri(a, r);
            const l = this.chart.config,
              c = l.datasetElementScopeKeys(this._type, t),
              h = n ? [`${t}Hover`, "hover", t, ""] : [t, ""],
              u = l.getOptionScopes(this.getDataset(), c),
              d = Object.keys(te.elements[t]),
              f = l.resolveNamedOptions(u, d, () => this.getContext(i, n), h);
            return (
              f.$shared && ((f.$shared = r), (s[o] = Object.freeze(Ri(f, r)))),
              f
            );
          }
          _resolveAnimations(t, e, i) {
            const n = this.chart,
              s = this._cachedDataOpts,
              o = `animation-${e}`,
              a = s[o];
            if (a) return a;
            let r;
            if (!1 !== n.options.animation) {
              const n = this.chart.config,
                s = n.datasetAnimationScopeKeys(this._type, e),
                o = n.getOptionScopes(this.getDataset(), s);
              r = n.createResolver(o, this.getContext(t, i, e));
            }
            const l = new Si(n, r && r.animations);
            return (r && r._cacheable && (s[o] = Object.freeze(l)), l);
          }
          getSharedOptions(t) {
            if (t.$shared)
              return (
                this._sharedOptions ||
                (this._sharedOptions = Object.assign({}, t))
              );
          }
          includeOptions(t, e) {
            return !e || Li(t) || this.chart._animationsDisabled;
          }
          _getSharedOptions(t, e) {
            const i = this.resolveDataElementOptions(t, e),
              n = this._sharedOptions,
              s = this.getSharedOptions(i),
              o = this.includeOptions(e, s) || s !== n;
            return (
              this.updateSharedOptions(s, e, i),
              { sharedOptions: s, includeOptions: o }
            );
          }
          updateElement(t, e, i, n) {
            Li(n)
              ? Object.assign(t, i)
              : this._resolveAnimations(e, n).update(t, i);
          }
          updateSharedOptions(t, e, i) {
            t && !Li(e) && this._resolveAnimations(void 0, e).update(t, i);
          }
          _setStyle(t, e, i, n) {
            t.active = n;
            const s = this.getStyle(e, n);
            this._resolveAnimations(e, i, n).update(t, {
              options: (!n && this.getSharedOptions(s)) || s,
            });
          }
          removeHoverStyle(t, e, i) {
            this._setStyle(t, i, "active", !1);
          }
          setHoverStyle(t, e, i) {
            this._setStyle(t, i, "active", !0);
          }
          _removeDatasetHoverStyle() {
            const t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !1);
          }
          _setDatasetHoverStyle() {
            const t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !0);
          }
          _resyncElements(t) {
            const e = this._data,
              i = this._cachedMeta.data;
            for (const [t, e, i] of this._syncList) this[t](e, i);
            this._syncList = [];
            const n = i.length,
              s = e.length,
              o = Math.min(s, n);
            (o && this.parse(0, o),
              s > n
                ? this._insertElements(n, s - n, t)
                : s < n && this._removeElements(s, n - s));
          }
          _insertElements(t, e, i = !0) {
            const n = this._cachedMeta,
              s = n.data,
              o = t + e;
            let a;
            const r = (t) => {
              for (t.length += e, a = t.length - 1; a >= o; a--)
                t[a] = t[a - e];
            };
            for (r(s), a = t; a < o; ++a) s[a] = new this.dataElementType();
            (this._parsing && r(n._parsed),
              this.parse(t, e),
              i && this.updateElements(s, t, e, "reset"));
          }
          updateElements(t, e, i, n) {}
          _removeElements(t, e) {
            const i = this._cachedMeta;
            if (this._parsing) {
              const n = i._parsed.splice(t, e);
              i._stacked && Fi(i, n);
            }
            i.data.splice(t, e);
          }
          _sync(t) {
            if (this._parsing) this._syncList.push(t);
            else {
              const [e, i, n] = t;
              this[e](i, n);
            }
            this.chart._dataChanges.push([this.index, ...t]);
          }
          _onDataPush() {
            const t = arguments.length;
            this._sync([
              "_insertElements",
              this.getDataset().data.length - t,
              t,
            ]);
          }
          _onDataPop() {
            this._sync([
              "_removeElements",
              this._cachedMeta.data.length - 1,
              1,
            ]);
          }
          _onDataShift() {
            this._sync(["_removeElements", 0, 1]);
          }
          _onDataSplice(t, e) {
            e && this._sync(["_removeElements", t, e]);
            const i = arguments.length - 2;
            i && this._sync(["_insertElements", t, i]);
          }
          _onDataUnshift() {
            this._sync(["_insertElements", 0, arguments.length]);
          }
        }
        function Bi(t) {
          const e = t.iScale,
            i = (function (t, e) {
              if (!t._cache.$bar) {
                const i = t.getMatchingVisibleMetas(e);
                let n = [];
                for (let e = 0, s = i.length; e < s; e++)
                  n = n.concat(i[e].controller.getAllParsedValues(t));
                t._cache.$bar = it(n.sort((t, e) => t - e));
              }
              return t._cache.$bar;
            })(e, t.type);
          let n,
            s,
            o,
            a,
            r = e._length;
          const l = () => {
            32767 !== o &&
              -32768 !== o &&
              (M(a) && (r = Math.min(r, Math.abs(o - a) || r)), (a = o));
          };
          for (n = 0, s = i.length; n < s; ++n)
            ((o = e.getPixelForValue(i[n])), l());
          for (a = void 0, n = 0, s = e.ticks.length; n < s; ++n)
            ((o = e.getPixelForTick(n)), l());
          return r;
        }
        function ji(t, e, i, n) {
          return (
            a(t)
              ? (function (t, e, i, n) {
                  const s = i.parse(t[0], n),
                    o = i.parse(t[1], n),
                    a = Math.min(s, o),
                    r = Math.max(s, o);
                  let l = a,
                    c = r;
                  (Math.abs(a) > Math.abs(r) && ((l = r), (c = a)),
                    (e[i.axis] = c),
                    (e._custom = {
                      barStart: l,
                      barEnd: c,
                      start: s,
                      end: o,
                      min: a,
                      max: r,
                    }));
                })(t, e, i, n)
              : (e[i.axis] = i.parse(t, n)),
            e
          );
        }
        function Vi(t, e, i, n) {
          const s = t.iScale,
            o = t.vScale,
            a = s.getLabels(),
            r = s === o,
            l = [];
          let c, h, u, d;
          for (c = i, h = i + n; c < h; ++c)
            ((d = e[c]),
              (u = {}),
              (u[s.axis] = r || s.parse(a[c], c)),
              l.push(ji(d, u, o, c)));
          return l;
        }
        function Wi(t) {
          return t && void 0 !== t.barStart && void 0 !== t.barEnd;
        }
        function Ni(t, e, i, n) {
          let s = e.borderSkipped;
          const o = {};
          if (!s) return void (t.borderSkipped = o);
          if (!0 === s)
            return void (t.borderSkipped = {
              top: !0,
              right: !0,
              bottom: !0,
              left: !0,
            });
          const {
            start: a,
            end: r,
            reverse: l,
            top: c,
            bottom: h,
          } = (function (t) {
            let e, i, n, s, o;
            return (
              t.horizontal
                ? ((e = t.base > t.x), (i = "left"), (n = "right"))
                : ((e = t.base < t.y), (i = "bottom"), (n = "top")),
              e ? ((s = "end"), (o = "start")) : ((s = "start"), (o = "end")),
              { start: i, end: n, reverse: e, top: s, bottom: o }
            );
          })(t);
          ("middle" === s &&
            i &&
            ((t.enableBorderRadius = !0),
            (i._top || 0) === n
              ? (s = c)
              : (i._bottom || 0) === n
                ? (s = h)
                : ((o[Hi(h, a, r, l)] = !0), (s = c))),
            (o[Hi(s, a, r, l)] = !0),
            (t.borderSkipped = o));
        }
        function Hi(t, e, i, n) {
          var s, o, a;
          return (
            n
              ? ((a = i),
                (t = $i((t = (s = t) === (o = e) ? a : s === a ? o : s), i, e)))
              : (t = $i(t, e, i)),
            t
          );
        }
        function $i(t, e, i) {
          return "start" === t ? e : "end" === t ? i : t;
        }
        function qi(t, { inflateAmount: e }, i) {
          t.inflateAmount = "auto" === e ? (1 === i ? 0.33 : 0) : e;
        }
        ((zi.defaults = {}),
          (zi.prototype.datasetElementType = null),
          (zi.prototype.dataElementType = null));
        class Yi extends zi {
          parsePrimitiveData(t, e, i, n) {
            return Vi(t, e, i, n);
          }
          parseArrayData(t, e, i, n) {
            return Vi(t, e, i, n);
          }
          parseObjectData(t, e, i, n) {
            const { iScale: s, vScale: o } = t,
              { xAxisKey: a = "x", yAxisKey: r = "y" } = this._parsing,
              l = "x" === s.axis ? a : r,
              c = "x" === o.axis ? a : r,
              h = [];
            let u, d, f, p;
            for (u = i, d = i + n; u < d; ++u)
              ((p = e[u]),
                (f = {}),
                (f[s.axis] = s.parse(w(p, l), u)),
                h.push(ji(w(p, c), f, o, u)));
            return h;
          }
          updateRangeFromParsed(t, e, i, n) {
            super.updateRangeFromParsed(t, e, i, n);
            const s = i._custom;
            s &&
              e === this._cachedMeta.vScale &&
              ((t.min = Math.min(t.min, s.min)),
              (t.max = Math.max(t.max, s.max)));
          }
          getMaxOverflow() {
            return 0;
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              { iScale: i, vScale: n } = e,
              s = this.getParsed(t),
              o = s._custom,
              a = Wi(o)
                ? "[" + o.start + ", " + o.end + "]"
                : "" + n.getLabelForValue(s[n.axis]);
            return { label: "" + i.getLabelForValue(s[i.axis]), value: a };
          }
          initialize() {
            ((this.enableOptionSharing = !0), super.initialize());
            this._cachedMeta.stack = this.getDataset().stack;
          }
          update(t) {
            const e = this._cachedMeta;
            this.updateElements(e.data, 0, e.data.length, t);
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              {
                index: a,
                _cachedMeta: { vScale: r },
              } = this,
              l = r.getBasePixel(),
              c = r.isHorizontal(),
              h = this._getRuler(),
              { sharedOptions: u, includeOptions: d } = this._getSharedOptions(
                e,
                n,
              );
            for (let f = e; f < e + i; f++) {
              const e = this.getParsed(f),
                i =
                  s || o(e[r.axis])
                    ? { base: l, head: l }
                    : this._calculateBarValuePixels(f),
                p = this._calculateBarIndexPixels(f, h),
                g = (e._stacks || {})[r.axis],
                m = {
                  horizontal: c,
                  base: i.base,
                  enableBorderRadius:
                    !g || Wi(e._custom) || a === g._top || a === g._bottom,
                  x: c ? i.head : p.center,
                  y: c ? p.center : i.head,
                  height: c ? p.size : Math.abs(i.size),
                  width: c ? Math.abs(i.size) : p.size,
                };
              d &&
                (m.options =
                  u ||
                  this.resolveDataElementOptions(
                    f,
                    t[f].active ? "active" : n,
                  ));
              const b = m.options || t[f].options;
              (Ni(m, b, g, a),
                qi(m, b, h.ratio),
                this.updateElement(t[f], f, m, n));
            }
          }
          _getStacks(t, e) {
            const { iScale: i } = this._cachedMeta,
              n = i
                .getMatchingVisibleMetas(this._type)
                .filter((t) => t.controller.options.grouped),
              s = i.options.stacked,
              a = [],
              r = (t) => {
                const i = t.controller.getParsed(e),
                  n = i && i[t.vScale.axis];
                if (o(n) || isNaN(n)) return !0;
              };
            for (const i of n)
              if (
                (void 0 === e || !r(i)) &&
                ((!1 === s ||
                  -1 === a.indexOf(i.stack) ||
                  (void 0 === s && void 0 === i.stack)) &&
                  a.push(i.stack),
                i.index === t)
              )
                break;
            return (a.length || a.push(void 0), a);
          }
          _getStackCount(t) {
            return this._getStacks(void 0, t).length;
          }
          _getStackIndex(t, e, i) {
            const n = this._getStacks(t, i),
              s = void 0 !== e ? n.indexOf(e) : -1;
            return -1 === s ? n.length - 1 : s;
          }
          _getRuler() {
            const t = this.options,
              e = this._cachedMeta,
              i = e.iScale,
              n = [];
            let s, o;
            for (s = 0, o = e.data.length; s < o; ++s)
              n.push(i.getPixelForValue(this.getParsed(s)[i.axis], s));
            const a = t.barThickness;
            return {
              min: a || Bi(e),
              pixels: n,
              start: i._startPixel,
              end: i._endPixel,
              stackCount: this._getStackCount(),
              scale: i,
              grouped: t.grouped,
              ratio: a ? 1 : t.categoryPercentage * t.barPercentage,
            };
          }
          _calculateBarValuePixels(t) {
            const {
                _cachedMeta: { vScale: e, _stacked: i },
                options: { base: n, minBarLength: s },
              } = this,
              a = n || 0,
              r = this.getParsed(t),
              l = r._custom,
              c = Wi(l);
            let h,
              u,
              d = r[e.axis],
              f = 0,
              p = i ? this.applyStack(e, r, i) : d;
            (p !== d && ((f = p - d), (p = d)),
              c &&
                ((d = l.barStart),
                (p = l.barEnd - l.barStart),
                0 !== d && R(d) !== R(l.barEnd) && (f = 0),
                (f += d)));
            const g = o(n) || c ? f : n;
            let m = e.getPixelForValue(g);
            if (
              ((h = this.chart.getDataVisibility(t)
                ? e.getPixelForValue(f + p)
                : m),
              (u = h - m),
              Math.abs(u) < s)
            ) {
              ((u =
                (function (t, e, i) {
                  return 0 !== t
                    ? R(t)
                    : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1);
                })(u, e, a) * s),
                d === a && (m -= u / 2));
              const t = e.getPixelForDecimal(0),
                i = e.getPixelForDecimal(1),
                n = Math.min(t, i),
                o = Math.max(t, i);
              ((m = Math.max(Math.min(m, o), n)), (h = m + u));
            }
            if (m === e.getPixelForValue(a)) {
              const t = (R(u) * e.getLineWidthForValue(a)) / 2;
              ((m += t), (u -= t));
            }
            return { size: u, base: m, head: h, center: h + u / 2 };
          }
          _calculateBarIndexPixels(t, e) {
            const i = e.scale,
              n = this.options,
              s = n.skipNull,
              a = h(n.maxBarThickness, 1 / 0);
            let r, l;
            if (e.grouped) {
              const i = s ? this._getStackCount(t) : e.stackCount,
                c =
                  "flex" === n.barThickness
                    ? (function (t, e, i, n) {
                        const s = e.pixels,
                          o = s[t];
                        let a = t > 0 ? s[t - 1] : null,
                          r = t < s.length - 1 ? s[t + 1] : null;
                        const l = i.categoryPercentage;
                        (null === a &&
                          (a = o - (null === r ? e.end - e.start : r - o)),
                          null === r && (r = o + o - a));
                        const c = o - ((o - Math.min(a, r)) / 2) * l;
                        return {
                          chunk: ((Math.abs(r - a) / 2) * l) / n,
                          ratio: i.barPercentage,
                          start: c,
                        };
                      })(t, e, n, i)
                    : (function (t, e, i, n) {
                        const s = i.barThickness;
                        let a, r;
                        return (
                          o(s)
                            ? ((a = e.min * i.categoryPercentage),
                              (r = i.barPercentage))
                            : ((a = s * n), (r = 1)),
                          { chunk: a / n, ratio: r, start: e.pixels[t] - a / 2 }
                        );
                      })(t, e, n, i),
                h = this._getStackIndex(
                  this.index,
                  this._cachedMeta.stack,
                  s ? t : void 0,
                );
              ((r = c.start + c.chunk * h + c.chunk / 2),
                (l = Math.min(a, c.chunk * c.ratio)));
            } else
              ((r = i.getPixelForValue(this.getParsed(t)[i.axis], t)),
                (l = Math.min(a, e.min * e.ratio)));
            return { base: r - l / 2, head: r + l / 2, center: r, size: l };
          }
          draw() {
            const t = this._cachedMeta,
              e = t.vScale,
              i = t.data,
              n = i.length;
            let s = 0;
            for (; s < n; ++s)
              null !== this.getParsed(s)[e.axis] && i[s].draw(this._ctx);
          }
        }
        ((Yi.id = "bar"),
          (Yi.defaults = {
            datasetElementType: !1,
            dataElementType: "bar",
            categoryPercentage: 0.8,
            barPercentage: 0.9,
            grouped: !0,
            animations: {
              numbers: {
                type: "number",
                properties: ["x", "y", "base", "width", "height"],
              },
            },
          }),
          (Yi.overrides = {
            scales: {
              _index_: { type: "category", offset: !0, grid: { offset: !0 } },
              _value_: { type: "linear", beginAtZero: !0 },
            },
          }));
        class Ui extends zi {
          initialize() {
            ((this.enableOptionSharing = !0), super.initialize());
          }
          parsePrimitiveData(t, e, i, n) {
            const s = super.parsePrimitiveData(t, e, i, n);
            for (let t = 0; t < s.length; t++)
              s[t]._custom = this.resolveDataElementOptions(t + i).radius;
            return s;
          }
          parseArrayData(t, e, i, n) {
            const s = super.parseArrayData(t, e, i, n);
            for (let t = 0; t < s.length; t++) {
              const n = e[i + t];
              s[t]._custom = h(
                n[2],
                this.resolveDataElementOptions(t + i).radius,
              );
            }
            return s;
          }
          parseObjectData(t, e, i, n) {
            const s = super.parseObjectData(t, e, i, n);
            for (let t = 0; t < s.length; t++) {
              const n = e[i + t];
              s[t]._custom = h(
                n && n.r && +n.r,
                this.resolveDataElementOptions(t + i).radius,
              );
            }
            return s;
          }
          getMaxOverflow() {
            const t = this._cachedMeta.data;
            let e = 0;
            for (let i = t.length - 1; i >= 0; --i)
              e = Math.max(e, t[i].size(this.resolveDataElementOptions(i)) / 2);
            return e > 0 && e;
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              { xScale: i, yScale: n } = e,
              s = this.getParsed(t),
              o = i.getLabelForValue(s.x),
              a = n.getLabelForValue(s.y),
              r = s._custom;
            return {
              label: e.label,
              value: "(" + o + ", " + a + (r ? ", " + r : "") + ")",
            };
          }
          update(t) {
            const e = this._cachedMeta.data;
            this.updateElements(e, 0, e.length, t);
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              { iScale: o, vScale: a } = this._cachedMeta,
              { sharedOptions: r, includeOptions: l } = this._getSharedOptions(
                e,
                n,
              ),
              c = o.axis,
              h = a.axis;
            for (let u = e; u < e + i; u++) {
              const e = t[u],
                i = !s && this.getParsed(u),
                d = {},
                f = (d[c] = s
                  ? o.getPixelForDecimal(0.5)
                  : o.getPixelForValue(i[c])),
                p = (d[h] = s ? a.getBasePixel() : a.getPixelForValue(i[h]));
              ((d.skip = isNaN(f) || isNaN(p)),
                l &&
                  ((d.options =
                    r ||
                    this.resolveDataElementOptions(u, e.active ? "active" : n)),
                  s && (d.options.radius = 0)),
                this.updateElement(e, u, d, n));
            }
          }
          resolveDataElementOptions(t, e) {
            const i = this.getParsed(t);
            let n = super.resolveDataElementOptions(t, e);
            n.$shared && (n = Object.assign({}, n, { $shared: !1 }));
            const s = n.radius;
            return (
              "active" !== e && (n.radius = 0),
              (n.radius += h(i && i._custom, s)),
              n
            );
          }
        }
        ((Ui.id = "bubble"),
          (Ui.defaults = {
            datasetElementType: !1,
            dataElementType: "point",
            animations: {
              numbers: {
                type: "number",
                properties: ["x", "y", "borderWidth", "radius"],
              },
            },
          }),
          (Ui.overrides = {
            scales: { x: { type: "linear" }, y: { type: "linear" } },
            plugins: { tooltip: { callbacks: { title: () => "" } } },
          }));
        class Xi extends zi {
          constructor(t, e) {
            (super(t, e),
              (this.enableOptionSharing = !0),
              (this.innerRadius = void 0),
              (this.outerRadius = void 0),
              (this.offsetX = void 0),
              (this.offsetY = void 0));
          }
          linkScales() {}
          parse(t, e) {
            const i = this.getDataset().data,
              n = this._cachedMeta;
            if (!1 === this._parsing) n._parsed = i;
            else {
              let s,
                o,
                a = (t) => +i[t];
              if (r(i[t])) {
                const { key: t = "value" } = this._parsing;
                a = (e) => +w(i[e], t);
              }
              for (s = t, o = t + e; s < o; ++s) n._parsed[s] = a(s);
            }
          }
          _getRotation() {
            return W(this.options.rotation - 90);
          }
          _getCircumference() {
            return W(this.options.circumference);
          }
          _getRotationExtents() {
            let t = C,
              e = -C;
            for (let i = 0; i < this.chart.data.datasets.length; ++i)
              if (this.chart.isDatasetVisible(i)) {
                const n = this.chart.getDatasetMeta(i).controller,
                  s = n._getRotation(),
                  o = n._getCircumference();
                ((t = Math.min(t, s)), (e = Math.max(e, s + o)));
              }
            return { rotation: t, circumference: e - t };
          }
          update(t) {
            const e = this.chart,
              { chartArea: i } = e,
              n = this._cachedMeta,
              s = n.data,
              o =
                this.getMaxBorderWidth() +
                this.getMaxOffset(s) +
                this.options.spacing,
              a = Math.max((Math.min(i.width, i.height) - o) / 2, 0),
              r = Math.min(
                ((l = this.options.cutout),
                (c = a),
                "string" == typeof l && l.endsWith("%")
                  ? parseFloat(l) / 100
                  : l / c),
                1,
              );
            var l, c;
            const h = this._getRingWeight(this.index),
              { circumference: d, rotation: f } = this._getRotationExtents(),
              {
                ratioX: p,
                ratioY: g,
                offsetX: m,
                offsetY: b,
              } = (function (t, e, i) {
                let n = 1,
                  s = 1,
                  o = 0,
                  a = 0;
                if (e < C) {
                  const r = t,
                    l = r + e,
                    c = Math.cos(r),
                    h = Math.sin(r),
                    u = Math.cos(l),
                    d = Math.sin(l),
                    f = (t, e, n) =>
                      X(t, r, l, !0) ? 1 : Math.max(e, e * i, n, n * i),
                    p = (t, e, n) =>
                      X(t, r, l, !0) ? -1 : Math.min(e, e * i, n, n * i),
                    g = f(0, c, u),
                    m = f(O, h, d),
                    b = p(P, c, u),
                    x = p(P + O, h, d);
                  ((n = (g - b) / 2),
                    (s = (m - x) / 2),
                    (o = -(g + b) / 2),
                    (a = -(m + x) / 2));
                }
                return { ratioX: n, ratioY: s, offsetX: o, offsetY: a };
              })(f, d, r),
              x = (i.width - o) / p,
              y = (i.height - o) / g,
              v = Math.max(Math.min(x, y) / 2, 0),
              _ = u(this.options.radius, v),
              w =
                (_ - Math.max(_ * r, 0)) / this._getVisibleDatasetWeightTotal();
            ((this.offsetX = m * _),
              (this.offsetY = b * _),
              (n.total = this.calculateTotal()),
              (this.outerRadius =
                _ - w * this._getRingWeightOffset(this.index)),
              (this.innerRadius = Math.max(this.outerRadius - w * h, 0)),
              this.updateElements(s, 0, s.length, t));
          }
          _circumference(t, e) {
            const i = this.options,
              n = this._cachedMeta,
              s = this._getCircumference();
            return (e && i.animation.animateRotate) ||
              !this.chart.getDataVisibility(t) ||
              null === n._parsed[t] ||
              n.data[t].hidden
              ? 0
              : this.calculateCircumference((n._parsed[t] * s) / C);
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              o = this.chart,
              a = o.chartArea,
              r = o.options.animation,
              l = (a.left + a.right) / 2,
              c = (a.top + a.bottom) / 2,
              h = s && r.animateScale,
              u = h ? 0 : this.innerRadius,
              d = h ? 0 : this.outerRadius,
              { sharedOptions: f, includeOptions: p } = this._getSharedOptions(
                e,
                n,
              );
            let g,
              m = this._getRotation();
            for (g = 0; g < e; ++g) m += this._circumference(g, s);
            for (g = e; g < e + i; ++g) {
              const e = this._circumference(g, s),
                i = t[g],
                o = {
                  x: l + this.offsetX,
                  y: c + this.offsetY,
                  startAngle: m,
                  endAngle: m + e,
                  circumference: e,
                  outerRadius: d,
                  innerRadius: u,
                };
              (p &&
                (o.options =
                  f ||
                  this.resolveDataElementOptions(g, i.active ? "active" : n)),
                (m += e),
                this.updateElement(i, g, o, n));
            }
          }
          calculateTotal() {
            const t = this._cachedMeta,
              e = t.data;
            let i,
              n = 0;
            for (i = 0; i < e.length; i++) {
              const s = t._parsed[i];
              null === s ||
                isNaN(s) ||
                !this.chart.getDataVisibility(i) ||
                e[i].hidden ||
                (n += Math.abs(s));
            }
            return n;
          }
          calculateCircumference(t) {
            const e = this._cachedMeta.total;
            return e > 0 && !isNaN(t) ? C * (Math.abs(t) / e) : 0;
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              i = this.chart,
              n = i.data.labels || [],
              s = ci(e._parsed[t], i.options.locale);
            return { label: n[t] || "", value: s };
          }
          getMaxBorderWidth(t) {
            let e = 0;
            const i = this.chart;
            let n, s, o, a, r;
            if (!t)
              for (n = 0, s = i.data.datasets.length; n < s; ++n)
                if (i.isDatasetVisible(n)) {
                  ((o = i.getDatasetMeta(n)), (t = o.data), (a = o.controller));
                  break;
                }
            if (!t) return 0;
            for (n = 0, s = t.length; n < s; ++n)
              ((r = a.resolveDataElementOptions(n)),
                "inner" !== r.borderAlign &&
                  (e = Math.max(
                    e,
                    r.borderWidth || 0,
                    r.hoverBorderWidth || 0,
                  )));
            return e;
          }
          getMaxOffset(t) {
            let e = 0;
            for (let i = 0, n = t.length; i < n; ++i) {
              const t = this.resolveDataElementOptions(i);
              e = Math.max(e, t.offset || 0, t.hoverOffset || 0);
            }
            return e;
          }
          _getRingWeightOffset(t) {
            let e = 0;
            for (let i = 0; i < t; ++i)
              this.chart.isDatasetVisible(i) && (e += this._getRingWeight(i));
            return e;
          }
          _getRingWeight(t) {
            return Math.max(h(this.chart.data.datasets[t].weight, 1), 0);
          }
          _getVisibleDatasetWeightTotal() {
            return (
              this._getRingWeightOffset(this.chart.data.datasets.length) || 1
            );
          }
        }
        ((Xi.id = "doughnut"),
          (Xi.defaults = {
            datasetElementType: !1,
            dataElementType: "arc",
            animation: { animateRotate: !0, animateScale: !1 },
            animations: {
              numbers: {
                type: "number",
                properties: [
                  "circumference",
                  "endAngle",
                  "innerRadius",
                  "outerRadius",
                  "startAngle",
                  "x",
                  "y",
                  "offset",
                  "borderWidth",
                  "spacing",
                ],
              },
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r",
          }),
          (Xi.descriptors = {
            _scriptable: (t) => "spacing" !== t,
            _indexable: (t) => "spacing" !== t,
          }),
          (Xi.overrides = {
            aspectRatio: 1,
            plugins: {
              legend: {
                labels: {
                  generateLabels(t) {
                    const e = t.data;
                    if (e.labels.length && e.datasets.length) {
                      const {
                        labels: { pointStyle: i },
                      } = t.legend.options;
                      return e.labels.map((e, n) => {
                        const s = t.getDatasetMeta(0).controller.getStyle(n);
                        return {
                          text: e,
                          fillStyle: s.backgroundColor,
                          strokeStyle: s.borderColor,
                          lineWidth: s.borderWidth,
                          pointStyle: i,
                          hidden: !t.getDataVisibility(n),
                          index: n,
                        };
                      });
                    }
                    return [];
                  },
                },
                onClick(t, e, i) {
                  (i.chart.toggleDataVisibility(e.index), i.chart.update());
                },
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label(t) {
                    let e = t.label;
                    const i = ": " + t.formattedValue;
                    return (
                      a(e) ? ((e = e.slice()), (e[0] += i)) : (e += i),
                      e
                    );
                  },
                },
              },
            },
          }));
        class Gi extends zi {
          initialize() {
            ((this.enableOptionSharing = !0),
              (this.supportsDecimation = !0),
              super.initialize());
          }
          update(t) {
            const e = this._cachedMeta,
              { dataset: i, data: n = [], _dataset: s } = e,
              o = this.chart._animationsDisabled;
            let { start: a, count: r } = rt(e, n, o);
            ((this._drawStart = a),
              (this._drawCount = r),
              lt(e) && ((a = 0), (r = n.length)),
              (i._chart = this.chart),
              (i._datasetIndex = this.index),
              (i._decimated = !!s._decimated),
              (i.points = n));
            const l = this.resolveDatasetElementOptions(t);
            (this.options.showLine || (l.borderWidth = 0),
              (l.segment = this.options.segment),
              this.updateElement(i, void 0, { animated: !o, options: l }, t),
              this.updateElements(n, a, r, t));
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              {
                iScale: a,
                vScale: r,
                _stacked: l,
                _dataset: c,
              } = this._cachedMeta,
              { sharedOptions: h, includeOptions: u } = this._getSharedOptions(
                e,
                n,
              ),
              d = a.axis,
              f = r.axis,
              { spanGaps: p, segment: g } = this.options,
              m = B(p) ? p : Number.POSITIVE_INFINITY,
              b = this.chart._animationsDisabled || s || "none" === n;
            let x = e > 0 && this.getParsed(e - 1);
            for (let p = e; p < e + i; ++p) {
              const e = t[p],
                i = this.getParsed(p),
                y = b ? e : {},
                v = o(i[f]),
                _ = (y[d] = a.getPixelForValue(i[d], p)),
                w = (y[f] =
                  s || v
                    ? r.getBasePixel()
                    : r.getPixelForValue(
                        l ? this.applyStack(r, i, l) : i[f],
                        p,
                      ));
              ((y.skip = isNaN(_) || isNaN(w) || v),
                (y.stop = p > 0 && Math.abs(i[d] - x[d]) > m),
                g && ((y.parsed = i), (y.raw = c.data[p])),
                u &&
                  (y.options =
                    h ||
                    this.resolveDataElementOptions(p, e.active ? "active" : n)),
                b || this.updateElement(e, p, y, n),
                (x = i));
            }
          }
          getMaxOverflow() {
            const t = this._cachedMeta,
              e = t.dataset,
              i = (e.options && e.options.borderWidth) || 0,
              n = t.data || [];
            if (!n.length) return i;
            const s = n[0].size(this.resolveDataElementOptions(0)),
              o = n[n.length - 1].size(
                this.resolveDataElementOptions(n.length - 1),
              );
            return Math.max(i, s, o) / 2;
          }
          draw() {
            const t = this._cachedMeta;
            (t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis),
              super.draw());
          }
        }
        ((Gi.id = "line"),
          (Gi.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            showLine: !0,
            spanGaps: !1,
          }),
          (Gi.overrides = {
            scales: {
              _index_: { type: "category" },
              _value_: { type: "linear" },
            },
          }));
        class Zi extends zi {
          constructor(t, e) {
            (super(t, e),
              (this.innerRadius = void 0),
              (this.outerRadius = void 0));
          }
          getLabelAndValue(t) {
            const e = this._cachedMeta,
              i = this.chart,
              n = i.data.labels || [],
              s = ci(e._parsed[t].r, i.options.locale);
            return { label: n[t] || "", value: s };
          }
          parseObjectData(t, e, i, n) {
            return je.bind(this)(t, e, i, n);
          }
          update(t) {
            const e = this._cachedMeta.data;
            (this._updateRadius(), this.updateElements(e, 0, e.length, t));
          }
          getMinMax() {
            const t = this._cachedMeta,
              e = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY,
              };
            return (
              t.data.forEach((t, i) => {
                const n = this.getParsed(i).r;
                !isNaN(n) &&
                  this.chart.getDataVisibility(i) &&
                  (n < e.min && (e.min = n), n > e.max && (e.max = n));
              }),
              e
            );
          }
          _updateRadius() {
            const t = this.chart,
              e = t.chartArea,
              i = t.options,
              n = Math.min(e.right - e.left, e.bottom - e.top),
              s = Math.max(n / 2, 0),
              o =
                (s -
                  Math.max(
                    i.cutoutPercentage ? (s / 100) * i.cutoutPercentage : 1,
                    0,
                  )) /
                t.getVisibleDatasetCount();
            ((this.outerRadius = s - o * this.index),
              (this.innerRadius = this.outerRadius - o));
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              o = this.chart,
              a = o.options.animation,
              r = this._cachedMeta.rScale,
              l = r.xCenter,
              c = r.yCenter,
              h = r.getIndexAngle(0) - 0.5 * P;
            let u,
              d = h;
            const f = 360 / this.countVisibleElements();
            for (u = 0; u < e; ++u) d += this._computeAngle(u, n, f);
            for (u = e; u < e + i; u++) {
              const e = t[u];
              let i = d,
                p = d + this._computeAngle(u, n, f),
                g = o.getDataVisibility(u)
                  ? r.getDistanceFromCenterForValue(this.getParsed(u).r)
                  : 0;
              ((d = p),
                s &&
                  (a.animateScale && (g = 0), a.animateRotate && (i = p = h)));
              const m = {
                x: l,
                y: c,
                innerRadius: 0,
                outerRadius: g,
                startAngle: i,
                endAngle: p,
                options: this.resolveDataElementOptions(
                  u,
                  e.active ? "active" : n,
                ),
              };
              this.updateElement(e, u, m, n);
            }
          }
          countVisibleElements() {
            const t = this._cachedMeta;
            let e = 0;
            return (
              t.data.forEach((t, i) => {
                !isNaN(this.getParsed(i).r) &&
                  this.chart.getDataVisibility(i) &&
                  e++;
              }),
              e
            );
          }
          _computeAngle(t, e, i) {
            return this.chart.getDataVisibility(t)
              ? W(this.resolveDataElementOptions(t, e).angle || i)
              : 0;
          }
        }
        ((Zi.id = "polarArea"),
          (Zi.defaults = {
            dataElementType: "arc",
            animation: { animateRotate: !0, animateScale: !0 },
            animations: {
              numbers: {
                type: "number",
                properties: [
                  "x",
                  "y",
                  "startAngle",
                  "endAngle",
                  "innerRadius",
                  "outerRadius",
                ],
              },
            },
            indexAxis: "r",
            startAngle: 0,
          }),
          (Zi.overrides = {
            aspectRatio: 1,
            plugins: {
              legend: {
                labels: {
                  generateLabels(t) {
                    const e = t.data;
                    if (e.labels.length && e.datasets.length) {
                      const {
                        labels: { pointStyle: i },
                      } = t.legend.options;
                      return e.labels.map((e, n) => {
                        const s = t.getDatasetMeta(0).controller.getStyle(n);
                        return {
                          text: e,
                          fillStyle: s.backgroundColor,
                          strokeStyle: s.borderColor,
                          lineWidth: s.borderWidth,
                          pointStyle: i,
                          hidden: !t.getDataVisibility(n),
                          index: n,
                        };
                      });
                    }
                    return [];
                  },
                },
                onClick(t, e, i) {
                  (i.chart.toggleDataVisibility(e.index), i.chart.update());
                },
              },
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: (t) =>
                    t.chart.data.labels[t.dataIndex] + ": " + t.formattedValue,
                },
              },
            },
            scales: {
              r: {
                type: "radialLinear",
                angleLines: { display: !1 },
                beginAtZero: !0,
                grid: { circular: !0 },
                pointLabels: { display: !1 },
                startAngle: 0,
              },
            },
          }));
        class Ki extends Xi {}
        ((Ki.id = "pie"),
          (Ki.defaults = {
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%",
          }));
        class Ji extends zi {
          getLabelAndValue(t) {
            const e = this._cachedMeta.vScale,
              i = this.getParsed(t);
            return {
              label: e.getLabels()[t],
              value: "" + e.getLabelForValue(i[e.axis]),
            };
          }
          parseObjectData(t, e, i, n) {
            return je.bind(this)(t, e, i, n);
          }
          update(t) {
            const e = this._cachedMeta,
              i = e.dataset,
              n = e.data || [],
              s = e.iScale.getLabels();
            if (((i.points = n), "resize" !== t)) {
              const e = this.resolveDatasetElementOptions(t);
              this.options.showLine || (e.borderWidth = 0);
              const o = {
                _loop: !0,
                _fullLoop: s.length === n.length,
                options: e,
              };
              this.updateElement(i, void 0, o, t);
            }
            this.updateElements(n, 0, n.length, t);
          }
          updateElements(t, e, i, n) {
            const s = this._cachedMeta.rScale,
              o = "reset" === n;
            for (let a = e; a < e + i; a++) {
              const e = t[a],
                i = this.resolveDataElementOptions(a, e.active ? "active" : n),
                r = s.getPointPositionForValue(a, this.getParsed(a).r),
                l = o ? s.xCenter : r.x,
                c = o ? s.yCenter : r.y,
                h = {
                  x: l,
                  y: c,
                  angle: r.angle,
                  skip: isNaN(l) || isNaN(c),
                  options: i,
                };
              this.updateElement(e, a, h, n);
            }
          }
        }
        ((Ji.id = "radar"),
          (Ji.defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: !0,
            elements: { line: { fill: "start" } },
          }),
          (Ji.overrides = {
            aspectRatio: 1,
            scales: { r: { type: "radialLinear" } },
          }));
        class Qi {
          constructor() {
            ((this.x = void 0),
              (this.y = void 0),
              (this.active = !1),
              (this.options = void 0),
              (this.$animations = void 0));
          }
          tooltipPosition(t) {
            const { x: e, y: i } = this.getProps(["x", "y"], t);
            return { x: e, y: i };
          }
          hasValue() {
            return B(this.x) && B(this.y);
          }
          getProps(t, e) {
            const i = this.$animations;
            if (!e || !i) return this;
            const n = {};
            return (
              t.forEach((t) => {
                n[t] = i[t] && i[t].active() ? i[t]._to : this[t];
              }),
              n
            );
          }
        }
        ((Qi.defaults = {}), (Qi.defaultRoutes = void 0));
        const tn = {
          values: (t) => (a(t) ? t : "" + t),
          numeric(t, e, i) {
            if (0 === t) return "0";
            const n = this.chart.options.locale;
            let s,
              o = t;
            if (i.length > 1) {
              const e = Math.max(
                Math.abs(i[0].value),
                Math.abs(i[i.length - 1].value),
              );
              ((e < 1e-4 || e > 1e15) && (s = "scientific"),
                (o = (function (t, e) {
                  let i =
                    e.length > 3
                      ? e[2].value - e[1].value
                      : e[1].value - e[0].value;
                  Math.abs(i) >= 1 &&
                    t !== Math.floor(t) &&
                    (i = t - Math.floor(t));
                  return i;
                })(t, i)));
            }
            const a = L(Math.abs(o)),
              r = Math.max(Math.min(-1 * Math.floor(a), 20), 0),
              l = {
                notation: s,
                minimumFractionDigits: r,
                maximumFractionDigits: r,
              };
            return (Object.assign(l, this.options.ticks.format), ci(t, n, l));
          },
          logarithmic(t, e, i) {
            if (0 === t) return "0";
            const n = t / Math.pow(10, Math.floor(L(t)));
            return 1 === n || 2 === n || 5 === n
              ? tn.numeric.call(this, t, e, i)
              : "";
          },
        };
        var en = { formatters: tn };
        function nn(t, e) {
          const i = t.options.ticks,
            n =
              i.maxTicksLimit ||
              (function (t) {
                const e = t.options.offset,
                  i = t._tickSize(),
                  n = t._length / i + (e ? 0 : 1),
                  s = t._maxLength / i;
                return Math.floor(Math.min(n, s));
              })(t),
            s = i.major.enabled
              ? (function (t) {
                  const e = [];
                  let i, n;
                  for (i = 0, n = t.length; i < n; i++) t[i].major && e.push(i);
                  return e;
                })(e)
              : [],
            a = s.length,
            r = s[0],
            l = s[a - 1],
            c = [];
          if (a > n)
            return (
              (function (t, e, i, n) {
                let s,
                  o = 0,
                  a = i[0];
                for (n = Math.ceil(n), s = 0; s < t.length; s++)
                  s === a && (e.push(t[s]), o++, (a = i[o * n]));
              })(e, c, s, a / n),
              c
            );
          const h = (function (t, e, i) {
            const n = (function (t) {
                const e = t.length;
                let i, n;
                if (e < 2) return !1;
                for (n = t[0], i = 1; i < e; ++i)
                  if (t[i] - t[i - 1] !== n) return !1;
                return n;
              })(t),
              s = e.length / i;
            if (!n) return Math.max(s, 1);
            const o = (function (t) {
              const e = [],
                i = Math.sqrt(t);
              let n;
              for (n = 1; n < i; n++) t % n === 0 && (e.push(n), e.push(t / n));
              return (
                i === (0 | i) && e.push(i),
                e.sort((t, e) => t - e).pop(),
                e
              );
            })(n);
            for (let t = 0, e = o.length - 1; t < e; t++) {
              const e = o[t];
              if (e > s) return e;
            }
            return Math.max(s, 1);
          })(s, e, n);
          if (a > 0) {
            let t, i;
            const n = a > 1 ? Math.round((l - r) / (a - 1)) : null;
            for (sn(e, c, h, o(n) ? 0 : r - n, r), t = 0, i = a - 1; t < i; t++)
              sn(e, c, h, s[t], s[t + 1]);
            return (sn(e, c, h, l, o(n) ? e.length : l + n), c);
          }
          return (sn(e, c, h), c);
        }
        function sn(t, e, i, n, s) {
          const o = h(n, 0),
            a = Math.min(h(s, t.length), t.length);
          let r,
            l,
            c,
            u = 0;
          for (
            i = Math.ceil(i),
              s && ((r = s - n), (i = r / Math.floor(r / i))),
              c = o;
            c < 0;

          )
            (u++, (c = Math.round(o + u * i)));
          for (l = Math.max(o, 0); l < a; l++)
            l === c && (e.push(t[l]), u++, (c = Math.round(o + u * i)));
        }
        (te.set("scale", {
          display: !0,
          offset: !1,
          reverse: !1,
          beginAtZero: !1,
          bounds: "ticks",
          grace: 0,
          grid: {
            display: !0,
            lineWidth: 1,
            drawBorder: !0,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickLength: 8,
            tickWidth: (t, e) => e.lineWidth,
            tickColor: (t, e) => e.color,
            offset: !1,
            borderDash: [],
            borderDashOffset: 0,
            borderWidth: 1,
          },
          title: { display: !1, text: "", padding: { top: 4, bottom: 4 } },
          ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: en.formatters.values,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: !1,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2,
          },
        }),
          te.route("scale.ticks", "color", "", "color"),
          te.route("scale.grid", "color", "", "borderColor"),
          te.route("scale.grid", "borderColor", "", "borderColor"),
          te.route("scale.title", "color", "", "color"),
          te.describe("scale", {
            _fallback: !1,
            _scriptable: (t) =>
              !t.startsWith("before") &&
              !t.startsWith("after") &&
              "callback" !== t &&
              "parser" !== t,
            _indexable: (t) => "borderDash" !== t && "tickBorderDash" !== t,
          }),
          te.describe("scales", { _fallback: "scale" }),
          te.describe("scale.ticks", {
            _scriptable: (t) => "backdropPadding" !== t && "callback" !== t,
            _indexable: (t) => "backdropPadding" !== t,
          }));
        const on = (t, e, i) =>
          "top" === e || "left" === e ? t[e] + i : t[e] - i;
        function an(t, e) {
          const i = [],
            n = t.length / e,
            s = t.length;
          let o = 0;
          for (; o < s; o += n) i.push(t[Math.floor(o)]);
          return i;
        }
        function rn(t, e, i) {
          const n = t.ticks.length,
            s = Math.min(e, n - 1),
            o = t._startPixel,
            a = t._endPixel,
            r = 1e-6;
          let l,
            c = t.getPixelForTick(s);
          if (
            !(
              i &&
              ((l =
                1 === n
                  ? Math.max(c - o, a - c)
                  : 0 === e
                    ? (t.getPixelForTick(1) - c) / 2
                    : (c - t.getPixelForTick(s - 1)) / 2),
              (c += s < e ? l : -l),
              c < o - r || c > a + r)
            )
          )
            return c;
        }
        function ln(t) {
          return t.drawTicks ? t.tickLength : 0;
        }
        function cn(t, e) {
          if (!t.display) return 0;
          const i = ke(t.font, e),
            n = we(t.padding);
          return (a(t.text) ? t.text.length : 1) * i.lineHeight + n.height;
        }
        function hn(t, e, i) {
          let n = ot(t);
          return (
            ((i && "right" !== e) || (!i && "right" === e)) &&
              (n = ((t) =>
                "left" === t ? "right" : "right" === t ? "left" : t)(n)),
            n
          );
        }
        class un extends Qi {
          constructor(t) {
            (super(),
              (this.id = t.id),
              (this.type = t.type),
              (this.options = void 0),
              (this.ctx = t.ctx),
              (this.chart = t.chart),
              (this.top = void 0),
              (this.bottom = void 0),
              (this.left = void 0),
              (this.right = void 0),
              (this.width = void 0),
              (this.height = void 0),
              (this._margins = { left: 0, right: 0, top: 0, bottom: 0 }),
              (this.maxWidth = void 0),
              (this.maxHeight = void 0),
              (this.paddingTop = void 0),
              (this.paddingBottom = void 0),
              (this.paddingLeft = void 0),
              (this.paddingRight = void 0),
              (this.axis = void 0),
              (this.labelRotation = void 0),
              (this.min = void 0),
              (this.max = void 0),
              (this._range = void 0),
              (this.ticks = []),
              (this._gridLineItems = null),
              (this._labelItems = null),
              (this._labelSizes = null),
              (this._length = 0),
              (this._maxLength = 0),
              (this._longestTextCache = {}),
              (this._startPixel = void 0),
              (this._endPixel = void 0),
              (this._reversePixels = !1),
              (this._userMax = void 0),
              (this._userMin = void 0),
              (this._suggestedMax = void 0),
              (this._suggestedMin = void 0),
              (this._ticksLength = 0),
              (this._borderValue = 0),
              (this._cache = {}),
              (this._dataLimitsCached = !1),
              (this.$context = void 0));
          }
          init(t) {
            ((this.options = t.setContext(this.getContext())),
              (this.axis = t.axis),
              (this._userMin = this.parse(t.min)),
              (this._userMax = this.parse(t.max)),
              (this._suggestedMin = this.parse(t.suggestedMin)),
              (this._suggestedMax = this.parse(t.suggestedMax)));
          }
          parse(t, e) {
            return t;
          }
          getUserBounds() {
            let {
              _userMin: t,
              _userMax: e,
              _suggestedMin: i,
              _suggestedMax: n,
            } = this;
            return (
              (t = c(t, Number.POSITIVE_INFINITY)),
              (e = c(e, Number.NEGATIVE_INFINITY)),
              (i = c(i, Number.POSITIVE_INFINITY)),
              (n = c(n, Number.NEGATIVE_INFINITY)),
              { min: c(t, i), max: c(e, n), minDefined: l(t), maxDefined: l(e) }
            );
          }
          getMinMax(t) {
            let e,
              {
                min: i,
                max: n,
                minDefined: s,
                maxDefined: o,
              } = this.getUserBounds();
            if (s && o) return { min: i, max: n };
            const a = this.getMatchingVisibleMetas();
            for (let r = 0, l = a.length; r < l; ++r)
              ((e = a[r].controller.getMinMax(this, t)),
                s || (i = Math.min(i, e.min)),
                o || (n = Math.max(n, e.max)));
            return (
              (i = o && i > n ? n : i),
              (n = s && i > n ? i : n),
              { min: c(i, c(n, i)), max: c(n, c(i, n)) }
            );
          }
          getPadding() {
            return {
              left: this.paddingLeft || 0,
              top: this.paddingTop || 0,
              right: this.paddingRight || 0,
              bottom: this.paddingBottom || 0,
            };
          }
          getTicks() {
            return this.ticks;
          }
          getLabels() {
            const t = this.chart.data;
            return (
              this.options.labels ||
              (this.isHorizontal() ? t.xLabels : t.yLabels) ||
              t.labels ||
              []
            );
          }
          beforeLayout() {
            ((this._cache = {}), (this._dataLimitsCached = !1));
          }
          beforeUpdate() {
            d(this.options.beforeUpdate, [this]);
          }
          update(t, e, i) {
            const { beginAtZero: n, grace: s, ticks: o } = this.options,
              a = o.sampleSize;
            (this.beforeUpdate(),
              (this.maxWidth = t),
              (this.maxHeight = e),
              (this._margins = i =
                Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i)),
              (this.ticks = null),
              (this._labelSizes = null),
              (this._gridLineItems = null),
              (this._labelItems = null),
              this.beforeSetDimensions(),
              this.setDimensions(),
              this.afterSetDimensions(),
              (this._maxLength = this.isHorizontal()
                ? this.width + i.left + i.right
                : this.height + i.top + i.bottom),
              this._dataLimitsCached ||
                (this.beforeDataLimits(),
                this.determineDataLimits(),
                this.afterDataLimits(),
                (this._range = (function (t, e, i) {
                  const { min: n, max: s } = t,
                    o = u(e, (s - n) / 2),
                    a = (t, e) => (i && 0 === t ? 0 : t + e);
                  return { min: a(n, -Math.abs(o)), max: a(s, o) };
                })(this, s, n)),
                (this._dataLimitsCached = !0)),
              this.beforeBuildTicks(),
              (this.ticks = this.buildTicks() || []),
              this.afterBuildTicks());
            const r = a < this.ticks.length;
            (this._convertTicksToLabels(r ? an(this.ticks, a) : this.ticks),
              this.configure(),
              this.beforeCalculateLabelRotation(),
              this.calculateLabelRotation(),
              this.afterCalculateLabelRotation(),
              o.display &&
                (o.autoSkip || "auto" === o.source) &&
                ((this.ticks = nn(this, this.ticks)),
                (this._labelSizes = null),
                this.afterAutoSkip()),
              r && this._convertTicksToLabels(this.ticks),
              this.beforeFit(),
              this.fit(),
              this.afterFit(),
              this.afterUpdate());
          }
          configure() {
            let t,
              e,
              i = this.options.reverse;
            (this.isHorizontal()
              ? ((t = this.left), (e = this.right))
              : ((t = this.top), (e = this.bottom), (i = !i)),
              (this._startPixel = t),
              (this._endPixel = e),
              (this._reversePixels = i),
              (this._length = e - t),
              (this._alignToPixels = this.options.alignToPixels));
          }
          afterUpdate() {
            d(this.options.afterUpdate, [this]);
          }
          beforeSetDimensions() {
            d(this.options.beforeSetDimensions, [this]);
          }
          setDimensions() {
            (this.isHorizontal()
              ? ((this.width = this.maxWidth),
                (this.left = 0),
                (this.right = this.width))
              : ((this.height = this.maxHeight),
                (this.top = 0),
                (this.bottom = this.height)),
              (this.paddingLeft = 0),
              (this.paddingTop = 0),
              (this.paddingRight = 0),
              (this.paddingBottom = 0));
          }
          afterSetDimensions() {
            d(this.options.afterSetDimensions, [this]);
          }
          _callHooks(t) {
            (this.chart.notifyPlugins(t, this.getContext()),
              d(this.options[t], [this]));
          }
          beforeDataLimits() {
            this._callHooks("beforeDataLimits");
          }
          determineDataLimits() {}
          afterDataLimits() {
            this._callHooks("afterDataLimits");
          }
          beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
          }
          buildTicks() {
            return [];
          }
          afterBuildTicks() {
            this._callHooks("afterBuildTicks");
          }
          beforeTickToLabelConversion() {
            d(this.options.beforeTickToLabelConversion, [this]);
          }
          generateTickLabels(t) {
            const e = this.options.ticks;
            let i, n, s;
            for (i = 0, n = t.length; i < n; i++)
              ((s = t[i]), (s.label = d(e.callback, [s.value, i, t], this)));
          }
          afterTickToLabelConversion() {
            d(this.options.afterTickToLabelConversion, [this]);
          }
          beforeCalculateLabelRotation() {
            d(this.options.beforeCalculateLabelRotation, [this]);
          }
          calculateLabelRotation() {
            const t = this.options,
              e = t.ticks,
              i = this.ticks.length,
              n = e.minRotation || 0,
              s = e.maxRotation;
            let o,
              a,
              r,
              l = n;
            if (
              !this._isVisible() ||
              !e.display ||
              n >= s ||
              i <= 1 ||
              !this.isHorizontal()
            )
              return void (this.labelRotation = n);
            const c = this._getLabelSizes(),
              h = c.widest.width,
              u = c.highest.height,
              d = G(this.chart.width - h, 0, this.maxWidth);
            ((o = t.offset ? this.maxWidth / i : d / (i - 1)),
              h + 6 > o &&
                ((o = d / (i - (t.offset ? 0.5 : 1))),
                (a =
                  this.maxHeight -
                  ln(t.grid) -
                  e.padding -
                  cn(t.title, this.chart.options.font)),
                (r = Math.sqrt(h * h + u * u)),
                (l = N(
                  Math.min(
                    Math.asin(G((c.highest.height + 6) / o, -1, 1)),
                    Math.asin(G(a / r, -1, 1)) - Math.asin(G(u / r, -1, 1)),
                  ),
                )),
                (l = Math.max(n, Math.min(s, l)))),
              (this.labelRotation = l));
          }
          afterCalculateLabelRotation() {
            d(this.options.afterCalculateLabelRotation, [this]);
          }
          afterAutoSkip() {}
          beforeFit() {
            d(this.options.beforeFit, [this]);
          }
          fit() {
            const t = { width: 0, height: 0 },
              {
                chart: e,
                options: { ticks: i, title: n, grid: s },
              } = this,
              o = this._isVisible(),
              a = this.isHorizontal();
            if (o) {
              const o = cn(n, e.options.font);
              if (
                (a
                  ? ((t.width = this.maxWidth), (t.height = ln(s) + o))
                  : ((t.height = this.maxHeight), (t.width = ln(s) + o)),
                i.display && this.ticks.length)
              ) {
                const {
                    first: e,
                    last: n,
                    widest: s,
                    highest: o,
                  } = this._getLabelSizes(),
                  r = 2 * i.padding,
                  l = W(this.labelRotation),
                  c = Math.cos(l),
                  h = Math.sin(l);
                if (a) {
                  const e = i.mirror ? 0 : h * s.width + c * o.height;
                  t.height = Math.min(this.maxHeight, t.height + e + r);
                } else {
                  const e = i.mirror ? 0 : c * s.width + h * o.height;
                  t.width = Math.min(this.maxWidth, t.width + e + r);
                }
                this._calculatePadding(e, n, h, c);
              }
            }
            (this._handleMargins(),
              a
                ? ((this.width = this._length =
                    e.width - this._margins.left - this._margins.right),
                  (this.height = t.height))
                : ((this.width = t.width),
                  (this.height = this._length =
                    e.height - this._margins.top - this._margins.bottom)));
          }
          _calculatePadding(t, e, i, n) {
            const {
                ticks: { align: s, padding: o },
                position: a,
              } = this.options,
              r = 0 !== this.labelRotation,
              l = "top" !== a && "x" === this.axis;
            if (this.isHorizontal()) {
              const a = this.getPixelForTick(0) - this.left,
                c = this.right - this.getPixelForTick(this.ticks.length - 1);
              let h = 0,
                u = 0;
              (r
                ? l
                  ? ((h = n * t.width), (u = i * e.height))
                  : ((h = i * t.height), (u = n * e.width))
                : "start" === s
                  ? (u = e.width)
                  : "end" === s
                    ? (h = t.width)
                    : "inner" !== s && ((h = t.width / 2), (u = e.width / 2)),
                (this.paddingLeft = Math.max(
                  ((h - a + o) * this.width) / (this.width - a),
                  0,
                )),
                (this.paddingRight = Math.max(
                  ((u - c + o) * this.width) / (this.width - c),
                  0,
                )));
            } else {
              let i = e.height / 2,
                n = t.height / 2;
              ("start" === s
                ? ((i = 0), (n = t.height))
                : "end" === s && ((i = e.height), (n = 0)),
                (this.paddingTop = i + o),
                (this.paddingBottom = n + o));
            }
          }
          _handleMargins() {
            this._margins &&
              ((this._margins.left = Math.max(
                this.paddingLeft,
                this._margins.left,
              )),
              (this._margins.top = Math.max(
                this.paddingTop,
                this._margins.top,
              )),
              (this._margins.right = Math.max(
                this.paddingRight,
                this._margins.right,
              )),
              (this._margins.bottom = Math.max(
                this.paddingBottom,
                this._margins.bottom,
              )));
          }
          afterFit() {
            d(this.options.afterFit, [this]);
          }
          isHorizontal() {
            const { axis: t, position: e } = this.options;
            return "top" === e || "bottom" === e || "x" === t;
          }
          isFullSize() {
            return this.options.fullSize;
          }
          _convertTicksToLabels(t) {
            let e, i;
            for (
              this.beforeTickToLabelConversion(),
                this.generateTickLabels(t),
                e = 0,
                i = t.length;
              e < i;
              e++
            )
              o(t[e].label) && (t.splice(e, 1), i--, e--);
            this.afterTickToLabelConversion();
          }
          _getLabelSizes() {
            let t = this._labelSizes;
            if (!t) {
              const e = this.options.ticks.sampleSize;
              let i = this.ticks;
              (e < i.length && (i = an(i, e)),
                (this._labelSizes = t = this._computeLabelSizes(i, i.length)));
            }
            return t;
          }
          _computeLabelSizes(t, e) {
            const { ctx: i, _longestTextCache: n } = this,
              s = [],
              r = [];
            let l,
              c,
              h,
              u,
              d,
              p,
              g,
              m,
              b,
              x,
              y,
              v = 0,
              _ = 0;
            for (l = 0; l < e; ++l) {
              if (
                ((u = t[l].label),
                (d = this._resolveTickFontOptions(l)),
                (i.font = p = d.string),
                (g = n[p] = n[p] || { data: {}, gc: [] }),
                (m = d.lineHeight),
                (b = x = 0),
                o(u) || a(u))
              ) {
                if (a(u))
                  for (c = 0, h = u.length; c < h; ++c)
                    ((y = u[c]),
                      o(y) ||
                        a(y) ||
                        ((b = ee(i, g.data, g.gc, b, y)), (x += m)));
              } else ((b = ee(i, g.data, g.gc, b, u)), (x = m));
              (s.push(b),
                r.push(x),
                (v = Math.max(b, v)),
                (_ = Math.max(x, _)));
            }
            !(function (t, e) {
              f(t, (t) => {
                const i = t.gc,
                  n = i.length / 2;
                let s;
                if (n > e) {
                  for (s = 0; s < n; ++s) delete t.data[i[s]];
                  i.splice(0, n);
                }
              });
            })(n, e);
            const w = s.indexOf(v),
              k = r.indexOf(_),
              M = (t) => ({ width: s[t] || 0, height: r[t] || 0 });
            return {
              first: M(0),
              last: M(e - 1),
              widest: M(w),
              highest: M(k),
              widths: s,
              heights: r,
            };
          }
          getLabelForValue(t) {
            return t;
          }
          getPixelForValue(t, e) {
            return NaN;
          }
          getValueForPixel(t) {}
          getPixelForTick(t) {
            const e = this.ticks;
            return t < 0 || t > e.length - 1
              ? null
              : this.getPixelForValue(e[t].value);
          }
          getPixelForDecimal(t) {
            this._reversePixels && (t = 1 - t);
            const e = this._startPixel + t * this._length;
            return G(
              this._alignToPixels ? ne(this.chart, e, 0) : e,
              -32768,
              32767,
            );
          }
          getDecimalForPixel(t) {
            const e = (t - this._startPixel) / this._length;
            return this._reversePixels ? 1 - e : e;
          }
          getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
          }
          getBaseValue() {
            const { min: t, max: e } = this;
            return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
          }
          getContext(t) {
            const e = this.ticks || [];
            if (t >= 0 && t < e.length) {
              const i = e[t];
              return (
                i.$context ||
                (i.$context = (function (t, e, i) {
                  return Se(t, { tick: i, index: e, type: "tick" });
                })(this.getContext(), t, i))
              );
            }
            return (
              this.$context ||
              (this.$context = Se(this.chart.getContext(), {
                scale: this,
                type: "scale",
              }))
            );
          }
          _tickSize() {
            const t = this.options.ticks,
              e = W(this.labelRotation),
              i = Math.abs(Math.cos(e)),
              n = Math.abs(Math.sin(e)),
              s = this._getLabelSizes(),
              o = t.autoSkipPadding || 0,
              a = s ? s.widest.width + o : 0,
              r = s ? s.highest.height + o : 0;
            return this.isHorizontal()
              ? r * i > a * n
                ? a / i
                : r / n
              : r * n < a * i
                ? r / i
                : a / n;
          }
          _isVisible() {
            const t = this.options.display;
            return "auto" !== t
              ? !!t
              : this.getMatchingVisibleMetas().length > 0;
          }
          _computeGridLineItems(t) {
            const e = this.axis,
              i = this.chart,
              n = this.options,
              { grid: s, position: o } = n,
              a = s.offset,
              l = this.isHorizontal(),
              c = this.ticks.length + (a ? 1 : 0),
              u = ln(s),
              d = [],
              f = s.setContext(this.getContext()),
              p = f.drawBorder ? f.borderWidth : 0,
              g = p / 2,
              m = function (t) {
                return ne(i, t, p);
              };
            let b, x, y, v, _, w, k, M, S, D, P, C;
            if ("top" === o)
              ((b = m(this.bottom)),
                (w = this.bottom - u),
                (M = b - g),
                (D = m(t.top) + g),
                (C = t.bottom));
            else if ("bottom" === o)
              ((b = m(this.top)),
                (D = t.top),
                (C = m(t.bottom) - g),
                (w = b + g),
                (M = this.top + u));
            else if ("left" === o)
              ((b = m(this.right)),
                (_ = this.right - u),
                (k = b - g),
                (S = m(t.left) + g),
                (P = t.right));
            else if ("right" === o)
              ((b = m(this.left)),
                (S = t.left),
                (P = m(t.right) - g),
                (_ = b + g),
                (k = this.left + u));
            else if ("x" === e) {
              if ("center" === o) b = m((t.top + t.bottom) / 2 + 0.5);
              else if (r(o)) {
                const t = Object.keys(o)[0],
                  e = o[t];
                b = m(this.chart.scales[t].getPixelForValue(e));
              }
              ((D = t.top), (C = t.bottom), (w = b + g), (M = w + u));
            } else if ("y" === e) {
              if ("center" === o) b = m((t.left + t.right) / 2);
              else if (r(o)) {
                const t = Object.keys(o)[0],
                  e = o[t];
                b = m(this.chart.scales[t].getPixelForValue(e));
              }
              ((_ = b - g), (k = _ - u), (S = t.left), (P = t.right));
            }
            const E = h(n.ticks.maxTicksLimit, c),
              T = Math.max(1, Math.ceil(c / E));
            for (x = 0; x < c; x += T) {
              const t = s.setContext(this.getContext(x)),
                e = t.lineWidth,
                n = t.color,
                o = t.borderDash || [],
                r = t.borderDashOffset,
                c = t.tickWidth,
                h = t.tickColor,
                u = t.tickBorderDash || [],
                f = t.tickBorderDashOffset;
              ((y = rn(this, x, a)),
                void 0 !== y &&
                  ((v = ne(i, y, e)),
                  l ? (_ = k = S = P = v) : (w = M = D = C = v),
                  d.push({
                    tx1: _,
                    ty1: w,
                    tx2: k,
                    ty2: M,
                    x1: S,
                    y1: D,
                    x2: P,
                    y2: C,
                    width: e,
                    color: n,
                    borderDash: o,
                    borderDashOffset: r,
                    tickWidth: c,
                    tickColor: h,
                    tickBorderDash: u,
                    tickBorderDashOffset: f,
                  })));
            }
            return ((this._ticksLength = c), (this._borderValue = b), d);
          }
          _computeLabelItems(t) {
            const e = this.axis,
              i = this.options,
              { position: n, ticks: s } = i,
              o = this.isHorizontal(),
              l = this.ticks,
              { align: c, crossAlign: h, padding: u, mirror: d } = s,
              f = ln(i.grid),
              p = f + u,
              g = d ? -u : p,
              m = -W(this.labelRotation),
              b = [];
            let x,
              y,
              v,
              _,
              w,
              k,
              M,
              S,
              D,
              P,
              C,
              E,
              T = "middle";
            if ("top" === n)
              ((k = this.bottom - g), (M = this._getXAxisLabelAlignment()));
            else if ("bottom" === n)
              ((k = this.top + g), (M = this._getXAxisLabelAlignment()));
            else if ("left" === n) {
              const t = this._getYAxisLabelAlignment(f);
              ((M = t.textAlign), (w = t.x));
            } else if ("right" === n) {
              const t = this._getYAxisLabelAlignment(f);
              ((M = t.textAlign), (w = t.x));
            } else if ("x" === e) {
              if ("center" === n) k = (t.top + t.bottom) / 2 + p;
              else if (r(n)) {
                const t = Object.keys(n)[0],
                  e = n[t];
                k = this.chart.scales[t].getPixelForValue(e) + p;
              }
              M = this._getXAxisLabelAlignment();
            } else if ("y" === e) {
              if ("center" === n) w = (t.left + t.right) / 2 - p;
              else if (r(n)) {
                const t = Object.keys(n)[0],
                  e = n[t];
                w = this.chart.scales[t].getPixelForValue(e);
              }
              M = this._getYAxisLabelAlignment(f).textAlign;
            }
            "y" === e &&
              ("start" === c ? (T = "top") : "end" === c && (T = "bottom"));
            const A = this._getLabelSizes();
            for (x = 0, y = l.length; x < y; ++x) {
              ((v = l[x]), (_ = v.label));
              const t = s.setContext(this.getContext(x));
              ((S = this.getPixelForTick(x) + s.labelOffset),
                (D = this._resolveTickFontOptions(x)),
                (P = D.lineHeight),
                (C = a(_) ? _.length : 1));
              const e = C / 2,
                i = t.color,
                r = t.textStrokeColor,
                c = t.textStrokeWidth;
              let u,
                f = M;
              if (
                (o
                  ? ((w = S),
                    "inner" === M &&
                      (f =
                        x === y - 1
                          ? this.options.reverse
                            ? "left"
                            : "right"
                          : 0 === x
                            ? this.options.reverse
                              ? "right"
                              : "left"
                            : "center"),
                    (E =
                      "top" === n
                        ? "near" === h || 0 !== m
                          ? -C * P + P / 2
                          : "center" === h
                            ? -A.highest.height / 2 - e * P + P
                            : -A.highest.height + P / 2
                        : "near" === h || 0 !== m
                          ? P / 2
                          : "center" === h
                            ? A.highest.height / 2 - e * P
                            : A.highest.height - C * P),
                    d && (E *= -1))
                  : ((k = S), (E = ((1 - C) * P) / 2)),
                t.showLabelBackdrop)
              ) {
                const e = we(t.backdropPadding),
                  i = A.heights[x],
                  n = A.widths[x];
                let s = k + E - e.top,
                  o = w - e.left;
                switch (T) {
                  case "middle":
                    s -= i / 2;
                    break;
                  case "bottom":
                    s -= i;
                }
                switch (M) {
                  case "center":
                    o -= n / 2;
                    break;
                  case "right":
                    o -= n;
                }
                u = {
                  left: o,
                  top: s,
                  width: n + e.width,
                  height: i + e.height,
                  color: t.backdropColor,
                };
              }
              b.push({
                rotation: m,
                label: _,
                font: D,
                color: i,
                strokeColor: r,
                strokeWidth: c,
                textOffset: E,
                textAlign: f,
                textBaseline: T,
                translation: [w, k],
                backdrop: u,
              });
            }
            return b;
          }
          _getXAxisLabelAlignment() {
            const { position: t, ticks: e } = this.options;
            if (-W(this.labelRotation)) return "top" === t ? "left" : "right";
            let i = "center";
            return (
              "start" === e.align
                ? (i = "left")
                : "end" === e.align
                  ? (i = "right")
                  : "inner" === e.align && (i = "inner"),
              i
            );
          }
          _getYAxisLabelAlignment(t) {
            const {
                position: e,
                ticks: { crossAlign: i, mirror: n, padding: s },
              } = this.options,
              o = t + s,
              a = this._getLabelSizes().widest.width;
            let r, l;
            return (
              "left" === e
                ? n
                  ? ((l = this.right + s),
                    "near" === i
                      ? (r = "left")
                      : "center" === i
                        ? ((r = "center"), (l += a / 2))
                        : ((r = "right"), (l += a)))
                  : ((l = this.right - o),
                    "near" === i
                      ? (r = "right")
                      : "center" === i
                        ? ((r = "center"), (l -= a / 2))
                        : ((r = "left"), (l = this.left)))
                : "right" === e
                  ? n
                    ? ((l = this.left + s),
                      "near" === i
                        ? (r = "right")
                        : "center" === i
                          ? ((r = "center"), (l -= a / 2))
                          : ((r = "left"), (l -= a)))
                    : ((l = this.left + o),
                      "near" === i
                        ? (r = "left")
                        : "center" === i
                          ? ((r = "center"), (l += a / 2))
                          : ((r = "right"), (l = this.right)))
                  : (r = "right"),
              { textAlign: r, x: l }
            );
          }
          _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            const t = this.chart,
              e = this.options.position;
            return "left" === e || "right" === e
              ? { top: 0, left: this.left, bottom: t.height, right: this.right }
              : "top" === e || "bottom" === e
                ? {
                    top: this.top,
                    left: 0,
                    bottom: this.bottom,
                    right: t.width,
                  }
                : void 0;
          }
          drawBackground() {
            const {
              ctx: t,
              options: { backgroundColor: e },
              left: i,
              top: n,
              width: s,
              height: o,
            } = this;
            e &&
              (t.save(),
              (t.fillStyle = e),
              t.fillRect(i, n, s, o),
              t.restore());
          }
          getLineWidthForValue(t) {
            const e = this.options.grid;
            if (!this._isVisible() || !e.display) return 0;
            const i = this.ticks.findIndex((e) => e.value === t);
            if (i >= 0) {
              return e.setContext(this.getContext(i)).lineWidth;
            }
            return 0;
          }
          drawGrid(t) {
            const e = this.options.grid,
              i = this.ctx,
              n =
                this._gridLineItems ||
                (this._gridLineItems = this._computeGridLineItems(t));
            let s, o;
            const a = (t, e, n) => {
              n.width &&
                n.color &&
                (i.save(),
                (i.lineWidth = n.width),
                (i.strokeStyle = n.color),
                i.setLineDash(n.borderDash || []),
                (i.lineDashOffset = n.borderDashOffset),
                i.beginPath(),
                i.moveTo(t.x, t.y),
                i.lineTo(e.x, e.y),
                i.stroke(),
                i.restore());
            };
            if (e.display)
              for (s = 0, o = n.length; s < o; ++s) {
                const t = n[s];
                (e.drawOnChartArea &&
                  a({ x: t.x1, y: t.y1 }, { x: t.x2, y: t.y2 }, t),
                  e.drawTicks &&
                    a(
                      { x: t.tx1, y: t.ty1 },
                      { x: t.tx2, y: t.ty2 },
                      {
                        color: t.tickColor,
                        width: t.tickWidth,
                        borderDash: t.tickBorderDash,
                        borderDashOffset: t.tickBorderDashOffset,
                      },
                    ));
              }
          }
          drawBorder() {
            const {
                chart: t,
                ctx: e,
                options: { grid: i },
              } = this,
              n = i.setContext(this.getContext()),
              s = i.drawBorder ? n.borderWidth : 0;
            if (!s) return;
            const o = i.setContext(this.getContext(0)).lineWidth,
              a = this._borderValue;
            let r, l, c, h;
            (this.isHorizontal()
              ? ((r = ne(t, this.left, s) - s / 2),
                (l = ne(t, this.right, o) + o / 2),
                (c = h = a))
              : ((c = ne(t, this.top, s) - s / 2),
                (h = ne(t, this.bottom, o) + o / 2),
                (r = l = a)),
              e.save(),
              (e.lineWidth = n.borderWidth),
              (e.strokeStyle = n.borderColor),
              e.beginPath(),
              e.moveTo(r, c),
              e.lineTo(l, h),
              e.stroke(),
              e.restore());
          }
          drawLabels(t) {
            if (!this.options.ticks.display) return;
            const e = this.ctx,
              i = this._computeLabelArea();
            i && le(e, i);
            const n =
              this._labelItems ||
              (this._labelItems = this._computeLabelItems(t));
            let s, o;
            for (s = 0, o = n.length; s < o; ++s) {
              const t = n[s],
                i = t.font,
                o = t.label;
              (t.backdrop &&
                ((e.fillStyle = t.backdrop.color),
                e.fillRect(
                  t.backdrop.left,
                  t.backdrop.top,
                  t.backdrop.width,
                  t.backdrop.height,
                )),
                de(e, o, 0, t.textOffset, i, t));
            }
            i && ce(e);
          }
          drawTitle() {
            const {
              ctx: t,
              options: { position: e, title: i, reverse: n },
            } = this;
            if (!i.display) return;
            const s = ke(i.font),
              o = we(i.padding),
              l = i.align;
            let c = s.lineHeight / 2;
            "bottom" === e || "center" === e || r(e)
              ? ((c += o.bottom),
                a(i.text) && (c += s.lineHeight * (i.text.length - 1)))
              : (c += o.top);
            const {
              titleX: h,
              titleY: u,
              maxWidth: d,
              rotation: f,
            } = (function (t, e, i, n) {
              const { top: s, left: o, bottom: a, right: l, chart: c } = t,
                { chartArea: h, scales: u } = c;
              let d,
                f,
                p,
                g = 0;
              const m = a - s,
                b = l - o;
              if (t.isHorizontal()) {
                if (((f = at(n, o, l)), r(i))) {
                  const t = Object.keys(i)[0],
                    n = i[t];
                  p = u[t].getPixelForValue(n) + m - e;
                } else
                  p =
                    "center" === i
                      ? (h.bottom + h.top) / 2 + m - e
                      : on(t, i, e);
                d = l - o;
              } else {
                if (r(i)) {
                  const t = Object.keys(i)[0],
                    n = i[t];
                  f = u[t].getPixelForValue(n) - b + e;
                } else
                  f =
                    "center" === i
                      ? (h.left + h.right) / 2 - b + e
                      : on(t, i, e);
                ((p = at(n, a, s)), (g = "left" === i ? -O : O));
              }
              return { titleX: f, titleY: p, maxWidth: d, rotation: g };
            })(this, c, e, l);
            de(t, i.text, 0, 0, s, {
              color: i.color,
              maxWidth: d,
              rotation: f,
              textAlign: hn(l, e, n),
              textBaseline: "middle",
              translation: [h, u],
            });
          }
          draw(t) {
            this._isVisible() &&
              (this.drawBackground(),
              this.drawGrid(t),
              this.drawBorder(),
              this.drawTitle(),
              this.drawLabels(t));
          }
          _layers() {
            const t = this.options,
              e = (t.ticks && t.ticks.z) || 0,
              i = h(t.grid && t.grid.z, -1);
            return this._isVisible() && this.draw === un.prototype.draw
              ? [
                  {
                    z: i,
                    draw: (t) => {
                      (this.drawBackground(),
                        this.drawGrid(t),
                        this.drawTitle());
                    },
                  },
                  {
                    z: i + 1,
                    draw: () => {
                      this.drawBorder();
                    },
                  },
                  {
                    z: e,
                    draw: (t) => {
                      this.drawLabels(t);
                    },
                  },
                ]
              : [
                  {
                    z: e,
                    draw: (t) => {
                      this.draw(t);
                    },
                  },
                ];
          }
          getMatchingVisibleMetas(t) {
            const e = this.chart.getSortedVisibleDatasetMetas(),
              i = this.axis + "AxisID",
              n = [];
            let s, o;
            for (s = 0, o = e.length; s < o; ++s) {
              const o = e[s];
              o[i] !== this.id || (t && o.type !== t) || n.push(o);
            }
            return n;
          }
          _resolveTickFontOptions(t) {
            return ke(this.options.ticks.setContext(this.getContext(t)).font);
          }
          _maxDigits() {
            const t = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / t;
          }
        }
        class dn {
          constructor(t, e, i) {
            ((this.type = t),
              (this.scope = e),
              (this.override = i),
              (this.items = Object.create(null)));
          }
          isForType(t) {
            return Object.prototype.isPrototypeOf.call(
              this.type.prototype,
              t.prototype,
            );
          }
          register(t) {
            const e = Object.getPrototypeOf(t);
            let i;
            (function (t) {
              return "id" in t && "defaults" in t;
            })(e) && (i = this.register(e));
            const n = this.items,
              s = t.id,
              o = this.scope + "." + s;
            if (!s) throw new Error("class does not have id: " + t);
            return (
              s in n ||
                ((n[s] = t),
                (function (t, e, i) {
                  const n = x(Object.create(null), [
                    i ? te.get(i) : {},
                    te.get(e),
                    t.defaults,
                  ]);
                  (te.set(e, n),
                    t.defaultRoutes &&
                      (function (t, e) {
                        Object.keys(e).forEach((i) => {
                          const n = i.split("."),
                            s = n.pop(),
                            o = [t].concat(n).join("."),
                            a = e[i].split("."),
                            r = a.pop(),
                            l = a.join(".");
                          te.route(o, s, l, r);
                        });
                      })(e, t.defaultRoutes));
                  t.descriptors && te.describe(e, t.descriptors);
                })(t, o, i),
                this.override && te.override(t.id, t.overrides)),
              o
            );
          }
          get(t) {
            return this.items[t];
          }
          unregister(t) {
            const e = this.items,
              i = t.id,
              n = this.scope;
            (i in e && delete e[i],
              n &&
                i in te[n] &&
                (delete te[n][i], this.override && delete Zt[i]));
          }
        }
        var fn = new (class {
          constructor() {
            ((this.controllers = new dn(zi, "datasets", !0)),
              (this.elements = new dn(Qi, "elements")),
              (this.plugins = new dn(Object, "plugins")),
              (this.scales = new dn(un, "scales")),
              (this._typedRegistries = [
                this.controllers,
                this.scales,
                this.elements,
              ]));
          }
          add(...t) {
            this._each("register", t);
          }
          remove(...t) {
            this._each("unregister", t);
          }
          addControllers(...t) {
            this._each("register", t, this.controllers);
          }
          addElements(...t) {
            this._each("register", t, this.elements);
          }
          addPlugins(...t) {
            this._each("register", t, this.plugins);
          }
          addScales(...t) {
            this._each("register", t, this.scales);
          }
          getController(t) {
            return this._get(t, this.controllers, "controller");
          }
          getElement(t) {
            return this._get(t, this.elements, "element");
          }
          getPlugin(t) {
            return this._get(t, this.plugins, "plugin");
          }
          getScale(t) {
            return this._get(t, this.scales, "scale");
          }
          removeControllers(...t) {
            this._each("unregister", t, this.controllers);
          }
          removeElements(...t) {
            this._each("unregister", t, this.elements);
          }
          removePlugins(...t) {
            this._each("unregister", t, this.plugins);
          }
          removeScales(...t) {
            this._each("unregister", t, this.scales);
          }
          _each(t, e, i) {
            [...e].forEach((e) => {
              const n = i || this._getRegistryForType(e);
              i || n.isForType(e) || (n === this.plugins && e.id)
                ? this._exec(t, n, e)
                : f(e, (e) => {
                    const n = i || this._getRegistryForType(e);
                    this._exec(t, n, e);
                  });
            });
          }
          _exec(t, e, i) {
            const n = k(t);
            (d(i["before" + n], [], i), e[t](i), d(i["after" + n], [], i));
          }
          _getRegistryForType(t) {
            for (let e = 0; e < this._typedRegistries.length; e++) {
              const i = this._typedRegistries[e];
              if (i.isForType(t)) return i;
            }
            return this.plugins;
          }
          _get(t, e, i) {
            const n = e.get(t);
            if (void 0 === n)
              throw new Error('"' + t + '" is not a registered ' + i + ".");
            return n;
          }
        })();
        class pn extends zi {
          update(t) {
            const e = this._cachedMeta,
              { data: i = [] } = e,
              n = this.chart._animationsDisabled;
            let { start: s, count: o } = rt(e, i, n);
            if (
              ((this._drawStart = s),
              (this._drawCount = o),
              lt(e) && ((s = 0), (o = i.length)),
              this.options.showLine)
            ) {
              const { dataset: s, _dataset: o } = e;
              ((s._chart = this.chart),
                (s._datasetIndex = this.index),
                (s._decimated = !!o._decimated),
                (s.points = i));
              const a = this.resolveDatasetElementOptions(t);
              ((a.segment = this.options.segment),
                this.updateElement(s, void 0, { animated: !n, options: a }, t));
            }
            this.updateElements(i, s, o, t);
          }
          addElements() {
            const { showLine: t } = this.options;
            (!this.datasetElementType &&
              t &&
              (this.datasetElementType = fn.getElement("line")),
              super.addElements());
          }
          updateElements(t, e, i, n) {
            const s = "reset" === n,
              {
                iScale: a,
                vScale: r,
                _stacked: l,
                _dataset: c,
              } = this._cachedMeta,
              h = this.resolveDataElementOptions(e, n),
              u = this.getSharedOptions(h),
              d = this.includeOptions(n, u),
              f = a.axis,
              p = r.axis,
              { spanGaps: g, segment: m } = this.options,
              b = B(g) ? g : Number.POSITIVE_INFINITY,
              x = this.chart._animationsDisabled || s || "none" === n;
            let y = e > 0 && this.getParsed(e - 1);
            for (let h = e; h < e + i; ++h) {
              const e = t[h],
                i = this.getParsed(h),
                g = x ? e : {},
                v = o(i[p]),
                _ = (g[f] = a.getPixelForValue(i[f], h)),
                w = (g[p] =
                  s || v
                    ? r.getBasePixel()
                    : r.getPixelForValue(
                        l ? this.applyStack(r, i, l) : i[p],
                        h,
                      ));
              ((g.skip = isNaN(_) || isNaN(w) || v),
                (g.stop = h > 0 && Math.abs(i[f] - y[f]) > b),
                m && ((g.parsed = i), (g.raw = c.data[h])),
                d &&
                  (g.options =
                    u ||
                    this.resolveDataElementOptions(h, e.active ? "active" : n)),
                x || this.updateElement(e, h, g, n),
                (y = i));
            }
            this.updateSharedOptions(u, n, h);
          }
          getMaxOverflow() {
            const t = this._cachedMeta,
              e = t.data || [];
            if (!this.options.showLine) {
              let t = 0;
              for (let i = e.length - 1; i >= 0; --i)
                t = Math.max(
                  t,
                  e[i].size(this.resolveDataElementOptions(i)) / 2,
                );
              return t > 0 && t;
            }
            const i = t.dataset,
              n = (i.options && i.options.borderWidth) || 0;
            if (!e.length) return n;
            const s = e[0].size(this.resolveDataElementOptions(0)),
              o = e[e.length - 1].size(
                this.resolveDataElementOptions(e.length - 1),
              );
            return Math.max(n, s, o) / 2;
          }
        }
        ((pn.id = "scatter"),
          (pn.defaults = {
            datasetElementType: !1,
            dataElementType: "point",
            showLine: !1,
            fill: !1,
          }),
          (pn.overrides = {
            interaction: { mode: "point" },
            plugins: {
              tooltip: {
                callbacks: {
                  title: () => "",
                  label: (t) => "(" + t.label + ", " + t.formattedValue + ")",
                },
              },
            },
            scales: { x: { type: "linear" }, y: { type: "linear" } },
          }));
        var gn = Object.freeze({
          __proto__: null,
          BarController: Yi,
          BubbleController: Ui,
          DoughnutController: Xi,
          LineController: Gi,
          PolarAreaController: Zi,
          PieController: Ki,
          RadarController: Ji,
          ScatterController: pn,
        });
        function mn() {
          throw new Error(
            "This method is not implemented: Check that a complete date adapter is provided.",
          );
        }
        class bn {
          constructor(t) {
            this.options = t || {};
          }
          init(t) {}
          formats() {
            return mn();
          }
          parse(t, e) {
            return mn();
          }
          format(t, e) {
            return mn();
          }
          add(t, e, i) {
            return mn();
          }
          diff(t, e, i) {
            return mn();
          }
          startOf(t, e, i) {
            return mn();
          }
          endOf(t, e) {
            return mn();
          }
        }
        bn.override = function (t) {
          Object.assign(bn.prototype, t);
        };
        var xn = { _date: bn };
        function yn(t, e, i, n) {
          const { controller: s, data: o, _sorted: a } = t,
            r = s._cachedMeta.iScale;
          if (r && e === r.axis && "r" !== e && a && o.length) {
            const t = r._reversePixels ? Q : J;
            if (!n) return t(o, e, i);
            if (s._sharedOptions) {
              const n = o[0],
                s = "function" == typeof n.getRange && n.getRange(e);
              if (s) {
                const n = t(o, e, i - s),
                  a = t(o, e, i + s);
                return { lo: n.lo, hi: a.hi };
              }
            }
          }
          return { lo: 0, hi: o.length - 1 };
        }
        function vn(t, e, i, n, s) {
          const o = t.getSortedVisibleDatasetMetas(),
            a = i[e];
          for (let t = 0, i = o.length; t < i; ++t) {
            const { index: i, data: r } = o[t],
              { lo: l, hi: c } = yn(o[t], e, a, s);
            for (let t = l; t <= c; ++t) {
              const e = r[t];
              e.skip || n(e, i, t);
            }
          }
        }
        function _n(t, e, i, n, s) {
          const o = [];
          if (!s && !t.isPointInArea(e)) return o;
          return (
            vn(
              t,
              i,
              e,
              function (i, a, r) {
                (s || re(i, t.chartArea, 0)) &&
                  i.inRange(e.x, e.y, n) &&
                  o.push({ element: i, datasetIndex: a, index: r });
              },
              !0,
            ),
            o
          );
        }
        function wn(t, e, i, n, s, o) {
          let a = [];
          const r = (function (t) {
            const e = -1 !== t.indexOf("x"),
              i = -1 !== t.indexOf("y");
            return function (t, n) {
              const s = e ? Math.abs(t.x - n.x) : 0,
                o = i ? Math.abs(t.y - n.y) : 0;
              return Math.sqrt(Math.pow(s, 2) + Math.pow(o, 2));
            };
          })(i);
          let l = Number.POSITIVE_INFINITY;
          return (
            vn(t, i, e, function (i, c, h) {
              const u = i.inRange(e.x, e.y, s);
              if (n && !u) return;
              const d = i.getCenterPoint(s);
              if (!(!!o || t.isPointInArea(d)) && !u) return;
              const f = r(e, d);
              f < l
                ? ((a = [{ element: i, datasetIndex: c, index: h }]), (l = f))
                : f === l && a.push({ element: i, datasetIndex: c, index: h });
            }),
            a
          );
        }
        function kn(t, e, i, n, s, o) {
          return o || t.isPointInArea(e)
            ? "r" !== i || n
              ? wn(t, e, i, n, s, o)
              : (function (t, e, i, n) {
                  let s = [];
                  return (
                    vn(t, i, e, function (t, i, o) {
                      const { startAngle: a, endAngle: r } = t.getProps(
                          ["startAngle", "endAngle"],
                          n,
                        ),
                        { angle: l } = $(t, { x: e.x, y: e.y });
                      X(l, a, r) &&
                        s.push({ element: t, datasetIndex: i, index: o });
                    }),
                    s
                  );
                })(t, e, i, s)
            : [];
        }
        function Mn(t, e, i, n, s) {
          const o = [],
            a = "x" === i ? "inXRange" : "inYRange";
          let r = !1;
          return (
            vn(t, i, e, (t, n, l) => {
              t[a](e[i], s) &&
                (o.push({ element: t, datasetIndex: n, index: l }),
                (r = r || t.inRange(e.x, e.y, s)));
            }),
            n && !r ? [] : o
          );
        }
        var Sn = {
          evaluateInteractionItems: vn,
          modes: {
            index(t, e, i, n) {
              const s = Qe(e, t),
                o = i.axis || "x",
                a = i.includeInvisible || !1,
                r = i.intersect ? _n(t, s, o, n, a) : kn(t, s, o, !1, n, a),
                l = [];
              return r.length
                ? (t.getSortedVisibleDatasetMetas().forEach((t) => {
                    const e = r[0].index,
                      i = t.data[e];
                    i &&
                      !i.skip &&
                      l.push({ element: i, datasetIndex: t.index, index: e });
                  }),
                  l)
                : [];
            },
            dataset(t, e, i, n) {
              const s = Qe(e, t),
                o = i.axis || "xy",
                a = i.includeInvisible || !1;
              let r = i.intersect ? _n(t, s, o, n, a) : kn(t, s, o, !1, n, a);
              if (r.length > 0) {
                const e = r[0].datasetIndex,
                  i = t.getDatasetMeta(e).data;
                r = [];
                for (let t = 0; t < i.length; ++t)
                  r.push({ element: i[t], datasetIndex: e, index: t });
              }
              return r;
            },
            point: (t, e, i, n) =>
              _n(t, Qe(e, t), i.axis || "xy", n, i.includeInvisible || !1),
            nearest(t, e, i, n) {
              const s = Qe(e, t),
                o = i.axis || "xy",
                a = i.includeInvisible || !1;
              return kn(t, s, o, i.intersect, n, a);
            },
            x: (t, e, i, n) => Mn(t, Qe(e, t), "x", i.intersect, n),
            y: (t, e, i, n) => Mn(t, Qe(e, t), "y", i.intersect, n),
          },
        };
        const Dn = ["left", "top", "right", "bottom"];
        function Pn(t, e) {
          return t.filter((t) => t.pos === e);
        }
        function Cn(t, e) {
          return t.filter((t) => -1 === Dn.indexOf(t.pos) && t.box.axis === e);
        }
        function En(t, e) {
          return t.sort((t, i) => {
            const n = e ? i : t,
              s = e ? t : i;
            return n.weight === s.weight
              ? n.index - s.index
              : n.weight - s.weight;
          });
        }
        function Tn(t, e) {
          const i = (function (t) {
              const e = {};
              for (const i of t) {
                const { stack: t, pos: n, stackWeight: s } = i;
                if (!t || !Dn.includes(n)) continue;
                const o =
                  e[t] || (e[t] = { count: 0, placed: 0, weight: 0, size: 0 });
                (o.count++, (o.weight += s));
              }
              return e;
            })(t),
            { vBoxMaxWidth: n, hBoxMaxHeight: s } = e;
          let o, a, r;
          for (o = 0, a = t.length; o < a; ++o) {
            r = t[o];
            const { fullSize: a } = r.box,
              l = i[r.stack],
              c = l && r.stackWeight / l.weight;
            r.horizontal
              ? ((r.width = c ? c * n : a && e.availableWidth), (r.height = s))
              : ((r.width = n),
                (r.height = c ? c * s : a && e.availableHeight));
          }
          return i;
        }
        function An(t, e, i, n) {
          return Math.max(t[i], e[i]) + Math.max(t[n], e[n]);
        }
        function On(t, e) {
          ((t.top = Math.max(t.top, e.top)),
            (t.left = Math.max(t.left, e.left)),
            (t.bottom = Math.max(t.bottom, e.bottom)),
            (t.right = Math.max(t.right, e.right)));
        }
        function In(t, e, i, n) {
          const { pos: s, box: o } = i,
            a = t.maxPadding;
          if (!r(s)) {
            i.size && (t[s] -= i.size);
            const e = n[i.stack] || { size: 0, count: 1 };
            ((e.size = Math.max(e.size, i.horizontal ? o.height : o.width)),
              (i.size = e.size / e.count),
              (t[s] += i.size));
          }
          o.getPadding && On(a, o.getPadding());
          const l = Math.max(0, e.outerWidth - An(a, t, "left", "right")),
            c = Math.max(0, e.outerHeight - An(a, t, "top", "bottom")),
            h = l !== t.w,
            u = c !== t.h;
          return (
            (t.w = l),
            (t.h = c),
            i.horizontal ? { same: h, other: u } : { same: u, other: h }
          );
        }
        function Fn(t, e) {
          const i = e.maxPadding;
          function n(t) {
            const n = { left: 0, top: 0, right: 0, bottom: 0 };
            return (
              t.forEach((t) => {
                n[t] = Math.max(e[t], i[t]);
              }),
              n
            );
          }
          return n(t ? ["left", "right"] : ["top", "bottom"]);
        }
        function Ln(t, e, i, n) {
          const s = [];
          let o, a, r, l, c, h;
          for (o = 0, a = t.length, c = 0; o < a; ++o) {
            ((r = t[o]),
              (l = r.box),
              l.update(r.width || e.w, r.height || e.h, Fn(r.horizontal, e)));
            const { same: a, other: u } = In(e, i, r, n);
            ((c |= a && s.length), (h = h || u), l.fullSize || s.push(r));
          }
          return (c && Ln(s, e, i, n)) || h;
        }
        function Rn(t, e, i, n, s) {
          ((t.top = i),
            (t.left = e),
            (t.right = e + n),
            (t.bottom = i + s),
            (t.width = n),
            (t.height = s));
        }
        function zn(t, e, i, n) {
          const s = i.padding;
          let { x: o, y: a } = e;
          for (const r of t) {
            const t = r.box,
              l = n[r.stack] || { count: 1, placed: 0, weight: 1 },
              c = r.stackWeight / l.weight || 1;
            if (r.horizontal) {
              const n = e.w * c,
                o = l.size || t.height;
              (M(l.start) && (a = l.start),
                t.fullSize
                  ? Rn(t, s.left, a, i.outerWidth - s.right - s.left, o)
                  : Rn(t, e.left + l.placed, a, n, o),
                (l.start = a),
                (l.placed += n),
                (a = t.bottom));
            } else {
              const n = e.h * c,
                a = l.size || t.width;
              (M(l.start) && (o = l.start),
                t.fullSize
                  ? Rn(t, o, s.top, a, i.outerHeight - s.bottom - s.top)
                  : Rn(t, o, e.top + l.placed, a, n),
                (l.start = o),
                (l.placed += n),
                (o = t.right));
            }
          }
          ((e.x = o), (e.y = a));
        }
        te.set("layout", {
          autoPadding: !0,
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
        });
        var Bn = {
          addBox(t, e) {
            (t.boxes || (t.boxes = []),
              (e.fullSize = e.fullSize || !1),
              (e.position = e.position || "top"),
              (e.weight = e.weight || 0),
              (e._layers =
                e._layers ||
                function () {
                  return [
                    {
                      z: 0,
                      draw(t) {
                        e.draw(t);
                      },
                    },
                  ];
                }),
              t.boxes.push(e));
          },
          removeBox(t, e) {
            const i = t.boxes ? t.boxes.indexOf(e) : -1;
            -1 !== i && t.boxes.splice(i, 1);
          },
          configure(t, e, i) {
            ((e.fullSize = i.fullSize),
              (e.position = i.position),
              (e.weight = i.weight));
          },
          update(t, e, i, n) {
            if (!t) return;
            const s = we(t.options.layout.padding),
              o = Math.max(e - s.width, 0),
              a = Math.max(i - s.height, 0),
              r = (function (t) {
                const e = (function (t) {
                    const e = [];
                    let i, n, s, o, a, r;
                    for (i = 0, n = (t || []).length; i < n; ++i)
                      ((s = t[i]),
                        ({
                          position: o,
                          options: { stack: a, stackWeight: r = 1 },
                        } = s),
                        e.push({
                          index: i,
                          box: s,
                          pos: o,
                          horizontal: s.isHorizontal(),
                          weight: s.weight,
                          stack: a && o + a,
                          stackWeight: r,
                        }));
                    return e;
                  })(t),
                  i = En(
                    e.filter((t) => t.box.fullSize),
                    !0,
                  ),
                  n = En(Pn(e, "left"), !0),
                  s = En(Pn(e, "right")),
                  o = En(Pn(e, "top"), !0),
                  a = En(Pn(e, "bottom")),
                  r = Cn(e, "x"),
                  l = Cn(e, "y");
                return {
                  fullSize: i,
                  leftAndTop: n.concat(o),
                  rightAndBottom: s.concat(l).concat(a).concat(r),
                  chartArea: Pn(e, "chartArea"),
                  vertical: n.concat(s).concat(l),
                  horizontal: o.concat(a).concat(r),
                };
              })(t.boxes),
              l = r.vertical,
              c = r.horizontal;
            f(t.boxes, (t) => {
              "function" == typeof t.beforeLayout && t.beforeLayout();
            });
            const h =
                l.reduce(
                  (t, e) =>
                    e.box.options && !1 === e.box.options.display ? t : t + 1,
                  0,
                ) || 1,
              u = Object.freeze({
                outerWidth: e,
                outerHeight: i,
                padding: s,
                availableWidth: o,
                availableHeight: a,
                vBoxMaxWidth: o / 2 / h,
                hBoxMaxHeight: a / 2,
              }),
              d = Object.assign({}, s);
            On(d, we(n));
            const p = Object.assign(
                { maxPadding: d, w: o, h: a, x: s.left, y: s.top },
                s,
              ),
              g = Tn(l.concat(c), u);
            (Ln(r.fullSize, p, u, g),
              Ln(l, p, u, g),
              Ln(c, p, u, g) && Ln(l, p, u, g),
              (function (t) {
                const e = t.maxPadding;
                function i(i) {
                  const n = Math.max(e[i] - t[i], 0);
                  return ((t[i] += n), n);
                }
                ((t.y += i("top")),
                  (t.x += i("left")),
                  i("right"),
                  i("bottom"));
              })(p),
              zn(r.leftAndTop, p, u, g),
              (p.x += p.w),
              (p.y += p.h),
              zn(r.rightAndBottom, p, u, g),
              (t.chartArea = {
                left: p.left,
                top: p.top,
                right: p.left + p.w,
                bottom: p.top + p.h,
                height: p.h,
                width: p.w,
              }),
              f(r.chartArea, (e) => {
                const i = e.box;
                (Object.assign(i, t.chartArea),
                  i.update(p.w, p.h, { left: 0, top: 0, right: 0, bottom: 0 }));
              }));
          },
        };
        class jn {
          acquireContext(t, e) {}
          releaseContext(t) {
            return !1;
          }
          addEventListener(t, e, i) {}
          removeEventListener(t, e, i) {}
          getDevicePixelRatio() {
            return 1;
          }
          getMaximumSize(t, e, i, n) {
            return (
              (e = Math.max(0, e || t.width)),
              (i = i || t.height),
              { width: e, height: Math.max(0, n ? Math.floor(e / n) : i) }
            );
          }
          isAttached(t) {
            return !0;
          }
          updateConfig(t) {}
        }
        class Vn extends jn {
          acquireContext(t) {
            return (t && t.getContext && t.getContext("2d")) || null;
          }
          updateConfig(t) {
            t.options.animation = !1;
          }
        }
        const Wn = "$chartjs",
          Nn = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup",
            pointerenter: "mouseenter",
            pointerdown: "mousedown",
            pointermove: "mousemove",
            pointerup: "mouseup",
            pointerleave: "mouseout",
            pointerout: "mouseout",
          },
          Hn = (t) => null === t || "" === t;
        const $n = !!ni && { passive: !0 };
        function qn(t, e, i) {
          t.canvas.removeEventListener(e, i, $n);
        }
        function Yn(t, e) {
          for (const i of t) if (i === e || i.contains(e)) return !0;
        }
        function Un(t, e, i) {
          const n = t.canvas,
            s = new MutationObserver((t) => {
              let e = !1;
              for (const i of t)
                ((e = e || Yn(i.addedNodes, n)),
                  (e = e && !Yn(i.removedNodes, n)));
              e && i();
            });
          return (s.observe(document, { childList: !0, subtree: !0 }), s);
        }
        function Xn(t, e, i) {
          const n = t.canvas,
            s = new MutationObserver((t) => {
              let e = !1;
              for (const i of t)
                ((e = e || Yn(i.removedNodes, n)),
                  (e = e && !Yn(i.addedNodes, n)));
              e && i();
            });
          return (s.observe(document, { childList: !0, subtree: !0 }), s);
        }
        const Gn = new Map();
        let Zn = 0;
        function Kn() {
          const t = window.devicePixelRatio;
          t !== Zn &&
            ((Zn = t),
            Gn.forEach((e, i) => {
              i.currentDevicePixelRatio !== t && e();
            }));
        }
        function Jn(t, e, i) {
          const n = t.canvas,
            s = n && Xe(n);
          if (!s) return;
          const o = st((t, e) => {
              const n = s.clientWidth;
              (i(t, e), n < s.clientWidth && i());
            }, window),
            a = new ResizeObserver((t) => {
              const e = t[0],
                i = e.contentRect.width,
                n = e.contentRect.height;
              (0 === i && 0 === n) || o(i, n);
            });
          return (
            a.observe(s),
            (function (t, e) {
              (Gn.size || window.addEventListener("resize", Kn), Gn.set(t, e));
            })(t, o),
            a
          );
        }
        function Qn(t, e, i) {
          (i && i.disconnect(),
            "resize" === e &&
              (function (t) {
                (Gn.delete(t),
                  Gn.size || window.removeEventListener("resize", Kn));
              })(t));
        }
        function ts(t, e, i) {
          const n = t.canvas,
            s = st(
              (e) => {
                null !== t.ctx &&
                  i(
                    (function (t, e) {
                      const i = Nn[t.type] || t.type,
                        { x: n, y: s } = Qe(t, e);
                      return {
                        type: i,
                        chart: e,
                        native: t,
                        x: void 0 !== n ? n : null,
                        y: void 0 !== s ? s : null,
                      };
                    })(e, t),
                  );
              },
              t,
              (t) => {
                const e = t[0];
                return [e, e.offsetX, e.offsetY];
              },
            );
          return (
            (function (t, e, i) {
              t.addEventListener(e, i, $n);
            })(n, e, s),
            s
          );
        }
        class es extends jn {
          acquireContext(t, e) {
            const i = t && t.getContext && t.getContext("2d");
            return i && i.canvas === t
              ? ((function (t, e) {
                  const i = t.style,
                    n = t.getAttribute("height"),
                    s = t.getAttribute("width");
                  if (
                    ((t[Wn] = {
                      initial: {
                        height: n,
                        width: s,
                        style: {
                          display: i.display,
                          height: i.height,
                          width: i.width,
                        },
                      },
                    }),
                    (i.display = i.display || "block"),
                    (i.boxSizing = i.boxSizing || "border-box"),
                    Hn(s))
                  ) {
                    const e = si(t, "width");
                    void 0 !== e && (t.width = e);
                  }
                  if (Hn(n))
                    if ("" === t.style.height) t.height = t.width / (e || 2);
                    else {
                      const e = si(t, "height");
                      void 0 !== e && (t.height = e);
                    }
                })(t, e),
                i)
              : null;
          }
          releaseContext(t) {
            const e = t.canvas;
            if (!e[Wn]) return !1;
            const i = e[Wn].initial;
            ["height", "width"].forEach((t) => {
              const n = i[t];
              o(n) ? e.removeAttribute(t) : e.setAttribute(t, n);
            });
            const n = i.style || {};
            return (
              Object.keys(n).forEach((t) => {
                e.style[t] = n[t];
              }),
              (e.width = e.width),
              delete e[Wn],
              !0
            );
          }
          addEventListener(t, e, i) {
            this.removeEventListener(t, e);
            const n = t.$proxies || (t.$proxies = {}),
              s = { attach: Un, detach: Xn, resize: Jn }[e] || ts;
            n[e] = s(t, e, i);
          }
          removeEventListener(t, e) {
            const i = t.$proxies || (t.$proxies = {}),
              n = i[e];
            if (!n) return;
            ((({ attach: Qn, detach: Qn, resize: Qn })[e] || qn)(t, e, n),
              (i[e] = void 0));
          }
          getDevicePixelRatio() {
            return window.devicePixelRatio;
          }
          getMaximumSize(t, e, i, n) {
            return ei(t, e, i, n);
          }
          isAttached(t) {
            const e = Xe(t);
            return !(!e || !e.isConnected);
          }
        }
        class is {
          constructor() {
            this._init = [];
          }
          notify(t, e, i, n) {
            "beforeInit" === e &&
              ((this._init = this._createDescriptors(t, !0)),
              this._notify(this._init, t, "install"));
            const s = n ? this._descriptors(t).filter(n) : this._descriptors(t),
              o = this._notify(s, t, e, i);
            return (
              "afterDestroy" === e &&
                (this._notify(s, t, "stop"),
                this._notify(this._init, t, "uninstall")),
              o
            );
          }
          _notify(t, e, i, n) {
            n = n || {};
            for (const s of t) {
              const t = s.plugin;
              if (!1 === d(t[i], [e, n, s.options], t) && n.cancelable)
                return !1;
            }
            return !0;
          }
          invalidate() {
            o(this._cache) ||
              ((this._oldCache = this._cache), (this._cache = void 0));
          }
          _descriptors(t) {
            if (this._cache) return this._cache;
            const e = (this._cache = this._createDescriptors(t));
            return (this._notifyStateChanges(t), e);
          }
          _createDescriptors(t, e) {
            const i = t && t.config,
              n = h(i.options && i.options.plugins, {}),
              s = (function (t) {
                const e = {},
                  i = [],
                  n = Object.keys(fn.plugins.items);
                for (let t = 0; t < n.length; t++) i.push(fn.getPlugin(n[t]));
                const s = t.plugins || [];
                for (let t = 0; t < s.length; t++) {
                  const n = s[t];
                  -1 === i.indexOf(n) && (i.push(n), (e[n.id] = !0));
                }
                return { plugins: i, localIds: e };
              })(i);
            return !1 !== n || e
              ? (function (t, { plugins: e, localIds: i }, n, s) {
                  const o = [],
                    a = t.getContext();
                  for (const r of e) {
                    const e = r.id,
                      l = ns(n[e], s);
                    null !== l &&
                      o.push({
                        plugin: r,
                        options: ss(t.config, { plugin: r, local: i[e] }, l, a),
                      });
                  }
                  return o;
                })(t, s, n, e)
              : [];
          }
          _notifyStateChanges(t) {
            const e = this._oldCache || [],
              i = this._cache,
              n = (t, e) =>
                t.filter((t) => !e.some((e) => t.plugin.id === e.plugin.id));
            (this._notify(n(e, i), t, "stop"),
              this._notify(n(i, e), t, "start"));
          }
        }
        function ns(t, e) {
          return e || !1 !== t ? (!0 === t ? {} : t) : null;
        }
        function ss(t, { plugin: e, local: i }, n, s) {
          const o = t.pluginScopeKeys(e),
            a = t.getOptionScopes(n, o);
          return (
            i && e.defaults && a.push(e.defaults),
            t.createResolver(a, s, [""], {
              scriptable: !1,
              indexable: !1,
              allKeys: !0,
            })
          );
        }
        function os(t, e) {
          const i = te.datasets[t] || {};
          return (
            ((e.datasets || {})[t] || {}).indexAxis ||
            e.indexAxis ||
            i.indexAxis ||
            "x"
          );
        }
        function as(t, e) {
          return "x" === t || "y" === t
            ? t
            : e.axis ||
                ("top" === (i = e.position) || "bottom" === i
                  ? "x"
                  : "left" === i || "right" === i
                    ? "y"
                    : void 0) ||
                t.charAt(0).toLowerCase();
          var i;
        }
        function rs(t) {
          const e = t.options || (t.options = {});
          ((e.plugins = h(e.plugins, {})),
            (e.scales = (function (t, e) {
              const i = Zt[t.type] || { scales: {} },
                n = e.scales || {},
                s = os(t.type, e),
                o = Object.create(null),
                a = Object.create(null);
              return (
                Object.keys(n).forEach((t) => {
                  const e = n[t];
                  if (!r(e)) return;
                  if (e._proxy) return;
                  const l = as(t, e),
                    c = (function (t, e) {
                      return t === e ? "_index_" : "_value_";
                    })(l, s),
                    h = i.scales || {};
                  ((o[l] = o[l] || t),
                    (a[t] = y(Object.create(null), [
                      { axis: l },
                      e,
                      h[l],
                      h[c],
                    ])));
                }),
                t.data.datasets.forEach((i) => {
                  const s = i.type || t.type,
                    r = i.indexAxis || os(s, e),
                    l = (Zt[s] || {}).scales || {};
                  Object.keys(l).forEach((t) => {
                    const e = (function (t, e) {
                        let i = t;
                        return (
                          "_index_" === t
                            ? (i = e)
                            : "_value_" === t && (i = "x" === e ? "y" : "x"),
                          i
                        );
                      })(t, r),
                      s = i[e + "AxisID"] || o[e] || e;
                    ((a[s] = a[s] || Object.create(null)),
                      y(a[s], [{ axis: e }, n[s], l[t]]));
                  });
                }),
                Object.keys(a).forEach((t) => {
                  const e = a[t];
                  y(e, [te.scales[e.type], te.scale]);
                }),
                a
              );
            })(t, e)));
        }
        function ls(t) {
          return (
            ((t = t || {}).datasets = t.datasets || []),
            (t.labels = t.labels || []),
            t
          );
        }
        const cs = new Map(),
          hs = new Set();
        function us(t, e) {
          let i = cs.get(t);
          return (i || ((i = e()), cs.set(t, i), hs.add(i)), i);
        }
        const ds = (t, e, i) => {
          const n = w(e, i);
          void 0 !== n && t.add(n);
        };
        class fs {
          constructor(t) {
            ((this._config = (function (t) {
              return (((t = t || {}).data = ls(t.data)), rs(t), t);
            })(t)),
              (this._scopeCache = new Map()),
              (this._resolverCache = new Map()));
          }
          get platform() {
            return this._config.platform;
          }
          get type() {
            return this._config.type;
          }
          set type(t) {
            this._config.type = t;
          }
          get data() {
            return this._config.data;
          }
          set data(t) {
            this._config.data = ls(t);
          }
          get options() {
            return this._config.options;
          }
          set options(t) {
            this._config.options = t;
          }
          get plugins() {
            return this._config.plugins;
          }
          update() {
            const t = this._config;
            (this.clearCache(), rs(t));
          }
          clearCache() {
            (this._scopeCache.clear(), this._resolverCache.clear());
          }
          datasetScopeKeys(t) {
            return us(t, () => [[`datasets.${t}`, ""]]);
          }
          datasetAnimationScopeKeys(t, e) {
            return us(`${t}.transition.${e}`, () => [
              [`datasets.${t}.transitions.${e}`, `transitions.${e}`],
              [`datasets.${t}`, ""],
            ]);
          }
          datasetElementScopeKeys(t, e) {
            return us(`${t}-${e}`, () => [
              [
                `datasets.${t}.elements.${e}`,
                `datasets.${t}`,
                `elements.${e}`,
                "",
              ],
            ]);
          }
          pluginScopeKeys(t) {
            const e = t.id;
            return us(`${this.type}-plugin-${e}`, () => [
              [`plugins.${e}`, ...(t.additionalOptionScopes || [])],
            ]);
          }
          _cachedScopes(t, e) {
            const i = this._scopeCache;
            let n = i.get(t);
            return ((n && !e) || ((n = new Map()), i.set(t, n)), n);
          }
          getOptionScopes(t, e, i) {
            const { options: n, type: s } = this,
              o = this._cachedScopes(t, i),
              a = o.get(e);
            if (a) return a;
            const r = new Set();
            e.forEach((e) => {
              (t && (r.add(t), e.forEach((e) => ds(r, t, e))),
                e.forEach((t) => ds(r, n, t)),
                e.forEach((t) => ds(r, Zt[s] || {}, t)),
                e.forEach((t) => ds(r, te, t)),
                e.forEach((t) => ds(r, Kt, t)));
            });
            const l = Array.from(r);
            return (
              0 === l.length && l.push(Object.create(null)),
              hs.has(e) && o.set(e, l),
              l
            );
          }
          chartOptionScopes() {
            const { options: t, type: e } = this;
            return [t, Zt[e] || {}, te.datasets[e] || {}, { type: e }, te, Kt];
          }
          resolveNamedOptions(t, e, i, n = [""]) {
            const s = { $shared: !0 },
              { resolver: o, subPrefixes: r } = ps(this._resolverCache, t, n);
            let l = o;
            if (
              (function (t, e) {
                const { isScriptable: i, isIndexable: n } = Ce(t);
                for (const s of e) {
                  const e = i(s),
                    o = n(s),
                    r = (o || e) && t[s];
                  if ((e && (S(r) || gs(r))) || (o && a(r))) return !0;
                }
                return !1;
              })(o, e)
            ) {
              s.$shared = !1;
              l = Pe(o, (i = S(i) ? i() : i), this.createResolver(t, i, r));
            }
            for (const t of e) s[t] = l[t];
            return s;
          }
          createResolver(t, e, i = [""], n) {
            const { resolver: s } = ps(this._resolverCache, t, i);
            return r(e) ? Pe(s, e, void 0, n) : s;
          }
        }
        function ps(t, e, i) {
          let n = t.get(e);
          n || ((n = new Map()), t.set(e, n));
          const s = i.join();
          let o = n.get(s);
          if (!o) {
            ((o = {
              resolver: De(e, i),
              subPrefixes: i.filter((t) => !t.toLowerCase().includes("hover")),
            }),
              n.set(s, o));
          }
          return o;
        }
        const gs = (t) =>
          r(t) &&
          Object.getOwnPropertyNames(t).reduce((e, i) => e || S(t[i]), !1);
        const ms = ["top", "bottom", "left", "right", "chartArea"];
        function bs(t, e) {
          return (
            "top" === t || "bottom" === t || (-1 === ms.indexOf(t) && "x" === e)
          );
        }
        function xs(t, e) {
          return function (i, n) {
            return i[t] === n[t] ? i[e] - n[e] : i[t] - n[t];
          };
        }
        function ys(t) {
          const e = t.chart,
            i = e.options.animation;
          (e.notifyPlugins("afterRender"), d(i && i.onComplete, [t], e));
        }
        function vs(t) {
          const e = t.chart,
            i = e.options.animation;
          d(i && i.onProgress, [t], e);
        }
        function _s(t) {
          return (
            Ue() && "string" == typeof t
              ? (t = document.getElementById(t))
              : t && t.length && (t = t[0]),
            t && t.canvas && (t = t.canvas),
            t
          );
        }
        const ws = {},
          ks = (t) => {
            const e = _s(t);
            return Object.values(ws)
              .filter((t) => t.canvas === e)
              .pop();
          };
        function Ms(t, e, i) {
          const n = Object.keys(t);
          for (const s of n) {
            const n = +s;
            if (n >= e) {
              const o = t[s];
              (delete t[s], (i > 0 || n > e) && (t[n + i] = o));
            }
          }
        }
        class Ss {
          constructor(t, e) {
            const i = (this.config = new fs(e)),
              n = _s(t),
              o = ks(n);
            if (o)
              throw new Error(
                "Canvas is already in use. Chart with ID '" +
                  o.id +
                  "' must be destroyed before the canvas with ID '" +
                  o.canvas.id +
                  "' can be reused.",
              );
            const a = i.createResolver(
              i.chartOptionScopes(),
              this.getContext(),
            );
            ((this.platform = new (i.platform ||
              (function (t) {
                return !Ue() ||
                  ("undefined" != typeof OffscreenCanvas &&
                    t instanceof OffscreenCanvas)
                  ? Vn
                  : es;
              })(n))()),
              this.platform.updateConfig(i));
            const r = this.platform.acquireContext(n, a.aspectRatio),
              l = r && r.canvas,
              c = l && l.height,
              h = l && l.width;
            ((this.id = s()),
              (this.ctx = r),
              (this.canvas = l),
              (this.width = h),
              (this.height = c),
              (this._options = a),
              (this._aspectRatio = this.aspectRatio),
              (this._layers = []),
              (this._metasets = []),
              (this._stacks = void 0),
              (this.boxes = []),
              (this.currentDevicePixelRatio = void 0),
              (this.chartArea = void 0),
              (this._active = []),
              (this._lastEvent = void 0),
              (this._listeners = {}),
              (this._responsiveListeners = void 0),
              (this._sortedMetasets = []),
              (this.scales = {}),
              (this._plugins = new is()),
              (this.$proxies = {}),
              (this._hiddenIndices = {}),
              (this.attached = !1),
              (this._animationsDisabled = void 0),
              (this.$context = void 0),
              (this._doResize = (function (t, e) {
                let i;
                return function (...n) {
                  return (
                    e
                      ? (clearTimeout(i), (i = setTimeout(t, e, n)))
                      : t.apply(this, n),
                    e
                  );
                };
              })((t) => this.update(t), a.resizeDelay || 0)),
              (this._dataChanges = []),
              (ws[this.id] = this),
              r &&
                l &&
                (vi.listen(this, "complete", ys),
                vi.listen(this, "progress", vs),
                this._initialize(),
                this.attached && this.update()));
          }
          get aspectRatio() {
            const {
              options: { aspectRatio: t, maintainAspectRatio: e },
              width: i,
              height: n,
              _aspectRatio: s,
            } = this;
            return o(t) ? (e && s ? s : n ? i / n : null) : t;
          }
          get data() {
            return this.config.data;
          }
          set data(t) {
            this.config.data = t;
          }
          get options() {
            return this._options;
          }
          set options(t) {
            this.config.options = t;
          }
          _initialize() {
            return (
              this.notifyPlugins("beforeInit"),
              this.options.responsive
                ? this.resize()
                : ii(this, this.options.devicePixelRatio),
              this.bindEvents(),
              this.notifyPlugins("afterInit"),
              this
            );
          }
          clear() {
            return (se(this.canvas, this.ctx), this);
          }
          stop() {
            return (vi.stop(this), this);
          }
          resize(t, e) {
            vi.running(this)
              ? (this._resizeBeforeDraw = { width: t, height: e })
              : this._resize(t, e);
          }
          _resize(t, e) {
            const i = this.options,
              n = this.canvas,
              s = i.maintainAspectRatio && this.aspectRatio,
              o = this.platform.getMaximumSize(n, t, e, s),
              a = i.devicePixelRatio || this.platform.getDevicePixelRatio(),
              r = this.width ? "resize" : "attach";
            ((this.width = o.width),
              (this.height = o.height),
              (this._aspectRatio = this.aspectRatio),
              ii(this, a, !0) &&
                (this.notifyPlugins("resize", { size: o }),
                d(i.onResize, [this, o], this),
                this.attached && this._doResize(r) && this.render()));
          }
          ensureScalesHaveIDs() {
            f(this.options.scales || {}, (t, e) => {
              t.id = e;
            });
          }
          buildOrUpdateScales() {
            const t = this.options,
              e = t.scales,
              i = this.scales,
              n = Object.keys(i).reduce((t, e) => ((t[e] = !1), t), {});
            let s = [];
            (e &&
              (s = s.concat(
                Object.keys(e).map((t) => {
                  const i = e[t],
                    n = as(t, i),
                    s = "r" === n,
                    o = "x" === n;
                  return {
                    options: i,
                    dposition: s ? "chartArea" : o ? "bottom" : "left",
                    dtype: s ? "radialLinear" : o ? "category" : "linear",
                  };
                }),
              )),
              f(s, (e) => {
                const s = e.options,
                  o = s.id,
                  a = as(o, s),
                  r = h(s.type, e.dtype);
                ((void 0 !== s.position &&
                  bs(s.position, a) === bs(e.dposition)) ||
                  (s.position = e.dposition),
                  (n[o] = !0));
                let l = null;
                if (o in i && i[o].type === r) l = i[o];
                else {
                  ((l = new (fn.getScale(r))({
                    id: o,
                    type: r,
                    ctx: this.ctx,
                    chart: this,
                  })),
                    (i[l.id] = l));
                }
                l.init(s, t);
              }),
              f(n, (t, e) => {
                t || delete i[e];
              }),
              f(i, (t) => {
                (Bn.configure(this, t, t.options), Bn.addBox(this, t));
              }));
          }
          _updateMetasets() {
            const t = this._metasets,
              e = this.data.datasets.length,
              i = t.length;
            if ((t.sort((t, e) => t.index - e.index), i > e)) {
              for (let t = e; t < i; ++t) this._destroyDatasetMeta(t);
              t.splice(e, i - e);
            }
            this._sortedMetasets = t.slice(0).sort(xs("order", "index"));
          }
          _removeUnreferencedMetasets() {
            const {
              _metasets: t,
              data: { datasets: e },
            } = this;
            (t.length > e.length && delete this._stacks,
              t.forEach((t, i) => {
                0 === e.filter((e) => e === t._dataset).length &&
                  this._destroyDatasetMeta(i);
              }));
          }
          buildOrUpdateControllers() {
            const t = [],
              e = this.data.datasets;
            let i, n;
            for (
              this._removeUnreferencedMetasets(), i = 0, n = e.length;
              i < n;
              i++
            ) {
              const n = e[i];
              let s = this.getDatasetMeta(i);
              const o = n.type || this.config.type;
              if (
                (s.type &&
                  s.type !== o &&
                  (this._destroyDatasetMeta(i), (s = this.getDatasetMeta(i))),
                (s.type = o),
                (s.indexAxis = n.indexAxis || os(o, this.options)),
                (s.order = n.order || 0),
                (s.index = i),
                (s.label = "" + n.label),
                (s.visible = this.isDatasetVisible(i)),
                s.controller)
              )
                (s.controller.updateIndex(i), s.controller.linkScales());
              else {
                const e = fn.getController(o),
                  { datasetElementType: n, dataElementType: a } =
                    te.datasets[o];
                (Object.assign(e.prototype, {
                  dataElementType: fn.getElement(a),
                  datasetElementType: n && fn.getElement(n),
                }),
                  (s.controller = new e(this, i)),
                  t.push(s.controller));
              }
            }
            return (this._updateMetasets(), t);
          }
          _resetElements() {
            f(
              this.data.datasets,
              (t, e) => {
                this.getDatasetMeta(e).controller.reset();
              },
              this,
            );
          }
          reset() {
            (this._resetElements(), this.notifyPlugins("reset"));
          }
          update(t) {
            const e = this.config;
            e.update();
            const i = (this._options = e.createResolver(
                e.chartOptionScopes(),
                this.getContext(),
              )),
              n = (this._animationsDisabled = !i.animation);
            if (
              (this._updateScales(),
              this._checkEventBindings(),
              this._updateHiddenIndices(),
              this._plugins.invalidate(),
              !1 ===
                this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }))
            )
              return;
            const s = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let o = 0;
            for (let t = 0, e = this.data.datasets.length; t < e; t++) {
              const { controller: e } = this.getDatasetMeta(t),
                i = !n && -1 === s.indexOf(e);
              (e.buildOrUpdateElements(i),
                (o = Math.max(+e.getMaxOverflow(), o)));
            }
            ((o = this._minPadding = i.layout.autoPadding ? o : 0),
              this._updateLayout(o),
              n ||
                f(s, (t) => {
                  t.reset();
                }),
              this._updateDatasets(t),
              this.notifyPlugins("afterUpdate", { mode: t }),
              this._layers.sort(xs("z", "_idx")));
            const { _active: a, _lastEvent: r } = this;
            (r
              ? this._eventHandler(r, !0)
              : a.length && this._updateHoverStyles(a, a, !0),
              this.render());
          }
          _updateScales() {
            (f(this.scales, (t) => {
              Bn.removeBox(this, t);
            }),
              this.ensureScalesHaveIDs(),
              this.buildOrUpdateScales());
          }
          _checkEventBindings() {
            const t = this.options,
              e = new Set(Object.keys(this._listeners)),
              i = new Set(t.events);
            (D(e, i) && !!this._responsiveListeners === t.responsive) ||
              (this.unbindEvents(), this.bindEvents());
          }
          _updateHiddenIndices() {
            const { _hiddenIndices: t } = this,
              e = this._getUniformDataChanges() || [];
            for (const { method: i, start: n, count: s } of e) {
              Ms(t, n, "_removeElements" === i ? -s : s);
            }
          }
          _getUniformDataChanges() {
            const t = this._dataChanges;
            if (!t || !t.length) return;
            this._dataChanges = [];
            const e = this.data.datasets.length,
              i = (e) =>
                new Set(
                  t
                    .filter((t) => t[0] === e)
                    .map((t, e) => e + "," + t.splice(1).join(",")),
                ),
              n = i(0);
            for (let t = 1; t < e; t++) if (!D(n, i(t))) return;
            return Array.from(n)
              .map((t) => t.split(","))
              .map((t) => ({ method: t[1], start: +t[2], count: +t[3] }));
          }
          _updateLayout(t) {
            if (!1 === this.notifyPlugins("beforeLayout", { cancelable: !0 }))
              return;
            Bn.update(this, this.width, this.height, t);
            const e = this.chartArea,
              i = e.width <= 0 || e.height <= 0;
            ((this._layers = []),
              f(
                this.boxes,
                (t) => {
                  (i && "chartArea" === t.position) ||
                    (t.configure && t.configure(),
                    this._layers.push(...t._layers()));
                },
                this,
              ),
              this._layers.forEach((t, e) => {
                t._idx = e;
              }),
              this.notifyPlugins("afterLayout"));
          }
          _updateDatasets(t) {
            if (
              !1 !==
              this.notifyPlugins("beforeDatasetsUpdate", {
                mode: t,
                cancelable: !0,
              })
            ) {
              for (let t = 0, e = this.data.datasets.length; t < e; ++t)
                this.getDatasetMeta(t).controller.configure();
              for (let e = 0, i = this.data.datasets.length; e < i; ++e)
                this._updateDataset(e, S(t) ? t({ datasetIndex: e }) : t);
              this.notifyPlugins("afterDatasetsUpdate", { mode: t });
            }
          }
          _updateDataset(t, e) {
            const i = this.getDatasetMeta(t),
              n = { meta: i, index: t, mode: e, cancelable: !0 };
            !1 !== this.notifyPlugins("beforeDatasetUpdate", n) &&
              (i.controller._update(e),
              (n.cancelable = !1),
              this.notifyPlugins("afterDatasetUpdate", n));
          }
          render() {
            !1 !== this.notifyPlugins("beforeRender", { cancelable: !0 }) &&
              (vi.has(this)
                ? this.attached && !vi.running(this) && vi.start(this)
                : (this.draw(), ys({ chart: this })));
          }
          draw() {
            let t;
            if (this._resizeBeforeDraw) {
              const { width: t, height: e } = this._resizeBeforeDraw;
              (this._resize(t, e), (this._resizeBeforeDraw = null));
            }
            if ((this.clear(), this.width <= 0 || this.height <= 0)) return;
            if (!1 === this.notifyPlugins("beforeDraw", { cancelable: !0 }))
              return;
            const e = this._layers;
            for (t = 0; t < e.length && e[t].z <= 0; ++t)
              e[t].draw(this.chartArea);
            for (this._drawDatasets(); t < e.length; ++t)
              e[t].draw(this.chartArea);
            this.notifyPlugins("afterDraw");
          }
          _getSortedDatasetMetas(t) {
            const e = this._sortedMetasets,
              i = [];
            let n, s;
            for (n = 0, s = e.length; n < s; ++n) {
              const s = e[n];
              (t && !s.visible) || i.push(s);
            }
            return i;
          }
          getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(!0);
          }
          _drawDatasets() {
            if (
              !1 ===
              this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 })
            )
              return;
            const t = this.getSortedVisibleDatasetMetas();
            for (let e = t.length - 1; e >= 0; --e) this._drawDataset(t[e]);
            this.notifyPlugins("afterDatasetsDraw");
          }
          _drawDataset(t) {
            const e = this.ctx,
              i = t._clip,
              n = !i.disabled,
              s = this.chartArea,
              o = { meta: t, index: t.index, cancelable: !0 };
            !1 !== this.notifyPlugins("beforeDatasetDraw", o) &&
              (n &&
                le(e, {
                  left: !1 === i.left ? 0 : s.left - i.left,
                  right: !1 === i.right ? this.width : s.right + i.right,
                  top: !1 === i.top ? 0 : s.top - i.top,
                  bottom: !1 === i.bottom ? this.height : s.bottom + i.bottom,
                }),
              t.controller.draw(),
              n && ce(e),
              (o.cancelable = !1),
              this.notifyPlugins("afterDatasetDraw", o));
          }
          isPointInArea(t) {
            return re(t, this.chartArea, this._minPadding);
          }
          getElementsAtEventForMode(t, e, i, n) {
            const s = Sn.modes[e];
            return "function" == typeof s ? s(this, t, i, n) : [];
          }
          getDatasetMeta(t) {
            const e = this.data.datasets[t],
              i = this._metasets;
            let n = i.filter((t) => t && t._dataset === e).pop();
            return (
              n ||
                ((n = {
                  type: null,
                  data: [],
                  dataset: null,
                  controller: null,
                  hidden: null,
                  xAxisID: null,
                  yAxisID: null,
                  order: (e && e.order) || 0,
                  index: t,
                  _dataset: e,
                  _parsed: [],
                  _sorted: !1,
                }),
                i.push(n)),
              n
            );
          }
          getContext() {
            return (
              this.$context ||
              (this.$context = Se(null, { chart: this, type: "chart" }))
            );
          }
          getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
          }
          isDatasetVisible(t) {
            const e = this.data.datasets[t];
            if (!e) return !1;
            const i = this.getDatasetMeta(t);
            return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden;
          }
          setDatasetVisibility(t, e) {
            this.getDatasetMeta(t).hidden = !e;
          }
          toggleDataVisibility(t) {
            this._hiddenIndices[t] = !this._hiddenIndices[t];
          }
          getDataVisibility(t) {
            return !this._hiddenIndices[t];
          }
          _updateVisibility(t, e, i) {
            const n = i ? "show" : "hide",
              s = this.getDatasetMeta(t),
              o = s.controller._resolveAnimations(void 0, n);
            M(e)
              ? ((s.data[e].hidden = !i), this.update())
              : (this.setDatasetVisibility(t, i),
                o.update(s, { visible: i }),
                this.update((e) => (e.datasetIndex === t ? n : void 0)));
          }
          hide(t, e) {
            this._updateVisibility(t, e, !1);
          }
          show(t, e) {
            this._updateVisibility(t, e, !0);
          }
          _destroyDatasetMeta(t) {
            const e = this._metasets[t];
            (e && e.controller && e.controller._destroy(),
              delete this._metasets[t]);
          }
          _stop() {
            let t, e;
            for (
              this.stop(),
                vi.remove(this),
                t = 0,
                e = this.data.datasets.length;
              t < e;
              ++t
            )
              this._destroyDatasetMeta(t);
          }
          destroy() {
            this.notifyPlugins("beforeDestroy");
            const { canvas: t, ctx: e } = this;
            (this._stop(),
              this.config.clearCache(),
              t &&
                (this.unbindEvents(),
                se(t, e),
                this.platform.releaseContext(e),
                (this.canvas = null),
                (this.ctx = null)),
              this.notifyPlugins("destroy"),
              delete ws[this.id],
              this.notifyPlugins("afterDestroy"));
          }
          toBase64Image(...t) {
            return this.canvas.toDataURL(...t);
          }
          bindEvents() {
            (this.bindUserEvents(),
              this.options.responsive
                ? this.bindResponsiveEvents()
                : (this.attached = !0));
          }
          bindUserEvents() {
            const t = this._listeners,
              e = this.platform,
              i = (i, n) => {
                (e.addEventListener(this, i, n), (t[i] = n));
              },
              n = (t, e, i) => {
                ((t.offsetX = e), (t.offsetY = i), this._eventHandler(t));
              };
            f(this.options.events, (t) => i(t, n));
          }
          bindResponsiveEvents() {
            this._responsiveListeners || (this._responsiveListeners = {});
            const t = this._responsiveListeners,
              e = this.platform,
              i = (i, n) => {
                (e.addEventListener(this, i, n), (t[i] = n));
              },
              n = (i, n) => {
                t[i] && (e.removeEventListener(this, i, n), delete t[i]);
              },
              s = (t, e) => {
                this.canvas && this.resize(t, e);
              };
            let o;
            const a = () => {
              (n("attach", a),
                (this.attached = !0),
                this.resize(),
                i("resize", s),
                i("detach", o));
            };
            ((o = () => {
              ((this.attached = !1),
                n("resize", s),
                this._stop(),
                this._resize(0, 0),
                i("attach", a));
            }),
              e.isAttached(this.canvas) ? a() : o());
          }
          unbindEvents() {
            (f(this._listeners, (t, e) => {
              this.platform.removeEventListener(this, e, t);
            }),
              (this._listeners = {}),
              f(this._responsiveListeners, (t, e) => {
                this.platform.removeEventListener(this, e, t);
              }),
              (this._responsiveListeners = void 0));
          }
          updateHoverStyle(t, e, i) {
            const n = i ? "set" : "remove";
            let s, o, a, r;
            for (
              "dataset" === e &&
                ((s = this.getDatasetMeta(t[0].datasetIndex)),
                s.controller["_" + n + "DatasetHoverStyle"]()),
                a = 0,
                r = t.length;
              a < r;
              ++a
            ) {
              o = t[a];
              const e = o && this.getDatasetMeta(o.datasetIndex).controller;
              e && e[n + "HoverStyle"](o.element, o.datasetIndex, o.index);
            }
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(t) {
            const e = this._active || [],
              i = t.map(({ datasetIndex: t, index: e }) => {
                const i = this.getDatasetMeta(t);
                if (!i) throw new Error("No dataset found at index " + t);
                return { datasetIndex: t, element: i.data[e], index: e };
              });
            !p(i, e) &&
              ((this._active = i),
              (this._lastEvent = null),
              this._updateHoverStyles(i, e));
          }
          notifyPlugins(t, e, i) {
            return this._plugins.notify(this, t, e, i);
          }
          _updateHoverStyles(t, e, i) {
            const n = this.options.hover,
              s = (t, e) =>
                t.filter(
                  (t) =>
                    !e.some(
                      (e) =>
                        t.datasetIndex === e.datasetIndex &&
                        t.index === e.index,
                    ),
                ),
              o = s(e, t),
              a = i ? t : s(t, e);
            (o.length && this.updateHoverStyle(o, n.mode, !1),
              a.length && n.mode && this.updateHoverStyle(a, n.mode, !0));
          }
          _eventHandler(t, e) {
            const i = {
                event: t,
                replay: e,
                cancelable: !0,
                inChartArea: this.isPointInArea(t),
              },
              n = (e) =>
                (e.options.events || this.options.events).includes(
                  t.native.type,
                );
            if (!1 === this.notifyPlugins("beforeEvent", i, n)) return;
            const s = this._handleEvent(t, e, i.inChartArea);
            return (
              (i.cancelable = !1),
              this.notifyPlugins("afterEvent", i, n),
              (s || i.changed) && this.render(),
              this
            );
          }
          _handleEvent(t, e, i) {
            const { _active: n = [], options: s } = this,
              o = e,
              a = this._getActiveElements(t, n, i, o),
              r = (function (t) {
                return (
                  "mouseup" === t.type ||
                  "click" === t.type ||
                  "contextmenu" === t.type
                );
              })(t),
              l = (function (t, e, i, n) {
                return i && "mouseout" !== t.type ? (n ? e : t) : null;
              })(t, this._lastEvent, i, r);
            i &&
              ((this._lastEvent = null),
              d(s.onHover, [t, a, this], this),
              r && d(s.onClick, [t, a, this], this));
            const c = !p(a, n);
            return (
              (c || e) &&
                ((this._active = a), this._updateHoverStyles(a, n, e)),
              (this._lastEvent = l),
              c
            );
          }
          _getActiveElements(t, e, i, n) {
            if ("mouseout" === t.type) return [];
            if (!i) return e;
            const s = this.options.hover;
            return this.getElementsAtEventForMode(t, s.mode, s, n);
          }
        }
        const Ds = () => f(Ss.instances, (t) => t._plugins.invalidate()),
          Ps = !0;
        function Cs(t, e, i) {
          const {
            startAngle: n,
            pixelMargin: s,
            x: o,
            y: a,
            outerRadius: r,
            innerRadius: l,
          } = e;
          let c = s / r;
          (t.beginPath(),
            t.arc(o, a, r, n - c, i + c),
            l > s
              ? ((c = s / l), t.arc(o, a, l, i + c, n - c, !0))
              : t.arc(o, a, s, i + O, n - O),
            t.closePath(),
            t.clip());
        }
        function Es(t, e, i, n) {
          const s = ye(t.options.borderRadius, [
            "outerStart",
            "outerEnd",
            "innerStart",
            "innerEnd",
          ]);
          const o = (i - e) / 2,
            a = Math.min(o, (n * e) / 2),
            r = (t) => {
              const e = ((i - Math.min(o, t)) * n) / 2;
              return G(t, 0, Math.min(o, e));
            };
          return {
            outerStart: r(s.outerStart),
            outerEnd: r(s.outerEnd),
            innerStart: G(s.innerStart, 0, a),
            innerEnd: G(s.innerEnd, 0, a),
          };
        }
        function Ts(t, e, i, n) {
          return { x: i + t * Math.cos(e), y: n + t * Math.sin(e) };
        }
        function As(t, e, i, n, s, o) {
          const {
              x: a,
              y: r,
              startAngle: l,
              pixelMargin: c,
              innerRadius: h,
            } = e,
            u = Math.max(e.outerRadius + n + i - c, 0),
            d = h > 0 ? h + n + i + c : 0;
          let f = 0;
          const p = s - l;
          if (n) {
            const t = ((h > 0 ? h - n : 0) + (u > 0 ? u - n : 0)) / 2;
            f = (p - (0 !== t ? (p * t) / (t + n) : p)) / 2;
          }
          const g = (p - Math.max(0.001, p * u - i / P) / u) / 2,
            m = l + g + f,
            b = s - g - f,
            {
              outerStart: x,
              outerEnd: y,
              innerStart: v,
              innerEnd: _,
            } = Es(e, d, u, b - m),
            w = u - x,
            k = u - y,
            M = m + x / w,
            S = b - y / k,
            D = d + v,
            C = d + _,
            E = m + v / D,
            T = b - _ / C;
          if ((t.beginPath(), o)) {
            if ((t.arc(a, r, u, M, S), y > 0)) {
              const e = Ts(k, S, a, r);
              t.arc(e.x, e.y, y, S, b + O);
            }
            const e = Ts(C, b, a, r);
            if ((t.lineTo(e.x, e.y), _ > 0)) {
              const e = Ts(C, T, a, r);
              t.arc(e.x, e.y, _, b + O, T + Math.PI);
            }
            if ((t.arc(a, r, d, b - _ / d, m + v / d, !0), v > 0)) {
              const e = Ts(D, E, a, r);
              t.arc(e.x, e.y, v, E + Math.PI, m - O);
            }
            const i = Ts(w, m, a, r);
            if ((t.lineTo(i.x, i.y), x > 0)) {
              const e = Ts(w, M, a, r);
              t.arc(e.x, e.y, x, m - O, M);
            }
          } else {
            t.moveTo(a, r);
            const e = Math.cos(M) * u + a,
              i = Math.sin(M) * u + r;
            t.lineTo(e, i);
            const n = Math.cos(S) * u + a,
              s = Math.sin(S) * u + r;
            t.lineTo(n, s);
          }
          t.closePath();
        }
        function Os(t, e, i, n, s, o) {
          const { options: a } = e,
            { borderWidth: r, borderJoinStyle: l } = a,
            c = "inner" === a.borderAlign;
          r &&
            (c
              ? ((t.lineWidth = 2 * r), (t.lineJoin = l || "round"))
              : ((t.lineWidth = r), (t.lineJoin = l || "bevel")),
            e.fullCircles &&
              (function (t, e, i) {
                const {
                    x: n,
                    y: s,
                    startAngle: o,
                    pixelMargin: a,
                    fullCircles: r,
                  } = e,
                  l = Math.max(e.outerRadius - a, 0),
                  c = e.innerRadius + a;
                let h;
                for (
                  i && Cs(t, e, o + C),
                    t.beginPath(),
                    t.arc(n, s, c, o + C, o, !0),
                    h = 0;
                  h < r;
                  ++h
                )
                  t.stroke();
                for (t.beginPath(), t.arc(n, s, l, o, o + C), h = 0; h < r; ++h)
                  t.stroke();
              })(t, e, c),
            c && Cs(t, e, s),
            As(t, e, i, n, s, o),
            t.stroke());
        }
        Object.defineProperties(Ss, {
          defaults: { enumerable: Ps, value: te },
          instances: { enumerable: Ps, value: ws },
          overrides: { enumerable: Ps, value: Zt },
          registry: { enumerable: Ps, value: fn },
          version: { enumerable: Ps, value: "3.9.1" },
          getChart: { enumerable: Ps, value: ks },
          register: {
            enumerable: Ps,
            value: (...t) => {
              (fn.add(...t), Ds());
            },
          },
          unregister: {
            enumerable: Ps,
            value: (...t) => {
              (fn.remove(...t), Ds());
            },
          },
        });
        class Is extends Qi {
          constructor(t) {
            (super(),
              (this.options = void 0),
              (this.circumference = void 0),
              (this.startAngle = void 0),
              (this.endAngle = void 0),
              (this.innerRadius = void 0),
              (this.outerRadius = void 0),
              (this.pixelMargin = 0),
              (this.fullCircles = 0),
              t && Object.assign(this, t));
          }
          inRange(t, e, i) {
            const n = this.getProps(["x", "y"], i),
              { angle: s, distance: o } = $(n, { x: t, y: e }),
              {
                startAngle: a,
                endAngle: r,
                innerRadius: l,
                outerRadius: c,
                circumference: u,
              } = this.getProps(
                [
                  "startAngle",
                  "endAngle",
                  "innerRadius",
                  "outerRadius",
                  "circumference",
                ],
                i,
              ),
              d = this.options.spacing / 2,
              f = h(u, r - a) >= C || X(s, a, r),
              p = Z(o, l + d, c + d);
            return f && p;
          }
          getCenterPoint(t) {
            const {
                x: e,
                y: i,
                startAngle: n,
                endAngle: s,
                innerRadius: o,
                outerRadius: a,
              } = this.getProps(
                [
                  "x",
                  "y",
                  "startAngle",
                  "endAngle",
                  "innerRadius",
                  "outerRadius",
                  "circumference",
                ],
                t,
              ),
              { offset: r, spacing: l } = this.options,
              c = (n + s) / 2,
              h = (o + a + l + r) / 2;
            return { x: e + Math.cos(c) * h, y: i + Math.sin(c) * h };
          }
          tooltipPosition(t) {
            return this.getCenterPoint(t);
          }
          draw(t) {
            const { options: e, circumference: i } = this,
              n = (e.offset || 0) / 2,
              s = (e.spacing || 0) / 2,
              o = e.circular;
            if (
              ((this.pixelMargin = "inner" === e.borderAlign ? 0.33 : 0),
              (this.fullCircles = i > C ? Math.floor(i / C) : 0),
              0 === i || this.innerRadius < 0 || this.outerRadius < 0)
            )
              return;
            t.save();
            let a = 0;
            if (n) {
              a = n / 2;
              const e = (this.startAngle + this.endAngle) / 2;
              (t.translate(Math.cos(e) * a, Math.sin(e) * a),
                this.circumference >= P && (a = n));
            }
            ((t.fillStyle = e.backgroundColor),
              (t.strokeStyle = e.borderColor));
            const r = (function (t, e, i, n, s) {
              const { fullCircles: o, startAngle: a, circumference: r } = e;
              let l = e.endAngle;
              if (o) {
                As(t, e, i, n, a + C, s);
                for (let e = 0; e < o; ++e) t.fill();
                isNaN(r) || ((l = a + (r % C)), r % C === 0 && (l += C));
              }
              return (As(t, e, i, n, l, s), t.fill(), l);
            })(t, this, a, s, o);
            (Os(t, this, a, s, r, o), t.restore());
          }
        }
        function Fs(t, e, i = e) {
          ((t.lineCap = h(i.borderCapStyle, e.borderCapStyle)),
            t.setLineDash(h(i.borderDash, e.borderDash)),
            (t.lineDashOffset = h(i.borderDashOffset, e.borderDashOffset)),
            (t.lineJoin = h(i.borderJoinStyle, e.borderJoinStyle)),
            (t.lineWidth = h(i.borderWidth, e.borderWidth)),
            (t.strokeStyle = h(i.borderColor, e.borderColor)));
        }
        function Ls(t, e, i) {
          t.lineTo(i.x, i.y);
        }
        function Rs(t, e, i = {}) {
          const n = t.length,
            { start: s = 0, end: o = n - 1 } = i,
            { start: a, end: r } = e,
            l = Math.max(s, a),
            c = Math.min(o, r),
            h = (s < a && o < a) || (s > r && o > r);
          return {
            count: n,
            start: l,
            loop: e.loop,
            ilen: c < l && !h ? n + c - l : c - l,
          };
        }
        function zs(t, e, i, n) {
          const { points: s, options: o } = e,
            { count: a, start: r, loop: l, ilen: c } = Rs(s, i, n),
            h = (function (t) {
              return t.stepped
                ? he
                : t.tension || "monotone" === t.cubicInterpolationMode
                  ? ue
                  : Ls;
            })(o);
          let u,
            d,
            f,
            { move: p = !0, reverse: g } = n || {};
          for (u = 0; u <= c; ++u)
            ((d = s[(r + (g ? c - u : u)) % a]),
              d.skip ||
                (p ? (t.moveTo(d.x, d.y), (p = !1)) : h(t, f, d, g, o.stepped),
                (f = d)));
          return (
            l && ((d = s[(r + (g ? c : 0)) % a]), h(t, f, d, g, o.stepped)),
            !!l
          );
        }
        function Bs(t, e, i, n) {
          const s = e.points,
            { count: o, start: a, ilen: r } = Rs(s, i, n),
            { move: l = !0, reverse: c } = n || {};
          let h,
            u,
            d,
            f,
            p,
            g,
            m = 0,
            b = 0;
          const x = (t) => (a + (c ? r - t : t)) % o,
            y = () => {
              f !== p && (t.lineTo(m, p), t.lineTo(m, f), t.lineTo(m, g));
            };
          for (l && ((u = s[x(0)]), t.moveTo(u.x, u.y)), h = 0; h <= r; ++h) {
            if (((u = s[x(h)]), u.skip)) continue;
            const e = u.x,
              i = u.y,
              n = 0 | e;
            (n === d
              ? (i < f ? (f = i) : i > p && (p = i), (m = (b * m + e) / ++b))
              : (y(), t.lineTo(e, i), (d = n), (b = 0), (f = p = i)),
              (g = i));
          }
          y();
        }
        function js(t) {
          const e = t.options,
            i = e.borderDash && e.borderDash.length;
          return !(
            t._decimated ||
            t._loop ||
            e.tension ||
            "monotone" === e.cubicInterpolationMode ||
            e.stepped ||
            i
          )
            ? Bs
            : zs;
        }
        ((Is.id = "arc"),
          (Is.defaults = {
            borderAlign: "center",
            borderColor: "#fff",
            borderJoinStyle: void 0,
            borderRadius: 0,
            borderWidth: 2,
            offset: 0,
            spacing: 0,
            angle: void 0,
            circular: !0,
          }),
          (Is.defaultRoutes = { backgroundColor: "backgroundColor" }));
        const Vs = "function" == typeof Path2D;
        function Ws(t, e, i, n) {
          Vs && !e.options.segment
            ? (function (t, e, i, n) {
                let s = e._path;
                (s ||
                  ((s = e._path = new Path2D()),
                  e.path(s, i, n) && s.closePath()),
                  Fs(t, e.options),
                  t.stroke(s));
              })(t, e, i, n)
            : (function (t, e, i, n) {
                const { segments: s, options: o } = e,
                  a = js(e);
                for (const r of s)
                  (Fs(t, o, r.style),
                    t.beginPath(),
                    a(t, e, r, { start: i, end: i + n - 1 }) && t.closePath(),
                    t.stroke());
              })(t, e, i, n);
        }
        class Ns extends Qi {
          constructor(t) {
            (super(),
              (this.animated = !0),
              (this.options = void 0),
              (this._chart = void 0),
              (this._loop = void 0),
              (this._fullLoop = void 0),
              (this._path = void 0),
              (this._points = void 0),
              (this._segments = void 0),
              (this._decimated = !1),
              (this._pointsUpdated = !1),
              (this._datasetIndex = void 0),
              t && Object.assign(this, t));
          }
          updateControlPoints(t, e) {
            const i = this.options;
            if (
              (i.tension || "monotone" === i.cubicInterpolationMode) &&
              !i.stepped &&
              !this._pointsUpdated
            ) {
              const n = i.spanGaps ? this._loop : this._fullLoop;
              (Ye(this._points, i, t, n, e), (this._pointsUpdated = !0));
            }
          }
          set points(t) {
            ((this._points = t),
              delete this._segments,
              delete this._path,
              (this._pointsUpdated = !1));
          }
          get points() {
            return this._points;
          }
          get segments() {
            return (
              this._segments ||
              (this._segments = (function (t, e) {
                const i = t.points,
                  n = t.options.spanGaps,
                  s = i.length;
                if (!s) return [];
                const o = !!t._loop,
                  { start: a, end: r } = (function (t, e, i, n) {
                    let s = 0,
                      o = e - 1;
                    if (i && !n) for (; s < e && !t[s].skip; ) s++;
                    for (; s < e && t[s].skip; ) s++;
                    for (s %= e, i && (o += s); o > s && t[o % e].skip; ) o--;
                    return ((o %= e), { start: s, end: o });
                  })(i, s, o, n);
                return bi(
                  t,
                  !0 === n
                    ? [{ start: a, end: r, loop: o }]
                    : (function (t, e, i, n) {
                        const s = t.length,
                          o = [];
                        let a,
                          r = e,
                          l = t[e];
                        for (a = e + 1; a <= i; ++a) {
                          const i = t[a % s];
                          (i.skip || i.stop
                            ? l.skip ||
                              ((n = !1),
                              o.push({
                                start: e % s,
                                end: (a - 1) % s,
                                loop: n,
                              }),
                              (e = r = i.stop ? a : null))
                            : ((r = a), l.skip && (e = a)),
                            (l = i));
                        }
                        return (
                          null !== r &&
                            o.push({ start: e % s, end: r % s, loop: n }),
                          o
                        );
                      })(
                        i,
                        a,
                        r < a ? r + s : r,
                        !!t._fullLoop && 0 === a && r === s - 1,
                      ),
                  i,
                  e,
                );
              })(this, this.options.segment))
            );
          }
          first() {
            const t = this.segments,
              e = this.points;
            return t.length && e[t[0].start];
          }
          last() {
            const t = this.segments,
              e = this.points,
              i = t.length;
            return i && e[t[i - 1].end];
          }
          interpolate(t, e) {
            const i = this.options,
              n = t[e],
              s = this.points,
              o = mi(this, { property: e, start: n, end: n });
            if (!o.length) return;
            const a = [],
              r = (function (t) {
                return t.stepped
                  ? ai
                  : t.tension || "monotone" === t.cubicInterpolationMode
                    ? ri
                    : oi;
              })(i);
            let l, c;
            for (l = 0, c = o.length; l < c; ++l) {
              const { start: c, end: h } = o[l],
                u = s[c],
                d = s[h];
              if (u === d) {
                a.push(u);
                continue;
              }
              const f = r(
                u,
                d,
                Math.abs((n - u[e]) / (d[e] - u[e])),
                i.stepped,
              );
              ((f[e] = t[e]), a.push(f));
            }
            return 1 === a.length ? a[0] : a;
          }
          pathSegment(t, e, i) {
            return js(this)(t, this, e, i);
          }
          path(t, e, i) {
            const n = this.segments,
              s = js(this);
            let o = this._loop;
            ((e = e || 0), (i = i || this.points.length - e));
            for (const a of n) o &= s(t, this, a, { start: e, end: e + i - 1 });
            return !!o;
          }
          draw(t, e, i, n) {
            const s = this.options || {};
            ((this.points || []).length &&
              s.borderWidth &&
              (t.save(), Ws(t, this, i, n), t.restore()),
              this.animated &&
                ((this._pointsUpdated = !1), (this._path = void 0)));
          }
        }
        function Hs(t, e, i, n) {
          const s = t.options,
            { [i]: o } = t.getProps([i], n);
          return Math.abs(e - o) < s.radius + s.hitRadius;
        }
        ((Ns.id = "line"),
          (Ns.defaults = {
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            borderWidth: 3,
            capBezierPoints: !0,
            cubicInterpolationMode: "default",
            fill: !1,
            spanGaps: !1,
            stepped: !1,
            tension: 0,
          }),
          (Ns.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor",
          }),
          (Ns.descriptors = {
            _scriptable: !0,
            _indexable: (t) => "borderDash" !== t && "fill" !== t,
          }));
        class $s extends Qi {
          constructor(t) {
            (super(),
              (this.options = void 0),
              (this.parsed = void 0),
              (this.skip = void 0),
              (this.stop = void 0),
              t && Object.assign(this, t));
          }
          inRange(t, e, i) {
            const n = this.options,
              { x: s, y: o } = this.getProps(["x", "y"], i);
            return (
              Math.pow(t - s, 2) + Math.pow(e - o, 2) <
              Math.pow(n.hitRadius + n.radius, 2)
            );
          }
          inXRange(t, e) {
            return Hs(this, t, "x", e);
          }
          inYRange(t, e) {
            return Hs(this, t, "y", e);
          }
          getCenterPoint(t) {
            const { x: e, y: i } = this.getProps(["x", "y"], t);
            return { x: e, y: i };
          }
          size(t) {
            let e = (t = t || this.options || {}).radius || 0;
            e = Math.max(e, (e && t.hoverRadius) || 0);
            return 2 * (e + ((e && t.borderWidth) || 0));
          }
          draw(t, e) {
            const i = this.options;
            this.skip ||
              i.radius < 0.1 ||
              !re(this, e, this.size(i) / 2) ||
              ((t.strokeStyle = i.borderColor),
              (t.lineWidth = i.borderWidth),
              (t.fillStyle = i.backgroundColor),
              oe(t, i, this.x, this.y));
          }
          getRange() {
            const t = this.options || {};
            return t.radius + t.hitRadius;
          }
        }
        function qs(t, e) {
          const {
            x: i,
            y: n,
            base: s,
            width: o,
            height: a,
          } = t.getProps(["x", "y", "base", "width", "height"], e);
          let r, l, c, h, u;
          return (
            t.horizontal
              ? ((u = a / 2),
                (r = Math.min(i, s)),
                (l = Math.max(i, s)),
                (c = n - u),
                (h = n + u))
              : ((u = o / 2),
                (r = i - u),
                (l = i + u),
                (c = Math.min(n, s)),
                (h = Math.max(n, s))),
            { left: r, top: c, right: l, bottom: h }
          );
        }
        function Ys(t, e, i, n) {
          return t ? 0 : G(e, i, n);
        }
        function Us(t) {
          const e = qs(t),
            i = e.right - e.left,
            n = e.bottom - e.top,
            s = (function (t, e, i) {
              const n = t.options.borderWidth,
                s = t.borderSkipped,
                o = ve(n);
              return {
                t: Ys(s.top, o.top, 0, i),
                r: Ys(s.right, o.right, 0, e),
                b: Ys(s.bottom, o.bottom, 0, i),
                l: Ys(s.left, o.left, 0, e),
              };
            })(t, i / 2, n / 2),
            o = (function (t, e, i) {
              const { enableBorderRadius: n } = t.getProps([
                  "enableBorderRadius",
                ]),
                s = t.options.borderRadius,
                o = _e(s),
                a = Math.min(e, i),
                l = t.borderSkipped,
                c = n || r(s);
              return {
                topLeft: Ys(!c || l.top || l.left, o.topLeft, 0, a),
                topRight: Ys(!c || l.top || l.right, o.topRight, 0, a),
                bottomLeft: Ys(!c || l.bottom || l.left, o.bottomLeft, 0, a),
                bottomRight: Ys(!c || l.bottom || l.right, o.bottomRight, 0, a),
              };
            })(t, i / 2, n / 2);
          return {
            outer: { x: e.left, y: e.top, w: i, h: n, radius: o },
            inner: {
              x: e.left + s.l,
              y: e.top + s.t,
              w: i - s.l - s.r,
              h: n - s.t - s.b,
              radius: {
                topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
                topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
                bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
                bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r)),
              },
            },
          };
        }
        function Xs(t, e, i, n) {
          const s = null === e,
            o = null === i,
            a = t && !(s && o) && qs(t, n);
          return (
            a && (s || Z(e, a.left, a.right)) && (o || Z(i, a.top, a.bottom))
          );
        }
        function Gs(t, e) {
          t.rect(e.x, e.y, e.w, e.h);
        }
        function Zs(t, e, i = {}) {
          const n = t.x !== i.x ? -e : 0,
            s = t.y !== i.y ? -e : 0,
            o = (t.x + t.w !== i.x + i.w ? e : 0) - n,
            a = (t.y + t.h !== i.y + i.h ? e : 0) - s;
          return {
            x: t.x + n,
            y: t.y + s,
            w: t.w + o,
            h: t.h + a,
            radius: t.radius,
          };
        }
        (($s.id = "point"),
          ($s.defaults = {
            borderWidth: 1,
            hitRadius: 1,
            hoverBorderWidth: 1,
            hoverRadius: 4,
            pointStyle: "circle",
            radius: 3,
            rotation: 0,
          }),
          ($s.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor",
          }));
        class Ks extends Qi {
          constructor(t) {
            (super(),
              (this.options = void 0),
              (this.horizontal = void 0),
              (this.base = void 0),
              (this.width = void 0),
              (this.height = void 0),
              (this.inflateAmount = void 0),
              t && Object.assign(this, t));
          }
          draw(t) {
            const {
                inflateAmount: e,
                options: { borderColor: i, backgroundColor: n },
              } = this,
              { inner: s, outer: o } = Us(this),
              a =
                (r = o.radius).topLeft ||
                r.topRight ||
                r.bottomLeft ||
                r.bottomRight
                  ? pe
                  : Gs;
            var r;
            (t.save(),
              (o.w === s.w && o.h === s.h) ||
                (t.beginPath(),
                a(t, Zs(o, e, s)),
                t.clip(),
                a(t, Zs(s, -e, o)),
                (t.fillStyle = i),
                t.fill("evenodd")),
              t.beginPath(),
              a(t, Zs(s, e)),
              (t.fillStyle = n),
              t.fill(),
              t.restore());
          }
          inRange(t, e, i) {
            return Xs(this, t, e, i);
          }
          inXRange(t, e) {
            return Xs(this, t, null, e);
          }
          inYRange(t, e) {
            return Xs(this, null, t, e);
          }
          getCenterPoint(t) {
            const {
              x: e,
              y: i,
              base: n,
              horizontal: s,
            } = this.getProps(["x", "y", "base", "horizontal"], t);
            return { x: s ? (e + n) / 2 : e, y: s ? i : (i + n) / 2 };
          }
          getRange(t) {
            return "x" === t ? this.width / 2 : this.height / 2;
          }
        }
        ((Ks.id = "bar"),
          (Ks.defaults = {
            borderSkipped: "start",
            borderWidth: 0,
            borderRadius: 0,
            inflateAmount: "auto",
            pointStyle: void 0,
          }),
          (Ks.defaultRoutes = {
            backgroundColor: "backgroundColor",
            borderColor: "borderColor",
          }));
        var Js = Object.freeze({
          __proto__: null,
          ArcElement: Is,
          LineElement: Ns,
          PointElement: $s,
          BarElement: Ks,
        });
        function Qs(t) {
          if (t._decimated) {
            const e = t._data;
            (delete t._decimated,
              delete t._data,
              Object.defineProperty(t, "data", { value: e }));
          }
        }
        function to(t) {
          t.data.datasets.forEach((t) => {
            Qs(t);
          });
        }
        var eo = {
          id: "decimation",
          defaults: { algorithm: "min-max", enabled: !1 },
          beforeElementsUpdate: (t, e, i) => {
            if (!i.enabled) return void to(t);
            const n = t.width;
            t.data.datasets.forEach((e, s) => {
              const { _data: a, indexAxis: r } = e,
                l = t.getDatasetMeta(s),
                c = a || e.data;
              if ("y" === Me([r, t.options.indexAxis])) return;
              if (!l.controller.supportsDecimation) return;
              const h = t.scales[l.xAxisID];
              if ("linear" !== h.type && "time" !== h.type) return;
              if (t.options.parsing) return;
              let { start: u, count: d } = (function (t, e) {
                const i = e.length;
                let n,
                  s = 0;
                const { iScale: o } = t,
                  {
                    min: a,
                    max: r,
                    minDefined: l,
                    maxDefined: c,
                  } = o.getUserBounds();
                return (
                  l && (s = G(J(e, o.axis, a).lo, 0, i - 1)),
                  (n = c ? G(J(e, o.axis, r).hi + 1, s, i) - s : i - s),
                  { start: s, count: n }
                );
              })(l, c);
              if (d <= (i.threshold || 4 * n)) return void Qs(e);
              let f;
              switch (
                (o(a) &&
                  ((e._data = c),
                  delete e.data,
                  Object.defineProperty(e, "data", {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                      return this._decimated;
                    },
                    set: function (t) {
                      this._data = t;
                    },
                  })),
                i.algorithm)
              ) {
                case "lttb":
                  f = (function (t, e, i, n, s) {
                    const o = s.samples || n;
                    if (o >= i) return t.slice(e, e + i);
                    const a = [],
                      r = (i - 2) / (o - 2);
                    let l = 0;
                    const c = e + i - 1;
                    let h,
                      u,
                      d,
                      f,
                      p,
                      g = e;
                    for (a[l++] = t[g], h = 0; h < o - 2; h++) {
                      let n,
                        s = 0,
                        o = 0;
                      const c = Math.floor((h + 1) * r) + 1 + e,
                        m = Math.min(Math.floor((h + 2) * r) + 1, i) + e,
                        b = m - c;
                      for (n = c; n < m; n++) ((s += t[n].x), (o += t[n].y));
                      ((s /= b), (o /= b));
                      const x = Math.floor(h * r) + 1 + e,
                        y = Math.min(Math.floor((h + 1) * r) + 1, i) + e,
                        { x: v, y: _ } = t[g];
                      for (d = f = -1, n = x; n < y; n++)
                        ((f =
                          0.5 *
                          Math.abs(
                            (v - s) * (t[n].y - _) - (v - t[n].x) * (o - _),
                          )),
                          f > d && ((d = f), (u = t[n]), (p = n)));
                      ((a[l++] = u), (g = p));
                    }
                    return ((a[l++] = t[c]), a);
                  })(c, u, d, n, i);
                  break;
                case "min-max":
                  f = (function (t, e, i, n) {
                    let s,
                      a,
                      r,
                      l,
                      c,
                      h,
                      u,
                      d,
                      f,
                      p,
                      g = 0,
                      m = 0;
                    const b = [],
                      x = e + i - 1,
                      y = t[e].x,
                      v = t[x].x - y;
                    for (s = e; s < e + i; ++s) {
                      ((a = t[s]), (r = ((a.x - y) / v) * n), (l = a.y));
                      const e = 0 | r;
                      if (e === c)
                        (l < f
                          ? ((f = l), (h = s))
                          : l > p && ((p = l), (u = s)),
                          (g = (m * g + a.x) / ++m));
                      else {
                        const i = s - 1;
                        if (!o(h) && !o(u)) {
                          const e = Math.min(h, u),
                            n = Math.max(h, u);
                          (e !== d && e !== i && b.push({ ...t[e], x: g }),
                            n !== d && n !== i && b.push({ ...t[n], x: g }));
                        }
                        (s > 0 && i !== d && b.push(t[i]),
                          b.push(a),
                          (c = e),
                          (m = 0),
                          (f = p = l),
                          (h = u = d = s));
                      }
                    }
                    return b;
                  })(c, u, d, n);
                  break;
                default:
                  throw new Error(
                    `Unsupported decimation algorithm '${i.algorithm}'`,
                  );
              }
              e._decimated = f;
            });
          },
          destroy(t) {
            to(t);
          },
        };
        function io(t, e, i, n) {
          if (n) return;
          let s = e[t],
            o = i[t];
          return (
            "angle" === t && ((s = U(s)), (o = U(o))),
            { property: t, start: s, end: o }
          );
        }
        function no(t, e, i) {
          for (; e > t; e--) {
            const t = i[e];
            if (!isNaN(t.x) && !isNaN(t.y)) break;
          }
          return e;
        }
        function so(t, e, i, n) {
          return t && e ? n(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
        }
        function oo(t, e) {
          let i = [],
            n = !1;
          return (
            a(t)
              ? ((n = !0), (i = t))
              : (i = (function (t, e) {
                  const { x: i = null, y: n = null } = t || {},
                    s = e.points,
                    o = [];
                  return (
                    e.segments.forEach(({ start: t, end: e }) => {
                      e = no(t, e, s);
                      const a = s[t],
                        r = s[e];
                      null !== n
                        ? (o.push({ x: a.x, y: n }), o.push({ x: r.x, y: n }))
                        : null !== i &&
                          (o.push({ x: i, y: a.y }), o.push({ x: i, y: r.y }));
                    }),
                    o
                  );
                })(t, e)),
            i.length
              ? new Ns({
                  points: i,
                  options: { tension: 0 },
                  _loop: n,
                  _fullLoop: n,
                })
              : null
          );
        }
        function ao(t) {
          return t && !1 !== t.fill;
        }
        function ro(t, e, i) {
          let n = t[e].fill;
          const s = [e];
          let o;
          if (!i) return n;
          for (; !1 !== n && -1 === s.indexOf(n); ) {
            if (!l(n)) return n;
            if (((o = t[n]), !o)) return !1;
            if (o.visible) return n;
            (s.push(n), (n = o.fill));
          }
          return !1;
        }
        function lo(t, e, i) {
          const n = (function (t) {
            const e = t.options,
              i = e.fill;
            let n = h(i && i.target, i);
            void 0 === n && (n = !!e.backgroundColor);
            if (!1 === n || null === n) return !1;
            if (!0 === n) return "origin";
            return n;
          })(t);
          if (r(n)) return !isNaN(n.value) && n;
          let s = parseFloat(n);
          return l(s) && Math.floor(s) === s
            ? (function (t, e, i, n) {
                ("-" !== t && "+" !== t) || (i = e + i);
                if (i === e || i < 0 || i >= n) return !1;
                return i;
              })(n[0], e, s, i)
            : ["origin", "start", "end", "stack", "shape"].indexOf(n) >= 0 && n;
        }
        function co(t, e, i) {
          const n = [];
          for (let s = 0; s < i.length; s++) {
            const o = i[s],
              { first: a, last: r, point: l } = ho(o, e, "x");
            if (!(!l || (a && r)))
              if (a) n.unshift(l);
              else if ((t.push(l), !r)) break;
          }
          t.push(...n);
        }
        function ho(t, e, i) {
          const n = t.interpolate(e, i);
          if (!n) return {};
          const s = n[i],
            o = t.segments,
            a = t.points;
          let r = !1,
            l = !1;
          for (let t = 0; t < o.length; t++) {
            const e = o[t],
              n = a[e.start][i],
              c = a[e.end][i];
            if (Z(s, n, c)) {
              ((r = s === n), (l = s === c));
              break;
            }
          }
          return { first: r, last: l, point: n };
        }
        class uo {
          constructor(t) {
            ((this.x = t.x), (this.y = t.y), (this.radius = t.radius));
          }
          pathSegment(t, e, i) {
            const { x: n, y: s, radius: o } = this;
            return (
              (e = e || { start: 0, end: C }),
              t.arc(n, s, o, e.end, e.start, !0),
              !i.bounds
            );
          }
          interpolate(t) {
            const { x: e, y: i, radius: n } = this,
              s = t.angle;
            return { x: e + Math.cos(s) * n, y: i + Math.sin(s) * n, angle: s };
          }
        }
        function fo(t) {
          const { chart: e, fill: i, line: n } = t;
          if (l(i))
            return (function (t, e) {
              const i = t.getDatasetMeta(e),
                n = i && t.isDatasetVisible(e);
              return n ? i.dataset : null;
            })(e, i);
          if ("stack" === i)
            return (function (t) {
              const { scale: e, index: i, line: n } = t,
                s = [],
                o = n.segments,
                a = n.points,
                r = (function (t, e) {
                  const i = [],
                    n = t.getMatchingVisibleMetas("line");
                  for (let t = 0; t < n.length; t++) {
                    const s = n[t];
                    if (s.index === e) break;
                    s.hidden || i.unshift(s.dataset);
                  }
                  return i;
                })(e, i);
              r.push(oo({ x: null, y: e.bottom }, n));
              for (let t = 0; t < o.length; t++) {
                const e = o[t];
                for (let t = e.start; t <= e.end; t++) co(s, a[t], r);
              }
              return new Ns({ points: s, options: {} });
            })(t);
          if ("shape" === i) return !0;
          const s = (function (t) {
            const e = t.scale || {};
            if (e.getPointPositionForValue)
              return (function (t) {
                const { scale: e, fill: i } = t,
                  n = e.options,
                  s = e.getLabels().length,
                  o = n.reverse ? e.max : e.min,
                  a = (function (t, e, i) {
                    let n;
                    return (
                      (n =
                        "start" === t
                          ? i
                          : "end" === t
                            ? e.options.reverse
                              ? e.min
                              : e.max
                            : r(t)
                              ? t.value
                              : e.getBaseValue()),
                      n
                    );
                  })(i, e, o),
                  l = [];
                if (n.grid.circular) {
                  const t = e.getPointPositionForValue(0, o);
                  return new uo({
                    x: t.x,
                    y: t.y,
                    radius: e.getDistanceFromCenterForValue(a),
                  });
                }
                for (let t = 0; t < s; ++t)
                  l.push(e.getPointPositionForValue(t, a));
                return l;
              })(t);
            return (function (t) {
              const { scale: e = {}, fill: i } = t,
                n = (function (t, e) {
                  let i = null;
                  return (
                    "start" === t
                      ? (i = e.bottom)
                      : "end" === t
                        ? (i = e.top)
                        : r(t)
                          ? (i = e.getPixelForValue(t.value))
                          : e.getBasePixel && (i = e.getBasePixel()),
                    i
                  );
                })(i, e);
              if (l(n)) {
                const t = e.isHorizontal();
                return { x: t ? n : null, y: t ? null : n };
              }
              return null;
            })(t);
          })(t);
          return s instanceof uo ? s : oo(s, n);
        }
        function po(t, e, i) {
          const n = fo(e),
            { line: s, scale: o, axis: a } = e,
            r = s.options,
            l = r.fill,
            c = r.backgroundColor,
            { above: h = c, below: u = c } = l || {};
          n &&
            s.points.length &&
            (le(t, i),
            (function (t, e) {
              const {
                  line: i,
                  target: n,
                  above: s,
                  below: o,
                  area: a,
                  scale: r,
                } = e,
                l = i._loop ? "angle" : e.axis;
              (t.save(),
                "x" === l &&
                  o !== s &&
                  (go(t, n, a.top),
                  mo(t, {
                    line: i,
                    target: n,
                    color: s,
                    scale: r,
                    property: l,
                  }),
                  t.restore(),
                  t.save(),
                  go(t, n, a.bottom)));
              (mo(t, { line: i, target: n, color: o, scale: r, property: l }),
                t.restore());
            })(t, {
              line: s,
              target: n,
              above: h,
              below: u,
              area: i,
              scale: o,
              axis: a,
            }),
            ce(t));
        }
        function go(t, e, i) {
          const { segments: n, points: s } = e;
          let o = !0,
            a = !1;
          t.beginPath();
          for (const r of n) {
            const { start: n, end: l } = r,
              c = s[n],
              h = s[no(n, l, s)];
            (o
              ? (t.moveTo(c.x, c.y), (o = !1))
              : (t.lineTo(c.x, i), t.lineTo(c.x, c.y)),
              (a = !!e.pathSegment(t, r, { move: a })),
              a ? t.closePath() : t.lineTo(h.x, i));
          }
          (t.lineTo(e.first().x, i), t.closePath(), t.clip());
        }
        function mo(t, e) {
          const { line: i, target: n, property: s, color: o, scale: a } = e,
            r = (function (t, e, i) {
              const n = t.segments,
                s = t.points,
                o = e.points,
                a = [];
              for (const t of n) {
                let { start: n, end: r } = t;
                r = no(n, r, s);
                const l = io(i, s[n], s[r], t.loop);
                if (!e.segments) {
                  a.push({ source: t, target: l, start: s[n], end: s[r] });
                  continue;
                }
                const c = mi(e, l);
                for (const e of c) {
                  const n = io(i, o[e.start], o[e.end], e.loop),
                    r = gi(t, s, n);
                  for (const t of r)
                    a.push({
                      source: t,
                      target: e,
                      start: { [i]: so(l, n, "start", Math.max) },
                      end: { [i]: so(l, n, "end", Math.min) },
                    });
                }
              }
              return a;
            })(i, n, s);
          for (const { source: e, target: l, start: c, end: h } of r) {
            const { style: { backgroundColor: r = o } = {} } = e,
              u = !0 !== n;
            (t.save(),
              (t.fillStyle = r),
              bo(t, a, u && io(s, c, h)),
              t.beginPath());
            const d = !!i.pathSegment(t, e);
            let f;
            if (u) {
              d ? t.closePath() : xo(t, n, h, s);
              const e = !!n.pathSegment(t, l, { move: d, reverse: !0 });
              ((f = d && e), f || xo(t, n, c, s));
            }
            (t.closePath(), t.fill(f ? "evenodd" : "nonzero"), t.restore());
          }
        }
        function bo(t, e, i) {
          const { top: n, bottom: s } = e.chart.chartArea,
            { property: o, start: a, end: r } = i || {};
          "x" === o && (t.beginPath(), t.rect(a, n, r - a, s - n), t.clip());
        }
        function xo(t, e, i, n) {
          const s = e.interpolate(i, n);
          s && t.lineTo(s.x, s.y);
        }
        var yo = {
          id: "filler",
          afterDatasetsUpdate(t, e, i) {
            const n = (t.data.datasets || []).length,
              s = [];
            let o, a, r, l;
            for (a = 0; a < n; ++a)
              ((o = t.getDatasetMeta(a)),
                (r = o.dataset),
                (l = null),
                r &&
                  r.options &&
                  r instanceof Ns &&
                  (l = {
                    visible: t.isDatasetVisible(a),
                    index: a,
                    fill: lo(r, a, n),
                    chart: t,
                    axis: o.controller.options.indexAxis,
                    scale: o.vScale,
                    line: r,
                  }),
                (o.$filler = l),
                s.push(l));
            for (a = 0; a < n; ++a)
              ((l = s[a]),
                l && !1 !== l.fill && (l.fill = ro(s, a, i.propagate)));
          },
          beforeDraw(t, e, i) {
            const n = "beforeDraw" === i.drawTime,
              s = t.getSortedVisibleDatasetMetas(),
              o = t.chartArea;
            for (let e = s.length - 1; e >= 0; --e) {
              const i = s[e].$filler;
              i &&
                (i.line.updateControlPoints(o, i.axis),
                n && i.fill && po(t.ctx, i, o));
            }
          },
          beforeDatasetsDraw(t, e, i) {
            if ("beforeDatasetsDraw" !== i.drawTime) return;
            const n = t.getSortedVisibleDatasetMetas();
            for (let e = n.length - 1; e >= 0; --e) {
              const i = n[e].$filler;
              ao(i) && po(t.ctx, i, t.chartArea);
            }
          },
          beforeDatasetDraw(t, e, i) {
            const n = e.meta.$filler;
            ao(n) &&
              "beforeDatasetDraw" === i.drawTime &&
              po(t.ctx, n, t.chartArea);
          },
          defaults: { propagate: !0, drawTime: "beforeDatasetDraw" },
        };
        const vo = (t, e) => {
          let { boxHeight: i = e, boxWidth: n = e } = t;
          return (
            t.usePointStyle &&
              ((i = Math.min(i, e)), (n = t.pointStyleWidth || Math.min(n, e))),
            { boxWidth: n, boxHeight: i, itemHeight: Math.max(e, i) }
          );
        };
        class _o extends Qi {
          constructor(t) {
            (super(),
              (this._added = !1),
              (this.legendHitBoxes = []),
              (this._hoveredItem = null),
              (this.doughnutMode = !1),
              (this.chart = t.chart),
              (this.options = t.options),
              (this.ctx = t.ctx),
              (this.legendItems = void 0),
              (this.columnSizes = void 0),
              (this.lineWidths = void 0),
              (this.maxHeight = void 0),
              (this.maxWidth = void 0),
              (this.top = void 0),
              (this.bottom = void 0),
              (this.left = void 0),
              (this.right = void 0),
              (this.height = void 0),
              (this.width = void 0),
              (this._margins = void 0),
              (this.position = void 0),
              (this.weight = void 0),
              (this.fullSize = void 0));
          }
          update(t, e, i) {
            ((this.maxWidth = t),
              (this.maxHeight = e),
              (this._margins = i),
              this.setDimensions(),
              this.buildLabels(),
              this.fit());
          }
          setDimensions() {
            this.isHorizontal()
              ? ((this.width = this.maxWidth),
                (this.left = this._margins.left),
                (this.right = this.width))
              : ((this.height = this.maxHeight),
                (this.top = this._margins.top),
                (this.bottom = this.height));
          }
          buildLabels() {
            const t = this.options.labels || {};
            let e = d(t.generateLabels, [this.chart], this) || [];
            (t.filter && (e = e.filter((e) => t.filter(e, this.chart.data))),
              t.sort && (e = e.sort((e, i) => t.sort(e, i, this.chart.data))),
              this.options.reverse && e.reverse(),
              (this.legendItems = e));
          }
          fit() {
            const { options: t, ctx: e } = this;
            if (!t.display) return void (this.width = this.height = 0);
            const i = t.labels,
              n = ke(i.font),
              s = n.size,
              o = this._computeTitleHeight(),
              { boxWidth: a, itemHeight: r } = vo(i, s);
            let l, c;
            ((e.font = n.string),
              this.isHorizontal()
                ? ((l = this.maxWidth), (c = this._fitRows(o, s, a, r) + 10))
                : ((c = this.maxHeight), (l = this._fitCols(o, s, a, r) + 10)),
              (this.width = Math.min(l, t.maxWidth || this.maxWidth)),
              (this.height = Math.min(c, t.maxHeight || this.maxHeight)));
          }
          _fitRows(t, e, i, n) {
            const {
                ctx: s,
                maxWidth: o,
                options: {
                  labels: { padding: a },
                },
              } = this,
              r = (this.legendHitBoxes = []),
              l = (this.lineWidths = [0]),
              c = n + a;
            let h = t;
            ((s.textAlign = "left"), (s.textBaseline = "middle"));
            let u = -1,
              d = -c;
            return (
              this.legendItems.forEach((t, f) => {
                const p = i + e / 2 + s.measureText(t.text).width;
                ((0 === f || l[l.length - 1] + p + 2 * a > o) &&
                  ((h += c),
                  (l[l.length - (f > 0 ? 0 : 1)] = 0),
                  (d += c),
                  u++),
                  (r[f] = { left: 0, top: d, row: u, width: p, height: n }),
                  (l[l.length - 1] += p + a));
              }),
              h
            );
          }
          _fitCols(t, e, i, n) {
            const {
                ctx: s,
                maxHeight: o,
                options: {
                  labels: { padding: a },
                },
              } = this,
              r = (this.legendHitBoxes = []),
              l = (this.columnSizes = []),
              c = o - t;
            let h = a,
              u = 0,
              d = 0,
              f = 0,
              p = 0;
            return (
              this.legendItems.forEach((t, o) => {
                const g = i + e / 2 + s.measureText(t.text).width;
                (o > 0 &&
                  d + n + 2 * a > c &&
                  ((h += u + a),
                  l.push({ width: u, height: d }),
                  (f += u + a),
                  p++,
                  (u = d = 0)),
                  (r[o] = { left: f, top: d, col: p, width: g, height: n }),
                  (u = Math.max(u, g)),
                  (d += n + a));
              }),
              (h += u),
              l.push({ width: u, height: d }),
              h
            );
          }
          adjustHitBoxes() {
            if (!this.options.display) return;
            const t = this._computeTitleHeight(),
              {
                legendHitBoxes: e,
                options: {
                  align: i,
                  labels: { padding: n },
                  rtl: s,
                },
              } = this,
              o = hi(s, this.left, this.width);
            if (this.isHorizontal()) {
              let s = 0,
                a = at(i, this.left + n, this.right - this.lineWidths[s]);
              for (const r of e)
                (s !== r.row &&
                  ((s = r.row),
                  (a = at(i, this.left + n, this.right - this.lineWidths[s]))),
                  (r.top += this.top + t + n),
                  (r.left = o.leftForLtr(o.x(a), r.width)),
                  (a += r.width + n));
            } else {
              let s = 0,
                a = at(
                  i,
                  this.top + t + n,
                  this.bottom - this.columnSizes[s].height,
                );
              for (const r of e)
                (r.col !== s &&
                  ((s = r.col),
                  (a = at(
                    i,
                    this.top + t + n,
                    this.bottom - this.columnSizes[s].height,
                  ))),
                  (r.top = a),
                  (r.left += this.left + n),
                  (r.left = o.leftForLtr(o.x(r.left), r.width)),
                  (a += r.height + n));
            }
          }
          isHorizontal() {
            return (
              "top" === this.options.position ||
              "bottom" === this.options.position
            );
          }
          draw() {
            if (this.options.display) {
              const t = this.ctx;
              (le(t, this), this._draw(), ce(t));
            }
          }
          _draw() {
            const { options: t, columnSizes: e, lineWidths: i, ctx: n } = this,
              { align: s, labels: o } = t,
              a = te.color,
              r = hi(t.rtl, this.left, this.width),
              l = ke(o.font),
              { color: c, padding: u } = o,
              d = l.size,
              f = d / 2;
            let p;
            (this.drawTitle(),
              (n.textAlign = r.textAlign("left")),
              (n.textBaseline = "middle"),
              (n.lineWidth = 0.5),
              (n.font = l.string));
            const { boxWidth: g, boxHeight: m, itemHeight: b } = vo(o, d),
              x = this.isHorizontal(),
              y = this._computeTitleHeight();
            ((p = x
              ? {
                  x: at(s, this.left + u, this.right - i[0]),
                  y: this.top + u + y,
                  line: 0,
                }
              : {
                  x: this.left + u,
                  y: at(s, this.top + y + u, this.bottom - e[0].height),
                  line: 0,
                }),
              ui(this.ctx, t.textDirection));
            const v = b + u;
            (this.legendItems.forEach((_, w) => {
              ((n.strokeStyle = _.fontColor || c),
                (n.fillStyle = _.fontColor || c));
              const k = n.measureText(_.text).width,
                M = r.textAlign(_.textAlign || (_.textAlign = o.textAlign)),
                S = g + f + k;
              let D = p.x,
                P = p.y;
              (r.setWidth(this.width),
                x
                  ? w > 0 &&
                    D + S + u > this.right &&
                    ((P = p.y += v),
                    p.line++,
                    (D = p.x = at(s, this.left + u, this.right - i[p.line])))
                  : w > 0 &&
                    P + v > this.bottom &&
                    ((D = p.x = D + e[p.line].width + u),
                    p.line++,
                    (P = p.y =
                      at(
                        s,
                        this.top + y + u,
                        this.bottom - e[p.line].height,
                      ))));
              (!(function (t, e, i) {
                if (isNaN(g) || g <= 0 || isNaN(m) || m < 0) return;
                n.save();
                const s = h(i.lineWidth, 1);
                if (
                  ((n.fillStyle = h(i.fillStyle, a)),
                  (n.lineCap = h(i.lineCap, "butt")),
                  (n.lineDashOffset = h(i.lineDashOffset, 0)),
                  (n.lineJoin = h(i.lineJoin, "miter")),
                  (n.lineWidth = s),
                  (n.strokeStyle = h(i.strokeStyle, a)),
                  n.setLineDash(h(i.lineDash, [])),
                  o.usePointStyle)
                ) {
                  const a = {
                      radius: (m * Math.SQRT2) / 2,
                      pointStyle: i.pointStyle,
                      rotation: i.rotation,
                      borderWidth: s,
                    },
                    l = r.xPlus(t, g / 2);
                  ae(n, a, l, e + f, o.pointStyleWidth && g);
                } else {
                  const o = e + Math.max((d - m) / 2, 0),
                    a = r.leftForLtr(t, g),
                    l = _e(i.borderRadius);
                  (n.beginPath(),
                    Object.values(l).some((t) => 0 !== t)
                      ? pe(n, { x: a, y: o, w: g, h: m, radius: l })
                      : n.rect(a, o, g, m),
                    n.fill(),
                    0 !== s && n.stroke());
                }
                n.restore();
              })(r.x(D), P, _),
                (D = ((t, e, i, n) =>
                  t === (n ? "left" : "right")
                    ? i
                    : "center" === t
                      ? (e + i) / 2
                      : e)(M, D + g + f, x ? D + S : this.right, t.rtl)),
                (function (t, e, i) {
                  de(n, i.text, t, e + b / 2, l, {
                    strikethrough: i.hidden,
                    textAlign: r.textAlign(i.textAlign),
                  });
                })(r.x(D), P, _),
                x ? (p.x += S + u) : (p.y += v));
            }),
              di(this.ctx, t.textDirection));
          }
          drawTitle() {
            const t = this.options,
              e = t.title,
              i = ke(e.font),
              n = we(e.padding);
            if (!e.display) return;
            const s = hi(t.rtl, this.left, this.width),
              o = this.ctx,
              a = e.position,
              r = i.size / 2,
              l = n.top + r;
            let c,
              h = this.left,
              u = this.width;
            if (this.isHorizontal())
              ((u = Math.max(...this.lineWidths)),
                (c = this.top + l),
                (h = at(t.align, h, this.right - u)));
            else {
              const e = this.columnSizes.reduce(
                (t, e) => Math.max(t, e.height),
                0,
              );
              c =
                l +
                at(
                  t.align,
                  this.top,
                  this.bottom -
                    e -
                    t.labels.padding -
                    this._computeTitleHeight(),
                );
            }
            const d = at(a, h, h + u);
            ((o.textAlign = s.textAlign(ot(a))),
              (o.textBaseline = "middle"),
              (o.strokeStyle = e.color),
              (o.fillStyle = e.color),
              (o.font = i.string),
              de(o, e.text, d, c, i));
          }
          _computeTitleHeight() {
            const t = this.options.title,
              e = ke(t.font),
              i = we(t.padding);
            return t.display ? e.lineHeight + i.height : 0;
          }
          _getLegendItemAt(t, e) {
            let i, n, s;
            if (Z(t, this.left, this.right) && Z(e, this.top, this.bottom))
              for (s = this.legendHitBoxes, i = 0; i < s.length; ++i)
                if (
                  ((n = s[i]),
                  Z(t, n.left, n.left + n.width) &&
                    Z(e, n.top, n.top + n.height))
                )
                  return this.legendItems[i];
            return null;
          }
          handleEvent(t) {
            const e = this.options;
            if (
              !(function (t, e) {
                if (
                  ("mousemove" === t || "mouseout" === t) &&
                  (e.onHover || e.onLeave)
                )
                  return !0;
                if (e.onClick && ("click" === t || "mouseup" === t)) return !0;
                return !1;
              })(t.type, e)
            )
              return;
            const i = this._getLegendItemAt(t.x, t.y);
            if ("mousemove" === t.type || "mouseout" === t.type) {
              const o = this._hoveredItem,
                a =
                  ((s = i),
                  null !== (n = o) &&
                    null !== s &&
                    n.datasetIndex === s.datasetIndex &&
                    n.index === s.index);
              (o && !a && d(e.onLeave, [t, o, this], this),
                (this._hoveredItem = i),
                i && !a && d(e.onHover, [t, i, this], this));
            } else i && d(e.onClick, [t, i, this], this);
            var n, s;
          }
        }
        var wo = {
          id: "legend",
          _element: _o,
          start(t, e, i) {
            const n = (t.legend = new _o({ ctx: t.ctx, options: i, chart: t }));
            (Bn.configure(t, n, i), Bn.addBox(t, n));
          },
          stop(t) {
            (Bn.removeBox(t, t.legend), delete t.legend);
          },
          beforeUpdate(t, e, i) {
            const n = t.legend;
            (Bn.configure(t, n, i), (n.options = i));
          },
          afterUpdate(t) {
            const e = t.legend;
            (e.buildLabels(), e.adjustHitBoxes());
          },
          afterEvent(t, e) {
            e.replay || t.legend.handleEvent(e.event);
          },
          defaults: {
            display: !0,
            position: "top",
            align: "center",
            fullSize: !0,
            reverse: !1,
            weight: 1e3,
            onClick(t, e, i) {
              const n = e.datasetIndex,
                s = i.chart;
              s.isDatasetVisible(n)
                ? (s.hide(n), (e.hidden = !0))
                : (s.show(n), (e.hidden = !1));
            },
            onHover: null,
            onLeave: null,
            labels: {
              color: (t) => t.chart.options.color,
              boxWidth: 40,
              padding: 10,
              generateLabels(t) {
                const e = t.data.datasets,
                  {
                    labels: {
                      usePointStyle: i,
                      pointStyle: n,
                      textAlign: s,
                      color: o,
                    },
                  } = t.legend.options;
                return t._getSortedDatasetMetas().map((t) => {
                  const a = t.controller.getStyle(i ? 0 : void 0),
                    r = we(a.borderWidth);
                  return {
                    text: e[t.index].label,
                    fillStyle: a.backgroundColor,
                    fontColor: o,
                    hidden: !t.visible,
                    lineCap: a.borderCapStyle,
                    lineDash: a.borderDash,
                    lineDashOffset: a.borderDashOffset,
                    lineJoin: a.borderJoinStyle,
                    lineWidth: (r.width + r.height) / 4,
                    strokeStyle: a.borderColor,
                    pointStyle: n || a.pointStyle,
                    rotation: a.rotation,
                    textAlign: s || a.textAlign,
                    borderRadius: 0,
                    datasetIndex: t.index,
                  };
                }, this);
              },
            },
            title: {
              color: (t) => t.chart.options.color,
              display: !1,
              position: "center",
              text: "",
            },
          },
          descriptors: {
            _scriptable: (t) => !t.startsWith("on"),
            labels: {
              _scriptable: (t) =>
                !["generateLabels", "filter", "sort"].includes(t),
            },
          },
        };
        class ko extends Qi {
          constructor(t) {
            (super(),
              (this.chart = t.chart),
              (this.options = t.options),
              (this.ctx = t.ctx),
              (this._padding = void 0),
              (this.top = void 0),
              (this.bottom = void 0),
              (this.left = void 0),
              (this.right = void 0),
              (this.width = void 0),
              (this.height = void 0),
              (this.position = void 0),
              (this.weight = void 0),
              (this.fullSize = void 0));
          }
          update(t, e) {
            const i = this.options;
            if (((this.left = 0), (this.top = 0), !i.display))
              return void (this.width =
                this.height =
                this.right =
                this.bottom =
                  0);
            ((this.width = this.right = t), (this.height = this.bottom = e));
            const n = a(i.text) ? i.text.length : 1;
            this._padding = we(i.padding);
            const s = n * ke(i.font).lineHeight + this._padding.height;
            this.isHorizontal() ? (this.height = s) : (this.width = s);
          }
          isHorizontal() {
            const t = this.options.position;
            return "top" === t || "bottom" === t;
          }
          _drawArgs(t) {
            const { top: e, left: i, bottom: n, right: s, options: o } = this,
              a = o.align;
            let r,
              l,
              c,
              h = 0;
            return (
              this.isHorizontal()
                ? ((l = at(a, i, s)), (c = e + t), (r = s - i))
                : ("left" === o.position
                    ? ((l = i + t), (c = at(a, n, e)), (h = -0.5 * P))
                    : ((l = s - t), (c = at(a, e, n)), (h = 0.5 * P)),
                  (r = n - e)),
              { titleX: l, titleY: c, maxWidth: r, rotation: h }
            );
          }
          draw() {
            const t = this.ctx,
              e = this.options;
            if (!e.display) return;
            const i = ke(e.font),
              n = i.lineHeight / 2 + this._padding.top,
              {
                titleX: s,
                titleY: o,
                maxWidth: a,
                rotation: r,
              } = this._drawArgs(n);
            de(t, e.text, 0, 0, i, {
              color: e.color,
              maxWidth: a,
              rotation: r,
              textAlign: ot(e.align),
              textBaseline: "middle",
              translation: [s, o],
            });
          }
        }
        var Mo = {
          id: "title",
          _element: ko,
          start(t, e, i) {
            !(function (t, e) {
              const i = new ko({ ctx: t.ctx, options: e, chart: t });
              (Bn.configure(t, i, e), Bn.addBox(t, i), (t.titleBlock = i));
            })(t, i);
          },
          stop(t) {
            const e = t.titleBlock;
            (Bn.removeBox(t, e), delete t.titleBlock);
          },
          beforeUpdate(t, e, i) {
            const n = t.titleBlock;
            (Bn.configure(t, n, i), (n.options = i));
          },
          defaults: {
            align: "center",
            display: !1,
            font: { weight: "bold" },
            fullSize: !0,
            padding: 10,
            position: "top",
            text: "",
            weight: 2e3,
          },
          defaultRoutes: { color: "color" },
          descriptors: { _scriptable: !0, _indexable: !1 },
        };
        const So = new WeakMap();
        var Do = {
          id: "subtitle",
          start(t, e, i) {
            const n = new ko({ ctx: t.ctx, options: i, chart: t });
            (Bn.configure(t, n, i), Bn.addBox(t, n), So.set(t, n));
          },
          stop(t) {
            (Bn.removeBox(t, So.get(t)), So.delete(t));
          },
          beforeUpdate(t, e, i) {
            const n = So.get(t);
            (Bn.configure(t, n, i), (n.options = i));
          },
          defaults: {
            align: "center",
            display: !1,
            font: { weight: "normal" },
            fullSize: !0,
            padding: 0,
            position: "top",
            text: "",
            weight: 1500,
          },
          defaultRoutes: { color: "color" },
          descriptors: { _scriptable: !0, _indexable: !1 },
        };
        const Po = {
          average(t) {
            if (!t.length) return !1;
            let e,
              i,
              n = 0,
              s = 0,
              o = 0;
            for (e = 0, i = t.length; e < i; ++e) {
              const i = t[e].element;
              if (i && i.hasValue()) {
                const t = i.tooltipPosition();
                ((n += t.x), (s += t.y), ++o);
              }
            }
            return { x: n / o, y: s / o };
          },
          nearest(t, e) {
            if (!t.length) return !1;
            let i,
              n,
              s,
              o = e.x,
              a = e.y,
              r = Number.POSITIVE_INFINITY;
            for (i = 0, n = t.length; i < n; ++i) {
              const n = t[i].element;
              if (n && n.hasValue()) {
                const t = q(e, n.getCenterPoint());
                t < r && ((r = t), (s = n));
              }
            }
            if (s) {
              const t = s.tooltipPosition();
              ((o = t.x), (a = t.y));
            }
            return { x: o, y: a };
          },
        };
        function Co(t, e) {
          return (
            e && (a(e) ? Array.prototype.push.apply(t, e) : t.push(e)),
            t
          );
        }
        function Eo(t) {
          return ("string" == typeof t || t instanceof String) &&
            t.indexOf("\n") > -1
            ? t.split("\n")
            : t;
        }
        function To(t, e) {
          const { element: i, datasetIndex: n, index: s } = e,
            o = t.getDatasetMeta(n).controller,
            { label: a, value: r } = o.getLabelAndValue(s);
          return {
            chart: t,
            label: a,
            parsed: o.getParsed(s),
            raw: t.data.datasets[n].data[s],
            formattedValue: r,
            dataset: o.getDataset(),
            dataIndex: s,
            datasetIndex: n,
            element: i,
          };
        }
        function Ao(t, e) {
          const i = t.chart.ctx,
            { body: n, footer: s, title: o } = t,
            { boxWidth: a, boxHeight: r } = e,
            l = ke(e.bodyFont),
            c = ke(e.titleFont),
            h = ke(e.footerFont),
            u = o.length,
            d = s.length,
            p = n.length,
            g = we(e.padding);
          let m = g.height,
            b = 0,
            x = n.reduce(
              (t, e) => t + e.before.length + e.lines.length + e.after.length,
              0,
            );
          if (
            ((x += t.beforeBody.length + t.afterBody.length),
            u &&
              (m +=
                u * c.lineHeight +
                (u - 1) * e.titleSpacing +
                e.titleMarginBottom),
            x)
          ) {
            m +=
              p * (e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight) +
              (x - p) * l.lineHeight +
              (x - 1) * e.bodySpacing;
          }
          d &&
            (m +=
              e.footerMarginTop + d * h.lineHeight + (d - 1) * e.footerSpacing);
          let y = 0;
          const v = function (t) {
            b = Math.max(b, i.measureText(t).width + y);
          };
          return (
            i.save(),
            (i.font = c.string),
            f(t.title, v),
            (i.font = l.string),
            f(t.beforeBody.concat(t.afterBody), v),
            (y = e.displayColors ? a + 2 + e.boxPadding : 0),
            f(n, (t) => {
              (f(t.before, v), f(t.lines, v), f(t.after, v));
            }),
            (y = 0),
            (i.font = h.string),
            f(t.footer, v),
            i.restore(),
            (b += g.width),
            { width: b, height: m }
          );
        }
        function Oo(t, e, i, n) {
          const { x: s, width: o } = i,
            {
              width: a,
              chartArea: { left: r, right: l },
            } = t;
          let c = "center";
          return (
            "center" === n
              ? (c = s <= (r + l) / 2 ? "left" : "right")
              : s <= o / 2
                ? (c = "left")
                : s >= a - o / 2 && (c = "right"),
            (function (t, e, i, n) {
              const { x: s, width: o } = n,
                a = i.caretSize + i.caretPadding;
              return (
                ("left" === t && s + o + a > e.width) ||
                ("right" === t && s - o - a < 0) ||
                void 0
              );
            })(c, t, e, i) && (c = "center"),
            c
          );
        }
        function Io(t, e, i) {
          const n =
            i.yAlign ||
            e.yAlign ||
            (function (t, e) {
              const { y: i, height: n } = e;
              return i < n / 2
                ? "top"
                : i > t.height - n / 2
                  ? "bottom"
                  : "center";
            })(t, i);
          return { xAlign: i.xAlign || e.xAlign || Oo(t, e, i, n), yAlign: n };
        }
        function Fo(t, e, i, n) {
          const { caretSize: s, caretPadding: o, cornerRadius: a } = t,
            { xAlign: r, yAlign: l } = i,
            c = s + o,
            { topLeft: h, topRight: u, bottomLeft: d, bottomRight: f } = _e(a);
          let p = (function (t, e) {
            let { x: i, width: n } = t;
            return (
              "right" === e ? (i -= n) : "center" === e && (i -= n / 2),
              i
            );
          })(e, r);
          const g = (function (t, e, i) {
            let { y: n, height: s } = t;
            return (
              "top" === e ? (n += i) : (n -= "bottom" === e ? s + i : s / 2),
              n
            );
          })(e, l, c);
          return (
            "center" === l
              ? "left" === r
                ? (p += c)
                : "right" === r && (p -= c)
              : "left" === r
                ? (p -= Math.max(h, d) + s)
                : "right" === r && (p += Math.max(u, f) + s),
            { x: G(p, 0, n.width - e.width), y: G(g, 0, n.height - e.height) }
          );
        }
        function Lo(t, e, i) {
          const n = we(i.padding);
          return "center" === e
            ? t.x + t.width / 2
            : "right" === e
              ? t.x + t.width - n.right
              : t.x + n.left;
        }
        function Ro(t) {
          return Co([], Eo(t));
        }
        function zo(t, e) {
          const i =
            e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
          return i ? t.override(i) : t;
        }
        class Bo extends Qi {
          constructor(t) {
            (super(),
              (this.opacity = 0),
              (this._active = []),
              (this._eventPosition = void 0),
              (this._size = void 0),
              (this._cachedAnimations = void 0),
              (this._tooltipItems = []),
              (this.$animations = void 0),
              (this.$context = void 0),
              (this.chart = t.chart || t._chart),
              (this._chart = this.chart),
              (this.options = t.options),
              (this.dataPoints = void 0),
              (this.title = void 0),
              (this.beforeBody = void 0),
              (this.body = void 0),
              (this.afterBody = void 0),
              (this.footer = void 0),
              (this.xAlign = void 0),
              (this.yAlign = void 0),
              (this.x = void 0),
              (this.y = void 0),
              (this.height = void 0),
              (this.width = void 0),
              (this.caretX = void 0),
              (this.caretY = void 0),
              (this.labelColors = void 0),
              (this.labelPointStyles = void 0),
              (this.labelTextColors = void 0));
          }
          initialize(t) {
            ((this.options = t),
              (this._cachedAnimations = void 0),
              (this.$context = void 0));
          }
          _resolveAnimations() {
            const t = this._cachedAnimations;
            if (t) return t;
            const e = this.chart,
              i = this.options.setContext(this.getContext()),
              n = i.enabled && e.options.animation && i.animations,
              s = new Si(this.chart, n);
            return (
              n._cacheable && (this._cachedAnimations = Object.freeze(s)),
              s
            );
          }
          getContext() {
            return (
              this.$context ||
              (this.$context =
                ((t = this.chart.getContext()),
                (e = this),
                (i = this._tooltipItems),
                Se(t, { tooltip: e, tooltipItems: i, type: "tooltip" })))
            );
            var t, e, i;
          }
          getTitle(t, e) {
            const { callbacks: i } = e,
              n = i.beforeTitle.apply(this, [t]),
              s = i.title.apply(this, [t]),
              o = i.afterTitle.apply(this, [t]);
            let a = [];
            return (
              (a = Co(a, Eo(n))),
              (a = Co(a, Eo(s))),
              (a = Co(a, Eo(o))),
              a
            );
          }
          getBeforeBody(t, e) {
            return Ro(e.callbacks.beforeBody.apply(this, [t]));
          }
          getBody(t, e) {
            const { callbacks: i } = e,
              n = [];
            return (
              f(t, (t) => {
                const e = { before: [], lines: [], after: [] },
                  s = zo(i, t);
                (Co(e.before, Eo(s.beforeLabel.call(this, t))),
                  Co(e.lines, s.label.call(this, t)),
                  Co(e.after, Eo(s.afterLabel.call(this, t))),
                  n.push(e));
              }),
              n
            );
          }
          getAfterBody(t, e) {
            return Ro(e.callbacks.afterBody.apply(this, [t]));
          }
          getFooter(t, e) {
            const { callbacks: i } = e,
              n = i.beforeFooter.apply(this, [t]),
              s = i.footer.apply(this, [t]),
              o = i.afterFooter.apply(this, [t]);
            let a = [];
            return (
              (a = Co(a, Eo(n))),
              (a = Co(a, Eo(s))),
              (a = Co(a, Eo(o))),
              a
            );
          }
          _createItems(t) {
            const e = this._active,
              i = this.chart.data,
              n = [],
              s = [],
              o = [];
            let a,
              r,
              l = [];
            for (a = 0, r = e.length; a < r; ++a) l.push(To(this.chart, e[a]));
            return (
              t.filter && (l = l.filter((e, n, s) => t.filter(e, n, s, i))),
              t.itemSort && (l = l.sort((e, n) => t.itemSort(e, n, i))),
              f(l, (e) => {
                const i = zo(t.callbacks, e);
                (n.push(i.labelColor.call(this, e)),
                  s.push(i.labelPointStyle.call(this, e)),
                  o.push(i.labelTextColor.call(this, e)));
              }),
              (this.labelColors = n),
              (this.labelPointStyles = s),
              (this.labelTextColors = o),
              (this.dataPoints = l),
              l
            );
          }
          update(t, e) {
            const i = this.options.setContext(this.getContext()),
              n = this._active;
            let s,
              o = [];
            if (n.length) {
              const t = Po[i.position].call(this, n, this._eventPosition);
              ((o = this._createItems(i)),
                (this.title = this.getTitle(o, i)),
                (this.beforeBody = this.getBeforeBody(o, i)),
                (this.body = this.getBody(o, i)),
                (this.afterBody = this.getAfterBody(o, i)),
                (this.footer = this.getFooter(o, i)));
              const e = (this._size = Ao(this, i)),
                a = Object.assign({}, t, e),
                r = Io(this.chart, i, a),
                l = Fo(i, a, r, this.chart);
              ((this.xAlign = r.xAlign),
                (this.yAlign = r.yAlign),
                (s = {
                  opacity: 1,
                  x: l.x,
                  y: l.y,
                  width: e.width,
                  height: e.height,
                  caretX: t.x,
                  caretY: t.y,
                }));
            } else 0 !== this.opacity && (s = { opacity: 0 });
            ((this._tooltipItems = o),
              (this.$context = void 0),
              s && this._resolveAnimations().update(this, s),
              t &&
                i.external &&
                i.external.call(this, {
                  chart: this.chart,
                  tooltip: this,
                  replay: e,
                }));
          }
          drawCaret(t, e, i, n) {
            const s = this.getCaretPosition(t, i, n);
            (e.lineTo(s.x1, s.y1), e.lineTo(s.x2, s.y2), e.lineTo(s.x3, s.y3));
          }
          getCaretPosition(t, e, i) {
            const { xAlign: n, yAlign: s } = this,
              { caretSize: o, cornerRadius: a } = i,
              {
                topLeft: r,
                topRight: l,
                bottomLeft: c,
                bottomRight: h,
              } = _e(a),
              { x: u, y: d } = t,
              { width: f, height: p } = e;
            let g, m, b, x, y, v;
            return (
              "center" === s
                ? ((y = d + p / 2),
                  "left" === n
                    ? ((g = u), (m = g - o), (x = y + o), (v = y - o))
                    : ((g = u + f), (m = g + o), (x = y - o), (v = y + o)),
                  (b = g))
                : ((m =
                    "left" === n
                      ? u + Math.max(r, c) + o
                      : "right" === n
                        ? u + f - Math.max(l, h) - o
                        : this.caretX),
                  "top" === s
                    ? ((x = d), (y = x - o), (g = m - o), (b = m + o))
                    : ((x = d + p), (y = x + o), (g = m + o), (b = m - o)),
                  (v = x)),
              { x1: g, x2: m, x3: b, y1: x, y2: y, y3: v }
            );
          }
          drawTitle(t, e, i) {
            const n = this.title,
              s = n.length;
            let o, a, r;
            if (s) {
              const l = hi(i.rtl, this.x, this.width);
              for (
                t.x = Lo(this, i.titleAlign, i),
                  e.textAlign = l.textAlign(i.titleAlign),
                  e.textBaseline = "middle",
                  o = ke(i.titleFont),
                  a = i.titleSpacing,
                  e.fillStyle = i.titleColor,
                  e.font = o.string,
                  r = 0;
                r < s;
                ++r
              )
                (e.fillText(n[r], l.x(t.x), t.y + o.lineHeight / 2),
                  (t.y += o.lineHeight + a),
                  r + 1 === s && (t.y += i.titleMarginBottom - a));
            }
          }
          _drawColorBox(t, e, i, n, s) {
            const o = this.labelColors[i],
              a = this.labelPointStyles[i],
              { boxHeight: l, boxWidth: c, boxPadding: h } = s,
              u = ke(s.bodyFont),
              d = Lo(this, "left", s),
              f = n.x(d),
              p = l < u.lineHeight ? (u.lineHeight - l) / 2 : 0,
              g = e.y + p;
            if (s.usePointStyle) {
              const e = {
                  radius: Math.min(c, l) / 2,
                  pointStyle: a.pointStyle,
                  rotation: a.rotation,
                  borderWidth: 1,
                },
                i = n.leftForLtr(f, c) + c / 2,
                r = g + l / 2;
              ((t.strokeStyle = s.multiKeyBackground),
                (t.fillStyle = s.multiKeyBackground),
                oe(t, e, i, r),
                (t.strokeStyle = o.borderColor),
                (t.fillStyle = o.backgroundColor),
                oe(t, e, i, r));
            } else {
              ((t.lineWidth = r(o.borderWidth)
                ? Math.max(...Object.values(o.borderWidth))
                : o.borderWidth || 1),
                (t.strokeStyle = o.borderColor),
                t.setLineDash(o.borderDash || []),
                (t.lineDashOffset = o.borderDashOffset || 0));
              const e = n.leftForLtr(f, c - h),
                i = n.leftForLtr(n.xPlus(f, 1), c - h - 2),
                a = _e(o.borderRadius);
              Object.values(a).some((t) => 0 !== t)
                ? (t.beginPath(),
                  (t.fillStyle = s.multiKeyBackground),
                  pe(t, { x: e, y: g, w: c, h: l, radius: a }),
                  t.fill(),
                  t.stroke(),
                  (t.fillStyle = o.backgroundColor),
                  t.beginPath(),
                  pe(t, { x: i, y: g + 1, w: c - 2, h: l - 2, radius: a }),
                  t.fill())
                : ((t.fillStyle = s.multiKeyBackground),
                  t.fillRect(e, g, c, l),
                  t.strokeRect(e, g, c, l),
                  (t.fillStyle = o.backgroundColor),
                  t.fillRect(i, g + 1, c - 2, l - 2));
            }
            t.fillStyle = this.labelTextColors[i];
          }
          drawBody(t, e, i) {
            const { body: n } = this,
              {
                bodySpacing: s,
                bodyAlign: o,
                displayColors: a,
                boxHeight: r,
                boxWidth: l,
                boxPadding: c,
              } = i,
              h = ke(i.bodyFont);
            let u = h.lineHeight,
              d = 0;
            const p = hi(i.rtl, this.x, this.width),
              g = function (i) {
                (e.fillText(i, p.x(t.x + d), t.y + u / 2), (t.y += u + s));
              },
              m = p.textAlign(o);
            let b, x, y, v, _, w, k;
            for (
              e.textAlign = o,
                e.textBaseline = "middle",
                e.font = h.string,
                t.x = Lo(this, m, i),
                e.fillStyle = i.bodyColor,
                f(this.beforeBody, g),
                d =
                  a && "right" !== m
                    ? "center" === o
                      ? l / 2 + c
                      : l + 2 + c
                    : 0,
                v = 0,
                w = n.length;
              v < w;
              ++v
            ) {
              for (
                b = n[v],
                  x = this.labelTextColors[v],
                  e.fillStyle = x,
                  f(b.before, g),
                  y = b.lines,
                  a &&
                    y.length &&
                    (this._drawColorBox(e, t, v, p, i),
                    (u = Math.max(h.lineHeight, r))),
                  _ = 0,
                  k = y.length;
                _ < k;
                ++_
              )
                (g(y[_]), (u = h.lineHeight));
              f(b.after, g);
            }
            ((d = 0), (u = h.lineHeight), f(this.afterBody, g), (t.y -= s));
          }
          drawFooter(t, e, i) {
            const n = this.footer,
              s = n.length;
            let o, a;
            if (s) {
              const r = hi(i.rtl, this.x, this.width);
              for (
                t.x = Lo(this, i.footerAlign, i),
                  t.y += i.footerMarginTop,
                  e.textAlign = r.textAlign(i.footerAlign),
                  e.textBaseline = "middle",
                  o = ke(i.footerFont),
                  e.fillStyle = i.footerColor,
                  e.font = o.string,
                  a = 0;
                a < s;
                ++a
              )
                (e.fillText(n[a], r.x(t.x), t.y + o.lineHeight / 2),
                  (t.y += o.lineHeight + i.footerSpacing));
            }
          }
          drawBackground(t, e, i, n) {
            const { xAlign: s, yAlign: o } = this,
              { x: a, y: r } = t,
              { width: l, height: c } = i,
              {
                topLeft: h,
                topRight: u,
                bottomLeft: d,
                bottomRight: f,
              } = _e(n.cornerRadius);
            ((e.fillStyle = n.backgroundColor),
              (e.strokeStyle = n.borderColor),
              (e.lineWidth = n.borderWidth),
              e.beginPath(),
              e.moveTo(a + h, r),
              "top" === o && this.drawCaret(t, e, i, n),
              e.lineTo(a + l - u, r),
              e.quadraticCurveTo(a + l, r, a + l, r + u),
              "center" === o && "right" === s && this.drawCaret(t, e, i, n),
              e.lineTo(a + l, r + c - f),
              e.quadraticCurveTo(a + l, r + c, a + l - f, r + c),
              "bottom" === o && this.drawCaret(t, e, i, n),
              e.lineTo(a + d, r + c),
              e.quadraticCurveTo(a, r + c, a, r + c - d),
              "center" === o && "left" === s && this.drawCaret(t, e, i, n),
              e.lineTo(a, r + h),
              e.quadraticCurveTo(a, r, a + h, r),
              e.closePath(),
              e.fill(),
              n.borderWidth > 0 && e.stroke());
          }
          _updateAnimationTarget(t) {
            const e = this.chart,
              i = this.$animations,
              n = i && i.x,
              s = i && i.y;
            if (n || s) {
              const i = Po[t.position].call(
                this,
                this._active,
                this._eventPosition,
              );
              if (!i) return;
              const o = (this._size = Ao(this, t)),
                a = Object.assign({}, i, this._size),
                r = Io(e, t, a),
                l = Fo(t, a, r, e);
              (n._to === l.x && s._to === l.y) ||
                ((this.xAlign = r.xAlign),
                (this.yAlign = r.yAlign),
                (this.width = o.width),
                (this.height = o.height),
                (this.caretX = i.x),
                (this.caretY = i.y),
                this._resolveAnimations().update(this, l));
            }
          }
          _willRender() {
            return !!this.opacity;
          }
          draw(t) {
            const e = this.options.setContext(this.getContext());
            let i = this.opacity;
            if (!i) return;
            this._updateAnimationTarget(e);
            const n = { width: this.width, height: this.height },
              s = { x: this.x, y: this.y };
            i = Math.abs(i) < 0.001 ? 0 : i;
            const o = we(e.padding),
              a =
                this.title.length ||
                this.beforeBody.length ||
                this.body.length ||
                this.afterBody.length ||
                this.footer.length;
            e.enabled &&
              a &&
              (t.save(),
              (t.globalAlpha = i),
              this.drawBackground(s, t, n, e),
              ui(t, e.textDirection),
              (s.y += o.top),
              this.drawTitle(s, t, e),
              this.drawBody(s, t, e),
              this.drawFooter(s, t, e),
              di(t, e.textDirection),
              t.restore());
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(t, e) {
            const i = this._active,
              n = t.map(({ datasetIndex: t, index: e }) => {
                const i = this.chart.getDatasetMeta(t);
                if (!i) throw new Error("Cannot find a dataset at index " + t);
                return { datasetIndex: t, element: i.data[e], index: e };
              }),
              s = !p(i, n),
              o = this._positionChanged(n, e);
            (s || o) &&
              ((this._active = n),
              (this._eventPosition = e),
              (this._ignoreReplayEvents = !0),
              this.update(!0));
          }
          handleEvent(t, e, i = !0) {
            if (e && this._ignoreReplayEvents) return !1;
            this._ignoreReplayEvents = !1;
            const n = this.options,
              s = this._active || [],
              o = this._getActiveElements(t, s, e, i),
              a = this._positionChanged(o, t),
              r = e || !p(o, s) || a;
            return (
              r &&
                ((this._active = o),
                (n.enabled || n.external) &&
                  ((this._eventPosition = { x: t.x, y: t.y }),
                  this.update(!0, e))),
              r
            );
          }
          _getActiveElements(t, e, i, n) {
            const s = this.options;
            if ("mouseout" === t.type) return [];
            if (!n) return e;
            const o = this.chart.getElementsAtEventForMode(t, s.mode, s, i);
            return (s.reverse && o.reverse(), o);
          }
          _positionChanged(t, e) {
            const { caretX: i, caretY: n, options: s } = this,
              o = Po[s.position].call(this, t, e);
            return !1 !== o && (i !== o.x || n !== o.y);
          }
        }
        Bo.positioners = Po;
        var jo = {
            id: "tooltip",
            _element: Bo,
            positioners: Po,
            afterInit(t, e, i) {
              i && (t.tooltip = new Bo({ chart: t, options: i }));
            },
            beforeUpdate(t, e, i) {
              t.tooltip && t.tooltip.initialize(i);
            },
            reset(t, e, i) {
              t.tooltip && t.tooltip.initialize(i);
            },
            afterDraw(t) {
              const e = t.tooltip;
              if (e && e._willRender()) {
                const i = { tooltip: e };
                if (!1 === t.notifyPlugins("beforeTooltipDraw", i)) return;
                (e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i));
              }
            },
            afterEvent(t, e) {
              if (t.tooltip) {
                const i = e.replay;
                t.tooltip.handleEvent(e.event, i, e.inChartArea) &&
                  (e.changed = !0);
              }
            },
            defaults: {
              enabled: !0,
              external: null,
              position: "average",
              backgroundColor: "rgba(0,0,0,0.8)",
              titleColor: "#fff",
              titleFont: { weight: "bold" },
              titleSpacing: 2,
              titleMarginBottom: 6,
              titleAlign: "left",
              bodyColor: "#fff",
              bodySpacing: 2,
              bodyFont: {},
              bodyAlign: "left",
              footerColor: "#fff",
              footerSpacing: 2,
              footerMarginTop: 6,
              footerFont: { weight: "bold" },
              footerAlign: "left",
              padding: 6,
              caretPadding: 2,
              caretSize: 5,
              cornerRadius: 6,
              boxHeight: (t, e) => e.bodyFont.size,
              boxWidth: (t, e) => e.bodyFont.size,
              multiKeyBackground: "#fff",
              displayColors: !0,
              boxPadding: 0,
              borderColor: "rgba(0,0,0,0)",
              borderWidth: 0,
              animation: { duration: 400, easing: "easeOutQuart" },
              animations: {
                numbers: {
                  type: "number",
                  properties: ["x", "y", "width", "height", "caretX", "caretY"],
                },
                opacity: { easing: "linear", duration: 200 },
              },
              callbacks: {
                beforeTitle: n,
                title(t) {
                  if (t.length > 0) {
                    const e = t[0],
                      i = e.chart.data.labels,
                      n = i ? i.length : 0;
                    if (this && this.options && "dataset" === this.options.mode)
                      return e.dataset.label || "";
                    if (e.label) return e.label;
                    if (n > 0 && e.dataIndex < n) return i[e.dataIndex];
                  }
                  return "";
                },
                afterTitle: n,
                beforeBody: n,
                beforeLabel: n,
                label(t) {
                  if (this && this.options && "dataset" === this.options.mode)
                    return (
                      t.label + ": " + t.formattedValue || t.formattedValue
                    );
                  let e = t.dataset.label || "";
                  e && (e += ": ");
                  const i = t.formattedValue;
                  return (o(i) || (e += i), e);
                },
                labelColor(t) {
                  const e = t.chart
                    .getDatasetMeta(t.datasetIndex)
                    .controller.getStyle(t.dataIndex);
                  return {
                    borderColor: e.borderColor,
                    backgroundColor: e.backgroundColor,
                    borderWidth: e.borderWidth,
                    borderDash: e.borderDash,
                    borderDashOffset: e.borderDashOffset,
                    borderRadius: 0,
                  };
                },
                labelTextColor() {
                  return this.options.bodyColor;
                },
                labelPointStyle(t) {
                  const e = t.chart
                    .getDatasetMeta(t.datasetIndex)
                    .controller.getStyle(t.dataIndex);
                  return { pointStyle: e.pointStyle, rotation: e.rotation };
                },
                afterLabel: n,
                afterBody: n,
                beforeFooter: n,
                footer: n,
                afterFooter: n,
              },
            },
            defaultRoutes: {
              bodyFont: "font",
              footerFont: "font",
              titleFont: "font",
            },
            descriptors: {
              _scriptable: (t) =>
                "filter" !== t && "itemSort" !== t && "external" !== t,
              _indexable: !1,
              callbacks: { _scriptable: !1, _indexable: !1 },
              animation: { _fallback: !1 },
              animations: { _fallback: "animation" },
            },
            additionalOptionScopes: ["interaction"],
          },
          Vo = Object.freeze({
            __proto__: null,
            Decimation: eo,
            Filler: yo,
            Legend: wo,
            SubTitle: Do,
            Title: Mo,
            Tooltip: jo,
          });
        function Wo(t, e, i, n) {
          const s = t.indexOf(e);
          if (-1 === s)
            return ((t, e, i, n) => (
              "string" == typeof e
                ? ((i = t.push(e) - 1), n.unshift({ index: i, label: e }))
                : isNaN(e) && (i = null),
              i
            ))(t, e, i, n);
          return s !== t.lastIndexOf(e) ? i : s;
        }
        class No extends un {
          constructor(t) {
            (super(t),
              (this._startValue = void 0),
              (this._valueRange = 0),
              (this._addedLabels = []));
          }
          init(t) {
            const e = this._addedLabels;
            if (e.length) {
              const t = this.getLabels();
              for (const { index: i, label: n } of e)
                t[i] === n && t.splice(i, 1);
              this._addedLabels = [];
            }
            super.init(t);
          }
          parse(t, e) {
            if (o(t)) return null;
            const i = this.getLabels();
            return ((t, e) => (null === t ? null : G(Math.round(t), 0, e)))(
              (e =
                isFinite(e) && i[e] === t
                  ? e
                  : Wo(i, t, h(e, t), this._addedLabels)),
              i.length - 1,
            );
          }
          determineDataLimits() {
            const { minDefined: t, maxDefined: e } = this.getUserBounds();
            let { min: i, max: n } = this.getMinMax(!0);
            ("ticks" === this.options.bounds &&
              (t || (i = 0), e || (n = this.getLabels().length - 1)),
              (this.min = i),
              (this.max = n));
          }
          buildTicks() {
            const t = this.min,
              e = this.max,
              i = this.options.offset,
              n = [];
            let s = this.getLabels();
            ((s = 0 === t && e === s.length - 1 ? s : s.slice(t, e + 1)),
              (this._valueRange = Math.max(s.length - (i ? 0 : 1), 1)),
              (this._startValue = this.min - (i ? 0.5 : 0)));
            for (let i = t; i <= e; i++) n.push({ value: i });
            return n;
          }
          getLabelForValue(t) {
            const e = this.getLabels();
            return t >= 0 && t < e.length ? e[t] : t;
          }
          configure() {
            (super.configure(),
              this.isHorizontal() ||
                (this._reversePixels = !this._reversePixels));
          }
          getPixelForValue(t) {
            return (
              "number" != typeof t && (t = this.parse(t)),
              null === t
                ? NaN
                : this.getPixelForDecimal(
                    (t - this._startValue) / this._valueRange,
                  )
            );
          }
          getPixelForTick(t) {
            const e = this.ticks;
            return t < 0 || t > e.length - 1
              ? null
              : this.getPixelForValue(e[t].value);
          }
          getValueForPixel(t) {
            return Math.round(
              this._startValue + this.getDecimalForPixel(t) * this._valueRange,
            );
          }
          getBasePixel() {
            return this.bottom;
          }
        }
        function Ho(t, e) {
          const i = [],
            {
              bounds: n,
              step: s,
              min: a,
              max: r,
              precision: l,
              count: c,
              maxTicks: h,
              maxDigits: u,
              includeBounds: d,
            } = t,
            f = s || 1,
            p = h - 1,
            { min: g, max: m } = e,
            b = !o(a),
            x = !o(r),
            y = !o(c),
            v = (m - g) / (u + 1);
          let _,
            w,
            k,
            M,
            S = z((m - g) / p / f) * f;
          if (S < 1e-14 && !b && !x) return [{ value: g }, { value: m }];
          ((M = Math.ceil(m / S) - Math.floor(g / S)),
            M > p && (S = z((M * S) / p / f) * f),
            o(l) || ((_ = Math.pow(10, l)), (S = Math.ceil(S * _) / _)),
            "ticks" === n
              ? ((w = Math.floor(g / S) * S), (k = Math.ceil(m / S) * S))
              : ((w = g), (k = m)),
            b &&
            x &&
            s &&
            (function (t, e) {
              const i = Math.round(t);
              return i - e <= t && i + e >= t;
            })((r - a) / s, S / 1e3)
              ? ((M = Math.round(Math.min((r - a) / S, h))),
                (S = (r - a) / M),
                (w = a),
                (k = r))
              : y
                ? ((w = b ? a : w),
                  (k = x ? r : k),
                  (M = c - 1),
                  (S = (k - w) / M))
                : ((M = (k - w) / S),
                  (M = j(M, Math.round(M), S / 1e3)
                    ? Math.round(M)
                    : Math.ceil(M))));
          const D = Math.max(H(S), H(w));
          ((_ = Math.pow(10, o(l) ? D : l)),
            (w = Math.round(w * _) / _),
            (k = Math.round(k * _) / _));
          let P = 0;
          for (
            b &&
            (d && w !== a
              ? (i.push({ value: a }),
                w < a && P++,
                j(Math.round((w + P * S) * _) / _, a, $o(a, v, t)) && P++)
              : w < a && P++);
            P < M;
            ++P
          )
            i.push({ value: Math.round((w + P * S) * _) / _ });
          return (
            x && d && k !== r
              ? i.length && j(i[i.length - 1].value, r, $o(r, v, t))
                ? (i[i.length - 1].value = r)
                : i.push({ value: r })
              : (x && k !== r) || i.push({ value: k }),
            i
          );
        }
        function $o(t, e, { horizontal: i, minRotation: n }) {
          const s = W(n),
            o = (i ? Math.sin(s) : Math.cos(s)) || 0.001,
            a = 0.75 * e * ("" + t).length;
          return Math.min(e / o, a);
        }
        ((No.id = "category"),
          (No.defaults = {
            ticks: { callback: No.prototype.getLabelForValue },
          }));
        class qo extends un {
          constructor(t) {
            (super(t),
              (this.start = void 0),
              (this.end = void 0),
              (this._startValue = void 0),
              (this._endValue = void 0),
              (this._valueRange = 0));
          }
          parse(t, e) {
            return o(t) ||
              (("number" == typeof t || t instanceof Number) && !isFinite(+t))
              ? null
              : +t;
          }
          handleTickRangeOptions() {
            const { beginAtZero: t } = this.options,
              { minDefined: e, maxDefined: i } = this.getUserBounds();
            let { min: n, max: s } = this;
            const o = (t) => (n = e ? n : t),
              a = (t) => (s = i ? s : t);
            if (t) {
              const t = R(n),
                e = R(s);
              t < 0 && e < 0 ? a(0) : t > 0 && e > 0 && o(0);
            }
            if (n === s) {
              let e = 1;
              ((s >= Number.MAX_SAFE_INTEGER || n <= Number.MIN_SAFE_INTEGER) &&
                (e = Math.abs(0.05 * s)),
                a(s + e),
                t || o(n - e));
            }
            ((this.min = n), (this.max = s));
          }
          getTickLimit() {
            const t = this.options.ticks;
            let e,
              { maxTicksLimit: i, stepSize: n } = t;
            return (
              n
                ? ((e = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1),
                  e > 1e3 && (e = 1e3))
                : ((e = this.computeTickLimit()), (i = i || 11)),
              i && (e = Math.min(i, e)),
              e
            );
          }
          computeTickLimit() {
            return Number.POSITIVE_INFINITY;
          }
          buildTicks() {
            const t = this.options,
              e = t.ticks;
            let i = this.getTickLimit();
            i = Math.max(2, i);
            const n = Ho(
              {
                maxTicks: i,
                bounds: t.bounds,
                min: t.min,
                max: t.max,
                precision: e.precision,
                step: e.stepSize,
                count: e.count,
                maxDigits: this._maxDigits(),
                horizontal: this.isHorizontal(),
                minRotation: e.minRotation || 0,
                includeBounds: !1 !== e.includeBounds,
              },
              this._range || this,
            );
            return (
              "ticks" === t.bounds && V(n, this, "value"),
              t.reverse
                ? (n.reverse(), (this.start = this.max), (this.end = this.min))
                : ((this.start = this.min), (this.end = this.max)),
              n
            );
          }
          configure() {
            const t = this.ticks;
            let e = this.min,
              i = this.max;
            if ((super.configure(), this.options.offset && t.length)) {
              const n = (i - e) / Math.max(t.length - 1, 1) / 2;
              ((e -= n), (i += n));
            }
            ((this._startValue = e),
              (this._endValue = i),
              (this._valueRange = i - e));
          }
          getLabelForValue(t) {
            return ci(t, this.chart.options.locale, this.options.ticks.format);
          }
        }
        class Yo extends qo {
          determineDataLimits() {
            const { min: t, max: e } = this.getMinMax(!0);
            ((this.min = l(t) ? t : 0),
              (this.max = l(e) ? e : 1),
              this.handleTickRangeOptions());
          }
          computeTickLimit() {
            const t = this.isHorizontal(),
              e = t ? this.width : this.height,
              i = W(this.options.ticks.minRotation),
              n = (t ? Math.sin(i) : Math.cos(i)) || 0.001,
              s = this._resolveTickFontOptions(0);
            return Math.ceil(e / Math.min(40, s.lineHeight / n));
          }
          getPixelForValue(t) {
            return null === t
              ? NaN
              : this.getPixelForDecimal(
                  (t - this._startValue) / this._valueRange,
                );
          }
          getValueForPixel(t) {
            return (
              this._startValue + this.getDecimalForPixel(t) * this._valueRange
            );
          }
        }
        function Uo(t) {
          return 1 === t / Math.pow(10, Math.floor(L(t)));
        }
        ((Yo.id = "linear"),
          (Yo.defaults = { ticks: { callback: en.formatters.numeric } }));
        class Xo extends un {
          constructor(t) {
            (super(t),
              (this.start = void 0),
              (this.end = void 0),
              (this._startValue = void 0),
              (this._valueRange = 0));
          }
          parse(t, e) {
            const i = qo.prototype.parse.apply(this, [t, e]);
            if (0 !== i) return l(i) && i > 0 ? i : null;
            this._zero = !0;
          }
          determineDataLimits() {
            const { min: t, max: e } = this.getMinMax(!0);
            ((this.min = l(t) ? Math.max(0, t) : null),
              (this.max = l(e) ? Math.max(0, e) : null),
              this.options.beginAtZero && (this._zero = !0),
              this.handleTickRangeOptions());
          }
          handleTickRangeOptions() {
            const { minDefined: t, maxDefined: e } = this.getUserBounds();
            let i = this.min,
              n = this.max;
            const s = (e) => (i = t ? i : e),
              o = (t) => (n = e ? n : t),
              a = (t, e) => Math.pow(10, Math.floor(L(t)) + e);
            (i === n && (i <= 0 ? (s(1), o(10)) : (s(a(i, -1)), o(a(n, 1)))),
              i <= 0 && s(a(n, -1)),
              n <= 0 && o(a(i, 1)),
              this._zero &&
                this.min !== this._suggestedMin &&
                i === a(this.min, 0) &&
                s(a(i, -1)),
              (this.min = i),
              (this.max = n));
          }
          buildTicks() {
            const t = this.options,
              e = (function (t, e) {
                const i = Math.floor(L(e.max)),
                  n = Math.ceil(e.max / Math.pow(10, i)),
                  s = [];
                let o = c(t.min, Math.pow(10, Math.floor(L(e.min)))),
                  a = Math.floor(L(o)),
                  r = Math.floor(o / Math.pow(10, a)),
                  l = a < 0 ? Math.pow(10, Math.abs(a)) : 1;
                do {
                  (s.push({ value: o, major: Uo(o) }),
                    ++r,
                    10 === r && ((r = 1), ++a, (l = a >= 0 ? 1 : l)),
                    (o = Math.round(r * Math.pow(10, a) * l) / l));
                } while (a < i || (a === i && r < n));
                const h = c(t.max, o);
                return (s.push({ value: h, major: Uo(o) }), s);
              })({ min: this._userMin, max: this._userMax }, this);
            return (
              "ticks" === t.bounds && V(e, this, "value"),
              t.reverse
                ? (e.reverse(), (this.start = this.max), (this.end = this.min))
                : ((this.start = this.min), (this.end = this.max)),
              e
            );
          }
          getLabelForValue(t) {
            return void 0 === t
              ? "0"
              : ci(t, this.chart.options.locale, this.options.ticks.format);
          }
          configure() {
            const t = this.min;
            (super.configure(),
              (this._startValue = L(t)),
              (this._valueRange = L(this.max) - L(t)));
          }
          getPixelForValue(t) {
            return (
              (void 0 !== t && 0 !== t) || (t = this.min),
              null === t || isNaN(t)
                ? NaN
                : this.getPixelForDecimal(
                    t === this.min
                      ? 0
                      : (L(t) - this._startValue) / this._valueRange,
                  )
            );
          }
          getValueForPixel(t) {
            const e = this.getDecimalForPixel(t);
            return Math.pow(10, this._startValue + e * this._valueRange);
          }
        }
        function Go(t) {
          const e = t.ticks;
          if (e.display && t.display) {
            const t = we(e.backdropPadding);
            return h(e.font && e.font.size, te.font.size) + t.height;
          }
          return 0;
        }
        function Zo(t, e, i) {
          return (
            (i = a(i) ? i : [i]),
            { w: ie(t, e.string, i), h: i.length * e.lineHeight }
          );
        }
        function Ko(t, e, i, n, s) {
          return t === n || t === s
            ? { start: e - i / 2, end: e + i / 2 }
            : t < n || t > s
              ? { start: e - i, end: e }
              : { start: e, end: e + i };
        }
        function Jo(t) {
          const e = {
              l: t.left + t._padding.left,
              r: t.right - t._padding.right,
              t: t.top + t._padding.top,
              b: t.bottom - t._padding.bottom,
            },
            i = Object.assign({}, e),
            n = [],
            s = [],
            o = t._pointLabels.length,
            a = t.options.pointLabels,
            r = a.centerPointLabels ? P / o : 0;
          for (let l = 0; l < o; l++) {
            const o = a.setContext(t.getPointLabelContext(l));
            s[l] = o.padding;
            const c = t.getPointPosition(l, t.drawingArea + s[l], r),
              h = ke(o.font),
              u = Zo(t.ctx, h, t._pointLabels[l]);
            n[l] = u;
            const d = U(t.getIndexAngle(l) + r),
              f = Math.round(N(d));
            Qo(i, e, d, Ko(f, c.x, u.w, 0, 180), Ko(f, c.y, u.h, 90, 270));
          }
          (t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b),
            (t._pointLabelItems = (function (t, e, i) {
              const n = [],
                s = t._pointLabels.length,
                o = t.options,
                a = Go(o) / 2,
                r = t.drawingArea,
                l = o.pointLabels.centerPointLabels ? P / s : 0;
              for (let o = 0; o < s; o++) {
                const s = t.getPointPosition(o, r + a + i[o], l),
                  c = Math.round(N(U(s.angle + O))),
                  h = e[o],
                  u = ia(s.y, h.h, c),
                  d = ta(c),
                  f = ea(s.x, h.w, d);
                n.push({
                  x: s.x,
                  y: u,
                  textAlign: d,
                  left: f,
                  top: u,
                  right: f + h.w,
                  bottom: u + h.h,
                });
              }
              return n;
            })(t, n, s)));
        }
        function Qo(t, e, i, n, s) {
          const o = Math.abs(Math.sin(i)),
            a = Math.abs(Math.cos(i));
          let r = 0,
            l = 0;
          (n.start < e.l
            ? ((r = (e.l - n.start) / o), (t.l = Math.min(t.l, e.l - r)))
            : n.end > e.r &&
              ((r = (n.end - e.r) / o), (t.r = Math.max(t.r, e.r + r))),
            s.start < e.t
              ? ((l = (e.t - s.start) / a), (t.t = Math.min(t.t, e.t - l)))
              : s.end > e.b &&
                ((l = (s.end - e.b) / a), (t.b = Math.max(t.b, e.b + l))));
        }
        function ta(t) {
          return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
        }
        function ea(t, e, i) {
          return ("right" === i ? (t -= e) : "center" === i && (t -= e / 2), t);
        }
        function ia(t, e, i) {
          return (
            90 === i || 270 === i
              ? (t -= e / 2)
              : (i > 270 || i < 90) && (t -= e),
            t
          );
        }
        function na(t, e, i, n) {
          const { ctx: s } = t;
          if (i) s.arc(t.xCenter, t.yCenter, e, 0, C);
          else {
            let i = t.getPointPosition(0, e);
            s.moveTo(i.x, i.y);
            for (let o = 1; o < n; o++)
              ((i = t.getPointPosition(o, e)), s.lineTo(i.x, i.y));
          }
        }
        ((Xo.id = "logarithmic"),
          (Xo.defaults = {
            ticks: {
              callback: en.formatters.logarithmic,
              major: { enabled: !0 },
            },
          }));
        class sa extends qo {
          constructor(t) {
            (super(t),
              (this.xCenter = void 0),
              (this.yCenter = void 0),
              (this.drawingArea = void 0),
              (this._pointLabels = []),
              (this._pointLabelItems = []));
          }
          setDimensions() {
            const t = (this._padding = we(Go(this.options) / 2)),
              e = (this.width = this.maxWidth - t.width),
              i = (this.height = this.maxHeight - t.height);
            ((this.xCenter = Math.floor(this.left + e / 2 + t.left)),
              (this.yCenter = Math.floor(this.top + i / 2 + t.top)),
              (this.drawingArea = Math.floor(Math.min(e, i) / 2)));
          }
          determineDataLimits() {
            const { min: t, max: e } = this.getMinMax(!1);
            ((this.min = l(t) && !isNaN(t) ? t : 0),
              (this.max = l(e) && !isNaN(e) ? e : 0),
              this.handleTickRangeOptions());
          }
          computeTickLimit() {
            return Math.ceil(this.drawingArea / Go(this.options));
          }
          generateTickLabels(t) {
            (qo.prototype.generateTickLabels.call(this, t),
              (this._pointLabels = this.getLabels()
                .map((t, e) => {
                  const i = d(this.options.pointLabels.callback, [t, e], this);
                  return i || 0 === i ? i : "";
                })
                .filter((t, e) => this.chart.getDataVisibility(e))));
          }
          fit() {
            const t = this.options;
            t.display && t.pointLabels.display
              ? Jo(this)
              : this.setCenterPoint(0, 0, 0, 0);
          }
          setCenterPoint(t, e, i, n) {
            ((this.xCenter += Math.floor((t - e) / 2)),
              (this.yCenter += Math.floor((i - n) / 2)),
              (this.drawingArea -= Math.min(
                this.drawingArea / 2,
                Math.max(t, e, i, n),
              )));
          }
          getIndexAngle(t) {
            return U(
              t * (C / (this._pointLabels.length || 1)) +
                W(this.options.startAngle || 0),
            );
          }
          getDistanceFromCenterForValue(t) {
            if (o(t)) return NaN;
            const e = this.drawingArea / (this.max - this.min);
            return this.options.reverse
              ? (this.max - t) * e
              : (t - this.min) * e;
          }
          getValueForDistanceFromCenter(t) {
            if (o(t)) return NaN;
            const e = t / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - e : this.min + e;
          }
          getPointLabelContext(t) {
            const e = this._pointLabels || [];
            if (t >= 0 && t < e.length) {
              const i = e[t];
              return (function (t, e, i) {
                return Se(t, { label: i, index: e, type: "pointLabel" });
              })(this.getContext(), t, i);
            }
          }
          getPointPosition(t, e, i = 0) {
            const n = this.getIndexAngle(t) - O + i;
            return {
              x: Math.cos(n) * e + this.xCenter,
              y: Math.sin(n) * e + this.yCenter,
              angle: n,
            };
          }
          getPointPositionForValue(t, e) {
            return this.getPointPosition(
              t,
              this.getDistanceFromCenterForValue(e),
            );
          }
          getBasePosition(t) {
            return this.getPointPositionForValue(t || 0, this.getBaseValue());
          }
          getPointLabelPosition(t) {
            const {
              left: e,
              top: i,
              right: n,
              bottom: s,
            } = this._pointLabelItems[t];
            return { left: e, top: i, right: n, bottom: s };
          }
          drawBackground() {
            const {
              backgroundColor: t,
              grid: { circular: e },
            } = this.options;
            if (t) {
              const i = this.ctx;
              (i.save(),
                i.beginPath(),
                na(
                  this,
                  this.getDistanceFromCenterForValue(this._endValue),
                  e,
                  this._pointLabels.length,
                ),
                i.closePath(),
                (i.fillStyle = t),
                i.fill(),
                i.restore());
            }
          }
          drawGrid() {
            const t = this.ctx,
              e = this.options,
              { angleLines: i, grid: n } = e,
              s = this._pointLabels.length;
            let a, r, l;
            if (
              (e.pointLabels.display &&
                (function (t, e) {
                  const {
                    ctx: i,
                    options: { pointLabels: n },
                  } = t;
                  for (let s = e - 1; s >= 0; s--) {
                    const e = n.setContext(t.getPointLabelContext(s)),
                      a = ke(e.font),
                      {
                        x: r,
                        y: l,
                        textAlign: c,
                        left: h,
                        top: u,
                        right: d,
                        bottom: f,
                      } = t._pointLabelItems[s],
                      { backdropColor: p } = e;
                    if (!o(p)) {
                      const t = _e(e.borderRadius),
                        n = we(e.backdropPadding);
                      i.fillStyle = p;
                      const s = h - n.left,
                        o = u - n.top,
                        a = d - h + n.width,
                        r = f - u + n.height;
                      Object.values(t).some((t) => 0 !== t)
                        ? (i.beginPath(),
                          pe(i, { x: s, y: o, w: a, h: r, radius: t }),
                          i.fill())
                        : i.fillRect(s, o, a, r);
                    }
                    de(i, t._pointLabels[s], r, l + a.lineHeight / 2, a, {
                      color: e.color,
                      textAlign: c,
                      textBaseline: "middle",
                    });
                  }
                })(this, s),
              n.display &&
                this.ticks.forEach((t, e) => {
                  if (0 !== e) {
                    r = this.getDistanceFromCenterForValue(t.value);
                    !(function (t, e, i, n) {
                      const s = t.ctx,
                        o = e.circular,
                        { color: a, lineWidth: r } = e;
                      (!o && !n) ||
                        !a ||
                        !r ||
                        i < 0 ||
                        (s.save(),
                        (s.strokeStyle = a),
                        (s.lineWidth = r),
                        s.setLineDash(e.borderDash),
                        (s.lineDashOffset = e.borderDashOffset),
                        s.beginPath(),
                        na(t, i, o, n),
                        s.closePath(),
                        s.stroke(),
                        s.restore());
                    })(this, n.setContext(this.getContext(e - 1)), r, s);
                  }
                }),
              i.display)
            ) {
              for (t.save(), a = s - 1; a >= 0; a--) {
                const n = i.setContext(this.getPointLabelContext(a)),
                  { color: s, lineWidth: o } = n;
                o &&
                  s &&
                  ((t.lineWidth = o),
                  (t.strokeStyle = s),
                  t.setLineDash(n.borderDash),
                  (t.lineDashOffset = n.borderDashOffset),
                  (r = this.getDistanceFromCenterForValue(
                    e.ticks.reverse ? this.min : this.max,
                  )),
                  (l = this.getPointPosition(a, r)),
                  t.beginPath(),
                  t.moveTo(this.xCenter, this.yCenter),
                  t.lineTo(l.x, l.y),
                  t.stroke());
              }
              t.restore();
            }
          }
          drawBorder() {}
          drawLabels() {
            const t = this.ctx,
              e = this.options,
              i = e.ticks;
            if (!i.display) return;
            const n = this.getIndexAngle(0);
            let s, o;
            (t.save(),
              t.translate(this.xCenter, this.yCenter),
              t.rotate(n),
              (t.textAlign = "center"),
              (t.textBaseline = "middle"),
              this.ticks.forEach((n, a) => {
                if (0 === a && !e.reverse) return;
                const r = i.setContext(this.getContext(a)),
                  l = ke(r.font);
                if (
                  ((s = this.getDistanceFromCenterForValue(
                    this.ticks[a].value,
                  )),
                  r.showLabelBackdrop)
                ) {
                  ((t.font = l.string),
                    (o = t.measureText(n.label).width),
                    (t.fillStyle = r.backdropColor));
                  const e = we(r.backdropPadding);
                  t.fillRect(
                    -o / 2 - e.left,
                    -s - l.size / 2 - e.top,
                    o + e.width,
                    l.size + e.height,
                  );
                }
                de(t, n.label, 0, -s, l, { color: r.color });
              }),
              t.restore());
          }
          drawTitle() {}
        }
        ((sa.id = "radialLinear"),
          (sa.defaults = {
            display: !0,
            animate: !0,
            position: "chartArea",
            angleLines: {
              display: !0,
              lineWidth: 1,
              borderDash: [],
              borderDashOffset: 0,
            },
            grid: { circular: !1 },
            startAngle: 0,
            ticks: { showLabelBackdrop: !0, callback: en.formatters.numeric },
            pointLabels: {
              backdropColor: void 0,
              backdropPadding: 2,
              display: !0,
              font: { size: 10 },
              callback: (t) => t,
              padding: 5,
              centerPointLabels: !1,
            },
          }),
          (sa.defaultRoutes = {
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color",
          }),
          (sa.descriptors = { angleLines: { _fallback: "grid" } }));
        const oa = {
            millisecond: { common: !0, size: 1, steps: 1e3 },
            second: { common: !0, size: 1e3, steps: 60 },
            minute: { common: !0, size: 6e4, steps: 60 },
            hour: { common: !0, size: 36e5, steps: 24 },
            day: { common: !0, size: 864e5, steps: 30 },
            week: { common: !1, size: 6048e5, steps: 4 },
            month: { common: !0, size: 2628e6, steps: 12 },
            quarter: { common: !1, size: 7884e6, steps: 4 },
            year: { common: !0, size: 3154e7 },
          },
          aa = Object.keys(oa);
        function ra(t, e) {
          return t - e;
        }
        function la(t, e) {
          if (o(e)) return null;
          const i = t._adapter,
            { parser: n, round: s, isoWeekday: a } = t._parseOpts;
          let r = e;
          return (
            "function" == typeof n && (r = n(r)),
            l(r) || (r = "string" == typeof n ? i.parse(r, n) : i.parse(r)),
            null === r
              ? null
              : (s &&
                  (r =
                    "week" !== s || (!B(a) && !0 !== a)
                      ? i.startOf(r, s)
                      : i.startOf(r, "isoWeek", a)),
                +r)
          );
        }
        function ca(t, e, i, n) {
          const s = aa.length;
          for (let o = aa.indexOf(t); o < s - 1; ++o) {
            const t = oa[aa[o]],
              s = t.steps ? t.steps : Number.MAX_SAFE_INTEGER;
            if (t.common && Math.ceil((i - e) / (s * t.size)) <= n)
              return aa[o];
          }
          return aa[s - 1];
        }
        function ha(t, e, i) {
          if (i) {
            if (i.length) {
              const { lo: n, hi: s } = K(i, e);
              t[i[n] >= e ? i[n] : i[s]] = !0;
            }
          } else t[e] = !0;
        }
        function ua(t, e, i) {
          const n = [],
            s = {},
            o = e.length;
          let a, r;
          for (a = 0; a < o; ++a)
            ((r = e[a]), (s[r] = a), n.push({ value: r, major: !1 }));
          return 0 !== o && i
            ? (function (t, e, i, n) {
                const s = t._adapter,
                  o = +s.startOf(e[0].value, n),
                  a = e[e.length - 1].value;
                let r, l;
                for (r = o; r <= a; r = +s.add(r, 1, n))
                  ((l = i[r]), l >= 0 && (e[l].major = !0));
                return e;
              })(t, n, s, i)
            : n;
        }
        class da extends un {
          constructor(t) {
            (super(t),
              (this._cache = { data: [], labels: [], all: [] }),
              (this._unit = "day"),
              (this._majorUnit = void 0),
              (this._offsets = {}),
              (this._normalized = !1),
              (this._parseOpts = void 0));
          }
          init(t, e) {
            const i = t.time || (t.time = {}),
              n = (this._adapter = new xn._date(t.adapters.date));
            (n.init(e),
              y(i.displayFormats, n.formats()),
              (this._parseOpts = {
                parser: i.parser,
                round: i.round,
                isoWeekday: i.isoWeekday,
              }),
              super.init(t),
              (this._normalized = e.normalized));
          }
          parse(t, e) {
            return void 0 === t ? null : la(this, t);
          }
          beforeLayout() {
            (super.beforeLayout(),
              (this._cache = { data: [], labels: [], all: [] }));
          }
          determineDataLimits() {
            const t = this.options,
              e = this._adapter,
              i = t.time.unit || "day";
            let {
              min: n,
              max: s,
              minDefined: o,
              maxDefined: a,
            } = this.getUserBounds();
            function r(t) {
              (o || isNaN(t.min) || (n = Math.min(n, t.min)),
                a || isNaN(t.max) || (s = Math.max(s, t.max)));
            }
            ((o && a) ||
              (r(this._getLabelBounds()),
              ("ticks" === t.bounds && "labels" === t.ticks.source) ||
                r(this.getMinMax(!1))),
              (n = l(n) && !isNaN(n) ? n : +e.startOf(Date.now(), i)),
              (s = l(s) && !isNaN(s) ? s : +e.endOf(Date.now(), i) + 1),
              (this.min = Math.min(n, s - 1)),
              (this.max = Math.max(n + 1, s)));
          }
          _getLabelBounds() {
            const t = this.getLabelTimestamps();
            let e = Number.POSITIVE_INFINITY,
              i = Number.NEGATIVE_INFINITY;
            return (
              t.length && ((e = t[0]), (i = t[t.length - 1])),
              { min: e, max: i }
            );
          }
          buildTicks() {
            const t = this.options,
              e = t.time,
              i = t.ticks,
              n =
                "labels" === i.source
                  ? this.getLabelTimestamps()
                  : this._generate();
            "ticks" === t.bounds &&
              n.length &&
              ((this.min = this._userMin || n[0]),
              (this.max = this._userMax || n[n.length - 1]));
            const s = this.min,
              o = (function (t, e, i) {
                let n = 0,
                  s = t.length;
                for (; n < s && t[n] < e; ) n++;
                for (; s > n && t[s - 1] > i; ) s--;
                return n > 0 || s < t.length ? t.slice(n, s) : t;
              })(n, s, this.max);
            return (
              (this._unit =
                e.unit ||
                (i.autoSkip
                  ? ca(e.minUnit, this.min, this.max, this._getLabelCapacity(s))
                  : (function (t, e, i, n, s) {
                      for (let o = aa.length - 1; o >= aa.indexOf(i); o--) {
                        const i = aa[o];
                        if (oa[i].common && t._adapter.diff(s, n, i) >= e - 1)
                          return i;
                      }
                      return aa[i ? aa.indexOf(i) : 0];
                    })(this, o.length, e.minUnit, this.min, this.max))),
              (this._majorUnit =
                i.major.enabled && "year" !== this._unit
                  ? (function (t) {
                      for (let e = aa.indexOf(t) + 1, i = aa.length; e < i; ++e)
                        if (oa[aa[e]].common) return aa[e];
                    })(this._unit)
                  : void 0),
              this.initOffsets(n),
              t.reverse && o.reverse(),
              ua(this, o, this._majorUnit)
            );
          }
          afterAutoSkip() {
            this.options.offsetAfterAutoskip &&
              this.initOffsets(this.ticks.map((t) => +t.value));
          }
          initOffsets(t) {
            let e,
              i,
              n = 0,
              s = 0;
            this.options.offset &&
              t.length &&
              ((e = this.getDecimalForValue(t[0])),
              (n =
                1 === t.length
                  ? 1 - e
                  : (this.getDecimalForValue(t[1]) - e) / 2),
              (i = this.getDecimalForValue(t[t.length - 1])),
              (s =
                1 === t.length
                  ? i
                  : (i - this.getDecimalForValue(t[t.length - 2])) / 2));
            const o = t.length < 3 ? 0.5 : 0.25;
            ((n = G(n, 0, o)),
              (s = G(s, 0, o)),
              (this._offsets = { start: n, end: s, factor: 1 / (n + 1 + s) }));
          }
          _generate() {
            const t = this._adapter,
              e = this.min,
              i = this.max,
              n = this.options,
              s = n.time,
              o = s.unit || ca(s.minUnit, e, i, this._getLabelCapacity(e)),
              a = h(s.stepSize, 1),
              r = "week" === o && s.isoWeekday,
              l = B(r) || !0 === r,
              c = {};
            let u,
              d,
              f = e;
            if (
              (l && (f = +t.startOf(f, "isoWeek", r)),
              (f = +t.startOf(f, l ? "day" : o)),
              t.diff(i, e, o) > 1e5 * a)
            )
              throw new Error(
                e +
                  " and " +
                  i +
                  " are too far apart with stepSize of " +
                  a +
                  " " +
                  o,
              );
            const p = "data" === n.ticks.source && this.getDataTimestamps();
            for (u = f, d = 0; u < i; u = +t.add(u, a, o), d++) ha(c, u, p);
            return (
              (u !== i && "ticks" !== n.bounds && 1 !== d) || ha(c, u, p),
              Object.keys(c)
                .sort((t, e) => t - e)
                .map((t) => +t)
            );
          }
          getLabelForValue(t) {
            const e = this._adapter,
              i = this.options.time;
            return i.tooltipFormat
              ? e.format(t, i.tooltipFormat)
              : e.format(t, i.displayFormats.datetime);
          }
          _tickFormatFunction(t, e, i, n) {
            const s = this.options,
              o = s.time.displayFormats,
              a = this._unit,
              r = this._majorUnit,
              l = a && o[a],
              c = r && o[r],
              h = i[e],
              u = r && c && h && h.major,
              f = this._adapter.format(t, n || (u ? c : l)),
              p = s.ticks.callback;
            return p ? d(p, [f, e, i], this) : f;
          }
          generateTickLabels(t) {
            let e, i, n;
            for (e = 0, i = t.length; e < i; ++e)
              ((n = t[e]), (n.label = this._tickFormatFunction(n.value, e, t)));
          }
          getDecimalForValue(t) {
            return null === t ? NaN : (t - this.min) / (this.max - this.min);
          }
          getPixelForValue(t) {
            const e = this._offsets,
              i = this.getDecimalForValue(t);
            return this.getPixelForDecimal((e.start + i) * e.factor);
          }
          getValueForPixel(t) {
            const e = this._offsets,
              i = this.getDecimalForPixel(t) / e.factor - e.end;
            return this.min + i * (this.max - this.min);
          }
          _getLabelSize(t) {
            const e = this.options.ticks,
              i = this.ctx.measureText(t).width,
              n = W(this.isHorizontal() ? e.maxRotation : e.minRotation),
              s = Math.cos(n),
              o = Math.sin(n),
              a = this._resolveTickFontOptions(0).size;
            return { w: i * s + a * o, h: i * o + a * s };
          }
          _getLabelCapacity(t) {
            const e = this.options.time,
              i = e.displayFormats,
              n = i[e.unit] || i.millisecond,
              s = this._tickFormatFunction(
                t,
                0,
                ua(this, [t], this._majorUnit),
                n,
              ),
              o = this._getLabelSize(s),
              a =
                Math.floor(
                  this.isHorizontal() ? this.width / o.w : this.height / o.h,
                ) - 1;
            return a > 0 ? a : 1;
          }
          getDataTimestamps() {
            let t,
              e,
              i = this._cache.data || [];
            if (i.length) return i;
            const n = this.getMatchingVisibleMetas();
            if (this._normalized && n.length)
              return (this._cache.data =
                n[0].controller.getAllParsedValues(this));
            for (t = 0, e = n.length; t < e; ++t)
              i = i.concat(n[t].controller.getAllParsedValues(this));
            return (this._cache.data = this.normalize(i));
          }
          getLabelTimestamps() {
            const t = this._cache.labels || [];
            let e, i;
            if (t.length) return t;
            const n = this.getLabels();
            for (e = 0, i = n.length; e < i; ++e) t.push(la(this, n[e]));
            return (this._cache.labels = this._normalized
              ? t
              : this.normalize(t));
          }
          normalize(t) {
            return it(t.sort(ra));
          }
        }
        function fa(t, e, i) {
          let n,
            s,
            o,
            a,
            r = 0,
            l = t.length - 1;
          i
            ? (e >= t[r].pos &&
                e <= t[l].pos &&
                ({ lo: r, hi: l } = J(t, "pos", e)),
              ({ pos: n, time: o } = t[r]),
              ({ pos: s, time: a } = t[l]))
            : (e >= t[r].time &&
                e <= t[l].time &&
                ({ lo: r, hi: l } = J(t, "time", e)),
              ({ time: n, pos: o } = t[r]),
              ({ time: s, pos: a } = t[l]));
          const c = s - n;
          return c ? o + ((a - o) * (e - n)) / c : o;
        }
        ((da.id = "time"),
          (da.defaults = {
            bounds: "data",
            adapters: {},
            time: {
              parser: !1,
              unit: !1,
              round: !1,
              isoWeekday: !1,
              minUnit: "millisecond",
              displayFormats: {},
            },
            ticks: { source: "auto", major: { enabled: !1 } },
          }));
        class pa extends da {
          constructor(t) {
            (super(t),
              (this._table = []),
              (this._minPos = void 0),
              (this._tableRange = void 0));
          }
          initOffsets() {
            const t = this._getTimestampsForTable(),
              e = (this._table = this.buildLookupTable(t));
            ((this._minPos = fa(e, this.min)),
              (this._tableRange = fa(e, this.max) - this._minPos),
              super.initOffsets(t));
          }
          buildLookupTable(t) {
            const { min: e, max: i } = this,
              n = [],
              s = [];
            let o, a, r, l, c;
            for (o = 0, a = t.length; o < a; ++o)
              ((l = t[o]), l >= e && l <= i && n.push(l));
            if (n.length < 2)
              return [
                { time: e, pos: 0 },
                { time: i, pos: 1 },
              ];
            for (o = 0, a = n.length; o < a; ++o)
              ((c = n[o + 1]),
                (r = n[o - 1]),
                (l = n[o]),
                Math.round((c + r) / 2) !== l &&
                  s.push({ time: l, pos: o / (a - 1) }));
            return s;
          }
          _getTimestampsForTable() {
            let t = this._cache.all || [];
            if (t.length) return t;
            const e = this.getDataTimestamps(),
              i = this.getLabelTimestamps();
            return (
              (t =
                e.length && i.length
                  ? this.normalize(e.concat(i))
                  : e.length
                    ? e
                    : i),
              (t = this._cache.all = t),
              t
            );
          }
          getDecimalForValue(t) {
            return (fa(this._table, t) - this._minPos) / this._tableRange;
          }
          getValueForPixel(t) {
            const e = this._offsets,
              i = this.getDecimalForPixel(t) / e.factor - e.end;
            return fa(this._table, i * this._tableRange + this._minPos, !0);
          }
        }
        ((pa.id = "timeseries"), (pa.defaults = da.defaults));
        const ga = [
          gn,
          Js,
          Vo,
          Object.freeze({
            __proto__: null,
            CategoryScale: No,
            LinearScale: Yo,
            LogarithmicScale: Xo,
            RadialLinearScale: sa,
            TimeScale: da,
            TimeSeriesScale: pa,
          }),
        ];
        Ss.register(...ga);
        const ma = Ss;
        var ba = i(3573);
        function xa(t) {
          var e = t.title,
            i = t.displayWidth,
            n = t.scale,
            s = void 0 === n ? 2 : n,
            o = t.ctx,
            a = t.fontRatio,
            r = void 0 === a ? 0.06 : a,
            l = t.minFontSize,
            c = void 0 === l ? 18 : l,
            h = t.maxFontSize,
            u = void 0 === h ? 45 : h,
            d = t.leftPadding,
            f = void 0 === d ? 0 : d,
            p = t.topPadding,
            g = void 0 === p ? 0 : p,
            m = t.bottomSpacing,
            b = void 0 === m ? "default" : m;
          if (!e)
            return {
              displayTitle: "",
              fontPx: 0,
              fontDisplay: 0,
              leftPx: 0,
              topPx: 0,
              bottomPx: 0,
              totalHeightPx: 0,
              totalHeightDisplay: 0,
            };
          var x,
            y = Math.min(Math.max(Math.round(i * r), c), u),
            v = y * s;
          x =
            "compact" === b
              ? Math.round(0.3 * v)
              : "number" == typeof b
                ? b * s
                : Math.round(0.5 * v);
          var _ = (function (t, e) {
              var i =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 30,
                n =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 12;
              if (!t) return { displayTitle: "", fontSize: i };
              var s =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : null;
              if (
                (s ||
                  ("undefined" != typeof document &&
                    "function" == typeof document.createElement &&
                    (s = document.createElement("canvas").getContext("2d"))),
                !s)
              )
                return {
                  displayTitle: t.length > 20 ? t.substring(0, 20) + "…" : t,
                  fontSize: n,
                };
              var o = i;
              s.font = "bold ".concat(o, "px sans-serif");
              var a = t,
                r = s.measureText(a).width;
              if (r > e)
                for (; a.length > 0; ) {
                  var l = (a = a.slice(0, -1)) + "…";
                  if ((r = s.measureText(l).width) <= e) {
                    a = l;
                    break;
                  }
                }
              for (
                s.font = "bold ".concat(o, "px sans-serif"),
                  r = s.measureText(a).width;
                r > e && o > n;

              )
                ((o -= 1),
                  (s.font = "bold ".concat(o, "px sans-serif")),
                  (r = s.measureText(a).width));
              return { displayTitle: a, fontSize: o };
            })(e, Math.max(10, i - 2 * f) * s, v, c * s, o),
            w = g * s,
            k = w + v + x;
          return {
            displayTitle: _.displayTitle,
            fontPx: v,
            fontDisplay: y,
            leftPx: f * s,
            leftDisplay: f,
            topPx: w,
            topDisplay: g,
            bottomPx: x,
            bottomDisplay: x / s,
            totalHeightPx: k,
            totalHeightDisplay: k / s,
          };
        }
        var ya = i.n(ba)().drawCorrelationChart;
        function va(t) {
          var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
          if (!t.startsWith("#")) {
            var i = document.createElement("canvas");
            i.width = i.height = 1;
            var n = i.getContext("2d");
            n.fillStyle = t;
            var s = n.fillStyle;
            if (!s.startsWith("#"))
              return 1 === e || t.includes("rgba")
                ? t
                : t.replace("rgb", "rgba").replace(")", ", ".concat(e, ")"));
            t = s;
          }
          var o = parseInt(t.slice(1, 3), 16),
            a = parseInt(t.slice(3, 5), 16),
            r = parseInt(t.slice(5, 7), 16);
          return "rgba("
            .concat(o, ", ")
            .concat(a, ", ")
            .concat(r, ", ")
            .concat(e, ")");
        }
        function _a(t, e) {
          var i = document.getElementById(t);
          return i
            ? (i.chart && (i.chart.destroy(), (i.chart = null)),
              (function (t, e) {
                var i = t.parentElement,
                  n = window.getComputedStyle(i),
                  s = parseFloat(n.paddingLeft) || 0,
                  o = parseFloat(n.paddingRight) || 0,
                  a = i.clientWidth - s - o,
                  r = Math.min(a, 600),
                  l = 2 * r;
                if (
                  ((e.displayWidth = r),
                  (e.scale = 2),
                  (t.style.width = r + "px"),
                  (t.style.maxWidth = "100%"),
                  (t.style.height = "auto"),
                  "scatter" === e.chartType)
                ) {
                  var c = t.getContext("2d"),
                    h = xa({
                      title: e.title,
                      displayWidth: r,
                      scale: 2,
                      ctx: c,
                    });
                  ((t.width = l), (t.height = l + h.totalHeightPx));
                } else if ("table" === e.chartType) {
                  var u = e.title ? 1.1 : 1;
                  ((t.width = l), (t.height = l * u));
                } else if ("correlation" === e.chartType) {
                  var d = t.getContext("2d"),
                    f = xa({
                      title: e.title,
                      displayWidth: r,
                      scale: 2,
                      ctx: d,
                      bottomSpacing: "compact",
                    });
                  ((t.width = l), (t.height = l + f.totalHeightPx));
                } else ((t.width = l), (t.height = (l / 5) * 4));
                switch (e.chartType) {
                  case "scatter":
                    return (
                      (function (t, e) {
                        var i,
                          n,
                          s,
                          o,
                          a,
                          r,
                          l,
                          c,
                          h = t.getContext("2d"),
                          u = t.width,
                          d = t.height,
                          f = function (t) {
                            var e = 0.022 * u,
                              i = Math.max(0.4, 1 - 0.018 * (t - 10)),
                              n = 2 * (Math.round(e * i * 10) / 10),
                              s = Math.max(0.02 * u, 16);
                            return (
                              (n = Math.max(n, s)),
                              (n = Math.min(n, 60))
                            );
                          },
                          p =
                            (f(10),
                            xa({
                              title: e.title,
                              displayWidth: e.displayWidth,
                              scale: e.scale,
                              ctx: h,
                            })),
                          g = p.totalHeightPx,
                          m = 0.02 * u,
                          b = function (t) {
                            if (!t) return 0;
                            var e = Array.isArray(t) ? t : [t];
                            return f(e.length);
                          },
                          x = b(
                            null === (i = e.labels) || void 0 === i
                              ? void 0
                              : i.left,
                          ),
                          y = b(
                            null === (n = e.labels) || void 0 === n
                              ? void 0
                              : n.right,
                          ),
                          v =
                            null !== (s = e.labels) && void 0 !== s && s.top
                              ? Math.min(e.labels.top.length, 30)
                              : 0,
                          _ =
                            null !== (o = e.labels) && void 0 !== o && o.bottom
                              ? Math.min(e.labels.bottom.length, 30)
                              : 0,
                          w = v > 0 ? f(v) : 0,
                          k = _ > 0 ? f(_) : 0,
                          M = x > 0 ? 1.5 * x : 0,
                          S = y > 0 ? 1.5 * y : 0,
                          D = w > 0 ? 1.3 * w : 0,
                          P = k > 0 ? 1.3 * k : 0,
                          C = Math.max(m, Math.max(M, S)),
                          E = Math.max(m, Math.max(D, P)),
                          T = d - g,
                          A = Math.min(u - 2 * C, T - 2 * E),
                          O = C,
                          I = g + E,
                          F = O + A,
                          L = I + A,
                          R = { x: O + A / 2, y: I + A / 2 };
                        ((h.fillStyle = "white"),
                          h.fillRect(0, 0, u, d),
                          p.displayTitle &&
                            ((h.font = "bold ".concat(
                              p.fontPx,
                              "px sans-serif",
                            )),
                            (h.fillStyle = "#333333"),
                            (h.textAlign = "left"),
                            (h.textBaseline = "top"),
                            h.fillText(p.displayTitle, p.leftPx, p.topPx)));
                        ((h.strokeStyle = "#AAA"),
                          (h.lineWidth = 0.8),
                          h.beginPath(),
                          h.moveTo(O, R.y),
                          h.lineTo(F, R.y),
                          h.moveTo(R.x, I),
                          h.lineTo(R.x, L),
                          h.stroke(),
                          (h.fillStyle = "#222"));
                        var z = function (t) {
                          var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 30;
                          return t.length > e ? t.substring(0, e) : t;
                        };
                        if (null !== (a = e.labels) && void 0 !== a && a.left) {
                          var B = Array.isArray(e.labels.left)
                              ? e.labels.left
                              : [e.labels.left],
                            j = B.length,
                            V = f(j);
                          ((h.font = "".concat(V, "px sans-serif")),
                            (h.textAlign = "center"),
                            (h.textBaseline = "middle"));
                          var W = O - 0.5 * V,
                            N = 1.1 * V,
                            H = B.length * N,
                            $ = R.y - H / 2 + N / 2;
                          B.forEach(function (t, e) {
                            h.fillText(t, W, $ + N * e);
                          });
                        }
                        if (
                          null !== (r = e.labels) &&
                          void 0 !== r &&
                          r.right
                        ) {
                          var q = Array.isArray(e.labels.right)
                              ? e.labels.right
                              : [e.labels.right],
                            Y = q.length,
                            U = f(Y);
                          ((h.font = "".concat(U, "px sans-serif")),
                            (h.textAlign = "center"),
                            (h.textBaseline = "middle"));
                          var X = F + 0.5 * U,
                            G = 1.1 * U,
                            Z = q.length * G,
                            K = R.y - Z / 2 + G / 2;
                          q.forEach(function (t, e) {
                            h.fillText(t, X, K + G * e);
                          });
                        }
                        if (null !== (l = e.labels) && void 0 !== l && l.top) {
                          var J = z(e.labels.top),
                            Q = J.length,
                            tt = f(Q);
                          ((h.font = "".concat(tt, "px sans-serif")),
                            (h.textAlign = "center"),
                            (h.textBaseline = "bottom"));
                          var et = 0.3 * tt;
                          h.fillText(J, R.x, I - et);
                        }
                        if (
                          null !== (c = e.labels) &&
                          void 0 !== c &&
                          c.bottom
                        ) {
                          var it = z(e.labels.bottom),
                            nt = it.length,
                            st = f(nt);
                          ((h.font = "".concat(st, "px sans-serif")),
                            (h.textAlign = "center"),
                            (h.textBaseline = "top"));
                          var ot = 0.3 * st;
                          h.fillText(it, R.x, L + ot);
                        }
                        var at = 0.033 * e.displayWidth * e.scale,
                          rt = parseFloat(e.x) || 0,
                          lt = parseFloat(e.y) || 0,
                          ct = (rt + 100) / 200,
                          ht = (100 - lt) / 200,
                          ut = Math.round(A * ct + O),
                          dt = Math.round(A * ht + I),
                          ft = e.color || "#ff6384";
                        (h.beginPath(),
                          h.arc(ut, dt, at, 0, 2 * Math.PI),
                          (h.fillStyle = "#FFFFFF"),
                          h.fill(),
                          h.beginPath(),
                          h.arc(ut, dt, 0.85 * at, 0, 2 * Math.PI),
                          (h.fillStyle = ft),
                          h.fill());
                      })(t, e),
                      null
                    );
                  case "table":
                    return (
                      (function (t, e) {
                        var i = t.getContext("2d"),
                          n = t.width,
                          s = t.height,
                          o = xa({
                            title: e.title,
                            displayWidth: e.displayWidth,
                            scale: e.scale,
                            ctx: i,
                          }),
                          a = o.totalHeightPx,
                          r = 2,
                          l = s - a,
                          c = Math.min(n - 2 * r, l - 2 * r),
                          h = r,
                          u = a + r;
                        if (
                          !e.data ||
                          !Array.isArray(e.data) ||
                          0 === e.data.length
                        )
                          return (
                            (i.fillStyle = "#f8f9fa"),
                            i.fillRect(0, 0, n, s),
                            (i.fillStyle = "#dc3545"),
                            (i.font = "28px sans-serif"),
                            (i.textAlign = "center"),
                            (i.textBaseline = "middle"),
                            void i.fillText(
                              "テーブルデータがありません",
                              n / 2,
                              s / 2,
                            )
                          );
                        var d = e.data.length,
                          f = e.data[0] ? e.data[0].length : 0;
                        if (0 === d || 0 === f) return;
                        var p = c / f,
                          g = c / d,
                          m = function (t, e) {
                            return t && "" !== t
                              ? "_randomColor_" === t || t.includes("${")
                                ? "#000000"
                                : /^#[0-9A-Fa-f]{3,8}$/.test(t) ||
                                    /^rgb/.test(t) ||
                                    /^[a-zA-Z]+$/.test(t)
                                  ? t
                                  : "#000000"
                              : e;
                          },
                          b = function (t, e, i) {
                            if (!t) return "";
                            t = String(t).replace(/\[.*?\]/g, "");
                            var n,
                              s = Math.min(e, i);
                            return (
                              (n =
                                s < 60 ? 10 : s < 100 ? 15 : s < 200 ? 20 : 30),
                              t.length > n && (t = t.substring(0, n)),
                              t
                            );
                          },
                          x = function (t, e, n) {
                            if (
                              ((i.font = "".concat(n, "px sans-serif")),
                              i.measureText(t).width <= e)
                            )
                              return [t];
                            for (var s = [], o = "", a = 0; a < t.length; a++) {
                              var r = o + t[a];
                              i.measureText(r).width > e
                                ? o
                                  ? (s.push(o), (o = t[a]))
                                  : s.push(t[a])
                                : (o = r);
                            }
                            return (o && s.push(o), s);
                          },
                          y = m(e.borderColor, "#BBBBBB"),
                          v = m(e.textColor, "#000000"),
                          _ = m(e.backgroundColor, "#FFFFFF");
                        ((i.fillStyle = _),
                          i.fillRect(0, 0, n, s),
                          o.displayTitle &&
                            ((i.font = "bold ".concat(
                              o.fontPx,
                              "px sans-serif",
                            )),
                            (i.fillStyle = "#333333"),
                            (i.textAlign = "left"),
                            (i.textBaseline = "top"),
                            i.fillText(o.displayTitle, o.leftPx, o.topPx)));
                        ((i.strokeStyle = y),
                          (i.lineWidth = 3),
                          i.strokeRect(h, u, c, c));
                        for (var w = 0; w < d; w++)
                          for (
                            var k = function () {
                                var t = e.data[w][M] || {},
                                  n = h + M * p,
                                  s = u + w * g,
                                  o = m(t.bgcolor, _),
                                  a = m(t.color, v);
                                (o !== _ &&
                                  ((i.fillStyle = o), i.fillRect(n, s, p, g)),
                                  (i.strokeStyle = y),
                                  (i.lineWidth = 1),
                                  i.strokeRect(n, s, p, g));
                                var r = b(t.text, p, g);
                                if (r) {
                                  var l,
                                    c = 0.05 * p,
                                    d = p - 2 * c,
                                    f = g - 2 * c,
                                    k = Math.min(p, g);
                                  l =
                                    k < 60
                                      ? 0.28
                                      : k < 100
                                        ? 0.32
                                        : k < 200
                                          ? 0.35
                                          : 0.38;
                                  for (
                                    var S = Math.min(g * l, 40),
                                      D = x(r, d, S),
                                      P = 1.2 * S,
                                      C = D.length * P;
                                    C > f && S > 8;

                                  )
                                    ((P = 1.2 * (S -= 3)),
                                      (C = (D = x(r, d, S)).length * P));
                                  ((i.fillStyle = a),
                                    (i.font = "".concat(S, "px sans-serif")),
                                    (i.textAlign = "center"),
                                    (i.textBaseline = "middle"));
                                  var E = s + g / 2 - C / 2 + P / 2;
                                  D.forEach(function (t, e) {
                                    var s = E + e * P;
                                    i.fillText(t, n + p / 2, s);
                                  });
                                }
                              },
                              M = 0;
                            M < f;
                            M++
                          )
                            k();
                      })(t, e),
                      null
                    );
                  case "correlation":
                    var p = t.getContext("2d"),
                      g = xa({
                        title: e.title,
                        displayWidth: e.displayWidth,
                        scale: e.scale,
                        ctx: p,
                        bottomSpacing: "compact",
                      });
                    return (
                      ya(t, e, {
                        verticalAlign: "top",
                        offsetY: g.totalHeightPx,
                      }),
                      g.displayTitle &&
                        ((p.font = "bold ".concat(g.fontPx, "px sans-serif")),
                        (p.fillStyle = "#333333"),
                        (p.textAlign = "left"),
                        (p.textBaseline = "top"),
                        p.fillText(g.displayTitle, g.leftPx, g.topPx)),
                      null
                    );
                  default:
                    return (function (t, e) {
                      var i = e.displayWidth,
                        n = Math.round(0.04 * i);
                      n = Math.max(10, Math.min(n, 17));
                      var s,
                        o,
                        a,
                        r = Math.round(1.3 * n);
                      if (
                        ((r = Math.max(13, Math.min(r, 22))),
                        (ma.defaults.font.size = n),
                        "radar" === e.chartType)
                      ) {
                        var l = e.color || "#ff6384";
                        ((s = va(l, 0.2)), (o = l), (a = 4));
                      } else if ("line" === e.chartType) {
                        var c = e.color || "#ff6384";
                        ((s = va(c, 0.2)), (o = c), (a = 4));
                      } else if (
                        "bar" === e.chartType ||
                        "pie" === e.chartType
                      ) {
                        for (
                          var h,
                            u = e.colors || [
                              "#ff6384",
                              "#36a2eb",
                              "#ffce56",
                              "#4bc0c0",
                              "#9966ff",
                            ],
                            d =
                              (null === (h = e.data) || void 0 === h
                                ? void 0
                                : h.length) || 0,
                            f = [],
                            p = 0;
                          p < d;
                          p++
                        )
                          p < u.length ? f.push(u[p]) : f.push(u[p % u.length]);
                        ((s =
                          "pie" === e.chartType
                            ? f
                            : f.map(function (t) {
                                return va(t, 0.8);
                              })),
                          (o = f),
                          (a =
                            "pie" === e.chartType ? 0.2 : e.borderWidth || 2));
                      }
                      var g = e.data || [];
                      if ("pie" === e.chartType && e.total && e.total > 0) {
                        var m = g.reduce(function (t, e) {
                          return t + (parseFloat(e) || 0);
                        }, 0);
                        if (m > 0) {
                          for (
                            var b = e.total / m, x = [], y = 0, v = 0;
                            v < g.length - 1;
                            v++
                          ) {
                            var _ = parseFloat(g[v]) || 0,
                              w = Math.round(_ * b * 10) / 10;
                            (x.push(w), (y += w));
                          }
                          if (g.length > 0) {
                            var k = Math.round(10 * (e.total - y)) / 10;
                            x.push(k);
                          }
                          g = x;
                        }
                      }
                      var M = {
                        data: g,
                        backgroundColor: s,
                        borderColor: o,
                        borderWidth: a,
                        pointBackgroundColor: o,
                        pointBorderColor: o,
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 5,
                      };
                      "line" === e.chartType &&
                        ((M.fill = !0), (M.tension = 0.4));
                      var S = t.getContext("2d"),
                        D = xa({
                          title: e.title,
                          displayWidth: e.displayWidth,
                          scale: e.scale,
                          ctx: S,
                        }),
                        P = {
                          type: e.chartType,
                          data: { labels: e.labels || [], datasets: [M] },
                          options: {
                            responsive: !0,
                            animation: { duration: 1500 },
                            layout: {
                              padding: {
                                top: D.totalHeightDisplay || 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                              },
                            },
                            plugins: {
                              legend: {
                                display:
                                  "pie" === e.chartType || e.showLegend || !1,
                                position:
                                  e.legendPosition ||
                                  ("pie" === e.chartType ? "right" : "top"),
                              },
                              title: { display: !1 },
                            },
                          },
                          plugins: [
                            {
                              id: "customTitle",
                              afterDraw: function (t) {
                                if (D.displayTitle) {
                                  var e = t.ctx;
                                  (e.save(),
                                    (e.font = "bold ".concat(
                                      D.fontDisplay,
                                      "px sans-serif",
                                    )),
                                    (e.fillStyle = "#333333"),
                                    (e.textAlign = "left"),
                                    (e.textBaseline = "top"),
                                    e.fillText(
                                      D.displayTitle,
                                      D.leftDisplay,
                                      D.topDisplay,
                                    ),
                                    e.restore());
                                }
                              },
                            },
                          ],
                        };
                      P.data.labels &&
                        Array.isArray(P.data.labels) &&
                        (P.data.labels = P.data.labels.map(function (t) {
                          return "string" == typeof t && t.length > 10
                            ? t.substring(0, 10) + "..."
                            : t;
                        }));
                      if ("radar" === e.chartType) {
                        var C = {
                          beginAtZero: !0,
                          min: 0,
                          maxTicksLimit: 6,
                          color: "#999999",
                          font: { size: n, family: "sans-serif" },
                        };
                        (void 0 !== e.max &&
                          null !== e.max &&
                          "" !== e.max &&
                          (C.max = Number(e.max)),
                          void 0 !== e.stepSize &&
                            null !== e.stepSize &&
                            "" !== e.stepSize &&
                            (C.stepSize = parseFloat(e.stepSize)),
                          (P.options.scales = {
                            r: {
                              beginAtZero: !0,
                              min: 0,
                              max: C.max,
                              ticks: C,
                              grid: { color: "rgba(0,0,0,0.1)" },
                              pointLabels: {
                                font: { size: r },
                                color: "#222222",
                              },
                            },
                          }));
                      }
                      if ("bar" === e.chartType || "line" === e.chartType) {
                        var E = {
                          maxTicksLimit: 6,
                          color: "#999999",
                          font: { size: n },
                        };
                        void 0 !== e.stepSize &&
                          null !== e.stepSize &&
                          "" !== e.stepSize &&
                          (E.stepSize = parseFloat(e.stepSize));
                        var T = { ticks: E };
                        (void 0 !== e.min && null !== e.min && "" !== e.min
                          ? ((T.min = parseInt(e.min, 10)),
                            (T.beginAtZero = 0 === parseInt(e.min, 10)))
                          : (T.beginAtZero = !0),
                          void 0 !== e.max &&
                            null !== e.max &&
                            "" !== e.max &&
                            (T.max = parseInt(e.max, 10)),
                          (P.options.scales = {
                            x: {
                              ticks: { color: "#666666", font: { size: n } },
                            },
                            y: T,
                          }));
                      }
                      try {
                        var A = new ma(t, P);
                        return ((t.chart = A), A);
                      } catch (t) {
                        return null;
                      }
                    })(t, e);
                }
              })(i, e))
            : null;
        }
        "undefined" != typeof window && (window.drawChartV2 = _a);
      },
    },
    e = {};
  function i(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var o = (e[n] = { exports: {} });
    return (t[n](o, o.exports, i), o.exports);
  }
  ((i.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return (i.d(e, { a: e }), e);
  }),
    (i.d = (t, e) => {
      for (var n in e)
        i.o(e, n) &&
          !i.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (() => {
      "use strict";
      var t = i(7059);
      function e(t, e) {
        var i =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!i) {
          if (
            Array.isArray(t) ||
            (i = d(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            i && (t = i);
            var n = 0,
              s = function () {};
            return {
              s,
              n: function () {
                return n >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[n++] };
              },
              e: function (t) {
                throw t;
              },
              f: s,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        }
        var o,
          a = !0,
          r = !1;
        return {
          s: function () {
            i = i.call(t);
          },
          n: function () {
            var t = i.next();
            return ((a = t.done), t);
          },
          e: function (t) {
            ((r = !0), (o = t));
          },
          f: function () {
            try {
              a || null == i.return || i.return();
            } finally {
              if (r) throw o;
            }
          },
        };
      }
      function n(t) {
        return (
          (n =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          n(t)
        );
      }
      function s() {
        var t,
          e,
          i = "function" == typeof Symbol ? Symbol : {},
          n = i.iterator || "@@iterator",
          a = i.toStringTag || "@@toStringTag";
        function r(i, n, s, a) {
          var r = n && n.prototype instanceof c ? n : c,
            h = Object.create(r.prototype);
          return (
            o(
              h,
              "_invoke",
              (function (i, n, s) {
                var o,
                  a,
                  r,
                  c = 0,
                  h = s || [],
                  u = !1,
                  d = {
                    p: 0,
                    n: 0,
                    v: t,
                    a: f,
                    f: f.bind(t, 4),
                    d: function (e, i) {
                      return ((o = e), (a = 0), (r = t), (d.n = i), l);
                    },
                  };
                function f(i, n) {
                  for (
                    a = i, r = n, e = 0;
                    !u && c && !s && e < h.length;
                    e++
                  ) {
                    var s,
                      o = h[e],
                      f = d.p,
                      p = o[2];
                    i > 3
                      ? (s = p === n) &&
                        ((r = o[(a = o[4]) ? 5 : ((a = 3), 3)]),
                        (o[4] = o[5] = t))
                      : o[0] <= f &&
                        ((s = i < 2 && f < o[1])
                          ? ((a = 0), (d.v = n), (d.n = o[1]))
                          : f < p &&
                            (s = i < 3 || o[0] > n || n > p) &&
                            ((o[4] = i), (o[5] = n), (d.n = p), (a = 0)));
                  }
                  if (s || i > 1) return l;
                  throw ((u = !0), n);
                }
                return function (s, h, p) {
                  if (c > 1) throw TypeError("Generator is already running");
                  for (
                    u && 1 === h && f(h, p), a = h, r = p;
                    (e = a < 2 ? t : r) || !u;

                  ) {
                    o ||
                      (a
                        ? a < 3
                          ? (a > 1 && (d.n = -1), f(a, r))
                          : (d.n = r)
                        : (d.v = r));
                    try {
                      if (((c = 2), o)) {
                        if ((a || (s = "next"), (e = o[s]))) {
                          if (!(e = e.call(o, r)))
                            throw TypeError("iterator result is not an object");
                          if (!e.done) return e;
                          ((r = e.value), a < 2 && (a = 0));
                        } else
                          (1 === a && (e = o.return) && e.call(o),
                            a < 2 &&
                              ((r = TypeError(
                                "The iterator does not provide a '" +
                                  s +
                                  "' method",
                              )),
                              (a = 1)));
                        o = t;
                      } else if ((e = (u = d.n < 0) ? r : i.call(n, d)) !== l)
                        break;
                    } catch (e) {
                      ((o = t), (a = 1), (r = e));
                    } finally {
                      c = 1;
                    }
                  }
                  return { value: e, done: u };
                };
              })(i, s, a),
              !0,
            ),
            h
          );
        }
        var l = {};
        function c() {}
        function h() {}
        function u() {}
        e = Object.getPrototypeOf;
        var d = [][n]
            ? e(e([][n]()))
            : (o((e = {}), n, function () {
                return this;
              }),
              e),
          f = (u.prototype = c.prototype = Object.create(d));
        function p(t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, u)
              : ((t.__proto__ = u), o(t, a, "GeneratorFunction")),
            (t.prototype = Object.create(f)),
            t
          );
        }
        return (
          (h.prototype = u),
          o(f, "constructor", u),
          o(u, "constructor", h),
          (h.displayName = "GeneratorFunction"),
          o(u, a, "GeneratorFunction"),
          o(f),
          o(f, a, "Generator"),
          o(f, n, function () {
            return this;
          }),
          o(f, "toString", function () {
            return "[object Generator]";
          }),
          (s = function () {
            return { w: r, m: p };
          })()
        );
      }
      function o(t, e, i, n) {
        var s = Object.defineProperty;
        try {
          s({}, "", {});
        } catch (t) {
          s = 0;
        }
        ((o = function (t, e, i, n) {
          function a(e, i) {
            o(t, e, function (t) {
              return this._invoke(e, i, t);
            });
          }
          e
            ? s
              ? s(t, e, {
                  value: i,
                  enumerable: !n,
                  configurable: !n,
                  writable: !n,
                })
              : (t[e] = i)
            : (a("next", 0), a("throw", 1), a("return", 2));
        }),
          o(t, e, i, n));
      }
      function a(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          (e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            i.push.apply(i, n));
        }
        return i;
      }
      function r(t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? a(Object(i), !0).forEach(function (e) {
                l(t, e, i[e]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
              : a(Object(i)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(i, e),
                  );
                });
        }
        return t;
      }
      function l(t, e, i) {
        return (
          (e = h(e)) in t
            ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = i),
          t
        );
      }
      function c(t, e) {
        for (var i = 0; i < e.length; i++) {
          var n = e[i];
          ((n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(t, h(n.key), n));
        }
      }
      function h(t) {
        var e = (function (t, e) {
          if ("object" != n(t) || !t) return t;
          var i = t[Symbol.toPrimitive];
          if (void 0 !== i) {
            var s = i.call(t, e || "default");
            if ("object" != n(s)) return s;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" == n(e) ? e : e + "";
      }
      function u(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return f(t);
          })(t) ||
          (function (t) {
            if (
              ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t["@@iterator"]
            )
              return Array.from(t);
          })(t) ||
          d(t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
            );
          })()
        );
      }
      function d(t, e) {
        if (t) {
          if ("string" == typeof t) return f(t, e);
          var i = {}.toString.call(t).slice(8, -1);
          return (
            "Object" === i && t.constructor && (i = t.constructor.name),
            "Map" === i || "Set" === i
              ? Array.from(t)
              : "Arguments" === i ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                ? f(t, e)
                : void 0
          );
        }
      }
      function f(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
        return n;
      }
      function p(t, e, i, n, s, o, a) {
        try {
          var r = t[o](a),
            l = r.value;
        } catch (t) {
          return void i(t);
        }
        r.done ? e(l) : Promise.resolve(l).then(n, s);
      }
      function g(t) {
        return function () {
          var e = this,
            i = arguments;
          return new Promise(function (n, s) {
            var o = t.apply(e, i);
            function a(t) {
              p(o, n, s, a, r, "next", t);
            }
            function r(t) {
              p(o, n, s, a, r, "throw", t);
            }
            a(void 0);
          });
        };
      }
      var m = "100%",
        b = "500px",
        x = "280px",
        y = "220px",
        v = "3000px",
        _ = "250px";
      function w(t) {
        return "function" == typeof window.htmlspecialchars
          ? window.htmlspecialchars(t)
          : "string" != typeof t
            ? ""
            : t
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
      }
      function k() {
        return new Promise(function (t) {
          return requestAnimationFrame(t);
        });
      }
      function M(t) {
        return S.apply(this, arguments);
      }
      function S() {
        return (S = g(
          s().m(function t(e) {
            var i, n, o, a, r, l;
            return s().w(function (t) {
              for (;;)
                switch (t.n) {
                  case 0:
                    ((i = 1e3), (n = 10), (o = Date.now()));
                  case 1:
                    if (!(Date.now() - o < i)) {
                      t.n = 8;
                      break;
                    }
                    return ((t.n = 2), k());
                  case 2:
                    if (
                      !(
                        (a = e.querySelectorAll(
                          ".typing-effect-block, .shuffle-effect-block, .text-block, .vertical-block",
                        )).length > 0
                      )
                    ) {
                      t.n = 6;
                      break;
                    }
                    if ((r = a[0]).isConnected) {
                      t.n = 4;
                      break;
                    }
                    return (
                      (t.n = 3),
                      new Promise(function (t) {
                        return setTimeout(t, n);
                      })
                    );
                  case 3:
                    return t.a(3, 1);
                  case 4:
                    if (
                      "" === (l = window.getComputedStyle(r)).opacity ||
                      "" === l.display
                    ) {
                      t.n = 5;
                      break;
                    }
                    return t.a(2, !0);
                  case 5:
                  case 6:
                    return (
                      (t.n = 7),
                      new Promise(function (t) {
                        return setTimeout(t, n);
                      })
                    );
                  case 7:
                    t.n = 1;
                    break;
                  case 8:
                    return t.a(2, !1);
                }
            }, t);
          }),
        )).apply(this, arguments);
      }
      function D(t) {
        if ("undefined" != typeof Intl && Intl.Segmenter) {
          var e = new Intl.Segmenter(void 0, {
            granularity: "grapheme",
          }).segment(t);
          return Array.from(e, function (t) {
            return t.segment;
          });
        }
        for (var i = [], n = 0; n < t.length; ) {
          var s = t[n],
            o = t.charCodeAt(n);
          if (o >= 55296 && o <= 56319 && n + 1 < t.length) {
            var a = t.charCodeAt(n + 1);
            a >= 56320 && a <= 57343 && ((s = t[n] + t[n + 1]), n++);
          }
          for (; n + 1 < t.length; ) {
            var r = t[n + 1],
              l = t.charCodeAt(n + 1);
            if ((l >= 3633 && l <= 3642) || (l >= 3655 && l <= 3662))
              ((s += r), n++);
            else if ("‍" === r) {
              if (((s += r), ++n + 1 < t.length)) {
                var c = t[n + 1],
                  h = t.charCodeAt(n + 1);
                if (h >= 55296 && h <= 56319 && n + 2 < t.length) {
                  var u = t.charCodeAt(n + 2);
                  u >= 56320 && u <= 57343 && ((c = t[n + 1] + t[n + 2]), n++);
                }
                ((s += c), n++);
              }
            } else {
              if (65038 !== l && 65039 !== l) break;
              ((s += r), n++);
            }
          }
          (i.push(s), n++);
        }
        return i;
      }
      function P(t) {
        return new Promise(function (e) {
          if (t.element && t.content)
            if (t.element.isConnected) {
              for (; t.element.firstChild; )
                t.element.removeChild(t.element.firstChild);
              ((t.element.style.display = "inline"),
                (t.element.style.verticalAlign = "top"));
              var i = document.createElement("span");
              if (
                ((i.className = "typing-cursor"),
                (i.textContent = "│"),
                (i.style.display = "inline"),
                (i.style.animation = "blink 0.6s infinite"),
                (i.style.fontWeight = "normal"),
                (i.style.marginLeft = "1px"),
                (i.style.color = "#000000"),
                (i.style.fontFamily = "monospace"),
                (i.style.fontSize = "1.1em"),
                (i.style.verticalAlign = "baseline"),
                t.element.appendChild(i),
                !document.querySelector("#typing-cursor-style"))
              ) {
                var n = document.createElement("style");
                ((n.id = "typing-cursor-style"),
                  (n.textContent =
                    "\n        @keyframes blink {\n          0%, 49% { opacity: 1; }\n          50%, 100% { opacity: 0; }\n        }\n      "),
                  document.head.appendChild(n));
              }
              var s = document.createElement("span");
              ((s.className = "typing-text-container"),
                t.element.insertBefore(s, i));
              var o = t.content.split("\n"),
                a = [];
              if (
                (o.forEach(function (t, e) {
                  (e > 0 && a.push({ type: "br" }),
                    D(t).forEach(function (t) {
                      a.push({ type: "char", value: t });
                    }));
                }),
                0 === a.length)
              )
                return ((i.style.display = "none"), void e());
              var r = 0,
                l =
                  (Date.now(),
                  function () {
                    if (r < a.length) {
                      if (!t.element.isConnected) return void e();
                      var n = a[r];
                      ("br" === n.type
                        ? s.appendChild(document.createElement("br"))
                        : s.appendChild(document.createTextNode(n.value)),
                        1 === ++r || a.length,
                        setTimeout(l, t.interval || 100));
                    } else {
                      Date.now();
                      setTimeout(function () {
                        (i && i.parentNode && (i.style.display = "none"), e());
                      }, 500);
                    }
                  });
              setTimeout(l, t.delay || 0);
            } else e();
          else e();
        });
      }
      var C = new Map();
      var E = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        T =
          "あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん",
        A =
          "アイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴ",
        O =
          "一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六",
        I =
          "😄😃😀😊👲👳👮👷💂👶👦👧👨😺😸😻😽👹🙈💀👽💩🔥✨🌟💫💥💢💦👂👀👄👝👓🌂💄💛❤💔",
        F = "，．？／＼（＾）！［］｛｝＊＆＾％＄＃＇：";
      function L(t, e) {
        if ("space" === t) return " ";
        var i = "";
        switch (t) {
          case "latin":
            i = E;
            break;
          case "hiragana":
          case "katakana":
          case "kanji":
            i = T + A + O;
            break;
          case "emoji":
            i = I;
            break;
          default:
            i = F + E;
        }
        i += e;
        var n = Array.from(i);
        return n[Math.floor(Math.random() * n.length)];
      }
      function R(t) {
        return new Promise(function (e) {
          if (t.element && t.content) {
            for (; t.element.firstChild; )
              t.element.removeChild(t.element.firstChild);
            ((t.element.style.display = "inline"),
              (t.element.style.verticalAlign = "top"));
            var i = Math.min(Math.max(t.duration || 10, 5), 100),
              n = Math.min(Math.max(t.delay || 0, 0), 5e3),
              s = t.fps || 16,
              o = t.element.id || "shuffle-".concat(Date.now());
            (t.element.id || (t.element.id = o),
              (function () {
                var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : null;
                if (t) {
                  var e = C.get(t);
                  e && (clearTimeout(e), C.delete(t));
                } else
                  (C.forEach(function (t) {
                    clearTimeout(t);
                  }),
                    C.clear());
              })(o));
            for (
              var a = t.content,
                r = D(a),
                l = r.map(function (t) {
                  return " " === (e = t)
                    ? "space"
                    : /[a-zA-Z0-9]/.test(e)
                      ? "latin"
                      : /[\u3040-\u309F]/.test(e)
                        ? "hiragana"
                        : /[\u30A0-\u30FF]/.test(e)
                          ? "katakana"
                          : /[\u4E00-\u9FFF]/.test(e)
                            ? "kanji"
                            : /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED8\uDEDC-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF-\uDEF8])/.test(
                                  e,
                                )
                              ? "emoji"
                              : "symbols";
                  var e;
                }),
                c = [],
                h = 0;
              h < r.length;
              h++
            )
              "\n" !== r[h] && "space" !== l[h] && c.push(h);
            if (0 === c.length) return ((t.element.textContent = a), void e());
            for (var d = new Array(r.length).fill(!1), f = 0; f < r.length; f++)
              ("\n" !== r[f] && "space" !== l[f]) || (d[f] = !0);
            var p,
              g = 0,
              m = 0,
              b = function () {
                var t = document.getElementById(o);
                if (!t) return (C.delete(o), void e());
                if (m >= c.length)
                  return ((t.textContent = a), C.delete(o), void e());
                g > 0 && g % i === 0 && ((d[c[m]] = !0), m++);
                for (var n = u(r), h = 0; h < r.length; h++)
                  d[h] || "\n" === r[h] || (n[h] = L(l[h], r[h]));
                t.innerHTML = "";
                for (var f = "", x = 0; x < n.length; x++)
                  "\n" === n[x]
                    ? (f &&
                        (t.appendChild(document.createTextNode(f)), (f = "")),
                      t.appendChild(document.createElement("br")))
                    : (f += n[x]);
                (f && t.appendChild(document.createTextNode(f)),
                  g++,
                  (p = setTimeout(b, s)),
                  C.set(o, p));
              };
            setTimeout(b, n);
          } else e();
        });
      }
      function z(t, e) {
        return new Promise(function (i, n) {
          if (window.drawChartV2) B(t, e, i, n);
          else {
            var s = document.createElement("script");
            ((s.src = "/js/chart2.js"),
              (s.onload = function () {
                window.drawChartV2
                  ? B(t, e, i, n)
                  : n(
                      new Error(
                        "drawChartV2 not found after loading chart2.js",
                      ),
                    );
              }),
              (s.onerror = function () {
                return n(new Error("Failed to load chart2.js"));
              }),
              document.head.appendChild(s));
          }
        });
      }
      function B(t, e, i, n) {
        try {
          var s = window.drawChartV2(t, e);
          if (s && s.options) {
            var o,
              a =
                (null === (o = s.options.animation) || void 0 === o
                  ? void 0
                  : o.duration) || 1e3;
            setTimeout(function () {
              i();
            }, a);
          } else
            setTimeout(function () {
              i();
            }, 1e3);
        } catch (t) {
          n(t);
        }
      }
      function j(t) {
        return V.apply(this, arguments);
      }
      function V() {
        return (V = g(
          s().m(function t(i) {
            var n, o, a, r, l, c, h, u, d;
            return s().w(
              function (t) {
                for (;;)
                  switch ((t.p = t.n)) {
                    case 0:
                      if (
                        0 !==
                        (n = i.querySelectorAll(".shindan-chart-block")).length
                      ) {
                        t.n = 1;
                        break;
                      }
                      return t.a(2);
                    case 1:
                      ((o = e(n)), (t.p = 2), o.s());
                    case 3:
                      if ((a = o.n()).done) {
                        t.n = 12;
                        break;
                      }
                      if (((r = a.value), (t.p = 4), r.dataset.chart)) {
                        t.n = 5;
                        break;
                      }
                      return t.a(3, 11);
                    case 5:
                      return (
                        (l = JSON.parse(r.dataset.chart)),
                        (c = r.dataset.chartIndex || "0"),
                        (h = "chart-for-image-"
                          .concat(Date.now(), "-")
                          .concat(c)),
                        ((u = document.createElement("canvas")).id = h),
                        (u.style.maxWidth = x),
                        (u.style.height = "auto"),
                        (u.style.margin = "0 auto"),
                        (u.style.display = "block"),
                        r.appendChild(u),
                        (t.n = 6),
                        k()
                      );
                    case 6:
                      if (document.getElementById(h)) {
                        t.n = 7;
                        break;
                      }
                      return t.a(3, 11);
                    case 7:
                      if (window.drawChartV2) {
                        t.n = 8;
                        break;
                      }
                      return (
                        (t.n = 8),
                        new Promise(function (t) {
                          var e = setInterval(function () {
                            window.drawChartV2 && (clearInterval(e), t());
                          }, 100);
                        })
                      );
                    case 8:
                      return ((t.n = 9), z(h, l));
                    case 9:
                      t.n = 11;
                      break;
                    case 10:
                      ((t.p = 10), t.v);
                    case 11:
                      t.n = 3;
                      break;
                    case 12:
                      t.n = 14;
                      break;
                    case 13:
                      ((t.p = 13), (d = t.v), o.e(d));
                    case 14:
                      return ((t.p = 14), o.f(), t.f(14));
                    case 15:
                      return t.a(2);
                  }
              },
              t,
              null,
              [
                [4, 10],
                [2, 13, 14, 15],
              ],
            );
          }),
        )).apply(this, arguments);
      }
      var W = (function () {
        return (
          (t = function t(e) {
            var i =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            (!(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.container = e),
              (this.containerId = e.id),
              (this.options = r(
                {
                  autoStart: !0,
                  sequential: !0,
                  observerThreshold: 0.1,
                  onComplete: null,
                  onStart: null,
                },
                i,
              )),
              (this.blocks = []),
              (this.currentIndex = 0),
              (this.isRunning = !1),
              (this.hasStarted = !1),
              (this.observer = null));
          }),
          (e = [
            {
              key: "getContainer",
              value: function () {
                if (this.containerId) {
                  var t = document.getElementById(this.containerId);
                  if (t) return t;
                }
                return this.container;
              },
            },
            {
              key: "getOrderValue",
              value: function (t) {
                var e = t.dataset.order;
                if (null == e || "" === e) return 999999;
                var i = parseInt(e, 10);
                return isNaN(i) ? 999999 : i;
              },
            },
            {
              key: "getBlockElement",
              value: function (t) {
                var e = this.getContainer();
                if (!e) return null;
                var i = e.querySelector('[data-order="'.concat(t.order, '"]'));
                return i && i.isConnected ? i : null;
              },
            },
            {
              key: "init",
              value:
                ((b = g(
                  s().m(function t() {
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if (
                                (this.getContainer(),
                                this.collectBlocks(),
                                0 !== this.blocks.length)
                              ) {
                                t.n = 1;
                                break;
                              }
                              return (
                                this.options.onComplete &&
                                  "function" ==
                                    typeof this.options.onComplete &&
                                  this.options.onComplete(),
                                t.a(2)
                              );
                            case 1:
                              this.start();
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function () {
                  return b.apply(this, arguments);
                }),
            },
            {
              key: "setupIntersectionObserver",
              value: function () {
                var t = this,
                  e = {
                    root: null,
                    rootMargin: "0px",
                    threshold: this.options.observerThreshold,
                  };
                ((this.observer = new IntersectionObserver(function (e) {
                  e.forEach(function (e) {
                    e.isIntersecting && !t.hasStarted && t.start();
                  });
                }, e)),
                  this.observer.observe(this.container));
              },
            },
            {
              key: "start",
              value: function () {
                this.hasStarted ||
                  this.isRunning ||
                  ((this.hasStarted = !0),
                  (this.isRunning = !0),
                  (this.sequenceStartTime = Date.now()),
                  this.options.onStart && this.options.onStart(),
                  this.executeNext(),
                  this.observer &&
                    (this.observer.disconnect(), (this.observer = null)));
              },
            },
            {
              key: "collectBlocks",
              value: function () {
                var t = this,
                  e = [],
                  i = new Set(),
                  n = this.getContainer(),
                  s = n.querySelectorAll(".text-block"),
                  o = n.querySelectorAll(".shindan-chart-block"),
                  a = n.querySelectorAll(".typing-effect-block"),
                  r = n.querySelectorAll(".shuffle-effect-block"),
                  l = n.querySelectorAll(".image-block"),
                  c = n.querySelectorAll(".image-merge-block"),
                  h = n.querySelectorAll(".user-input-block"),
                  u = n.querySelectorAll(".formatted-text-block"),
                  d = n.querySelectorAll(".vertical-block");
                (s.forEach(function (n) {
                  i.has(n) ||
                    (n.parentElement &&
                      n.parentElement.classList.contains("text-block")) ||
                    (i.add(n),
                    e.push({
                      type: "text",
                      element: n,
                      order: t.getOrderValue(n),
                    }));
                }),
                  o.forEach(function (i) {
                    e.push({
                      type: "chart",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  a.forEach(function (i, n) {
                    var s = i.dataset.content || "",
                      o = i.dataset.brPlaceholder;
                    i.isConnected;
                    var a = s;
                    if (o && s) {
                      var r = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                        l = new RegExp(r, "g");
                      a = s.replace(l, "\n");
                    }
                    e.push({
                      type: "typing",
                      element: i,
                      content: a,
                      interval: parseInt(i.dataset.interval) || 100,
                      delay: parseInt(i.dataset.delay) || 0,
                      order: t.getOrderValue(i),
                    });
                  }),
                  r.forEach(function (i) {
                    var n = i.dataset.content || "",
                      s = i.dataset.brPlaceholder,
                      o = n;
                    if (s && n) {
                      var a = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                        r = new RegExp(a, "g");
                      o = n.replace(r, "\n");
                    }
                    e.push({
                      type: "shuffle",
                      element: i,
                      content: o,
                      duration: parseInt(i.dataset.duration) || 30,
                      delay: parseInt(i.dataset.delay) || 0,
                      order: t.getOrderValue(i),
                    });
                  }),
                  l.forEach(function (i) {
                    e.push({
                      type: "image",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  c.forEach(function (i) {
                    e.push({
                      type: "image_merge",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  h.forEach(function (i) {
                    e.push({
                      type: "userInput",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  u.forEach(function (i) {
                    e.push({
                      type: "formattedText",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  d.forEach(function (i) {
                    e.push({
                      type: "vertical",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  n.querySelectorAll(".media-block").forEach(function (i) {
                    var n = i.classList.contains("url-block");
                    e.push({
                      type: n ? "url" : "media",
                      element: i,
                      order: t.getOrderValue(i),
                    });
                  }),
                  e.sort(function (t, e) {
                    return t.order - e.order;
                  }),
                  (this.blocks = e));
              },
            },
            {
              key: "executeNext",
              value:
                ((m = g(
                  s().m(function t() {
                    var e, i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch ((t.p = t.n)) {
                            case 0:
                              if (!(this.currentIndex >= this.blocks.length)) {
                                t.n = 1;
                                break;
                              }
                              if (
                                ((this.isRunning = !1),
                                Date.now() - (this.sequenceStartTime || 0) <
                                  1e3 && this.blocks.length,
                                this.options.onComplete &&
                                  "function" == typeof this.options.onComplete)
                              )
                                try {
                                  this.options.onComplete();
                                } catch (t) {}
                              return t.a(2);
                            case 1:
                              ((e = this.blocks[this.currentIndex]),
                                (t.p = 2),
                                (i = e.type),
                                (t.n =
                                  "text" === i
                                    ? 3
                                    : "chart" === i
                                      ? 5
                                      : "typing" === i
                                        ? 7
                                        : "shuffle" === i
                                          ? 9
                                          : "image" === i || "image_merge" === i
                                            ? 11
                                            : "url" === i
                                              ? 13
                                              : "media" === i
                                                ? 15
                                                : "userInput" === i
                                                  ? 17
                                                  : "formattedText" === i
                                                    ? 19
                                                    : "vertical" === i
                                                      ? 21
                                                      : 23));
                              break;
                            case 3:
                              return ((t.n = 4), this.executeText(e));
                            case 4:
                              return t.a(3, 24);
                            case 5:
                              return ((t.n = 6), this.executeChart(e));
                            case 6:
                              return t.a(3, 24);
                            case 7:
                              return ((t.n = 8), this.executeTyping(e));
                            case 8:
                              return t.a(3, 24);
                            case 9:
                              return ((t.n = 10), this.executeShuffle(e));
                            case 10:
                              return t.a(3, 24);
                            case 11:
                              return ((t.n = 12), this.executeImage(e));
                            case 12:
                              return t.a(3, 24);
                            case 13:
                              return ((t.n = 14), this.executeText(e));
                            case 14:
                              return t.a(3, 24);
                            case 15:
                              return ((t.n = 16), this.executeMedia(e));
                            case 16:
                              return t.a(3, 24);
                            case 17:
                              return ((t.n = 18), this.executeUserInput(e));
                            case 18:
                              return t.a(3, 24);
                            case 19:
                              return ((t.n = 20), this.executeFormattedText(e));
                            case 20:
                              return t.a(3, 24);
                            case 21:
                              return ((t.n = 22), this.executeVertical(e));
                            case 22:
                              return t.a(3, 24);
                            case 23:
                            case 24:
                              t.n = 26;
                              break;
                            case 25:
                              ((t.p = 25), t.v);
                            case 26:
                              if (
                                (this.currentIndex++, !this.options.sequential)
                              ) {
                                t.n = 27;
                                break;
                              }
                              return ((t.n = 27), this.executeNext());
                            case 27:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                      [[2, 25]],
                    );
                  }),
                )),
                function () {
                  return m.apply(this, arguments);
                }),
            },
            {
              key: "executeText",
              value:
                ((p = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 0);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return p.apply(this, arguments);
                }),
            },
            {
              key: "executeVertical",
              value:
                ((f = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 0);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return f.apply(this, arguments);
                }),
            },
            {
              key: "executeChart",
              value:
                ((d = g(
                  s().m(function t(e) {
                    var i, n, o;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch ((t.p = t.n)) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 500);
                                })
                              );
                            case 2:
                              if (!(n = i.querySelector("canvas")) || !n.id) {
                                t.n = 7;
                                break;
                              }
                              return (
                                (o = JSON.parse(i.dataset.chart || "{}")),
                                (t.p = 3),
                                (t.n = 4),
                                z(n.id, o)
                              );
                            case 4:
                              t.n = 6;
                              break;
                            case 5:
                              ((t.p = 5), t.v);
                            case 6:
                              t.n = 8;
                              break;
                            case 7:
                            case 8:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                      [[3, 5]],
                    );
                  }),
                )),
                function (t) {
                  return d.apply(this, arguments);
                }),
            },
            {
              key: "executeTyping",
              value:
                ((u = g(
                  s().m(function t(e) {
                    var i, n;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.transition =
                                  "opacity 0.5s ease-in-out"),
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 500);
                                })
                              );
                            case 2:
                              return (
                                Date.now(),
                                (n = {
                                  element: i,
                                  content: e.content,
                                  interval: e.interval,
                                  delay: e.delay,
                                }),
                                (t.n = 3),
                                P(n)
                              );
                            case 3:
                              (Date.now(), e.content.length, e.interval);
                            case 4:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return u.apply(this, arguments);
                }),
            },
            {
              key: "executeShuffle",
              value:
                ((h = g(
                  s().m(function t(e) {
                    var i, n;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.transition =
                                  "opacity 0.5s ease-in-out"),
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 500);
                                })
                              );
                            case 2:
                              return (
                                (n = {
                                  element: i,
                                  content: e.content,
                                  duration: e.duration,
                                  delay: e.delay,
                                  fps: e.fps,
                                }),
                                (t.n = 3),
                                R(n)
                              );
                            case 3:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return h.apply(this, arguments);
                }),
            },
            {
              key: "executeImage",
              value:
                ((l = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.transition =
                                  "opacity 0.5s ease-in-out"),
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 500);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return l.apply(this, arguments);
                }),
            },
            {
              key: "executeMedia",
              value:
                ((a = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.transition =
                                  "opacity 0.5s ease-in-out"),
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 500);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return a.apply(this, arguments);
                }),
            },
            {
              key: "executeUserInput",
              value:
                ((o = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 0);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return o.apply(this, arguments);
                }),
            },
            {
              key: "executeFormattedText",
              value:
                ((n = g(
                  s().m(function t(e) {
                    var i;
                    return s().w(
                      function (t) {
                        for (;;)
                          switch (t.n) {
                            case 0:
                              if ((i = this.getBlockElement(e))) {
                                t.n = 1;
                                break;
                              }
                              return t.a(2);
                            case 1:
                              return (
                                (i.style.opacity = "1"),
                                (t.n = 2),
                                new Promise(function (t) {
                                  return setTimeout(t, 0);
                                })
                              );
                            case 2:
                              return t.a(2);
                          }
                      },
                      t,
                      this,
                    );
                  }),
                )),
                function (t) {
                  return n.apply(this, arguments);
                }),
            },
          ]),
          e && c(t.prototype, e),
          i && c(t, i),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
        var t, e, i, n, o, a, l, h, u, d, f, p, m, b;
      })();
      function N(t, e) {
        var i = '<div class="alert alert-danger">';
        ((i += '<ul class="mb-0">'),
          e.forEach(function (t) {
            i += "<li>".concat(w(t), "</li>");
          }),
          (i += "</ul>"),
          (i += "</div>"),
          (t.innerHTML = i));
      }
      function H(t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = e.showLogs,
          s = void 0 !== i && i,
          o = e.isPreview,
          a = void 0 !== o && o,
          r = e.translations,
          l = void 0 === r ? {} : r,
          c = e.useSequencer,
          h = void 0 !== c && c,
          u = e.forImage,
          d = void 0 !== u && u,
          f = e.disableEffects,
          p = void 0 !== f && f,
          g = e.isTimeline,
          k = void 0 !== g && g,
          M = e.isSplitMode,
          S = void 0 !== M && M,
          D = "";
        a &&
          ((D = '<div id="title_and_result" class="font-140">'),
          (D += '<div id="shindanResultBlock">'),
          (D +=
            '<span id="shindanResultTitle" class="h5 d-block text-center font-weight-bold pb-3 mb-0">'),
          (D += w(l.result_title || "診断結果")),
          (D += "</span>"),
          (D +=
            '<span id="shindanResultContainer" class="d-block py-4 px-3 px-sm-4 text-break">'),
          (D += '<span id="shindanResultContent">'),
          (D += '<span id="shindanResult" class="text-left d-block">'));
        var P = [],
          C = t.blocks || t.result_blocks;
        if (C && Array.isArray(C)) {
          var E = C[C.length - 1];
          E &&
            "text" === E.type &&
            E.content &&
            (E.content = E.content.trimEnd());
          var T = !1;
          C.forEach(function (t, e) {
            if (t && t.type)
              if ("line_break" === t.type && T) T = !1;
              else {
                var i,
                  s = h && !d ? "0" : "1";
                switch (t.type) {
                  case "line_break":
                    ((D += "<br>"), (T = !1));
                    break;
                  case "text":
                    var o = w(t.content || "");
                    ((D += '<span class="text-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '">')
                      .concat(o.replace(/\n/g, "<br>"), "</span>")),
                      (T = !1));
                    break;
                  case "user_input":
                    var a = t.value || "",
                      r = "";
                    ((r =
                      t.styles && t.styles.bold
                        ? '<span class="font-weight-bold">'.concat(
                            w(a),
                            "</span>",
                          )
                        : w(a)),
                      (D += '<span class="user-input-block" data-order="'
                        .concat(e, '" style="opacity: ')
                        .concat(s, '">')
                        .concat(r, "</span>")),
                      (T = !1));
                    break;
                  case "formatted_text":
                    var l = w(t.content || "");
                    if (t.format && "object" === n(t.format)) {
                      var c = [];
                      if (
                        (t.format.fontFamily &&
                          c.push("font-family: ".concat(t.format.fontFamily)),
                        t.format.fontSize)
                      ) {
                        c.push("font-size: ".concat(t.format.fontSize));
                        var u = t.format.fontSize,
                          f = "1.5";
                        if (u.includes("em")) {
                          var g = parseFloat(u);
                          g >= 2 ? (f = "1.2") : g >= 1.5 && (f = "1.3");
                        } else if (u.includes("px")) {
                          var M = parseFloat(u);
                          M >= 32 ? (f = "1.2") : M >= 24 && (f = "1.3");
                        }
                        c.push("line-height: ".concat(f));
                      }
                      (t.format.color &&
                        c.push("color: ".concat(t.format.color)),
                        t.format.fontWeight &&
                          c.push("font-weight: ".concat(t.format.fontWeight)),
                        t.format.fontStyle &&
                          c.push("font-style: ".concat(t.format.fontStyle)),
                        t.format.textDecoration &&
                          c.push(
                            "text-decoration: ".concat(t.format.textDecoration),
                          ),
                        c.length > 0 &&
                          (l = '<span style="'
                            .concat(c.join("; "), '">')
                            .concat(l, "</span>")));
                    }
                    ((D += '<span class="formatted-text-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '; display: inline; vertical-align: top;">')
                      .concat(l, "</span>")),
                      (T = !1));
                    break;
                  case "vertical":
                    var P = t.vertical || t.content || "";
                    ((D += '<span class="vertical-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '; white-space: pre-wrap;">')
                      .concat(w(P), "</span>")),
                      (T = !1));
                    break;
                  case "chart":
                    var C = t.config || {};
                    if (
                      ((D +=
                        '<div class="shindan-chart-block canvas_block my-3 mx-auto" style="max-width: '
                          .concat(d ? y : b, "; opacity: ")
                          .concat(s, '" data-chart="')
                          .concat(
                            ((i = C),
                            JSON.stringify(i)
                              .replace(/&/g, "&amp;")
                              .replace(/"/g, "&quot;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")),
                            '" data-order="',
                          )
                          .concat(e, '" data-chart-index="')
                          .concat(e, '">')),
                      !d)
                    ) {
                      var E = (function (t, e) {
                        var i = ""
                          .concat(
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : "chart",
                            "_v2_",
                          )
                          .concat(e);
                        return {
                          html: '<canvas id="'.concat(
                            i,
                            '" width="1" height="200" style="max-width: 100%; height: auto;"></canvas>',
                          ),
                          chartInfo: {
                            canvasId: i,
                            config: t.config || t.data,
                          },
                        };
                      })(t, e);
                      D += E.html;
                    }
                    ((D += "</div>"), (T = !0));
                    break;
                  case "typing_effect":
                    var A = t.content || "",
                      O = t.interval || 100,
                      I = t.delay || 0;
                    if (d || p)
                      D += '<span class="text-block" data-order="'
                        .concat(e, '" style="opacity: 1">')
                        .concat(w(A).replace(/\n/g, "<br>"), "</span>");
                    else {
                      var F = "typing_effect_".concat(e),
                        L = "__BR_".concat(e, "__"),
                        R = A.replace(/\n/g, L);
                      ((D += '<span id="'
                        .concat(F, '" class="typing-effect-block" data-order="')
                        .concat(e, '" style="opacity: ')
                        .concat(s, '" ')),
                        (D += 'data-content="'.concat(w(R), '" ')),
                        (D += 'data-br-placeholder="'.concat(w(L), '" ')),
                        (D += 'data-interval="'.concat(O, '" ')),
                        (D += 'data-delay="'.concat(I, '"></span>')));
                    }
                    T = !1;
                    break;
                  case "shuffle_effect":
                    var z = t.content || "",
                      B = t.duration || 30,
                      j = t.delay || 0;
                    if (d || p)
                      D += '<span class="text-block" data-order="'
                        .concat(e, '" style="opacity: 1">')
                        .concat(w(z).replace(/\n/g, "<br>"), "</span>");
                    else {
                      var V = "shuffle_effect_".concat(e),
                        W = "__BR_".concat(e, "__"),
                        N = z.replace(/\n/g, W);
                      ((D += '<span id="'
                        .concat(
                          V,
                          '" class="shuffle-effect-block" data-order="',
                        )
                        .concat(e, '" style="opacity: ')
                        .concat(s, '" ')),
                        (D += 'data-content="'.concat(w(N), '" ')),
                        (D += 'data-br-placeholder="'.concat(w(W), '" ')),
                        (D += 'data-duration="'.concat(B, '" ')),
                        (D += 'data-delay="'.concat(j, '"></span>')));
                    }
                    T = !1;
                    break;
                  case "image":
                    var H = t.image_url || "",
                      $ = d || k ? x : m,
                      q =
                        d && S
                          ? "width: auto; height: auto; max-width: "
                              .concat($, "; max-height: ")
                              .concat(
                                _,
                                "; object-fit: contain; display: block; margin: 10px auto;",
                              )
                          : d || k
                            ? "width: auto; height: auto; max-width: ".concat(
                                $,
                                "; display: block; margin: 10px auto;",
                              )
                            : "width: auto; height: auto; max-width: "
                                .concat($, "; max-height: ")
                                .concat(
                                  v,
                                  "; object-fit: contain; display: block; margin: 10px auto;",
                                );
                    ((D += '<span class="image-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '">')),
                      (D += '<img src="'
                        .concat(w(H), '" alt="')
                        .concat(w(""), '" style="')
                        .concat(q, '">')),
                      (D += "</span>"),
                      (T = !0));
                    break;
                  case "youtube":
                    var Y = t.video_id || "";
                    if (d || k) {
                      var U = "https://img.youtube.com/vi/".concat(
                        Y,
                        "/mqdefault.jpg",
                      );
                      ((D +=
                        '<span class="media-block youtube-block" data-order="'
                          .concat(e, '" style="opacity: ')
                          .concat(s, '">')),
                        (D += '<img src="'.concat(
                          U,
                          '" alt="YouTube動画" style="max-width: 280px; cursor: pointer; display: block; margin: 10px auto;">',
                        )),
                        (D += "</span>"));
                    } else
                      ((D +=
                        '<span class="media-block youtube-block" data-order="'
                          .concat(e, '" style="opacity: ')
                          .concat(s, '">')),
                        (D +=
                          '<iframe width="560" height="315" src="https://www.youtube.com/embed/'.concat(
                            Y,
                            '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="display: block; margin: 10px auto;"></iframe>',
                          )),
                        (D += "</span>"));
                    T = !0;
                    break;
                  case "niconico":
                    var X = t.video_id || "",
                      G = t.url || "";
                    if (d || k)
                      ((D +=
                        '<span class="media-block niconico-block" data-order="'
                          .concat(e, '" style="opacity: ')
                          .concat(s, '">')),
                        (D += w(G)),
                        (D += "</span>"),
                        (T = !1));
                    else {
                      var Z = "niconico_".concat(e, "_").concat(Date.now());
                      ((D +=
                        '<span class="media-block niconico-block" data-order="'
                          .concat(e, '" style="opacity: ')
                          .concat(s, '">')),
                        (D += '<div id="'
                          .concat(Z, '" data-niconico-id="')
                          .concat(
                            w(X),
                            '" class="niconico-embed-container" style="display: flex; justify-content: center; margin: 10px 0;"></div>',
                          )),
                        (D +=
                          '<noscript><a href="https://www.nicovideo.jp/watch/'
                            .concat(X, '">')
                            .concat(w(G), "</a></noscript>")),
                        (D += "</span>"),
                        (T = !0));
                    }
                    break;
                  case "external_image":
                    var K = t.thumbnail_url || t.large_url || "",
                      J = t.service || "image",
                      Q = t.jump_url || t.url || "";
                    (d
                      ? ((D +=
                          '<span class="media-block external-image-block" data-order="'
                            .concat(e, '" style="opacity: ')
                            .concat(s, '">')),
                        (D += '<img src="'
                          .concat(w(K), '" alt="')
                          .concat(
                            w(J),
                            '" style="max-width: 280px; display: block; margin: 10px auto;">',
                          )),
                        (D += "</span>"))
                      : ((D +=
                          '<span class="media-block external-image-block" data-order="'
                            .concat(e, '" style="opacity: ')
                            .concat(s, '">')),
                        (D += '<a href="'.concat(
                          w(Q),
                          '" target="_blank" style="display: block; text-align: center; margin: 10px 0;">',
                        )),
                        (D += '<img src="'
                          .concat(w(K), '" alt="')
                          .concat(
                            w(J),
                            '" style="max-width: 100%; cursor: pointer;">',
                          )),
                        (D += "</a>"),
                        (D += "</span>")),
                      (T = !0));
                    break;
                  case "url":
                    var tt = t.url || "",
                      et = t.is_internal ? tt : t.jump_url || tt;
                    (d || k
                      ? ((D +=
                          '<span class="media-block url-block" data-order="'
                            .concat(e, '" style="opacity: ')
                            .concat(s, '">')),
                        (D += w(tt)),
                        (D += "</span>"))
                      : ((D +=
                          '<span class="media-block url-block" data-order="'
                            .concat(e, '" style="opacity: ')
                            .concat(s, '">')),
                        (D += '<a href="'
                          .concat(
                            w(et),
                            '" target="_blank" style="color: #0066cc;">',
                          )
                          .concat(w(tt), "</a>")),
                        (D += "</span>")),
                      (T = !1));
                    break;
                  case "image_merge":
                    (t.image_ids || t.images, t.layout);
                    var it = d || k ? x : m,
                      nt =
                        d && S
                          ? "width: auto; max-width: "
                              .concat(it, "; max-height: ")
                              .concat(
                                _,
                                "; object-fit: contain; height: auto; display: block; margin: 10px auto;",
                              )
                          : d || k
                            ? "width: auto; max-width: ".concat(
                                it,
                                "; height: auto; display: block; margin: 10px auto;",
                              )
                            : "width: auto; max-width: "
                                .concat(it, "; max-height: ")
                                .concat(
                                  v,
                                  "; object-fit: contain; height: auto; display: block; margin: 10px auto;",
                                );
                    ((D += '<span class="image-merge-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '">')),
                      t.image_url &&
                        (D += '<img src="'
                          .concat(w(t.image_url), '" alt="" style="')
                          .concat(nt, '" />')),
                      (D += "</span>"),
                      (T = !0));
                    break;
                  case "format_start":
                    var st = t.format_id || "fmt_".concat(e),
                      ot = [];
                    t.styles &&
                      (t.styles.fontFamily &&
                        ot.push("font-family: ".concat(t.styles.fontFamily)),
                      t.styles.fontSize &&
                        ot.push("font-size: ".concat(t.styles.fontSize)),
                      t.styles.color &&
                        ot.push("color: ".concat(t.styles.color)),
                      t.styles.fontWeight &&
                        ot.push("font-weight: ".concat(t.styles.fontWeight)),
                      t.styles.fontStyle &&
                        ot.push("font-style: ".concat(t.styles.fontStyle)),
                      t.styles.textDecoration &&
                        ot.push(
                          "text-decoration: ".concat(t.styles.textDecoration),
                        ));
                    var at =
                      ot.length > 0
                        ? ' style="'.concat(ot.join("; "), '"')
                        : "";
                    ((D +=
                      '<span class="format-block format-start" data-format-id="'
                        .concat(st, '"')
                        .concat(at, ">")),
                      (T = !1));
                    break;
                  case "format_end":
                    ((D += "</span>"), (T = !1));
                    break;
                  default:
                    ((D += '<span class="text-block" data-order="'
                      .concat(e, '" style="opacity: ')
                      .concat(s, '">')
                      .concat(w(JSON.stringify(t)), "</span>")),
                      (T = !1));
                }
              }
          });
        }
        return (
          a &&
            ((D += "</span>"),
            (D += "</span>"),
            (D += "</span>"),
            (D += "</div>"),
            (D += "</div>")),
          s &&
            P.length > 0 &&
            ((D += '<div class="mt-3 text-center">'),
            (D +=
              "<button class=\"btn btn-sm btn-outline-secondary\" onclick=\"document.getElementById('transformation-logs-container').classList.toggle('d-none')\">"),
            (D += '<i class="fas fa-chevron-down"></i> '),
            (D += "<span>変換ログを表示</span>"),
            (D += "</button>"),
            (D += "</div>"),
            (D +=
              '<div id="transformation-logs-container" class="mt-3 p-3 bg-light rounded d-none">'),
            (D += '<h6 class="font-weight-bold mb-3">変換プロセス</h6>'),
            (D += '<div class="small">'),
            P.forEach(function (t) {
              var e =
                "error" === t.type
                  ? "text-danger"
                  : "warning" === t.type
                    ? "text-warning"
                    : "text-primary";
              ((D += '<div class="mb-2 border-bottom pb-2">'),
                (D += '<div class="d-flex justify-content-between">'),
                (D += '<span class="'
                  .concat(e, ' font-weight-bold">')
                  .concat(w(t.title), "</span>")),
                (D += '<span class="text-muted">'.concat(
                  w(t.timestamp),
                  "</span>",
                )),
                (D += "</div>"),
                (D += "<div>".concat(w(t.message), "</div>")),
                t.details &&
                  ((D += '<div class="ml-3 mt-1 text-muted">'),
                  (D += "<div>".concat(
                    w(JSON.stringify(t.details, null, 2)),
                    "</div>",
                  )),
                  (D += "</div>")),
                (D += "</div>"));
            }),
            (D += "</div>"),
            (D += "</div>")),
          D
        );
      }
      function q() {
        document
          .querySelectorAll(".niconico-embed-container")
          .forEach(function (t) {
            var e = t.dataset.niconicoId;
            if (e && "true" !== t.dataset.initialized) {
              var i = document.createElement("script");
              ((i.type = "application/javascript"),
                (i.src = "https://embed.nicovideo.jp/watch/".concat(
                  e,
                  "/script?w=640&h=360",
                )),
                (i.onload = function () {
                  t.dataset.initialized = "true";
                }),
                (i.onerror = function () {
                  t.innerHTML = '<a href="https://www.nicovideo.jp/watch/'
                    .concat(
                      e,
                      '" target="_blank" style="color: #0066cc;">ニコニコ動画を見る: ',
                    )
                    .concat(e, "</a>");
                }),
                t.appendChild(i));
            }
          });
      }
      function Y(t, e) {
        return U.apply(this, arguments);
      }
      function U() {
        return (
          (U = g(
            s().m(function i(n, o) {
              var a,
                l,
                c,
                h,
                u,
                d,
                f,
                p,
                g,
                m,
                b,
                x,
                y,
                v,
                _,
                w = arguments;
              return s().w(function (i) {
                for (;;)
                  switch (i.n) {
                    case 0:
                      if (
                        ((a =
                          w.length > 2 && void 0 !== w[2] ? w[2] : "default"),
                        (l = w.length > 3 && void 0 !== w[3] ? w[3] : {}),
                        n)
                      ) {
                        i.n = 1;
                        break;
                      }
                      return i.a(2);
                    case 1:
                      if (
                        ((u = r(
                          r(
                            r(
                              {},
                              (h =
                                (c = {
                                  default: {
                                    enableEffects: !0,
                                    enableSequencer: !0,
                                    chartSize: "normal",
                                    imageSize: "normal",
                                    showLogs: !1,
                                    isPreview: !1,
                                    forImage: !1,
                                    disableEffects: !1,
                                  },
                                  saved: {
                                    enableEffects: !0,
                                    enableSequencer: !0,
                                    chartSize: "normal",
                                    imageSize: "normal",
                                    showLogs: !1,
                                    isPreview: !1,
                                    forImage: !1,
                                    disableEffects: !1,
                                  },
                                  timeline: {
                                    enableEffects: !1,
                                    enableSequencer: !1,
                                    chartSize: "small",
                                    imageSize: "small",
                                    maxImageHeight: 200,
                                    showLogs: !1,
                                    isPreview: !1,
                                    forImage: !1,
                                    disableEffects: !0,
                                    compact: !0,
                                  },
                                  image: {
                                    enableEffects: !1,
                                    enableSequencer: !1,
                                    chartSize: "normal",
                                    imageSize: "normal",
                                    showLogs: !1,
                                    isPreview: !1,
                                    forImage: !0,
                                    disableEffects: !0,
                                  },
                                  preview: {
                                    enableEffects: !0,
                                    enableSequencer: !0,
                                    chartSize: "normal",
                                    imageSize: "normal",
                                    showLogs: !1,
                                    isPreview: !0,
                                    forImage: !1,
                                    disableEffects: !1,
                                  },
                                })[a] || c.default),
                            ),
                            l,
                          ),
                          {},
                          {
                            useSequencer:
                              void 0 !== l.useSequencer
                                ? l.useSequencer
                                : h.enableSequencer,
                            autoStartSequence:
                              void 0 === l.autoStartSequence ||
                              l.autoStartSequence,
                          },
                        )),
                        !(o.errors && o.errors.length > 0))
                      ) {
                        i.n = 2;
                        break;
                      }
                      return (N(n, o.errors), i.a(2));
                    case 2:
                      if (o && (o.blocks || o.result_blocks)) {
                        i.n = 3;
                        break;
                      }
                      return (
                        (n.innerHTML =
                          '<div class="text-center text-muted">診断結果がありません</div>'),
                        i.a(2)
                      );
                    case 3:
                      if (
                        ((d = H(o, {
                          showLogs: u.showLogs,
                          isPreview: u.isPreview,
                          translations: u.translations || {},
                          useSequencer: u.useSequencer,
                          forImage: u.forImage,
                          disableEffects: u.disableEffects,
                          isTimeline: "timeline" === a,
                          isSplitMode: u.isSplitMode || !1,
                        })),
                        (n.innerHTML = d),
                        !u.forImage)
                      ) {
                        i.n = 5;
                        break;
                      }
                      return ((i.n = 4), j(n));
                    case 4:
                      i.n = 11;
                      break;
                    case 5:
                      return ((i.n = 6), M(n));
                    case 6:
                      return (
                        (i.n = 7),
                        new Promise(function (t) {
                          return setTimeout(t, 100);
                        })
                      );
                    case 7:
                      if ("timeline" !== a) {
                        i.n = 8;
                        break;
                      }
                      if (
                        (f = n.querySelectorAll(".shindan-chart-block"))
                          .length > 0
                      ) {
                        p = e(f);
                        try {
                          for (p.s(); !(g = p.n()).done; ) {
                            m = g.value;
                            try {
                              ((b = JSON.parse(m.dataset.chart)),
                                (x = "chart-timeline-"
                                  .concat(
                                    Math.random().toString(36).substring(2, 11),
                                    "-",
                                  )
                                  .concat(Array.from(f).indexOf(m))),
                                (y = m.querySelector("canvas")) && y.remove(),
                                ((v = document.createElement("canvas")).id = x),
                                m.appendChild(v),
                                (0, t.P)(
                                  x,
                                  r(r({}, b), {}, { animation: !1 }),
                                ));
                            } catch (t) {}
                          }
                        } catch (t) {
                          p.e(t);
                        } finally {
                          p.f();
                        }
                      }
                      (n.querySelectorAll("img").forEach(function (t) {
                        ((t.style.maxWidth = "100%"),
                          (t.style.maxHeight = u.maxImageHeight + "px"),
                          (t.style.objectFit = "contain"));
                      }),
                        window.adjustTimelineHeight &&
                          window.adjustTimelineHeight(),
                        window.adjustShindanTimelineHeight &&
                          window.adjustShindanTimelineHeight(),
                        (i.n = 11));
                      break;
                    case 8:
                      if (!u.useSequencer) {
                        i.n = 10;
                        break;
                      }
                      return (
                        (_ = new W(n, {
                          autoStart: u.autoStartSequence,
                          sequential: !0,
                          onStart: u.onSequenceStart,
                          onComplete: u.onSequenceComplete,
                        })),
                        (i.n = 9),
                        _.init()
                      );
                    case 9:
                      (n.querySelectorAll(".niconico-embed-container").length >
                        0 &&
                        setTimeout(function () {
                          return q();
                        }, 200),
                        (i.n = 11));
                      break;
                    case 10:
                      (n.querySelectorAll(".shindan-chart-block").length > 0 &&
                        X(),
                        n.querySelectorAll(".niconico-embed-container").length >
                          0 &&
                          setTimeout(function () {
                            return q();
                          }, 100));
                    case 11:
                    case 12:
                      return i.a(2);
                  }
              }, i);
            }),
          )),
          U.apply(this, arguments)
        );
      }
      function X() {
        document
          .querySelectorAll(".shindan-chart-block")
          .forEach(function (t, e) {
            if (t.dataset.chart)
              try {
                var i = JSON.parse(t.dataset.chart),
                  n = "chart-dom-".concat(Date.now(), "-").concat(e),
                  s = t.querySelector("canvas");
                s && s.remove();
                var o = document.createElement("canvas");
                ((o.id = n),
                  (o.width = 1),
                  (o.height = 200),
                  (o.style.maxWidth = "100%"),
                  (o.style.height = "auto"),
                  t.appendChild(o),
                  window.drawChartV2 && window.drawChartV2(n, i));
              } catch (t) {}
          });
      }
      function G() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          e = (t.typingSelector, t.shuffleSelector, document.body),
          i = new W(e, { autoStart: !1, sequential: !0 });
        (i.init(), i.start());
      }
      function Z() {
        return (
          (Z = g(
            s().m(function t(e, i) {
              var n,
                o = arguments;
              return s().w(function (t) {
                for (;;)
                  if (0 === t.n)
                    return (
                      (n = o.length > 2 && void 0 !== o[2] ? o[2] : {}),
                      t.a(2, Y(e, i, "saved", n))
                    );
              }, t);
            }),
          )),
          Z.apply(this, arguments)
        );
      }
      function K(t, e) {
        var i =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!i) {
          if (
            Array.isArray(t) ||
            (i = (function (t, e) {
              if (t) {
                if ("string" == typeof t) return J(t, e);
                var i = {}.toString.call(t).slice(8, -1);
                return (
                  "Object" === i && t.constructor && (i = t.constructor.name),
                  "Map" === i || "Set" === i
                    ? Array.from(t)
                    : "Arguments" === i ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                      ? J(t, e)
                      : void 0
                );
              }
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            i && (t = i);
            var n = 0,
              s = function () {};
            return {
              s,
              n: function () {
                return n >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[n++] };
              },
              e: function (t) {
                throw t;
              },
              f: s,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        }
        var o,
          a = !0,
          r = !1;
        return {
          s: function () {
            i = i.call(t);
          },
          n: function () {
            var t = i.next();
            return ((a = t.done), t);
          },
          e: function (t) {
            ((r = !0), (o = t));
          },
          f: function () {
            try {
              a || null == i.return || i.return();
            } finally {
              if (r) throw o;
            }
          },
        };
      }
      function J(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = Array(e); i < e; i++) n[i] = t[i];
        return n;
      }
      function Q() {
        var t,
          e,
          i = "function" == typeof Symbol ? Symbol : {},
          n = i.iterator || "@@iterator",
          s = i.toStringTag || "@@toStringTag";
        function o(i, n, s, o) {
          var l = n && n.prototype instanceof r ? n : r,
            c = Object.create(l.prototype);
          return (
            tt(
              c,
              "_invoke",
              (function (i, n, s) {
                var o,
                  r,
                  l,
                  c = 0,
                  h = s || [],
                  u = !1,
                  d = {
                    p: 0,
                    n: 0,
                    v: t,
                    a: f,
                    f: f.bind(t, 4),
                    d: function (e, i) {
                      return ((o = e), (r = 0), (l = t), (d.n = i), a);
                    },
                  };
                function f(i, n) {
                  for (
                    r = i, l = n, e = 0;
                    !u && c && !s && e < h.length;
                    e++
                  ) {
                    var s,
                      o = h[e],
                      f = d.p,
                      p = o[2];
                    i > 3
                      ? (s = p === n) &&
                        ((l = o[(r = o[4]) ? 5 : ((r = 3), 3)]),
                        (o[4] = o[5] = t))
                      : o[0] <= f &&
                        ((s = i < 2 && f < o[1])
                          ? ((r = 0), (d.v = n), (d.n = o[1]))
                          : f < p &&
                            (s = i < 3 || o[0] > n || n > p) &&
                            ((o[4] = i), (o[5] = n), (d.n = p), (r = 0)));
                  }
                  if (s || i > 1) return a;
                  throw ((u = !0), n);
                }
                return function (s, h, p) {
                  if (c > 1) throw TypeError("Generator is already running");
                  for (
                    u && 1 === h && f(h, p), r = h, l = p;
                    (e = r < 2 ? t : l) || !u;

                  ) {
                    o ||
                      (r
                        ? r < 3
                          ? (r > 1 && (d.n = -1), f(r, l))
                          : (d.n = l)
                        : (d.v = l));
                    try {
                      if (((c = 2), o)) {
                        if ((r || (s = "next"), (e = o[s]))) {
                          if (!(e = e.call(o, l)))
                            throw TypeError("iterator result is not an object");
                          if (!e.done) return e;
                          ((l = e.value), r < 2 && (r = 0));
                        } else
                          (1 === r && (e = o.return) && e.call(o),
                            r < 2 &&
                              ((l = TypeError(
                                "The iterator does not provide a '" +
                                  s +
                                  "' method",
                              )),
                              (r = 1)));
                        o = t;
                      } else if ((e = (u = d.n < 0) ? l : i.call(n, d)) !== a)
                        break;
                    } catch (e) {
                      ((o = t), (r = 1), (l = e));
                    } finally {
                      c = 1;
                    }
                  }
                  return { value: e, done: u };
                };
              })(i, s, o),
              !0,
            ),
            c
          );
        }
        var a = {};
        function r() {}
        function l() {}
        function c() {}
        e = Object.getPrototypeOf;
        var h = [][n]
            ? e(e([][n]()))
            : (tt((e = {}), n, function () {
                return this;
              }),
              e),
          u = (c.prototype = r.prototype = Object.create(h));
        function d(t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, c)
              : ((t.__proto__ = c), tt(t, s, "GeneratorFunction")),
            (t.prototype = Object.create(u)),
            t
          );
        }
        return (
          (l.prototype = c),
          tt(u, "constructor", c),
          tt(c, "constructor", l),
          (l.displayName = "GeneratorFunction"),
          tt(c, s, "GeneratorFunction"),
          tt(u),
          tt(u, s, "Generator"),
          tt(u, n, function () {
            return this;
          }),
          tt(u, "toString", function () {
            return "[object Generator]";
          }),
          (Q = function () {
            return { w: o, m: d };
          })()
        );
      }
      function tt(t, e, i, n) {
        var s = Object.defineProperty;
        try {
          s({}, "", {});
        } catch (t) {
          s = 0;
        }
        ((tt = function (t, e, i, n) {
          function o(e, i) {
            tt(t, e, function (t) {
              return this._invoke(e, i, t);
            });
          }
          e
            ? s
              ? s(t, e, {
                  value: i,
                  enumerable: !n,
                  configurable: !n,
                  writable: !n,
                })
              : (t[e] = i)
            : (o("next", 0), o("throw", 1), o("return", 2));
        }),
          tt(t, e, i, n));
      }
      function et(t, e, i, n, s, o, a) {
        try {
          var r = t[o](a),
            l = r.value;
        } catch (t) {
          return void i(t);
        }
        r.done ? e(l) : Promise.resolve(l).then(n, s);
      }
      function it(t) {
        return function () {
          var e = this,
            i = arguments;
          return new Promise(function (n, s) {
            var o = t.apply(e, i);
            function a(t) {
              et(o, n, s, a, r, "next", t);
            }
            function r(t) {
              et(o, n, s, a, r, "throw", t);
            }
            a(void 0);
          });
        };
      }
      function nt() {
        return st.apply(this, arguments);
      }
      function st() {
        return (st = it(
          Q().m(function t() {
            var e, i, n, s, o, a, r, l, c, h, u, d, f, p, g;
            return Q().w(
              function (t) {
                for (;;)
                  switch ((t.p = t.n)) {
                    case 0:
                      if (
                        ((e = !1),
                        (i = !1),
                        (t.p = 1),
                        !navigator.brave ||
                          "function" != typeof navigator.brave.isBrave)
                      ) {
                        t.n = 3;
                        break;
                      }
                      return ((t.n = 2), navigator.brave.isBrave());
                    case 2:
                      i = t.v;
                    case 3:
                      t.n = 5;
                      break;
                    case 4:
                      ((t.p = 4), t.v);
                    case 5:
                      if (
                        ((n = []),
                        document.querySelector(".adsbygoogle") &&
                          n.push({
                            name: "Google AdSense",
                            url: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
                          }),
                        document.querySelector('[id^="div-gpt-"]') &&
                          n.push({
                            name: "Google GPT",
                            url: "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
                          }),
                        (document.querySelector('[id^="im-"]') ||
                          document.querySelector(
                            'script[src*="i-mobile.co.jp"]',
                          )) &&
                          n.push({
                            name: "i-mobile",
                            url: "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js",
                          }),
                        (document.querySelector('[id^="taboola-"]') ||
                          document.querySelector(
                            'script[src*="taboola.com"]',
                          )) &&
                          n.push({
                            name: "Taboola",
                            url: "https://cdn.taboola.com/libtrc/shindanmaker-japan/loader.js",
                          }),
                        !(n.length > 0))
                      ) {
                        t.n = 15;
                        break;
                      }
                      ((s = K(n)), (t.p = 6), s.s());
                    case 7:
                      if ((o = s.n()).done) {
                        t.n = 12;
                        break;
                      }
                      return (
                        (a = o.value),
                        (t.p = 8),
                        (t.n = 9),
                        fetch(a.url, {
                          method: "HEAD",
                          mode: "no-cors",
                          cache: "no-store",
                        })
                      );
                    case 9:
                      t.n = 11;
                      break;
                    case 10:
                      ((t.p = 10), t.v, (e = !0));
                    case 11:
                      t.n = 7;
                      break;
                    case 12:
                      t.n = 14;
                      break;
                    case 13:
                      ((t.p = 13), (p = t.v), s.e(p));
                    case 14:
                      return ((t.p = 14), s.f(), t.f(14));
                    case 15:
                      if (!i || e) {
                        t.n = 23;
                        break;
                      }
                      return (
                        (t.n = 16),
                        new Promise(function (t) {
                          return setTimeout(t, 100);
                        })
                      );
                    case 16:
                      ((r = document.querySelectorAll(
                        '[id^="div-gpt-"], .adsbygoogle',
                      )),
                        (l = K(r)),
                        (t.p = 17),
                        l.s());
                    case 18:
                      if ((c = l.n()).done) {
                        t.n = 20;
                        break;
                      }
                      if (
                        ((h = c.value),
                        (u = h.getBoundingClientRect()),
                        !(u.top < window.innerHeight && u.bottom > 0) ||
                          0 !== h.offsetHeight)
                      ) {
                        t.n = 19;
                        break;
                      }
                      return ((e = !0), t.a(3, 20));
                    case 19:
                      t.n = 18;
                      break;
                    case 20:
                      t.n = 22;
                      break;
                    case 21:
                      ((t.p = 21), (g = t.v), l.e(g));
                    case 22:
                      return ((t.p = 22), l.f(), t.f(22));
                    case 23:
                      return (
                        (d = document.getElementById("abcheck")) &&
                          (("none" !==
                            (f = window.getComputedStyle(d)).display &&
                            "hidden" !== f.visibility &&
                            0 !== d.offsetHeight) ||
                            (e = !0)),
                        t.a(2, e)
                      );
                  }
              },
              t,
              null,
              [
                [17, 21, 22, 23],
                [8, 10],
                [6, 13, 14, 15],
                [1, 4],
              ],
            );
          }),
        )).apply(this, arguments);
      }
      function ot() {
        return at.apply(this, arguments);
      }
      function at() {
        return (at = it(
          Q().m(function t() {
            return Q().w(function (t) {
              for (;;)
                switch (t.n) {
                  case 0:
                    return ((t.n = 1), nt());
                  case 1:
                    t.v && $("#sh_ab_txt").show();
                  case 2:
                    return t.a(2);
                }
            }, t);
          }),
        )).apply(this, arguments);
      }
      function rt() {
        return new Promise(function (t) {
          requestAnimationFrame(function () {
            requestAnimationFrame(t);
          });
        });
      }
      (document.addEventListener(
        "DOMContentLoaded",
        it(
          Q().m(function t() {
            var e, i, n, s, o, a, r, l, c, h, u, d, f;
            return Q().w(
              function (t) {
                for (;;)
                  switch ((t.p = t.n)) {
                    case 0:
                      return (
                        "undefined" != typeof shindan_id &&
                          window.ShindanFormStorage &&
                          new window.ShindanFormStorage().init(shindan_id),
                        document.getElementById("sh_ab_txt") && ot(),
                        (t.n = 1),
                        rt()
                      );
                    case 1:
                      if (
                        ((s = function () {
                          document
                            .querySelectorAll(".shindan-share-overlay")
                            .forEach(function (t) {
                              t.classList.remove("shindan-share-overlay");
                            });
                        }),
                        (o = document.getElementById("shindanResult")),
                        (a =
                          (null == o || null === (e = o.dataset) || void 0 === e
                            ? void 0
                            : e.blocks) ||
                          (null == o || null === (i = o.dataset) || void 0 === i
                            ? void 0
                            : i.resultBlocks)),
                        (r =
                          null == o || null === (n = o.dataset) || void 0 === n
                            ? void 0
                            : n.context),
                        !o || !a)
                      ) {
                        t.n = 6;
                        break;
                      }
                      return (
                        (t.p = 2),
                        (l = JSON.parse(a)),
                        (c = r ? JSON.parse(r) : {}),
                        l.find(function (t) {
                          return "text" === t.type;
                        }),
                        (t.n = 3),
                        Y(o, { blocks: l, context: c }, "default", {
                          useSequencer: !0,
                          autoStartSequence: !0,
                          onSequenceStart: function () {},
                          onSequenceComplete: function () {
                            s();
                          },
                        })
                      );
                    case 3:
                      ((h = o.querySelectorAll(".typing-effect-block")),
                        (u = o.querySelectorAll(".shuffle-effect-block")),
                        h.length,
                        u.length,
                        (t.n = 5));
                      break;
                    case 4:
                      ((t.p = 4), t.v);
                    case 5:
                      t.n = 7;
                      break;
                    case 6:
                      ((d = document.querySelectorAll(".typing-effect-block")),
                        (f = document.querySelectorAll(
                          ".shuffle-effect-block",
                        )),
                        (d.length > 0 || f.length > 0) &&
                          G({
                            typingSelector: ".typing-effect-block",
                            shuffleSelector: ".shuffle-effect-block",
                          }),
                        document.querySelectorAll(".shindan-chart-block")
                          .length > 0 && X());
                    case 7:
                      return t.a(2);
                  }
              },
              t,
              null,
              [[2, 4]],
            );
          }),
        ),
      ),
        $(document).on("click", "#loadMoreShindanTimeline", function () {
          var t = $(this).data("page");
          ($(this).children("i").remove(),
            $(this).prepend(btn_spinner),
            (function (t) {
              $.ajax({
                url: "/loadMoreShindanTimeline",
                type: "POST",
                dataType: "json",
                data: { shindan_info, page: t },
              })
                .done(function (t) {
                  void 0 !== t.html
                    ? ($("#loadMoreShindanTimelineContainer").remove(),
                      $("#resultRows").addClass("timeline-block-expanded"),
                      $("#resultRows").append(t.html),
                      $('[data-toggle="tooltip"]').tooltip(),
                      lazyload(),
                      twemoji.parse(document.getElementById("resultRows"), {
                        base: twemoji_asset,
                      }),
                      renderAllV2TimelineResults())
                    : $(this).remove();
                })
                .fail(function () {});
            })(t));
        }),
        (window.renderResult = Y),
        (window.renderSavedResult = function (t, e) {
          return Z.apply(this, arguments);
        }),
        (window.initializeChartsFromDOM = X),
        document.addEventListener("DOMContentLoaded", function () {
          var t = document.getElementById("clearStorageBtn");
          t &&
            t.addEventListener("click", function () {
              var e = t.dataset.confirmMessage,
                i = t.dataset.successMessage;
              confirm(e) &&
                window.shindanFormStorage &&
                (window.shindanFormStorage.clearAllData(),
                alert(i),
                location.reload());
            });
        }));
    })());
})();
