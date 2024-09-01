import algorithmSideBar from "./sidebars/algorithmSideBar.mjs";
import randomThoughtsSideBar from "./sidebars/randomThoughtsSideBar.mjs";
import apeFrameSideBar from "./sidebars/apeFrameSideBar.mjs";

export default {
    "/guide/求职算法突击训练/": algorithmSideBar,
    "/guide/代码随想录算法/": randomThoughtsSideBar,
    "/guide/Ape-frame脚手架项目/": apeFrameSideBar,
    "/": [   // 添加一个默认的首页侧边栏
        {
            text: '首页',
            items: [
                {text: '首页', link: '/'},
            ]
        }
    ]
};
