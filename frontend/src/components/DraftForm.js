import React, { useState } from 'react';

const DraftForm = ({ onGenerateDraft, isLoading }) => {
  const [caseType, setCaseType] = useState('Civil');
  const [details, setDetails] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateDraft({ caseType, details, jurisdiction });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Generate New Draft
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Case Type</label>
          <select
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{color: '#000000', backgroundColor: '#ffffff'}}
          >
            <option value="Civil">Civil</option>
            <option value="Criminal">Criminal</option>
            <option value="PIL">PIL</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Key Details & Facts</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows="6"
            placeholder="E.g., Parties involved, summary of events..."
            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            style={{color: '#000000', backgroundColor: '#ffffff'}}
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Jurisdiction (Optional)</label>
          <input
            type="text"
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            placeholder="E.g., California, India, etc."
            className="w-full py-3 px-4 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            style={{color: '#000000', backgroundColor: '#ffffff'}}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Draft'
          )}
        </button>
      </form>
    </div>
  );
};

export default DraftForm;