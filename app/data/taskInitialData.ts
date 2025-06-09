// 全ユーザー共通の初期タスクリスト・タスク内容
import { TaskList } from '../context/UserContext';

export const initialTaskLists: TaskList[] = [
    {
        id: '1',
        name: 'あさ',
        tasks: [
            { id:'0', title: 'おきた', image: { name: 'sun', type: 'Feather' }, done: false },
            { id:'1', title: 'うがいをする', image: { name: 'cup-water', type: 'MaterialCommunityIcons' }, done: false },
            { id:'2', title: 'かおをあらう', image: { name: 'face-retouching-natural', type: 'MaterialIcons' }, done: false },
            { id:'3', title: 'おきがえをする', image: { name: 'tshirt', type: 'FontAwesome5' }, done: false },
            { id:'4', title: 'あさごはんをたべる', image: { name: 'food', type: 'MaterialCommunityIcons' }, done: false },
            { id:'5', title: 'みだしなみをととのえる', image: { name: 'user', type: 'Feather' }, done: false },
            { id:'6', title: 'でるじゅんびをする', image: { name: 'backpack', type: 'MaterialIcons' }, done: false },
            { id:'7', title: 'トイレにいく', image: { name: 'toilet', type: 'MaterialCommunityIcons' }, done: false },
            { id:'8', title: 'でるじかんまであそぶ', image: { name: 'gamepad-variant', type: 'MaterialCommunityIcons' }, done: false },
            { id:'9', title: 'いえをでる', image: { name: 'door', type: 'MaterialCommunityIcons' }, done: false },
        ],
    },
    {
        id: '2',
        name: 'よる',
        tasks: [
            { id:'10', title: 'ただいま', image: { name: 'home', type: 'MaterialCommunityIcons' }, done: false },
            { id:'11', title: 'てあらいをする', image: { name: 'hand-wash', type: 'MaterialCommunityIcons' }, done: false },
            { id:'12', title: 'うがいをする', image: { name: 'cup-water', type: 'MaterialCommunityIcons' }, done: false },
            { id:'13', title: 'あらいものをだす', image: { name: 'dirty-lens', type: 'MaterialIcons' }, done: false },
            { id:'14', title: 'しゅくだいをする', image: { name: 'book', type: 'Feather' }, done: false },
            { id:'15', title: 'あしたのじゅんびをする', image: { name: 'backpack', type: 'MaterialIcons' }, done: false },
            { id:'16', title: 'おくろにはいる', image: { name: 'bath', type: 'FontAwesome' }, done: false },
            { id:'17', title: 'あそぶ', image: { name: 'gamepad-variant', type: 'MaterialCommunityIcons' }, done: false },
            { id:'18', title: 'おへやのおかたづけをする', image: { name: 'broom', type: 'MaterialCommunityIcons' }, done: false },
            { id:'19', title: 'よるごはんをたべる', image: { name: 'food-turkey', type: 'MaterialCommunityIcons' }, done: false },
            { id:'20', title: 'はみがきをする', image: { name: 'toothbrush', type: 'MaterialCommunityIcons' }, done: false },
            { id:'21', title: 'トイレにいく', image: { name: 'toilet', type: 'MaterialCommunityIcons' }, done: false },
            { id:'22', title: 'パジャマをきる', image: { name: 'tshirt', type: 'MaterialCommunityIcons' }, done: false },
            { id:'23', title: 'おやすみ', image: { name: 'moon', type: 'Feather' }, done: false },
            { id:'24', title: 'ならいごとのしゅくだい', image: { name: 'book', type: 'Feather' }, done: false },
        ],
    },
];

export default initialTaskLists;