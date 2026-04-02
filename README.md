# bob-handson-starter

IBM Bob ハンズオン用のメモAPIプロジェクトです。

## 概要

Python（Flask）製の簡易メモAPIサーバーです。
CRUD機能が部分的に実装されています。

## セットアップ

```bash
pip install -r requirements.txt
```

## 起動

```bash
python app.py
```

サーバーが `http://localhost:5000` で起動します。

## API

| メソッド | パス | 説明 |
|---------|------|------|
| GET | `/api/memos` | メモ一覧取得 |
| GET | `/api/memos/<id>` | メモ詳細取得 |
| POST | `/api/memos` | メモ新規作成 |

## テスト

```bash
python -m pytest
```

## 学習ポイント（講師向け）

このプロジェクトには、ハンズオンでBobの各機能を体験するための仕込みが含まれています。

| 仕込み内容 | 対象セクション | 対象ファイル | Bobで体験すること |
|-----------|:---:|------------|-----------------|
| DELETE `/api/memos/<id>` が未実装 | S3 | `routes/memos.py` | Codeモードで新規実装 |
| 循環的複雑度の高い関数 (`get_memo_stats`) | S3 | `routes/memos.py` | Askモードで説明を求める |
| データモデルに `category` フィールドが未定義 | S3 | `models/memo.py` | Planモードでカテゴリ追加の計画を作成 |
| 一部テストが失敗する（category・DELETE関連） | S4 | `tests/test_memos.py` | `@problems`でエラーをBobに共有して修正 |
| 古いコメントが残っている（2023年Q2予定、担当者名など） | S4 | `db.py` | `@`ファイルメンションで指定して質問 |
