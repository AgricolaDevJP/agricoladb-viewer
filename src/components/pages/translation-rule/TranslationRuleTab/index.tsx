import type { FC } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import Headline2 from '@/components/common/Headline2'

const TranslationRuleTab: FC = () => {
  return (
    <Tabs defaultActiveKey="AG1" className="mt-4" id="translation-rules-tab" fill>
      <Tab eventKey="AG1" title="旧版 (AG1)">
        <section>
          <Headline2>出典</Headline2>
          <p>
            日本語版が発売されている以下の製品は、そのテキストを掲載する。ただし、明確な誤訳がある場合は、続くルールに示した出典から翻訳する。
          </p>
          <ul>
            <li>Xデッキ</li>
            <li>Öデッキ</li>
            <li>泥沼からの出発</li>
            <li>Czデッキ</li>
            <li>世界選手権デッキ</li>
          </ul>
          <p>以下の製品は、ドイツ語版をもとに翻訳する。</p>
          <ul>
            <li>アグリコラ（E・I・Kデッキ）</li>
            <li>Xデッキ</li>
            <li>Öデッキ</li>
            <li>泥沼からの出発</li>
            <li>Czデッキ</li>
            <li>Legen*dairy Forestデッキ</li>
            <li>NLデッキ</li>
            <li>ベルギーデッキ</li>
            <li>ビーレフェルトデッキ※</li>
          </ul>
          <p>以下の製品は、英語版をもとに翻訳する。</p>
          <ul>
            <li>Zデッキ</li>
            <li>ゲーマーズデッキ</li>
            <li>世界選手権デッキ</li>
            <li>πデッキ</li>
            <li>フランスデッキ</li>
          </ul>
          <p>
            ※Arthurがドイツ語版を保有していないため、当面は英語版から翻訳したテキストを掲載する。
          </p>
          <Headline2>用語</Headline2>
          <dl>
            <dt>建築資材 (building resources, Baustoffe)</dt>
            <dd>木材・レンガ・石材・葦</dd>
            <dt>資源 (resources, Rohstoffe)</dt>
            <dd>木材・レンガ・石材・葦・小麦・野菜</dd>
            <dt>品物 (goods, Waren)</dt>
            <dd>木材・レンガ・石材・葦・小麦・野菜・羊・猪・牛（・馬）</dd>
            <dt>家族</dt>
            <dd>
              労働フェイズや配置に関する記述の場合、ゲストを含む。それ以外なら、ゲストは含まない。
            </dd>
          </dl>
          <Headline2>カード名</Headline2>
          <p>
            日本語版のあるカードについては、たとえそれが誤訳だったとしても、そのカード名を掲載する。
          </p>
          <p>
            旧版(AG1)とリバイズドエディション(AG2)でカード名が被ることがある。同エディション内ではカード名でカードが一意に定まるようにしている。しかし、製品版に忠実にした結果として、以下の例外がある。
          </p>
          <ul>
            <li>休閑地[M015]と休閑地[M093]</li>
            <li>Farm Cart[M074]とFarm Cart[FL001]</li>
          </ul>
          <Headline2>その他</Headline2>
          <ul>
            <li>小さい進歩の前提は、特記がない限り「以上」がついているものとする。</li>
            <li>第7版ルールは採用していない。</li>
            <li>The Unofficial Agricola Compendium の独自裁定は採用しない。</li>
            <li>
              解釈が一意に定まらないカードについては、翻訳も非明瞭なままにしていることがある。
            </li>
          </ul>
        </section>
      </Tab>
      <Tab eventKey="AG2" title="リバイズド (AG2)">
        <section>
          <Headline2>出典</Headline2>
          <p>
            日本語版が発売されている以下の製品は、そのテキストを掲載する。ただし、明確な誤訳がある場合は、英語版から翻訳する。
          </p>
          <ul>
            <li>アグリコラ リバイズドエディション</li>
            <li>5-6人拡張</li>
            <li>アルティフェクスデッキ</li>
            <li>ブーブルクスデッキ</li>
            <li>コルバリウスデッキ</li>
            <li>ドゥルチナリアデッキ</li>
            <li>アグリコラ 15周年記念BOX</li>
          </ul>
          <p>
            日本語版が発売されていない製品は、全て英語版から翻訳する。ただし、英語版に誤訳がある場合、ドイツ語版から翻訳する。
          </p>
          <Headline2>用語</Headline2>
          <dl>
            <dt>建築資材 (building resources, Baustoffe)</dt>
            <dd>木材・レンガ・石材・葦</dd>
            <dt>資源 (resources, Rohstoffe)</dt>
            <dd>木材・レンガ・石材・葦・小麦・野菜</dd>
            <dt>品物 (goods, Waren)</dt>
            <dd>食料・木材・レンガ・石材・葦・小麦・野菜・羊・猪・牛（・馬）</dd>
          </dl>
          <p>
            <a href="https://hobbyjapan.games/agricola_artifex_deck/">
              アグリコラ：アルティフェクスデッキ | ANALOG GAME INDEX
            </a>
            に掲載されている、日本語版の用語変更を適用する。
          </p>
          <Headline2>カード名</Headline2>
          <p>
            日本語版のあるカードについては、たとえそれが誤訳だったとしても、そのカード名を掲載する。
          </p>
          <p>
            旧版(AG1)とリバイズドエディション(AG2)でカード名が被ることがある。同エディション内ではカード名でカードが一意に定まるようにしている。しかし、製品版に忠実にした結果として、以下の例外がある。
          </p>
          <ul>
            <li>露店[B008*]と露店[C054]</li>
            <li>Groom[B089*]とGroom[L085]</li>
          </ul>
          <p>再録カードであっても、旧版と同じカード名を使用しないことがある。</p>
          <Headline2>その他</Headline2>
          <ul>
            <li>小さい進歩の前提は、特記がない限り「以上」がついているものとする。</li>
            <li>
              BoardGameGeek のスレッドで、Hanno Girke 氏および Grzegorz Kobiela
              氏が書き込んだ裁定は公式のものとして扱う。
            </li>
            <li>The Unofficial Agricola Compendium の独自裁定は採用しない。</li>
            <li>
              解釈が一意に定まらないカードについては、翻訳も非明瞭なままにしていることがある。
            </li>
          </ul>
        </section>
      </Tab>
    </Tabs>
  )
}

export default TranslationRuleTab
