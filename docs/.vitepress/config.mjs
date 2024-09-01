import {defineConfig} from 'vitepress'
import sidebar from "./sidebar.mjs";
import navbar from "./navbar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "York-经典鸡粉",
    description: "York的个人技术博客",

    // 启用最近更新时间
    lastUpdated: true,

    // head
    head: [
        // 站点图标
        ["link", {rel: "/icon", href: "/avatar.jpg"}],

        // 谷歌字体
        [
            'link',
            {rel: 'preconnect', href: 'https://fonts.googleapis.com'}
        ],
        [
            'link',
            {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}
        ],
        [
            'link',
            {href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet'}
        ],

        // SEO
        [
            "meta",
            {
                name: "keywords",
                content:
                    "York-经典鸡粉, Java开发, 编程分享, 项目, IT, 求职, 面经",
            },
        ],

        // 添加百度统计
        [
            "script",
            {},
            `
                var _hmt = _hmt || [];
                (function() {
                  var hm = document.createElement("script");
                  hm.src = "https://hm.baidu.com/hm.js?2675818a983a3131404cee835018f016";
                  var s = document.getElementsByTagName("script")[0]; 
                  s.parentNode.insertBefore(hm, s);
                })();
            `,
        ],
    ],
    // markdown
    markdown: {
        // 开启代码块的行号
        lineNumbers: true,
        // 支持 4 级以上的标题渲染
        extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
    },

    // plugins
    plugins: [
        // 图片懒加载
        ["img-lazy"],
        // 代码复制
        [
            "vuepress-plugin-code-copy",
            {
                successText: "代码已复制",
            },
        ],
        // seo
        [
            "seo",
            {
                siteTitle: (_, $site) => $site.title,
                title: ($page) => $page.title,
                description: ($page) =>
                    $page.frontmatter.description || $page.description,
                author: (_, $site) => $site.themeConfig.author || author,
                tags: ($page) => $page.frontmatter.tags || tags,
                type: ($page) => "article",
                url: (_, $site, path) =>
                    ($site.themeConfig.domain || domain || "") + path,
                image: ($page, $site) =>
                    $page.frontmatter.image &&
                    (($site.themeConfig.domain &&
                            !$page.frontmatter.image.startsWith("http")) ||
                        "") + $page.frontmatter.image,
                publishedAt: ($page) =>
                    $page.frontmatter.date && new Date($page.frontmatter.date),
                modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
            },
        ],
        // back-to-top
        ['@vuepress/back-to-top', {
            threshold: 100,
            progress: true
        }],

    ],

    // 主题
    themeConfig: {
        // logo
        logo: "/icon/avater.jpg",

        // 导航栏
        nav: navbar,

        // 侧边栏
        sidebar: sidebar,
        // sidebar: [
        //     {
        //         text: '文章表',
        //         items: [
        //             {text: 'Markdown Examples', link: '/markdown-examples'},
        //             {text: 'Runtime API Examples', link: '/api-examples'}
        //         ]
        //     },
        //     {
        //         text: '后端篇',
        //         items: [
        //             {text: '心得', link: '/backend/心得'},
        //             {text: 'Runtime API Examples', link: '/api-examples'}
        //         ]
        //     },
        // ],

        // 更新时间
        lastUpdatedText: "最近更新时间",

        // 上下篇
        docFooter: {prev: '上一篇', next: '下一篇'},

        outlineTitle: "目录",
        // 侧边栏显示二级标题到六级标题
        outline: [2, 6],

        // 字数统计
        count: {
            countable: true,
            fontsize: "0.9em",
            color: "rgb(90,90,90)",
            language: "chinese",
        },

        // 页信息
        pageInfo: ["Author", "Category", "Tag", "Original", "Word", "ReadingTime"],

        // GitHub 仓库位置
        repo: "gfzyl/york-blog",
        docsBranch: "main",

        // 编辑
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: '完善页面'
        },

        // 友链
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ],

        // 底部版权信息
        footer: {
            copyright: "Copyright@ 2024 York"
        },

        // 设置搜索框的样式
        search: {
            provider: "local",
            options: {
                translations: {
                    button: {
                        buttonText: "搜索文档",
                        buttonAriaLabel: "搜索文档",
                    },
                    modal: {
                        noResultsText: "无法找到相关结果",
                        resetButtonTitle: "清除查询条件",
                        footer: {
                            selectText: "选择",
                            navigateText: "切换",
                        },
                    },
                },
            },
        },
    },
})
