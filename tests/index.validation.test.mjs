import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.ok(html.includes('产科质控'), '应修复“产科质检”拼写为“产科质控”。');
assert.ok(!html.includes('产科质检'), '页面中不应再出现旧拼写“产科质检”。');

const idMatches = [...html.matchAll(/id:\s*'(\d+)'/g)].map((m) => m[1]);
assert.ok(idMatches.length > 0, '应能从 STAFF_DATA 中提取员工 ID。');
assert.equal(new Set(idMatches).size, idMatches.length, 'STAFF_DATA 中员工 ID 应唯一。');

assert.ok(
  html.includes('const monthData = data?.[month] ?? {};') && html.includes('Boolean(monthData[s.id]?.[i])'),
  '应对月度任务读取使用空值保护，防止数据缺失时崩溃。',
);

assert.ok(html.includes('window.__TASKFLOW_CONFIG__ ?? {}'), '应支持通过 config.js 注入运行时配置。');
assert.ok(html.includes('new URLSearchParams(window.location.search).get(\'workspace\')'), '应支持通过 URL 指定协作空间。');
assert.ok(html.includes('window.updateDoc(') && html.includes('{ [`${month}.${sid}.${ti}`]: newVal }'), '多人协同时应使用字段级更新避免整文档覆盖。');

console.log('index.html validation checks passed');
