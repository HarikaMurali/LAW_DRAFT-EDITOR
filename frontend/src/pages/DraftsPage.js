import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import '../App.css';

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);
  const [filteredDrafts, setFilteredDrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewDraft, setViewDraft] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrafts();
  }, []);

  useEffect(() => {
    filterAndSortDrafts();
  }, [searchTerm, filterType, sortBy, drafts]);

  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/drafts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrafts(res.data);
    } catch (err) {
      console.error('Failed to fetch drafts:', err);
    }
  };

  const filterAndSortDrafts = () => {
    let filtered = drafts;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (draft) =>
          draft.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          draft.caseType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((draft) => draft.caseType === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'name') {
        return a.title?.localeCompare(b.title);
      }
      return 0;
    });

    setFilteredDrafts(filtered);
  };

  const deleteDraft = async (id) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/drafts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDrafts();
    } catch (err) {
      console.error('Failed to delete draft:', err);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Drafts</h1>
          <p className="text-slate-400">Manage and organize all your legal drafts</p>
        </div>

        {/* Filters & Search */}
        <div className="card mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="🔍 Search drafts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field bg-slate-800"
            />

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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field bg-slate-800"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>

            <button 
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
            >
              + New Draft
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
            <p className="text-purple-200 text-sm">Total Drafts</p>
            <p className="text-4xl font-bold text-white mt-2">{drafts.length}</p>
          </div>
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
            <p className="text-blue-200 text-sm">This Month</p>
            <p className="text-4xl font-bold text-white mt-2">
              {drafts.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800">
            <p className="text-green-200 text-sm">Completed</p>
            <p className="text-4xl font-bold text-white mt-2">{drafts.filter(d => d.status === 'completed').length || drafts.length}</p>
          </div>
          <div className="card bg-gradient-to-br from-orange-600 to-orange-800">
            <p className="text-orange-200 text-sm">In Progress</p>
            <p className="text-4xl font-bold text-white mt-2">{drafts.filter(d => d.status === 'draft').length || 0}</p>
          </div>
        </div>

        {/* Drafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrafts.length === 0 ? (
            <div className="col-span-full card text-center py-12">
              <p className="text-slate-400 text-lg">📄 No drafts found</p>
              <p className="text-slate-500 text-sm mt-2">Create your first draft to get started!</p>
            </div>
          ) : (
            filteredDrafts.map((draft) => (
              <div key={draft._id} className="card glass-hover group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition truncate">
                      {draft.title || 'Untitled Draft'}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {draft.caseType} • {new Date(draft.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-purple-600 rounded-full text-xs text-white">
                    {draft.caseType}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {draft.details || draft.draftText?.substring(0, 150) + '...'}
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      localStorage.setItem('editDraft', JSON.stringify(draft));
                      navigate('/dashboard');
                    }}
                    className="btn-secondary text-sm flex-1"
                  >
                    📝 Edit
                  </button>
                  <button 
                    onClick={() => setViewDraft(draft)}
                    className="btn-secondary text-sm flex-1"
                  >
                    👁️ View
                  </button>
                  <button
                    onClick={() => deleteDraft(draft._id)}
                    className="btn-secondary text-sm text-red-400 border-red-400 hover:bg-red-500/10"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* View Draft Modal */}
      {viewDraft && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setViewDraft(null)}
        >
          <div 
            className="card max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-700">
              <div>
                <h2 className="text-2xl font-bold text-white">{viewDraft.title || 'Draft'}</h2>
                <p className="text-slate-400 text-sm mt-1">
                  {viewDraft.caseType} • {new Date(viewDraft.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button 
                onClick={() => setViewDraft(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <pre className="text-slate-900 text-sm whitespace-pre-wrap font-sans">
                {viewDraft.draftText || viewDraft.details || 'No content available'}
              </pre>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  localStorage.setItem('editDraft', JSON.stringify(viewDraft));
                  navigate('/dashboard');
                }}
                className="btn-primary flex-1"
              >
                📝 Edit Draft
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([viewDraft.draftText || viewDraft.details], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${viewDraft.title || 'draft'}.txt`;
                  a.click();
                }}
                className="btn-secondary"
              >
                📥 Download
              </button>
              <button 
                onClick={() => setViewDraft(null)}
                className="btn-secondary"
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

export default DraftsPage;
