"use client"
import React, { useState } from 'react';

const AlphabetChart = () => {
  const [activeScript, setActiveScript] = useState('hiragana');

  const hiragana = {
    basic: [
      ['あ', 'い', 'う', 'え', 'お'],
      ['か', 'き', 'く', 'け', 'こ'],
      ['さ', 'し', 'す', 'せ', 'そ'],
      ['た', 'ち', 'つ', 'て', 'と'],
      ['な', 'に', 'ぬ', 'ね', 'の'],
      ['は', 'ひ', 'ふ', 'へ', 'ほ'],
      ['ま', 'み', 'む', 'め', 'も'],
      ['や', '', 'ゆ', '', 'よ'],
      ['ら', 'り', 'る', 'れ', 'ろ'],
      ['わ', '', '', '', 'を'],
      ['ん', '', '', '', '']
    ],
    dakuten: [
      ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
      ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
      ['だ', 'ぢ', 'づ', 'で', 'ど'],
      ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
      ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ']
    ]
  };

  const katakana = {
    basic: [
      ['ア', 'イ', 'ウ', 'エ', 'オ'],
      ['カ', 'キ', 'ク', 'ケ', 'コ'],
      ['サ', 'シ', 'ス', 'セ', 'ソ'],
      ['タ', 'チ', 'ツ', 'テ', 'ト'],
      ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
      ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
      ['マ', 'ミ', 'ム', 'メ', 'モ'],
      ['ヤ', '', 'ユ', '', 'ヨ'],
      ['ラ', 'リ', 'ル', 'レ', 'ロ'],
      ['ワ', '', '', '', 'ヲ'],
      ['ン', '', '', '', '']
    ],
    dakuten: [
      ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
      ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
      ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
      ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
      ['パ', 'ピ', 'プ', 'ペ', 'ポ']
    ]
  };

  const romanji = {
    basic: [
      ['a', 'i', 'u', 'e', 'o'],
      ['ka', 'ki', 'ku', 'ke', 'ko'],
      ['sa', 'shi', 'su', 'se', 'so'],
      ['ta', 'chi', 'tsu', 'te', 'to'],
      ['na', 'ni', 'nu', 'ne', 'no'],
      ['ha', 'hi', 'fu', 'he', 'ho'],
      ['ma', 'mi', 'mu', 'me', 'mo'],
      ['ya', '', 'yu', '', 'yo'],
      ['ra', 'ri', 'ru', 're', 'ro'],
      ['wa', '', '', '', 'wo'],
      ['n', '', '', '', '']
    ],
    dakuten: [
      ['ga', 'gi', 'gu', 'ge', 'go'],
      ['za', 'ji', 'zu', 'ze', 'zo'],
      ['da', 'ji', 'zu', 'de', 'do'],
      ['ba', 'bi', 'bu', 'be', 'bo'],
      ['pa', 'pi', 'pu', 'pe', 'po']
    ]
  };

  const currentScript = activeScript === 'hiragana' ? hiragana : katakana;

  return (
      <div className="max-w-6xl mx-auto pt-12">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveScript('hiragana')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeScript === 'hiragana'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            ひらがな Hiragana
          </button>
          <button
            onClick={() => setActiveScript('katakana')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              activeScript === 'katakana'
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            カタカナ Katakana
          </button>
        </div>

        <div className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-white/80 text-center mb-6">Basic Characters (清音)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700"></th>
                  <th className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700">あ段 (a)</th>
                  <th className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700">い段 (i)</th>
                  <th className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700">う段 (u)</th>
                  <th className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700">え段 (e)</th>
                  <th className="border-2 border-gray-300 bg-gray-400  p-3 font-semibold text-gray-700">お段 (o)</th>
                </tr>
              </thead>
              <tbody>
                {currentScript.basic.map((row, i) => (
                  <tr key={i}>
                    <td className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700 text-center">
                      {['あ行', 'か行', 'さ行', 'た行', 'な行', 'は行', 'ま行', 'や行', 'ら行', 'わ行', ''][i]}
                    </td>
                    {row.map((char, j) => (
                      <td key={j} className="border-2 border-gray-300 p-3 text-center hover:bg-neutral-950 transition-colors">
                        {char && (
                          <div>
                            <div className="text-4xl font-medium text-white/80 mb-1">{char}</div>
                            <div className="text-sm text-gray-500">{romanji.basic[i][j]}</div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white/80 text-center mb-6">Dakuten & Handakuten (濁音・半濁音)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3"></th>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3 font-semibold text-gray-700">い段 (i)</th>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3 font-semibold text-gray-700">あ段 (a)</th>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3 font-semibold text-gray-700">う段 (u)</th>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3 font-semibold text-gray-700">え段 (e)</th>
                  <th className="border-2 border-gray-300 bg-gray-500 p-3 font-semibold text-gray-700">お段 (o)</th>
                </tr>
              </thead>
              <tbody>
                {currentScript.dakuten.map((row, i) => (
                  <tr key={i}>
                    <td className="border-2 border-gray-300 bg-gray-400 p-3 font-semibold text-gray-700 text-center">
                      {['が行', 'ざ行', 'だ行', 'ば行', 'ぱ行'][i]}
                    </td>
                    {row.map((char, j) => (
                      <td key={j} className="border-2 border-gray-300 p-3 text-center hover:bg-neutral-950 transition-colors">
                        <div>
                          <div className="text-4xl font-medium text-white/80 mb-1">{char}</div>
                          <div className="text-sm text-gray-500">{romanji.dakuten[i][j]}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default AlphabetChart;