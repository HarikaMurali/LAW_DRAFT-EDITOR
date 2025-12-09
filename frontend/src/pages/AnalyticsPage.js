import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../App.css';

const AnalyticsPage = () => {
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
  const stats = {
    totalDrafts: 47,
    thisMonth: 12,
    averageTime: '8.5',
    mostUsedType: 'Contract',
  };

  const draftsByType = [
    { type: 'Contract', count: 18, percentage: 38, color: 'bg-green-500' },
    { type: 'Civil', count: 12, percentage: 26, color: 'bg-blue-500' },
    { type: 'Criminal', count: 8, percentage: 17, color: 'bg-red-500' },
    { type: 'Family', count: 5, percentage: 11, color: 'bg-purple-500' },
    { type: 'Property', count: 4, percentage: 8, color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { date: '2024-12-08', action: 'Generated Contract Draft', type: 'Contract' },
    { date: '2024-12-07', action: 'Edited Civil Complaint', type: 'Civil' },
    { date: '2024-12-06', action: 'Generated Criminal Motion', type: 'Criminal' },
    { date: '2024-12-05', action: 'Generated Employment Agreement', type: 'Employment' },
    { date: '2024-12-04', action: 'Generated Property Deed', type: 'Property' },
  ];

  const monthlyData = [
    { month: 'Jul', drafts: 8 },
    { month: 'Aug', drafts: 12 },
    { month: 'Sep', drafts: 15 },
    { month: 'Oct', drafts: 10 },
    { month: 'Nov', drafts: 14 },
    { month: 'Dec', drafts: 12 },
  ];

  const maxDrafts = Math.max(...monthlyData.map(m => m.drafts));

  // Generate SVG path for line chart with smooth curves
  const generateLinePath = () => {
    const width = 600;
    const height = 200;
    const padding = 20;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const xStep = chartWidth / (monthlyData.length - 1);
    const points = monthlyData.map((item, index) => ({
      x: padding + index * xStep,
      y: height - padding - (item.drafts / maxDrafts) * chartHeight
    }));

    // Create smooth curve using quadratic bezier curves
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      
      path += ` Q ${current.x} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      path += ` Q ${next.x} ${next.y}, ${next.x} ${next.y}`;
    }
    
    return { path, points };
  };

  const { path: linePath, points: chartPoints } = generateLinePath();

  const exportAnalytics = () => {
    // Create comprehensive analytics report
    const reportData = [
      ['Analytics Report - Lawyers Draft Maker'],
      ['Generated on:', new Date().toLocaleString()],
      [''],
      ['SUMMARY STATISTICS'],
      ['Total Drafts', stats.totalDrafts],
      ['This Month', stats.thisMonth],
      ['Average Time (mins)', stats.averageTime],
      ['Most Used Type', stats.mostUsedType],
      [''],
      ['DRAFTS BY TYPE'],
      ['Type', 'Count', 'Percentage'],
      ...draftsByType.map(d => [d.type, d.count, `${d.percentage}%`]),
      [''],
      ['MONTHLY TREND'],
      ['Month', 'Drafts Generated'],
      ...monthlyData.map(m => [m.month, m.drafts]),
      [''],
      ['RECENT ACTIVITY'],
      ['Date', 'Action', 'Type'],
      ...recentActivity.map(a => [a.date, a.action, a.type])
    ];

    const csvContent = reportData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📊 Analytics Dashboard</h1>
          <p className="text-slate-400">Track your drafting activity and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
            <p className="text-purple-200 text-sm">Total Drafts</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.totalDrafts}</p>
            <p className="text-purple-300 text-xs mt-2">📈 +12% from last month</p>
          </div>
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
            <p className="text-blue-200 text-sm">This Month</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.thisMonth}</p>
            <p className="text-blue-300 text-xs mt-2">🔥 Great progress!</p>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800">
            <p className="text-green-200 text-sm">Avg Time (mins)</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.averageTime}</p>
            <p className="text-green-300 text-xs mt-2">⚡ Fast generation</p>
          </div>
          <div className="card bg-gradient-to-br from-orange-600 to-orange-800">
            <p className="text-orange-200 text-sm">Most Used</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.mostUsedType}</p>
            <p className="text-orange-300 text-xs mt-2">🎯 Top category</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Drafts by Type */}
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">📁 Drafts by Type</h3>
            <div className="space-y-4">
              {draftsByType.map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-medium">{item.type}</span>
                    <span className="text-slate-400 text-sm">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">📈 Monthly Trend</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    chartType === 'line' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  📈 Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    chartType === 'bar' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  📊 Bar
                </button>
              </div>
            </div>

            {chartType === 'line' ? (
              /* Line Chart */
              <div className="bg-slate-800 rounded-lg p-6">
                <svg 
                  viewBox="0 0 600 240" 
                  className="w-full"
                  style={{ maxHeight: '240px' }}
                >
                  {/* Grid lines */}
                  <g className="grid-lines" opacity="0.2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="20"
                        y1={20 + (i * 40)}
                        x2="580"
                        y2={20 + (i * 40)}
                        stroke="#64748b"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                      />
                    ))}
                  </g>

                  {/* Area under curve (gradient fill) */}
                  <defs>
                    <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`${linePath} L 580 220 L 20 220 Z`}
                    fill="url(#areaGradient)"
                  />

                  {/* Main line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="line-animate"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))'
                    }}
                  />

                  {/* Data points */}
                  {chartPoints.map((point, index) => (
                    <g key={index}>
                      {/* Outer glow circle */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="#a855f7"
                        opacity="0.3"
                        className="pulse-point"
                      />
                      {/* Main point */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="5"
                        fill="#a855f7"
                        stroke="#1e293b"
                        strokeWidth="2"
                        className="hover-point"
                        style={{ cursor: 'pointer' }}
                      >
                        <title>{monthlyData[index].month}: {monthlyData[index].drafts} drafts</title>
                      </circle>
                      {/* Value label */}
                      <text
                        x={point.x}
                        y={point.y - 15}
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {monthlyData[index].drafts}
                      </text>
                    </g>
                  ))}

                  {/* X-axis labels */}
                  {chartPoints.map((point, index) => (
                    <text
                      key={index}
                      x={point.x}
                      y="235"
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="12"
                      fontWeight="500"
                    >
                      {monthlyData[index].month}
                    </text>
                  ))}
                </svg>
              </div>
            ) : (
              /* Bar Chart */
              <div className="bg-slate-900 rounded-lg p-6">
                <div className="flex items-end justify-around gap-3" style={{ height: '250px' }}>
                  {monthlyData.map((item) => (
                    <div key={item.month} className="flex flex-col items-center justify-end flex-1">
                      {/* Value on top */}
                      <div className="text-white font-bold text-base mb-2">
                        {item.drafts}
                      </div>
                      {/* Bar */}
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 cursor-pointer"
                        style={{ 
                          height: `${(item.drafts / maxDrafts) * 180}px`,
                          background: 'linear-gradient(to top, #9333ea, #a855f7, #c084fc)',
                          boxShadow: '0 4px 20px rgba(147, 51, 234, 0.5)',
                          minHeight: '20px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to top, #a855f7, #c084fc, #e9d5ff)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(to top, #9333ea, #a855f7, #c084fc)';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      {/* Month Label */}
                      <p className="text-slate-300 text-sm font-medium mt-3">{item.month}</p>
                    </div>
                  ))}
                </div>
                {/* X-axis line */}
                <div className="w-full h-px bg-slate-600 mt-2"></div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">🕒 Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-slate-400 text-sm">{activity.date}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-slate-900 text-slate-300 rounded-full text-xs">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-6 text-center">
          <button 
            onClick={exportAnalytics}
            className="btn-primary"
          >
            📥 Export Analytics Report (CSV)
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
