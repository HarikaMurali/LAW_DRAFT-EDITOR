import React, { useState } from 'react';
import '../App.css';

const DraftForm = ({ onGenerateDraft, isLoading }) => {
  const [caseType, setCaseType] = useState('Civil');
  const [details, setDetails] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!caseType || !details.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    onGenerateDraft({ caseType, details, jurisdiction });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Case Type <span className="text-red-400">*</span>
        </label>
        <select
          value={caseType}
          onChange={(e) => setCaseType(e.target.value)}
          className="input-field bg-slate-800"
          disabled={isLoading}
        >
          <option value="Civil">Civil Case</option>
          <option value="Criminal">Criminal Case</option>
          <option value="Contract">Contract</option>
          <option value="Family">Family Law</option>
          <option value="Property">Property Dispute</option>
          <option value="Employment">Employment</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Case Details <span className="text-red-400">*</span>
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="input-field bg-slate-800 resize-none h-32"
          placeholder="Describe the case details, parties involved, and key facts..."
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Jurisdiction (Optional)
        </label>
        <input
          type="text"
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
          className="input-field bg-slate-800"
          placeholder="e.g., California, India, UK"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="spinner w-5 h-5"></div>
            Generating...
          </>
        ) : (
          <>
            ✨ Generate Draft
          </>
        )}
      </button>
    </form>
  );
};

export default DraftForm;