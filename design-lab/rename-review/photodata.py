# -*- coding: utf-8 -*-
import sys, os, re, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from final_map import FINAL, NEW13
from PIL import Image
SITE='/Users/shoas/Desktop/Claude Code/lumadesign'

OLD2NEW={c:n for c,_,n in FINAL}
NEWNAMES={n for _,_,n in FINAL if n} | {n for n,_ in NEW13}
LOC={c:l for c,l,_ in FINAL}
LOC.update({n:l for n,l in NEW13})
LOC.update({n:l for c,l,n in FINAL if n})   # 新名からも引けるように

CAT_JA={'couple':'前撮り','landscape':'風景写真','city':'都市写真','aviation':'航空写真','snap':'スナップ'}
CAT_EN={'couple':'a pre-wedding photo','landscape':'a landscape photo','city':'a city photo','aviation':'an aviation photo','snap':'a snapshot'}
LOC_EN={
 '神社':'a Japanese shrine','和室':'a traditional Japanese room',
 '代々木公園駅裏':'the backstreets near Yoyogi-koen, Tokyo','江ノ島':'Enoshima, Kanagawa',
 '羽田空港':'Haneda Airport, Tokyo','AKAO Forest (熱海)':'AKAO Forest, Atami',
 '片瀬海岸':'Katase Beach, Shonan','江ノ電沿線':'along the Enoden line',
 '羽田空港 第2ターミナル':'Haneda Airport Terminal 2','東京駅':'Tokyo Station',
 '横浜みなとみらい':'Minato Mirai, Yokohama','札幌 大通公園':'Odori Park, Sapporo',
 '平岡公園 (北海道)':'Hiraoka Park, Sapporo','札幌':'Sapporo',
 '札幌 北海道庁旧本庁舎':'the former Hokkaido Government Office, Sapporo',
 '札幌 大通':'Odori, Sapporo','札幌 駅前通':'Ekimae-dori, Sapporo','札幌 すすきの':'Susukino, Sapporo',
 '札幌 JRタワー':'the JR Tower observatory, Sapporo','江ノ島シーキャンドル':'Enoshima Sea Candle',
 '裏渋谷':'Ura-Shibuya, Tokyo','羽田空港 第3ターミナル':'Haneda Airport Terminal 3',
 '横浜 大さん橋':'Osanbashi Pier, Yokohama','高輪ゲートウェイ':'Takanawa Gateway, Tokyo',
 '熱海':'Atami, Shizuoka','伊丹スカイパーク':'Itami Skypark, Osaka International Airport',
}
NEW_TITLES=[
 ('itami-jal-787-departure-sky.jpg','空へ抜ける','Into the Open Sky'),
 ('itami-jal-737-runway-flowers.jpg','花越しの JAL 737','JAL 737 Beyond the Flowers'),
 ('itami-ana-737-taxiing-flowers.jpg','花と誘導路','Flowers and the Taxiway'),
 ('itami-ana-737-landing-through-trees.jpg','木々越しの着陸','Landing Through the Trees'),
 ('itami-ana-737-takeoff-mountains.jpg','山の稜線へ','Toward the Ridgeline'),
 ('itami-sunflowers-summer-sky.jpg','ひまわりと夏の空','Sunflowers and Summer Sky'),
 ('itami-sunflowers-vertical.jpg','ひまわりを見上げる','Looking Up at Sunflowers'),
 ('itami-sunflowers-blue-hour.jpg','日没前のひまわり','Sunflowers Before Dusk'),
 ('itami-ana-a320-panning-dusk.jpg','薄暮の A320','A320 at Twilight'),
 ('itami-jal-767-sunset-mountains.jpg','山際の夕景','Dusk by the Mountains'),
 ('itami-jac-turboprop-evening.jpg','夕方のプロペラ機','Turboprop in the Evening'),
 ('itami-terminal-night-view.jpg','夜のターミナル遠景','Terminal from Afar at Night'),
 ('itami-airport-sign-night.jpg','ITAMI のサイン','The Itami Sign'),
]

def build():
    src=open(f'{SITE}/photography.html',encoding='utf-8').read()
    m=re.search(r'const PHOTOS = \[(.*?)\n  \];', src, re.S)
    out=[]
    for g in re.finditer(r"\{ cat:'(.*?)', ja:'(.*?)', en:(\".*?\"|'.*?'), src:'images/photography/(.*?)' \}", m.group(1)):
        cat,ja,en,f = g.group(1), g.group(2), g.group(3).strip('"\''), g.group(4)
        if f in NEWNAMES:              # 実行後の再解析でも動くように
            new=f
        else:
            new=OLD2NEW.get(f)
            if not new: continue       # 退避した11枚
        out.append(dict(cat=cat,ja=ja,en=en,file=new,loc=LOC[f]))
    have={o['file'] for o in out}
    for f,ja,en in NEW_TITLES:
        if f in have: continue         # 既に反映済みなら重複させない
        out.append(dict(cat='aviation',ja=ja,en=en,file=f,loc=LOC[f]))
    for p in out:
        path=f'{SITE}/images/photography/{p["file"]}'
        with Image.open(path) as im: p['w'],p['h']=im.size
        p['src']=f'images/photography/{p["file"]}'
        p['alt_ja']=f'{p["ja"]} — {p["loc"]}で撮影した{CAT_JA[p["cat"]]}。{p["en"]} (Nikon Z6III / LUMA Frame)'
        p['alt_en']=f'{p["en"]} — {CAT_EN[p["cat"]]} taken at {LOC_EN[p["loc"]]}. Shot on the Nikon Z6III (LUMA Frame)'
    return out
