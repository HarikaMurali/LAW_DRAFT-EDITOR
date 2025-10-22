import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DraftForm from '../components/DraftForm';
import DraftEditor from '../components/DraftEditor';
import DraftList from '../components/DraftList';

const API_URL = 'http://localhost:5000/api';

const Dashboard = () => {
  const [draftText, setDraftText] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');

  const fetchDrafts = async () => {
    try {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await axios.get(`${API_URL}/drafts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDrafts(res.data);
    } catch (err) {
      console.error('Failed to fetch drafts:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleGenerateDraft = async (formData) => {
    setIsLoading(true);
    try {
      const token = getToken();
      // Using mock endpoint temporarily due to OpenAI quota exceeded
      const res = await axios.post(`${API_URL}/generate/mock`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDraftText(res.data.draft);
      setSelectedDraft(null);
    } catch (err) {
      console.error('Failed to generate draft:', err.response?.data?.error || err.message);
      alert('Failed to generate draft. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!draftText) {
      alert('Draft is empty. Nothing to save.');
      return;
    }
    try {
      const token = getToken();
      await axios.post(
        `${API_URL}/drafts`,
        {
          title: selectedDraft?.title || `Draft from ${new Date().toLocaleString()}`,
          draftText: draftText,
          caseType: selectedDraft?.caseType || 'Unspecified',
          details: selectedDraft?.details || 'No details provided',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDrafts();
      alert('Draft saved successfully!');
    } catch (err) {
      console.error('Failed to save draft:', err.response?.data?.error || err.message);
      alert('Failed to save draft. Please log in again.');
    }
  };

  const handleSelectDraft = (draft) => {
    setSelectedDraft(draft);
    setDraftText(draft.draftText);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="container mx-auto max-w-7xl">
        {/* Header with clean white background */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Legal Draft Pro
          </h1>
          <button 
            onClick={handleLogout} 
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
        
        {/* Main content grid with clean white cards */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-6">
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
              <DraftList drafts={drafts} onSelectDraft={handleSelectDraft} />
            </div>
          </div>
          <div className="xl:col-span-5 flex flex-col space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
              <DraftForm onGenerateDraft={handleGenerateDraft} isLoading={isLoading} />
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex-1 min-h-0">
              <DraftEditor
                draftText={draftText}
                onDraftChange={setDraftText}
                onSaveDraft={handleSaveDraft}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;