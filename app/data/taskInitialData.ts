// 全ユーザー共通の初期タスクリスト・タスク内容
import { TaskList } from '../context/UserContext';

export const initialTaskLists: TaskList[] = [
    {
        id: '1',
        name: 'あさ',
        tasks: [
            { id:'0', title: 'おきた', image: '🌞', done: false },
            { id:'1', title: 'うがいをする', image: '🦷', done: false },
            { id:'2', title: 'かおをあらう', image: '🧼', done: false },
            { id:'3', title: 'おきがえをする', image: '👕', done: false },
            { id:'4', title: 'あさごはんをたべる', image: '🍚', done: false },
            { id:'5', title: 'みだしなみをととのえる', image: '🧑‍🎓', done: false },
            { id:'6', title: 'でるじゅんびをする', image: '🎒', done: false },
            { id:'7', title: 'でるじかんまであそぶ', image: '🎮', done: false },
            { id:'8', title: 'いえをでる', image: '🚪', done: false },
        ],
    },
    {
        id: '2',
        name: 'よる',
        tasks: [
            { id:'9', title: 'ただいま', image: '🏠', done: false },
            { id:'10', title: 'てあらい', image: '🧼', done: false },
            { id:'11', title: 'うがい', image: '🦷', done: false },
            { id:'12', title: 'あらいものをだす', image: '🍽️', done: false },
            { id:'13', title: 'しゅくだい', image: '📚', done: false },
            { id:'14', title: 'あしたのじゅんび', image: '🎒', done: false },
            { id:'15', title: 'あそぶ', image: '🎮', done: false },
            { id:'16', title: 'おへやのおかたづけ', image: '🧹', done: false },
            { id:'17', title: 'よるごはん', image: '🍚', done: false },
            { id:'18', title: 'はみがき', image: '🦷', done: false },
            { id:'19', title: 'トイレ', image: '🚽', done: false },
            { id:'20', title: 'パジャマをきる', image: '🛏️', done: false },
            { id:'21', title: 'おやすみ', image: '🌙', done: false },
            { id:'22', title: 'ならいごとのしゅくだい', image: '📚', done: false },
        ],
    },
];

export default initialTaskLists;