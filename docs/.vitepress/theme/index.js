// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import DefaultTheme from 'vitepress/theme'
import {onMounted, watch, nextTick} from 'vue'
import {useRoute} from 'vitepress'
import mediumZoom from 'medium-zoom'
// busuanzi插件
import {inBrowser} from "vitepress";
import busuanzi from "busuanzi.pure.js";
import DataPanel from "./components/DataPanel.vue";
// 五彩纸屑
import Confetti from "./components/Confetti.vue";
// 更新时间
import update from "./components/update.vue"
// 字数统计
import ArticleMetadata from "./components/ArticleMetadata.vue";


import './style.css'
import './index.css'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({app, router, siteData}) {
        app.component("DataPanel", DataPanel);//注册全局组件
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch();
            };
        }
        app.component("Confetti", Confetti); //五彩纸屑注册全局组件
        app.component('update' , update); //更新时间注册全局
        app.component('ArticleMetadata' , ArticleMetadata); //字数统计
        // ...
    },
    setup() {
        const route = useRoute()

        const initZoom = () => {
            // 初始化 MediumZoom 仅在每个路由切换时调用
            mediumZoom('.main img', {background: 'var(--vp-c-bg)'})
        };

        onMounted(() => {
            initZoom()
        })

        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        )
    }
}
