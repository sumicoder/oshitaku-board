import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList, 
  faUsers, 
  faClock, 
  faTasks, 
  faPalette, 
  faSyncAlt,
  faSun,
  faMoon,
  faStar,
  faMobileAlt,
  faHome,
  faShieldAlt,
  faChartBar,
  faHeart,
  faChild,
  faEye,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 relative overflow-hidden">
      {/* かわいい背景要素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-red-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-60 left-1/2 w-12 h-12 bg-orange-300 rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faClipboardList} className="text-white text-sm w-5 h-auto aspect-square" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
                  やることボード
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/privacy" className="text-gray-600 hover:text-yellow-500 transition-colors font-medium">
                プライバシーポリシー
              </Link>
              <a 
                href="https://forms.gle/Ng9VirpV9nm8fh2f7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-500 transition-colors font-medium"
              >
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full shadow-lg mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faStar} className="text-yellow-600 text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="text-yellow-600">
              毎日のやることを
            </span>
            <br />
            <span className="text-orange-500">
              これひとつで
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            <span className="text-yellow-600 font-semibold">
              やることボード
            </span>
            は、子どもたちが<br className="sm:hidden" />毎日の準備や「やること」を<br />
            <span className="text-orange-600 font-bold">楽しく</span>、
            <span className="text-red-600 font-bold">わかりやすく</span><br className="sm:hidden" />管理できるアプリです！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <a
              href="https://apps.apple.com/jp/app/%E3%82%84%E3%82%8B%E3%81%93%E3%81%A8%E3%83%9C%E3%83%BC%E3%83%89/id6747373489"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-base sm:text-lg lg:text-xl font-bold hover:from-yellow-600 hover:to-orange-700 transition-colors shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2 sm:space-x-3">
                <FontAwesomeIcon icon={faMobileAlt} className="text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
                <span>App Storeで<br className="sm:hidden" />ダウンロード</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full shadow-lg mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faChartBar} className="text-yellow-600 text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10 h-auto aspect-square" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-yellow-600">
              主な機能
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 px-4">
              子どもたちの自主性と達成感を育む、<br className="sm:hidden" /><span className="text-orange-600 font-bold">豊富な機能</span>をご用意！
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-yellow-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faTasks} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">やること管理</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                「やること」の追加・編集・削除と<br className="sm:hidden" />進捗管理が<span className="text-yellow-600 font-bold">簡単</span>にできます！
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-red-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-orange-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faUsers} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">複数ユーザー対応</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                兄弟姉妹で一緒に使える！<br className="sm:hidden" /><span className="text-orange-600 font-bold">最大3人</span>まで対応
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-pink-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-red-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faClock} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">時計表示</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                アナログ・デジタル、サイズや位置も<br className="sm:hidden" /><span className="text-red-600 font-bold">自由</span>に設定
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-yellow-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faClipboardList} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">やることボード</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                複数のボードを作成・管理して、<br className="sm:hidden" /><span className="text-yellow-600 font-bold">用途別</span>に使い分け
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-red-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-orange-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faPalette} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">テーマカラー</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                ユーザーごとに好きな色を設定して、<br className="sm:hidden" /><span className="text-orange-600 font-bold">個性</span>を表現
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-pink-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg border-4 border-red-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <FontAwesomeIcon icon={faSyncAlt} className="text-white text-lg sm:text-xl lg:text-2xl w-6 sm:w-7 lg:w-8 h-auto aspect-square" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">自動リセット</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                日付が変わると自動的に<br className="sm:hidden" />「やること」が<span className="text-red-600 font-bold">リセット</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute top-20 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-18 h-18 bg-red-300 rounded-full opacity-30 animate-bounce"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full shadow-lg mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faHome} className="text-yellow-600 text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10 h-auto aspect-square" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-yellow-600">
              利用シーン
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 px-4">
              日常の様々な場面で<br className="sm:hidden" /><span className="text-orange-600 font-bold">活用</span>できます！
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-yellow-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 sm:mr-6 shadow-lg">
                  <FontAwesomeIcon icon={faSun} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">朝の身支度</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                歯磨き、着替え、朝食、<br className="sm:hidden" />ランドセルの準備など、朝のルーティンを<span className="text-yellow-600 font-bold">楽しく</span>管理！<br className="sm:hidden" />子どもたちが自主的に準備を進められるようサポートします
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-orange-300">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 sm:mr-6 shadow-lg">
                  <FontAwesomeIcon icon={faMoon} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">夜の準備</h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                お風呂、明日の準備、読書、<br className="sm:hidden" />就寝時間など、夜のルーティンも管理！<br className="sm:hidden" />一日の終わりを<span className="text-orange-600 font-bold">スムーズ</span>に迎えられます
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlights Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full shadow-lg mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faStar} className="text-yellow-600 text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10 h-auto aspect-square" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-yellow-600">
              特徴
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 px-4">
              やることボードの<br className="sm:hidden" /><span className="text-orange-600 font-bold">魅力</span>をご紹介！
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                <FontAwesomeIcon icon={faPalette} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-4">様々なビューを<br className="sm:hidden" />設定可能！</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                <FontAwesomeIcon icon={faHeart} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-4">親子で使いやすい<br className="sm:hidden" />シンプルなデザイン！</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                <FontAwesomeIcon icon={faChild} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-4">直感的な操作で<br className="sm:hidden" />小さなお子さまでも<br className="sm:hidden" />使いやすい！</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                <FontAwesomeIcon icon={faEye} className="text-white text-2xl sm:text-3xl lg:text-4xl w-8 sm:w-10 lg:w-12 h-auto aspect-square" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-4">進捗が一目でわかる<br className="sm:hidden" />インターフェース！</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-18 h-18 bg-white/20 rounded-full animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="mb-6 sm:mb-8">
            <FontAwesomeIcon icon={faStar} className="text-white text-4xl sm:text-6xl lg:text-8xl w-16 sm:w-20 lg:w-24 h-auto aspect-square" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-4">
            やることボードで、<br className="sm:hidden" />毎日の準備を<br />
            <span className="text-yellow-200">もっと楽しく</span>、<br className="sm:hidden" />
            <span className="text-yellow-300">スムーズに</span>しましょう！
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4">
            兄弟姉妹で一緒に使える！<br className="sm:hidden" />自主性や達成感を育むサポートをします
          </p>
          <a
            href="https://apps.apple.com/jp/app/%E3%82%84%E3%82%8B%E3%81%93%E3%81%A8%E3%83%9C%E3%83%BC%E3%83%89/id6747373489"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-orange-600 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-2xl sm:rounded-3xl text-lg sm:text-xl lg:text-2xl font-bold hover:bg-gray-100 transition-colors shadow-2xl inline-block"
          >
            <span className="flex items-center justify-center space-x-3 sm:space-x-4">
              <FontAwesomeIcon icon={faMobileAlt} className="text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10 h-auto aspect-square" />
              <span>App Storeで<br className="sm:hidden" />ダウンロード</span>
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faClipboardList} className="text-white text-sm w-5 h-auto aspect-square" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400">やることボード</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg">毎日のやることを<br className="sm:hidden" />これひとつで</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base lg:text-lg font-medium">
                プライバシーポリシー
              </Link>
              <a 
                href="https://forms.gle/Ng9VirpV9nm8fh2f7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors text-sm sm:text-base lg:text-lg font-medium"
              >
                お問い合わせ
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base lg:text-lg">&copy; 2025 やることボード - Code Crane. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}