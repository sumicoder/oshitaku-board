// 全ユーザー共通の初期タスクリスト・タスク内容
import { TaskList } from './UserContext';

export const initialTaskLists: TaskList[] = [
  {
    id: '1',
    name: 'あさ',
    tasks: [
      { title: 'おきた', image: '🌞', color: '#FFD700' },
      { title: 'うがいをする', image: '🦷', color: '#00BFFF' },
      { title: 'かおをあらう', image: '🧼', color: '#00BFFF' },
      { title: 'おきがえをする', image: '👕', color: '#FFD700' },
      { title: 'あさごはんをたべる', image: '🍚', color: '#FFD700' },
      { title: 'みだしなみをととのえる', image: '🧑‍🎓', color: '#FFD700' },
      { title: 'でるじゅんびをする', image: '🎒', color: '#FFD700' },
      { title: 'でるじかんまであそぶ', image: '🎮', color: '#FFD700' },
      { title: 'いえをでる', image: '🚪', color: '#FFD700' },
    ],
  },
  {
    id: '2',
    name: 'よる',
    tasks: [
      { title: 'ただいま', image: '🏠', color: '#FFD700' },
      { title: 'てあらい', image: '🧼', color: '#00BFFF' },
      { title: 'うがい', image: '🦷', color: '#00BFFF' },
      { title: 'あらいものをだす', image: '🍽️', color: '#FFD700' },
      { title: 'しゅくだい', image: '📚', color: '#FFD700' },
      { title: 'あしたのじゅんび', image: '🎒', color: '#FFD700' },
      { title: 'あそぶ', image: '🎮', color: '#FFD700' },
      { title: 'おへやのおかたづけ', image: '🧹', color: '#FFD700' },
      { title: 'よるごはん', image: '🍚', color: '#FFD700' },
      { title: 'はみがき', image: '🦷', color: '#00BFFF' },
      { title: 'トイレ', image: '🚽', color: '#FFD700' },
      { title: 'パジャマをきる', image: '🛏️', color: '#FFD700' },
      { title: 'おやすみ', image: '🌙', color: '#FFD700' },
      { title: 'ならいごとのしゅくだい', image: '📚', color: '#FFD700' },
    ],
  },
]; 