import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../App.css';

const HistoryPage = () => {
  const [viewHistory, setViewHistory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [historyList, setHistoryList] = useState([
    {
      id: 1,
      action: 'Generated Draft',
      title: 'Business Partnership Agreement',
      type: 'Contract',
      date: '2024-12-08 14:32',
      icon: '✨',
      color: 'text-green-400',
      details: 'Successfully generated a comprehensive business partnership agreement for ABC Corp and XYZ Inc.'
    },
    {
      id: 2,
      action: 'Edited Draft',
      title: 'Civil Complaint Case #2024-4567',
      type: 'Civil',
      date: '2024-12-08 11:15',
      icon: '✏️',
      color: 'text-blue-400',
      details: 'Updated plaintiff information and added new evidence sections to the civil complaint.'
    },
    {
      id: 3,
      action: 'Downloaded Draft',
      title: 'Criminal Defense Motion',
      type: 'Criminal',
      date: '2024-12-07 16:45',
      icon: '⬇️',
      color: 'text-purple-400',
      details: 'Downloaded motion to suppress evidence in criminal case #2024-8901.'
    },
    {
      id: 4,
      action: 'Deleted Draft',
      title: 'Employment Agreement Draft',
      type: 'Employment',
      date: '2024-12-07 09:20',
      icon: '🗑️',
      color: 'text-red-400',
      details: 'Permanently deleted outdated employment agreement draft.'
    },
    {
      id: 5,
      action: 'Generated Draft',
      title: 'Property Deed Transfer',
      type: 'Property',
      date: '2024-12-06 13:50',
      icon: '✨',
      color: 'text-green-400',
      details: 'Created property deed for transfer of 123 Main Street from John Doe to Jane Smith.'
    },
    {
      id: 6,
      action: 'Viewed Template',
      title: 'NDA Agreement Template',
      type: 'Contract',
      date: '2024-12-06 10:30',
      icon: '👁️',
      color: 'text-yellow-400',
      details: 'Previewed NDA Agreement template for confidential information protection.'
    },
    {
      id: 7,
      action: 'Copied Draft',
      title: 'Divorce Petition',
      type: 'Family',
      date: '2024-12-05 15:10',
      icon: '📋',
      color: 'text-pink-400',
      details: 'Copied divorce petition text to clipboard for external use.'
    },
    {
      id: 8,
      action: 'Generated Draft',
      title: 'Contract Renewal Agreement',
      type: 'Contract',
      date: '2024-12-05 08:45',
      icon: '✨',
      color: 'text-green-400',
      details: 'Generated contract renewal agreement with updated terms and conditions.'
    },
  ]);

  // Filter history based on search and filters
  const filteredHistory = historyList.filter(item => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Action filter
    const matchesAction = filterAction === 'all' || 
      item.action.toLowerCase().includes(filterAction.toLowerCase());

    // Type filter
    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesAction && matchesType;
  });

  const stats = {
    today: 3,
    thisWeek: 12,
    thisMonth: 47,
  };

  const exportToCSV = () => {
    const headers = ['Action', 'Title', 'Type', 'Date', 'Details'];
    const rows = historyList.map(item => [
      item.action,
      item.title,
      item.type,
      item.date,
      item.details
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `history_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      setHistoryList([]);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🕒 Activity History</h1>
          <p className="text-slate-400">Track all your actions and changes</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
            <p className="text-purple-200 text-sm">Today</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.today}</p>
            <p className="text-purple-300 text-xs mt-2">🔥 Active today</p>
          </div>
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
            <p className="text-blue-200 text-sm">This Week</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.thisWeek}</p>
            <p className="text-blue-300 text-xs mt-2">📈 Great progress</p>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800">
            <p className="text-green-200 text-sm">This Month</p>
            <p className="text-5xl font-bold text-white mt-2">{stats.thisMonth}</p>
            <p className="text-green-300 text-xs mt-2">✨ Productive month</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="🔍 Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field bg-slate-800"
            />
            <select 
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="input-field bg-slate-800"
            >
              <option value="all">All Actions</option>
              <option value="generated">Generated</option>
              <option value="edited">Edited</option>
              <option value="downloaded">Downloaded</option>
              <option value="deleted">Deleted</option>
              <option value="viewed">Viewed</option>
              <option value="copied">Copied</option>
            </select>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-field bg-slate-800"
            >
              <option value="all">All Types</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Contract">Contract</option>
              <option value="Family">Family</option>
              <option value="Property">Property</option>
              <option value="Employment">Employment</option>
            </select>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || filterAction !== 'all' || filterType !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700">
              <span className="text-slate-400 text-sm">Active filters:</span>
              {searchTerm && (
                <span className="px-3 py-1 bg-purple-600 rounded-full text-xs text-white flex items-center gap-2">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-red-300">✕</button>
                </span>
              )}
              {filterAction !== 'all' && (
                <span className="px-3 py-1 bg-blue-600 rounded-full text-xs text-white flex items-center gap-2">
                  Action: {filterAction}
                  <button onClick={() => setFilterAction('all')} className="hover:text-red-300">✕</button>
                </span>
              )}
              {filterType !== 'all' && (
                <span className="px-3 py-1 bg-green-600 rounded-full text-xs text-white flex items-center gap-2">
                  Type: {filterType}
                  <button onClick={() => setFilterType('all')} className="hover:text-red-300">✕</button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setFilterAction('all');
                  setFilterType('all');
                }}
                className="px-3 py-1 bg-red-600 rounded-full text-xs text-white hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">📜 Activity Timeline</h3>
            <span className="text-slate-400 text-sm">
              Showing {filteredHistory.length} of {historyList.length} activities
            </span>
          </div>
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-lg">🕒 No history found</p>
                <p className="text-slate-500 text-sm mt-2">
                  {historyList.length === 0 
                    ? 'Your activity will appear here' 
                    : 'Try adjusting your filters'}
                </p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-8 pb-4 border-l-2 border-slate-700 last:border-0 hover:border-purple-500 transition group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-700 border-4 border-slate-900 group-hover:bg-purple-500 transition" />

                  {/* Content */}
                  <div className="card !p-4 ml-4 glass-hover">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-2xl ${item.color}`}>{item.icon}</span>
                          <div>
                            <h4 className="text-white font-bold">{item.action}</h4>
                            <p className="text-slate-300 text-sm">{item.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-500">⏰ {item.date}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setViewHistory(item)}
                        className="btn-secondary text-sm opacity-0 group-hover:opacity-100 transition"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredHistory.length > 0 && filteredHistory.length >= 8 && (
            <div className="text-center mt-6">
              <button className="btn-secondary">
                ⬇️ Load More History
              </button>
            </div>
          )}
        </div>

        {/* Export & Clear */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={exportToCSV}
            className="btn-primary flex-1"
            disabled={historyList.length === 0}
          >
            📥 Export History (CSV)
          </button>
          <button 
            onClick={clearHistory}
            className="btn-secondary text-red-400 border-red-400 hover:bg-red-500/10"
            disabled={historyList.length === 0}
          >
            🗑️ Clear History
          </button>
        </div>
      </div>

      {/* View History Detail Modal */}
      {viewHistory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setViewHistory(null)}
        >
          <div 
            className="card max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <span className={`text-4xl ${viewHistory.color}`}>{viewHistory.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{viewHistory.action}</h2>
                  <p className="text-slate-400 text-sm mt-1">{viewHistory.title}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewHistory(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* History Details */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">Date & Time</p>
                <p className="text-white font-medium">⏰ {viewHistory.date}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Case Type</p>
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm text-white">
                  {viewHistory.type}
                </span>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Details</p>
                <div className="bg-slate-800 rounded-lg p-4">
                  <p className="text-slate-300 text-sm">{viewHistory.details}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button 
                onClick={() => setViewHistory(null)}
                className="btn-secondary flex-1"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HistoryPage;
