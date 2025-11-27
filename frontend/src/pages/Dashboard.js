import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DraftForm from '../components/DraftForm';
import DraftList from '../components/DraftList';
import DraftEditor from '../components/DraftEditor';
import '../App.css';

const Dashboard = () => {
  const [draftText, setDraftText] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGenerateDraft = async (formData) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/generate', formData);
      if (response.data && response.data.draft) {
        setDraftText(response.data.draft);
        setSelectedDraft(null);
      } else {
        setError('No draft was generated. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate draft');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 animate-slide-in-down">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Legal Draft Maker
          </h1>
          <p className="text-slate-400">AI-Powered Legal Document Generation</p>
        </div>
        <button
          onClick={handleLogout}
          className="btn-danger"
        >
          Logout
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-6 py-4 rounded-lg animate-pulse">
          {error}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6 animate-slide-in-left">
          {/* Form Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Generate New Draft
            </h2>
            <DraftForm onGenerateDraft={handleGenerateDraft} isLoading={isLoading} />
          </div>

          {/* Drafts List Card */}
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Your Drafts
            </h2>
            <DraftList drafts={drafts} onSelectDraft={setSelectedDraft} />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 animate-slide-in-right">
          <div className="card">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Draft Editor
            </h2>
            <DraftEditor
              draftText={draftText}
              onDraftChange={setDraftText}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;