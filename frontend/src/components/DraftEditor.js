import React from 'react';

const DraftEditor = ({ draftText, onDraftChange, onSaveDraft, isLoading }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        Draft Editor
      </h2>
      {isLoading ? (
        <div className="text-center text-gray-600 py-12">
          <div className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg">Generating draft...</span>
          </div>
        </div>
      ) : (
        <>
          <textarea
            value={draftText}
            onChange={(e) => onDraftChange(e.target.value)}
            rows="20"
            placeholder="Your generated draft will appear here..."
            className="w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-black placeholder-gray-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-base shadow-lg min-h-[500px]"
            style={{color: '#000000', backgroundColor: '#ffffff'}}
          ></textarea>
          <button
            onClick={onSaveDraft}
            disabled={!draftText}
            className="mt-4 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            💾 Save Draft
          </button>
        </>
      )}
    </div>
  );
};

export default DraftEditor;