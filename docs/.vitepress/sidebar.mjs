import apeFrameSidebar from './sidebars/apeFrameSideBar.mjs';
import algorithmSidebar from './sidebars/algorithmSideBar.mjs';
import randomThoughtsSidebar from './sidebars/randomThoughtsSideBar.mjs';

const sidebar = [
    {
        text: 'APE-FRAME脚手架项目',
        items: apeFrameSidebar.map(item => ({
            text: item.text || item.title,  // 适配不同的属性命名
            link: `/guide/Ape-frame脚手架项目/${item.link || item.children[0]}`
        }))
    },
    {
        text: '代码随想录算法',
        items: randomThoughtsSidebar.map(item => ({
            text: item.text || item.title,
            link: `/guide/代码随想录算法/${item.link || item.children[0]}`
        }))
    },
    {
        text: '求职算法突击训练',
        items: algorithmSidebar.map(item => ({
            text: item.text || item.title,
            link: `/guide/求职算法突击训练/${item.link || item.children[0]}`
        }))
    },
];

export default sidebar;
