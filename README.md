# Lighthouse 連続計測スクリプト

このリポジトリは、Lighthouseを使用して特定のURLに対してモバイル環境で複数回のパフォーマンス測定を行い、各回の結果と平均を表示するNode.jsスクリプトです。各測定時の年月日・時刻も一緒に出力されます。

## 機能
- URLに対してモバイル環境でLighthouse計測を実施
- 複数回の計測結果と平均値を表示
- 計測した年月日と時間を出力

## 必要要件
- Node.js (v20.9 以上)
- npm (Node.js インストール時に同梱されています)

## インストール

1. リポジトリをクローンします:

    ```bash
    git clone https://github.com/codmon-k-sato/lighthouse-headless.git
    ```

2. ディレクトリに移動します:

    ```bash
    cd lighthouse-headless
    ```

3. 必要な依存パッケージをインストールします:

    ```bash
    npm install
    ```

## 使用方法

1. 指定したURLに対してLighthouseで5回の計測を行う:

    ```bash
    node lighthouse.mjs https://example.com 5
    ```

    - 第1引数: 測定するURL（デフォルトはcodmon.com）
    - 第2引数: 試行回数（デフォルトは5回）

2. 各回の結果と、その平均値がコンソールに表示されます。また、計測時の年月日・時刻も一緒に出力されます。

### サンプル出力

```bash
=== Measurement 1 ===
Timestamp: 2024/9/4 14:30:00
Lighthouse score (Mobile): 85
First Contentful Paint: 1.3s
Largest Contentful Paint: 2.0s
Total Blocking Time: 150ms
Cumulative Layout Shift: 0.02
Speed Index: 3.4s

...

=== Average of 5 Measurements ===
Average Lighthouse score (Mobile): 87.6
Average First Contentful Paint: 1.5s
Average Largest Contentful Paint: 2.3s
Average Total Blocking Time: 120.5ms
Average Cumulative Layout Shift: 0.01
Average Speed Index: 3.6s
