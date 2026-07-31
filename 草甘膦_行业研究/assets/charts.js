/**
 * 草甘膦行业深度分析报告 - ECharts 图表脚本
 * 遵循 Fresh Gradient 配色规范，使用 CSS 变量
 */

(function () {
  'use strict';

  /* ---- helpers ────────────────────────────────────────── */
  function css(key) {
    return getComputedStyle(document.documentElement).getPropertyValue(key).trim();
  }

  function waitForEl(id, cb, n) {
    if (document.getElementById(id)) { cb(); return; }
    n = n || 0; if (n > 50) return;
    setTimeout(function () { waitForEl(id, cb, n + 1); }, 80);
  }

  /* ───────────────────────────────────────────────────────
     1. 国内现货价格走势图 (2025-08 ~ 2026-07)
     ─────────────────────────────────────────────────────── */
  function renderChart1() {
    var el = document.getElementById('chart-spot-price');
    if (!el) return;
    var chart = echarts.init(el);
    var months = [
      '2025-08','2025-09','2025-10','2025-11','2025-12',
      '2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'
    ];
    // Chemicalbook 分段均价月末代表值（元/吨）
    var prices = [26700,27800,27620,27000,25125,24000,24000,30000,35000,38000,28300,27000];
    var option = {
      tooltip: {
        trigger: 'axis',
        valueFormatter: function (v) { return '¥' + v.toLocaleString() + '/吨'; }
      },
      grid: { left: 70, right: 30, top: 40, bottom: 50 },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } },
        axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: 'value',
        name: '元/吨',
        nameTextStyle: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLabel: {
          color: css('--muted') || '#6b7280',
          fontSize: 11,
          formatter: function (v) { return (v / 1000).toFixed(0) + 'k'; }
        },
        splitLine: { lineStyle: { color: css('--rule') || '#e5e7eb', type: 'dashed' } }
      },
      series: [{
        type: 'line',
        data: prices,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: css('--accent') || '#2563eb', width: 3 },
        itemStyle: { color: css('--accent') || '#2563eb' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: (css('--accent') || '#2563eb') + '33' },
              { offset: 1, color: (css('--accent') || '#2563eb') + '05' }
            ]
          }
        },
        markPoint: {
          data: [
            { type: 'min', name: '最低价', symbolSize: 50 },
            { type: 'max', name: '最高价', symbolSize: 50 }
          ],
          label: {
            color: '#fff',
            fontSize: 10,
            formatter: function (p) { return '¥' + p.value.toLocaleString(); }
          },
          itemStyle: { color: css('--accent2') || '#059669' }
        }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     2. 价格波动分段归因图（三段 + 事件标注）
     ─────────────────────────────────────────────────────── */
  function renderChart2() {
    var el = document.getElementById('chart-price-attribution');
    if (!el) return;
    var chart = echarts.init(el);
    var months = [
      '2025-08','2025-09','2025-10','2025-11','2025-12',
      '2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07'
    ];
    // Chemicalbook 分段均价月末代表值（元/吨）
    var prices = [26700,27800,27620,27000,25125,24000,24000,30000,35000,38000,28300,27000];

    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          var p = params[0];
          var html = '<strong>' + p.axisValue + '</strong><br/>' +
            '现货价: ¥' + p.value.toLocaleString() + '/吨';
          return html;
        }
      },
      grid: { left: 70, right: 30, top: 50, bottom: 50 },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } }
      },
      yAxis: {
        type: 'value',
        name: '元/吨',
        nameTextStyle: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLabel: {
          color: css('--muted') || '#6b7280', fontSize: 11,
          formatter: function (v) { return (v / 1000).toFixed(0) + 'k'; }
        },
        splitLine: { lineStyle: { color: css('--rule') || '#e5e7eb', type: 'dashed' } }
      },
      series: [{
        type: 'line',
        data: prices,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: css('--accent') || '#2563eb', width: 3 },
        itemStyle: { color: css('--accent') || '#2563eb' },
        markArea: {
          silent: true,
          data: [
            // 阶段一：下行期 2025-08 ~ 2026-02
            [{
              xAxis: '2025-08',
              itemStyle: { color: '#ef444433' },
              label: {
                position: 'insideTopLeft',
                color: '#ef4444',
                fontSize: 11,
                fontWeight: 'bold',
                formatter: '阶段一：需求疲软·供应宽松'
              }
            }, {
              xAxis: '2026-02'
            }],
            // 阶段二：快速上涨 2026-03 ~ 2026-05
            [{
              xAxis: '2026-03',
              itemStyle: { color: '#f59e0b33' },
              label: {
                position: 'insideTop',
                color: '#d97706',
                fontSize: 11,
                fontWeight: 'bold',
                formatter: '阶段二：供需共振·快速拉升'
              }
            }, {
              xAxis: '2026-05'
            }],
            // 阶段三：回调 2026-06 ~ 2026-07
            [{
              xAxis: '2026-06',
              itemStyle: { color: '#3b82f633' },
              label: {
                position: 'insideTopRight',
                color: '#2563eb',
                fontSize: 11,
                fontWeight: 'bold',
                formatter: '阶段三：需求担忧·去库存'
              }
            }, {
              xAxis: '2026-07'
            }]
          ]
        },
        markLine: {
          silent: true,
          symbol: 'none',
          data: [
            {
              xAxis: '2026-07',
              label: { formatter: '2026-07 华润双鹤\n拟收购利尔化学23.5%', color: '#dc2626', fontSize: 10, position: 'insideEndTop' },
              lineStyle: { color: '#dc2626', type: 'dashed', width: 1.5 }
            },
            {
              yAxis: 24000,
              label: { formatter: '¥24,000 底部', color: css('--muted') || '#6b7280', fontSize: 10, position: 'insideEnd' },
              lineStyle: { color: css('--muted') || '#6b7280', type: 'dotted', width: 1 }
            },
            {
              yAxis: 38000,
              label: { formatter: '¥38,000 顶部', color: css('--muted') || '#6b7280', fontSize: 10, position: 'insideEnd' },
              lineStyle: { color: css('--muted') || '#6b7280', type: 'dotted', width: 1 }
            }
          ]
        }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     3. 出口量额双轴图（Comtrade 2024）
     ─────────────────────────────────────────────────────── */
  function renderChart3() {
    var el = document.getElementById('chart-export');
    if (!el) return;
    var chart = echarts.init(el);
    var months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    // UN Comtrade 实际数据（2024，reporter=156 中国，HS 293149，partner=0 全球）
    // qty（kg→吨）；fobvalue（美元→万美元）
    var volumes = [55984, 44783, 51891, 48778, 52202, 52198, 65415, 53913, 51387, 51673, 52518, 54653];
    var values  = [16757, 13162, 14567, 14373, 15658, 15934, 20301, 15858, 14395, 14729, 16809, 15915];

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        formatter: function (params) {
          var vol = params.find(function (p) { return p.seriesName === '出口量'; });
          var val = params.find(function (p) { return p.seriesName === '出口额'; });
          var html = '<strong>' + params[0].axisValue + '</strong><br/>';
          if (vol) html += '出口量: ' + vol.value.toLocaleString() + ' 吨<br/>';
          if (val) html += '出口额: $' + val.value.toLocaleString() + ' 万';
          return html;
        }
      },
      legend: {
        data: ['出口量', '出口额'],
        bottom: 0,
        textStyle: { color: css('--muted') || '#6b7280', fontSize: 12 }
      },
      grid: { left: 70, right: 70, top: 30, bottom: 50 },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } }
      },
      yAxis: [
        {
          type: 'value',
          name: '出口量（吨）',
          nameTextStyle: { color: css('--accent') || '#2563eb', fontSize: 11 },
          axisLabel: {
            color: css('--accent') || '#2563eb', fontSize: 11,
            formatter: function (v) { return (v / 1000).toFixed(0) + 'k'; }
          },
          splitLine: { lineStyle: { color: css('--rule') || '#e5e7eb', type: 'dashed' } }
        },
        {
          type: 'value',
          name: '出口额（万美元）',
          nameTextStyle: { color: css('--accent2') || '#059669', fontSize: 11 },
          axisLabel: {
            color: css('--accent2') || '#059669', fontSize: 11,
            formatter: function (v) { return '$' + (v / 1000).toFixed(1) + 'k'; }
          },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '出口量',
          type: 'bar',
          data: volumes,
          barWidth: '50%',
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: (css('--accent') || '#2563eb') },
                { offset: 1, color: (css('--accent') || '#2563eb') + '88' }
              ]
            },
            borderRadius: [3,3,0,0]
          }
        },
        {
          name: '出口额',
          type: 'line',
          yAxisIndex: 1,
          data: values,
          smooth: true,
          symbol: 'diamond',
          symbolSize: 8,
          lineStyle: { color: css('--accent2') || '#059669', width: 2 },
          itemStyle: { color: css('--accent2') || '#059669' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: (css('--accent2') || '#059669') + '33' },
                { offset: 1, color: (css('--accent2') || '#059669') + '05' }
              ]
            }
          }
        }
      ]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     4. 全球产能分布饼图（中国 vs 海外）
     ─────────────────────────────────────────────────────── */
  function renderChart4() {
    var el = document.getElementById('chart-capacity-pie');
    if (!el) return;
    var chart = echarts.init(el);
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: function (p) {
          return p.name + '<br/>产能: ' + p.value + ' 万吨/年<br/>占比: ' + p.percent.toFixed(1) + '%';
        }
      },
      legend: {
        orient: 'vertical',
        right: 20,
        top: 'center',
        textStyle: { color: css('--muted') || '#6b7280', fontSize: 12 }
      },
      series: [{
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6,
          borderColor: css('--bg') || '#f8f9fb',
          borderWidth: 3
        },
        label: {
          show: true,
          formatter: function (p) { return p.percent.toFixed(1) + '%'; },
          color: css('--ink') || '#1a1a2e',
          fontSize: 13,
          fontWeight: 'bold'
        },
        emphasis: {
          label: { show: true, fontSize: 16, fontWeight: 'bold' },
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.15)' }
        },
        data: [
          { value: 39, name: '海外产能', itemStyle: { color: css('--muted') || '#6b7280' } },
          { value: 81, name: '中国产能', itemStyle: { color: css('--accent') || '#2563eb' } }
        ]
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     5. 企业产能排名条形图
     ─────────────────────────────────────────────────────── */
  function renderChart5() {
    var el = document.getElementById('chart-capacity-bar');
    if (!el) return;
    var chart = echarts.init(el);
    var companies = ['兴发集团','福华通达','新安股份','江山股份','广信股份','和邦生物','利尔化学','扬农化工','拜耳(海外)'];
    var capacities = [23, 15, 8, 7, 6, 5, 5, 4, 37];
    var accent = css('--accent') || '#2563eb';
    var accent2 = css('--accent2') || '#059669';

    var colors = capacities.map(function (v) {
      return v >= 15 ? accent : (v >= 7 ? accent2 : (css('--muted') || '#6b7280'));
    });

    var option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          var p = params[0];
          return p.name + '<br/>产能: ' + p.value + ' 万吨/年';
        }
      },
      grid: { left: 100, right: 40, top: 20, bottom: 30 },
      xAxis: {
        type: 'value',
        name: '万吨/年',
        nameTextStyle: { color: css('--muted') || '#6b7280', fontSize: 11 },
        axisLabel: { color: css('--muted') || '#6b7280', fontSize: 11 },
        splitLine: { lineStyle: { color: css('--rule') || '#e5e7eb', type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: companies,
        axisLabel: { color: css('--ink') || '#1a1a2e', fontSize: 12, fontWeight: '500' },
        axisLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: capacities.map(function (v, i) {
          return {
            value: v,
            itemStyle: {
              color: colors[i],
              borderRadius: [0, 4, 4, 0]
            }
          };
        }),
        barWidth: '55%',
        label: {
          show: true,
          position: 'right',
          formatter: function (p) { return p.value + ' 万吨'; },
          color: css('--ink') || '#1a1a2e',
          fontSize: 11,
          fontWeight: 'bold'
        },
        markLine: {
          silent: true,
          symbol: 'none',
          data: [
            {
              xAxis: 10,
              label: {
                formatter: '行业均值线 ~10万吨',
                color: css('--muted') || '#6b7280',
                fontSize: 10,
                position: 'insideEndTop'
              },
              lineStyle: { color: css('--muted') || '#6b7280', type: 'dashed', width: 1 }
            }
          ]
        }
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     6. 企业弹性对比雷达图
     ─────────────────────────────────────────────────────── */
  function renderChart6() {
    var el = document.getElementById('chart-elasticity');
    if (!el) return;
    var chart = echarts.init(el);
    var accent = css('--accent') || '#2563eb';
    var accent2 = css('--accent2') || '#059669';

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: function (p) {
          var html = '<strong>' + p.seriesName + '</strong><br/>';
          if (p.value) {
            var dims = ['产能规模','成本优势','草甘膦弹性','盈利波动','出口占比','一体化率'];
            p.value.forEach(function (v, i) {
              html += dims[i] + ': ' + v + '<br/>';
            });
          }
          return html;
        }
      },
      legend: {
        data: ['兴发集团','福华通达','新安股份','江山股份','利尔化学','扬农化工'],
        bottom: 0,
        textStyle: { color: css('--muted') || '#6b7280', fontSize: 11 },
        itemWidth: 14,
        itemHeight: 14
      },
      radar: {
        indicator: [
          { name: '产能规模', max: 10 },
          { name: '成本优势', max: 10 },
          { name: '草甘膦弹性', max: 10 },
          { name: '盈利波动', max: 10 },
          { name: '出口占比', max: 10 },
          { name: '一体化率', max: 10 }
        ],
        radius: '65%',
        axisName: {
          color: css('--muted') || '#6b7280',
          fontSize: 11
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(37,99,235,0.02)','rgba(37,99,235,0.04)','rgba(37,99,235,0.06)','rgba(37,99,235,0.08)']
          }
        },
        axisLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } },
        splitLine: { lineStyle: { color: css('--rule') || '#e5e7eb' } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [9, 8, 7, 6, 6, 9],
            name: '兴发集团',
            areaStyle: { color: accent + '22' },
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent }
          },
          {
            value: [7, 7, 8, 7, 5, 6],
            name: '福华通达',
            areaStyle: { color: accent2 + '22' },
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 }
          },
          {
            value: [5, 6, 6, 5, 7, 5],
            name: '新安股份',
            areaStyle: { color: '#f59e0b22' },
            lineStyle: { color: '#f59e0b', width: 2 },
            itemStyle: { color: '#f59e0b' }
          },
          {
            value: [4, 5, 7, 6, 8, 4],
            name: '江山股份',
            areaStyle: { color: '#8b5cf622' },
            lineStyle: { color: '#8b5cf6', width: 2 },
            itemStyle: { color: '#8b5cf6' }
          },
          {
            value: [5, 7, 9, 8, 4, 5],
            name: '利尔化学',
            areaStyle: { color: '#ec489922' },
            lineStyle: { color: '#ec4899', width: 2 },
            itemStyle: { color: '#ec4899' }
          },
          {
            value: [4, 8, 5, 4, 6, 8],
            name: '扬农化工',
            areaStyle: { color: '#14b8a622' },
            lineStyle: { color: '#14b8a6', width: 2 },
            itemStyle: { color: '#14b8a6' }
          }
        ]
      }]
    };
    chart.setOption(option);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  /* ───────────────────────────────────────────────────────
     Init — wait for DOM and ECharts, then render all
     ─────────────────────────────────────────────────────── */
  function init() {
    renderChart1();
    renderChart2();
    renderChart3();
    renderChart4();
    renderChart5();
    renderChart6();
  }

  if (typeof echarts !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } else {
    waitForEl('chart-spot-price', init);
  }

})();