// https://vitepress.dev/guide/custom-theme
import {h} from 'vue'
import DefaultTheme from 'vitepress/theme'
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
// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
// 图片缩放
import mediumZoom from 'medium-zoom'
import {onMounted, watch, nextTick} from 'vue';
// 开启评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import {useData, useRoute} from 'vitepress';
// BackToTop
import BackToTop from './components/BackToTop.vue'
// ActivityCalendar
import {ActivityCalendar} from "vue-activity-calendar";
//同时引入css文件，确保基本样式可用
import "vue-activity-calendar/style.css";
// 打卡
import CheckIn from "./components/CheckIn.vue";

import './style.css'
import './index.css'

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            // 在布局底部插入 BackToTop 组件
            'layout-bottom': () => h(BackToTop)
        })
    },
    enhanceApp({app, router, siteData}) {
        app.component("DataPanel", DataPanel);//注册全局组件
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch();
            };
        }
        app.component('BackToTop', BackToTop); // BackToTop
        app.component("Confetti", Confetti); //五彩纸屑注册全局组件
        app.component('update', update); //更新时间注册全局
        app.component('ArticleMetadata', ArticleMetadata); //字数统计
        app.component('ActivityCalendar', ActivityCalendar); // 背诵统计
        app.component('CheckIn', CheckIn); //打卡
        // ...
        // 在页面加载后处理标题
        router.onAfterRouteChanged = () => {
            const pageId = `page-${Math.random().toString(36).substr(2, 9)}`;
            document.querySelectorAll('h1').forEach((heading, index) => {
                heading.id = `page-${index}`;
                heading.insertAdjacentHTML('afterend', `<CheckIn pageId="${heading.id}" />`);
            });
        };
    },
    setup() {
        // Get frontmatter and route
        const {frontmatter} = useData();
        const route = useRoute();

        // giscus配置(评论)
        giscusTalk({
                repo: 'gfzyl/york-blog', //仓库
                repoId: 'R_kgDOMqoWgg', //仓库ID
                category: 'Announcements', // 讨论分类
                categoryId: 'DIC_kwDOMqoWgs4CiH3y', //讨论分类ID
                mapping: 'pathname',
                inputPosition: 'bottom',
                lang: 'zh-CN',
                theme: "preferred_color_scheme",
                loading: "lazy"
            },
            {
                frontmatter, route
            },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        );

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