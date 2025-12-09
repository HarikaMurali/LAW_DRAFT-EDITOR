import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DraftForm from '../components/DraftForm';
import DraftList from '../components/DraftList';
import DraftEditor from '../components/DraftEditor';
import Layout from '../components/Layout';
import Galaxy from '../components/Galaxy';
import '../App.css';

const Dashboard = () => {
  const [draftText, setDraftText] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [templateData, setTemplateData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    
    // Check if a template was selected
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    if (selectedTemplate) {
      const template = JSON.parse(selectedTemplate);
      setTemplateData(template);
      localStorage.removeItem('selectedTemplate'); // Clear after loading
    }
    
    // Check if editing an existing draft
    const editDraft = localStorage.getItem('editDraft');
    if (editDraft) {
      const draft = JSON.parse(editDraft);
      setSelectedDraft(draft);
      setDraftText(draft.draftText || draft.details || '');
      localStorage.removeItem('editDraft'); // Clear after loading
    }
    
    // Fetch existing drafts
    fetchDrafts();
  }, [navigate]);

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

  return (
    <Layout>
      {/* Galaxy Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -10,
        pointerEvents: 'none'
      }}>
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={false}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.0}
          hueShift={0}
          transparent={false}
        />
      </div>
      
      <div className="animate-fade-in-up relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {localStorage.getItem('userName') || 'User'}! 👋
          </h1>
          <p className="text-slate-400">Generate professional legal drafts in seconds</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-6 py-4 rounded-lg animate-pulse">
            {error}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800">
            <p className="text-purple-200 text-sm">Total Drafts</p>
            <p className="text-4xl font-bold text-white mt-2">{drafts.length}</p>
          </div>
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800">
            <p className="text-blue-200 text-sm">This Month</p>
            <p className="text-4xl font-bold text-white mt-2">12</p>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800">
            <p className="text-green-200 text-sm">Templates Used</p>
            <p className="text-4xl font-bold text-white mt-2">8</p>
          </div>
          <div className="card bg-gradient-to-br from-orange-600 to-orange-800">
            <p className="text-orange-200 text-sm">Time Saved</p>
            <p className="text-4xl font-bold text-white mt-2">24h</p>
          </div>
        </div>

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
              <DraftForm 
                onGenerateDraft={handleGenerateDraft} 
                isLoading={isLoading}
                templateData={templateData}
              />
            </div>

            {/* Drafts List Card */}
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Your Drafts ({drafts.length})
              </h2>
              <DraftList 
                drafts={drafts} 
                onSelectDraft={(draft) => {
                  setSelectedDraft(draft);
                  setDraftText(draft.draftText || '');
                }} 
              />
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
    </Layout>
  );
};

export default Dashboard;