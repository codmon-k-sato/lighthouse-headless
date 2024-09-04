import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

// コマンドライン引数からURLと試行回数を取得
const args = process.argv.slice(2);
const url = args[0] || 'https://www.codmon.com';  // URLが指定されない場合はデフォルトURLを使用
const trials = parseInt(args[1], 10) || 5;  // 試行回数が指定されない場合は5回実行

async function runLighthouse(url, trials) {
  const chrome = await launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'silent',  // ログを抑制
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 2.625,
      disabled: false,
    }
  };

  // 計測結果の合計値を保持する変数
  let totalScore = 0;
  let totalFcp = 0;
  let totalLcp = 0;
  let totalTbt = 0;
  let totalCls = 0;
  let totalSpeedIndex = 0;

  for (let i = 1; i <= trials; i++) {
    // 現在の日時を取得
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString(); // 年月日時分秒を取得

    console.log(`\n=== Measurement ${i} ===`);
    console.log(`Timestamp: ${timestamp}`);

    const runnerResult = await lighthouse(url, options);

    // Lighthouseの結果を取得
    const performanceScore = runnerResult.lhr.categories.performance.score * 100;
    const fcp = parseFloat(runnerResult.lhr.audits['first-contentful-paint'].displayValue.replace('s', ''));  // 秒表記を除去
    const lcp = parseFloat(runnerResult.lhr.audits['largest-contentful-paint'].displayValue.replace('s', ''));
    const tbt = parseFloat(runnerResult.lhr.audits['total-blocking-time'].displayValue.replace('ms', ''));
    const cls = parseFloat(runnerResult.lhr.audits['cumulative-layout-shift'].displayValue);
    const speedIndex = parseFloat(runnerResult.lhr.audits['speed-index'].displayValue.replace('s', ''));

    // 各指標の値を加算
    totalScore += performanceScore;
    totalFcp += fcp;
    totalLcp += lcp;
    totalTbt += tbt;
    totalCls += cls;
    totalSpeedIndex += speedIndex;

    // 各計測の結果を表示
    console.log(`Lighthouse score (Mobile): ${performanceScore}`);
    console.log(`First Contentful Paint: ${fcp}s`);
    console.log(`Largest Contentful Paint: ${lcp}s`);
    console.log(`Total Blocking Time: ${tbt}ms`);
    console.log(`Cumulative Layout Shift: ${cls}`);
    console.log(`Speed Index: ${speedIndex}s`);
  }

  // 平均値を計算して表示
  console.log(`\n=== Average of ${trials} Measurements ===`);
  console.log(`Average Lighthouse score (Mobile): ${(totalScore / trials).toFixed(2)}`);
  console.log(`Average First Contentful Paint: ${(totalFcp / trials).toFixed(2)}s`);
  console.log(`Average Largest Contentful Paint: ${(totalLcp / trials).toFixed(2)}s`);
  console.log(`Average Total Blocking Time: ${(totalTbt / trials).toFixed(2)}ms`);
  console.log(`Average Cumulative Layout Shift: ${(totalCls / trials).toFixed(3)}`);
  console.log(`Average Speed Index: ${(totalSpeedIndex / trials).toFixed(2)}s`);

  await chrome.kill();
}

runLighthouse(url, trials);
