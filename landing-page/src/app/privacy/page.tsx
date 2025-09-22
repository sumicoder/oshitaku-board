import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList, 
  faShieldAlt, 
  faUser, 
  faCog, 
  faHandshake, 
  faEdit, 
  faExternalLinkAlt, 
  faExclamationTriangle, 
  faEnvelope, 
  faHome,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 relative overflow-hidden">
      {/* かわいい背景要素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-18 h-18 bg-red-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b-4 border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <FontAwesomeIcon icon={faClipboardList} className="text-white text-sm w-5" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
                  お支度ボード
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-yellow-500 transition-colors font-medium">
                ホーム
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-4 border-yellow-200">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full shadow-lg mb-4 sm:mb-6">
              <FontAwesomeIcon icon={faShieldAlt} className="text-yellow-600 text-xl sm:text-2xl lg:text-3xl w-6 sm:w-8 lg:w-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-yellow-600">
              プライバシーポリシー
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Code Crane（以下、「当社」といいます。）は、<br className="sm:hidden" />当社が提供するアプリ（以下、「本サービス」といいます。）における<br className="sm:hidden" />利用者の個人情報の取扱いについて、<br className="sm:hidden" />個人情報の保護に関する法律その他の法令を遵守し、<br className="sm:hidden" />以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6 sm:space-y-8">
            <section className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-yellow-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faUser} className="text-yellow-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                1. 個人情報の定義
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">本ポリシーにおいて「個人情報」とは、<br className="sm:hidden" />個人情報保護法第2条第1項に定める情報を指します。<br className="sm:hidden" />すなわち、生存する個人に関する情報であり、<br className="sm:hidden" />氏名、メールアドレス、その他の記述等により<br className="sm:hidden" />特定の個人を識別できるものをいいます。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-orange-50 to-red-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faCog} className="text-orange-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                2. 個人情報の取得と利用目的
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">当社は、以下の目的のために、<br className="sm:hidden" />利用者から個人情報を取得・利用します。</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg">
                  <li>本サービスの提供・運営のため</li>
                  <li>利用者からのお問い合わせ対応<br className="sm:hidden" />（本人確認を含む）</li>
                  <li>サービスの改善や新機能の開発、<br className="sm:hidden" />品質向上のため</li>
                  <li>メンテナンス、重要なお知らせ等の<br className="sm:hidden" />ご連絡のため</li>
                  <li>不正利用やトラブル防止のため</li>
                  <li>利用者ご自身の登録情報の<br className="sm:hidden" />閲覧・変更・削除のため</li>
                  <li>上記利用目的に付随する目的</li>
                </ul>
              </div>
            </section>

            <section className="bg-gradient-to-br from-red-50 to-pink-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-red-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faHandshake} className="text-red-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                3. 個人情報の適正な取得
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">当社は、適正かつ公正な手段により<br className="sm:hidden" />個人情報を取得し、<br className="sm:hidden" />偽りその他不正の手段により取得することはありません。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-yellow-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faShieldAlt} className="text-yellow-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                4. 個人情報の安全管理
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">当社は、個人情報の漏えい、滅失またはき損の防止、<br className="sm:hidden" />その他個人情報の安全管理のために<br className="sm:hidden" />必要かつ適切な措置を講じます。<br className="sm:hidden" />また、従業者や委託先に対しても<br className="sm:hidden" />適切な監督を行います。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-orange-50 to-red-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faHandshake} className="text-orange-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                5. 個人情報の第三者提供
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">当社は、法令に基づく場合や、<br className="sm:hidden" />以下の場合を除き、<br className="sm:hidden" />利用者の同意なく個人情報を第三者に提供しません。</p>
                <ul className="list-disc pl-4 sm:pl-6 space-y-1 sm:space-y-2 text-sm sm:text-base lg:text-lg">
                  <li>利用者の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護に<br className="sm:hidden" />必要な場合</li>
                  <li>公衆衛生の向上や児童の健全な育成推進に<br className="sm:hidden" />特に必要な場合</li>
                  <li>国の機関等への協力が必要な場合</li>
                </ul>
                <p className="text-sm sm:text-base lg:text-lg mt-2 sm:mt-4">なお、業務委託先への委託や事業承継等、<br className="sm:hidden" />個人情報保護法で認められる場合は<br className="sm:hidden" />第三者提供に該当しません。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-red-50 to-pink-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-red-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faEdit} className="text-red-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                6. 個人情報の開示・訂正・利用停止・削除
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">利用者ご本人から、自己の個人情報の<br className="sm:hidden" />開示、訂正、追加、削除、利用停止等の<br className="sm:hidden" />ご請求があった場合には、<br className="sm:hidden" />法令に従い、適切に対応いたします。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-yellow-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-yellow-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                7. 外部サービスの利用
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">本サービスでは、利便性向上や分析のために<br className="sm:hidden" />外部サービス（例：Google Analytics等）を<br className="sm:hidden" />利用する場合があります。<br className="sm:hidden" />これらのサービスが自動的に情報を取得する場合がありますので、<br className="sm:hidden" />各サービスのプライバシーポリシーもご確認ください。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-orange-50 to-red-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-orange-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faInfoCircle} className="text-orange-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                8. プライバシーポリシーの変更
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">本ポリシーの内容は、<br className="sm:hidden" />法令その他本ポリシーに別段の定めがある事項を除き、<br className="sm:hidden" />利用者に通知することなく変更することがあります。<br className="sm:hidden" />変更後の内容は本サービス内または公式サイト等で公表し、<br className="sm:hidden" />掲載時から効力を生じます。</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-red-50 to-pink-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-red-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-red-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                9. お問い合わせ窓口
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">プライバシーポリシーに関するご意見、ご質問、苦情、<br className="sm:hidden" />開示等のお申し出は、<br className="sm:hidden" /><a href="https://code-crane.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Code Craneホームページ</a> または<br className="sm:hidden" />下記メールアドレスまでご連絡ください。</p>
                <div className="bg-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-blue-300 mt-2 sm:mt-4">
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-blue-800">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-4" />
                    メールアドレス：<br className="sm:hidden" />k.tsuruhama@code-crane.com
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-yellow-300 mt-2 sm:mt-4">
                  <p className="text-sm sm:text-base lg:text-lg font-semibold text-yellow-800">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 w-4" />
                    お問い合わせフォーム：<br className="sm:hidden" /><a href="https://forms.gle/Ng9VirpV9nm8fh2f7" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">こちらからお問い合わせください</a>
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-yellow-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-yellow-600 text-lg sm:text-xl lg:text-2xl w-5 sm:w-6 lg:w-7 mr-2 sm:mr-3" />
                10. 免責事項
              </h2>
              <div className="text-gray-700 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base lg:text-lg">本サービスの利用により発生したいかなる損害についても、<br className="sm:hidden" />当社は一切の責任を負いません。<br className="sm:hidden" />利用者ご自身の責任において本サービスをご利用ください。</p>
                <p className="text-sm sm:text-base lg:text-lg">また、本サービスからリンクやバナーなどによって<br className="sm:hidden" />他のサイトに移動された場合、<br className="sm:hidden" />移動先サイトで提供される情報、サービス等について<br className="sm:hidden" />当社は一切責任を負いません。</p>
              </div>
            </section>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t-4 border-yellow-200">
              <Link 
                href="/" 
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-bold hover:from-yellow-600 hover:to-orange-700 transition-colors shadow-lg"
              >
                <FontAwesomeIcon icon={faHome} className="text-lg sm:text-xl w-5 sm:w-6 mr-2 sm:mr-3" />
                ホームに戻る
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base lg:text-lg text-gray-400">&copy; 2024 お支度ボード - Code Crane. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}