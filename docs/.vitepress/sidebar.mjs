import algorithmSideBar from "./sidebars/algorithmSideBar.mjs";
import randomThoughtsSideBar from "./sidebars/randomThoughtsSideBar.mjs";
import apeFrameSideBar from "./sidebars/apeFrameSideBar.mjs";

export default {
    "/求职算法突击训练/": algorithmSideBar,
    "/代码随想录算法/": randomThoughtsSideBar,
    "/Ape-frame脚手架项目/": apeFrameSideBar,
    "/": [   // 添加一个默认的首页侧边栏
        {
            text: '首页',
            items: [
                {text: '首页', link: '/'},
            ]
        }
    ]
};
