// 全ユーザー共通の初期タスクリスト・タスク内容
import { TaskList } from '../context/UserContext';

export const initialTaskLists: TaskList[] = [
    {
        id: '1',
        name: 'あさ',
        tasks: [
            { id:'0', title: 'おきた', image: { name: 'sun', type: 'AntDesign' }, done: false },
            { id:'1', title: 'うがいをする', image: { name: 'tooth', type: 'AntDesign' }, done: false },
            { id:'2', title: 'かおをあらう', image: { name: 'soap', type: 'AntDesign' }, done: false },
            { id:'3', title: 'おきがえをする', image: { name: 'shirt', type: 'AntDesign' }, done: false },
            { id:'4', title: 'あさごはんをたべる', image: { name: 'food', type: 'AntDesign' }, done: false },
            { id:'5', title: 'みだしなみをととのえる', image: { name: 'book', type: 'AntDesign' }, done: false },
            { id:'6', title: 'でるじゅんびをする', image: { name: 'backpack', type: 'AntDesign' }, done: false },
            { id:'7', title: 'でるじかんまであそぶ', image: { name: 'game', type: 'AntDesign' }, done: false },
            { id:'8', title: 'いえをでる', image: { name: 'door', type: 'AntDesign' }, done: false },
        ],
    },
    {
        id: '2',
        name: 'よる',
        tasks: [
            { id:'9', title: 'ただいま', image: { name: 'home', type: 'AntDesign' }, done: false },
            { id:'10', title: 'てあらい', image: { name: 'soap', type: 'AntDesign' }, done: false },
            { id:'11', title: 'うがい', image: { name: 'tooth', type: 'AntDesign' }, done: false },
            { id:'12', title: 'あらいものをだす', image: { name: 'food', type: 'AntDesign' }, done: false },
            { id:'13', title: 'しゅくだい', image: { name: 'book', type: 'AntDesign' }, done: false },
            { id:'14', title: 'あしたのじゅんび', image: { name: 'backpack', type: 'AntDesign' }, done: false },
            { id:'15', title: 'あそぶ', image: { name: 'game', type: 'AntDesign' }, done: false },
            { id:'16', title: 'おへやのおかたづけ', image: { name: 'clean', type: 'AntDesign' }, done: false },
            { id:'17', title: 'よるごはん', image: { name: 'food', type: 'AntDesign' }, done: false },
            { id:'18', title: 'はみがき', image: { name: 'tooth', type: 'AntDesign' }, done: false },
            { id:'19', title: 'トイレ', image: { name: 'toilet', type: 'AntDesign' }, done: false },
            { id:'20', title: 'パジャマをきる', image: { name: 'shirt', type: 'AntDesign' }, done: false },
            { id:'21', title: 'おやすみ', image: { name: 'moon', type: 'AntDesign' }, done: false },
            { id:'22', title: 'ならいごとのしゅくだい', image: { name: 'book', type: 'AntDesign' }, done: false },
        ],
    },
];

export default initialTaskLists;