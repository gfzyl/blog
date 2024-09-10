import {
  Fragment,
  computed,
  createBaseVNode,
  createElementBlock,
  defineComponent,
  nextTick,
  normalizeStyle,
  onMounted,
  openBlock,
  reactive,
  renderList,
  toDisplayString,
  vShow,
  watch,
  withDirectives
} from "./chunk-PAUCAATC.js";
import "./chunk-HKJ2B2AA.js";

// node_modules/vue-activity-calendar/vue-activity-calendar.js
var N = { class: "activityCalendar" };
var A = { class: "left" };
var R = { class: "right" };
var H = ["onClick"];
var Y = { class: "levelFlagContent" };
var j = defineComponent({
  __name: "ActivityCalendar",
  props: [
    "data",
    "endDate",
    "width",
    "height",
    "cellLength",
    "cellInterval",
    "cellBorderRadius",
    "header",
    "backgroundColor",
    "colors",
    "weekDayFlagText",
    "levelFlagText",
    "fontSize",
    "fontColor",
    "showHeader",
    "showWeekDayFlag",
    "showLevelFlag",
    "levelMapper",
    "clickEvent"
  ],
  setup(D) {
    const t = D;
    var x = computed(() => t);
    watch(
      x,
      (l, n) => {
        $();
      },
      {
        deep: true
      }
    );
    var g = [];
    const e = reactive({
      data: [],
      beginDate: "",
      endDate: "",
      width: 35,
      height: 7,
      cellLength: 16,
      cellInterval: 6,
      cellBorderRadius: 3,
      header: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      headerLength: [],
      showHeader: true,
      backgroundColor: "#ffffff",
      colors: ["#f5f5f5", "#ebfaff", "#e5f9ff", "#c7f1ff", "#86e0fe", "#3ecefe"],
      showWeekDayFlag: true,
      weekDayFlagText: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekDayFlagLength: [],
      levels: 6,
      levelMapper: function(n) {
        return n == 0 ? 0 : n <= 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : n <= 9 ? 4 : 5;
      },
      showLevelFlag: true,
      levelFlagText: ["少", "多"],
      fontSize: 12,
      fontColor: "#080808",
      clickEvent: function(n) {
      }
    }), k = reactive({
      header(l) {
        return `
            left: ${l.length}px;
            font-size: ${e.fontSize}px; 
            color: ${e.fontColor};
        `;
      },
      weekDay(l) {
        return `
            top: ${l.length - 8}px;
            font-size: ${e.fontSize - 2}px;
            color: ${e.fontColor};

        `;
      },
      content() {
        return `
            grid-template-columns: repeat(${e.width + 1},${e.cellLength + e.cellInterval / 2}px);  
            grid-template-rows: repeat(${e.height} ,${e.cellLength + e.cellInterval / 2}px);
            background-color: ${e.backgroundColor};
        `;
      },
      item(l) {
        return `
            width: ${e.cellLength}px;
            height: config.cellLength px; 
            background-color: ${e == null ? void 0 : e.colors[e.levelMapper ? e.levelMapper(l.count) : 0]};
            border-radius: ${e.cellBorderRadius}px;
            visibility: ${l.index < 0 ? "hidden;" : ""};
        `;
      },
      levelFlag() {
        return `
            grid-template-columns: repeat(${e.colors.length},${e.cellLength + e.cellInterval / 2}px);
            grid-template-rows: repeat(1,${e.cellLength + e.cellInterval / 2}px);
            background-color: ${e.backgroundColor};
        `;
      },
      levelFlagItem(l) {
        return `
            width: ${e.cellLength}px; 
            background-color:  ${e.colors[l]}; 
            border-radius: ${e.cellBorderRadius}px;
            font-size: ${e.fontSize}px;
        `;
      }
    });
    function M() {
      let l = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], n = e.width * e.height;
      if (!e.endDate)
        return;
      let a = e.endDate.split("-"), d = Number(a[0]) - 0, r = Number(a[1]) - 0, o = Number(a[2]) - 0, i = d, u = r, s = o;
      if (n <= o)
        s = 1;
      else
        for (n -= o, u = (u - 1 + 11) % 12 + 1, s = 1; n > 0; ) {
          i % 4 == 0 && i % 100 != 0 || i % 400 == 0 ? l[2] = 29 : l[2] = 28;
          for (let v = u; v > 0; v--)
            if (l[v] <= n)
              n -= l[v], u = (u - 1 + 11) % 12 + 1;
            else {
              s = l[v] - n, n = 0;
              break;
            }
          n > 0 && (i -= 1);
        }
      e.beginDate = i + "-" + (u < 10 ? "0" + u : u) + "-" + (s < 10 ? "0" + s : s);
    }
    function E() {
      if (!g)
        return;
      g.sort((c, y) => c.date > y.date ? 1 : c.date < y.date ? -1 : 0);
      let l = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], n = e.width * e.height, a = 0;
      if (!e.beginDate)
        return;
      let d = e.beginDate.split("-"), r = Number(d[0]) - 0, o = Number(d[1]) - 0, i = Number(d[2]) - 0;
      (r % 4 == 0 && r % 100 != 0 || r % 400 == 0) && (l[2] = 29), i++, a++, i > l[o] && (i = 1, o++), o > 12 && (o = 1, r++, r % 4 == 0 && r % 100 != 0 || r % 400 == 0 ? l[2] = 29 : l[2] = 28);
      let u = [], s = 0;
      for (let c = 0; c < n; c++) {
        let y = r + "-" + (o < 10 ? "0" + o : o) + "-" + (i < 10 ? "0" + i : i), L = { index: c, count: 0, date: y };
        if (s < g.length) {
          for (; s < g.length && g[s].date < y; )
            s++;
          s < g.length && g[s].date == y && (L.count = g[s].count, s++);
        }
        u.push(L), i += 1, a++, i > l[o] && (i = 1, o += 1, o > 12 && (o = 1, r += 1, r % 4 == 0 && r % 100 != 0 || r % 400 == 0 ? l[2] = 29 : l[2] = 28), e.headerLength && e.headerLength.push({
          length: (e.cellLength + e.cellInterval / 2) * (a / e.height),
          text: e.header[o - 1]
        }));
      }
      let v = (/* @__PURE__ */ new Date(r + "-" + o + "-" + (i - 1))).getDay();
      for (let c = 0; c < v; c++)
        u.unshift({ index: c - v, date: "", count: 0 });
      if (e.data = u, e.showWeekDayFlag && e.weekDayFlagText) {
        e.weekDayFlagText.length > 7 && (e.weekDayFlagText = e.weekDayFlagText.slice(0, 7));
        for (let c = 0; c < e.height; c++)
          c % 2 == 0 && e.weekDayFlagLength.push({
            length: e.fontSize * 4 / 2 + 20 + e.cellInterval + c * (e.cellLength + e.cellInterval / 2),
            text: e.weekDayFlagText[c % 7]
          });
      }
    }
    function $() {
      if (t.endDate)
        e.endDate = t.endDate;
      else {
        let l = /* @__PURE__ */ new Date();
        e.endDate = l.getFullYear() + "-" + (l.getMonth() + 1 < 10 ? "0" + (l.getMonth() + 1) : l.getMonth() + 1) + "-" + (l.getDate() + 1 < 10 ? "0" + l.getDate() : l.getDate());
      }
      t.data && (g = t.data), t.height && (e.height = t.height), t.width && (e.width = t.width), t.cellLength && (e.cellLength = t.cellLength), t.cellInterval && (e.cellInterval = t.cellInterval), t.cellBorderRadius && (e.cellBorderRadius = t.cellBorderRadius), t.header && (e.header = t.header), t.showHeader && (e.showHeader = t.showHeader), t.backgroundColor && (e.backgroundColor = t.backgroundColor), t.colors && (e.colors = t.colors), typeof t.showWeekDayFlag == "boolean" && (e.showWeekDayFlag = t.showWeekDayFlag), t.weekDayFlagText && (e.weekDayFlagText = t.weekDayFlagText), t.levelMapper && (e.levelMapper = t.levelMapper), typeof t.showLevelFlag == "boolean" && (e.showLevelFlag = t.showLevelFlag), t.levelFlagText && (e.levelFlagText = t.levelFlagText), t.fontSize && (e.fontSize = t.fontSize), t.fontColor && (e.fontColor = t.fontColor), t.clickEvent && (e.clickEvent = t.clickEvent), M(), E();
    }
    return onMounted(() => {
      nextTick(() => {
        $();
      });
    }), (l, n) => (openBlock(), createElementBlock("div", N, [
      withDirectives(createBaseVNode("div", A, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.weekDayFlagLength, (a, d) => (openBlock(), createElementBlock("div", {
          key: d,
          style: normalizeStyle(k.weekDay(a))
        }, toDisplayString(a.text), 5))), 128))
      ], 512), [
        [vShow, e.showWeekDayFlag]
      ]),
      createBaseVNode("div", R, [
        withDirectives(createBaseVNode("div", {
          class: "header",
          style: normalizeStyle(`height: ${e.fontSize}px;`)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.headerLength, (a, d) => (openBlock(), createElementBlock("div", {
            key: d,
            style: normalizeStyle(k.header(a))
          }, toDisplayString(a.text), 5))), 128))
        ], 4), [
          [vShow, e.showHeader]
        ]),
        createBaseVNode("div", {
          class: "content",
          style: normalizeStyle(k.content())
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e.data, (a, d) => (openBlock(), createElementBlock("div", {
            class: "item",
            key: d,
            style: normalizeStyle(k.item(a)),
            onClick: (r) => e.clickEvent ? e.clickEvent(a) : null
          }, null, 12, H))), 128))
        ], 4),
        withDirectives(createBaseVNode("div", Y, [
          createBaseVNode("div", {
            style: normalizeStyle(`font-size: ${e.fontSize}px; color: ${e.fontColor}`)
          }, toDisplayString(e.levelFlagText ? e.levelFlagText[0] : ""), 5),
          createBaseVNode("div", {
            class: "levelFlag",
            style: normalizeStyle(k.levelFlag())
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.colors, (a, d) => (openBlock(), createElementBlock("div", {
              key: d,
              style: normalizeStyle(k.levelFlagItem(d))
            }, null, 4))), 128))
          ], 4),
          createBaseVNode("div", {
            style: normalizeStyle(`font-size: ${e.fontSize}px; color: ${e.fontColor}`)
          }, toDisplayString(e.levelFlagText ? e.levelFlagText[1] : ""), 5)
        ], 512), [
          [vShow, e.showLevelFlag]
        ])
      ])
    ]));
  }
});
var O = (D, t) => {
  const x = D.__vccOpts || D;
  for (const [g, e] of t)
    x[g] = e;
  return x;
};
var P = O(j, [["__scopeId", "data-v-de96ee93"]]);
var V = [P];
var G = function(D) {
  V.forEach((t) => {
    D.component(t.__name, t);
  });
};
export {
  P as ActivityCalendar,
  G as default
};
//# sourceMappingURL=vue-activity-calendar.js.map
