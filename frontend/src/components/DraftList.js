import React from 'react';

const DraftList = ({ drafts, onSelectDraft }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Your Saved Drafts
      </h2>
      {drafts.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 italic">No saved drafts yet.</p>
          <p className="text-gray-400 text-sm mt-1">Generate your first draft to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {drafts.map((draft) => (
            <div key={draft._id} className="group">
              <button
                onClick={() => onSelectDraft(draft)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200 group-hover:shadow-md"
              >
                <div className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-1">
                  {draft.title}
                </div>
                <div className="text-gray-500 text-xs">
                  {draft.caseType} • {new Date(draft.createdAt).toLocaleDateString()}
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftList;