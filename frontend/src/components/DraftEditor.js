import React, { useState } from 'react';
import '../App.css';

const DraftEditor = ({ draftText, onDraftChange, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([draftText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'legal_draft.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      {/* Editor Toolbar */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={handleCopy}
          disabled={!draftText}
          className={`${draftText ? 'btn-primary' : 'opacity-50 cursor-not-allowed bg-slate-600'} text-sm`}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={!draftText}
          className={`${draftText ? 'btn-secondary' : 'opacity-50 cursor-not-allowed border-slate-600'} text-sm`}
        >
          📥 Download
        </button>
        <button
          onClick={() => onDraftChange('')}
          disabled={!draftText}
          className={`${draftText ? 'btn-secondary' : 'opacity-50 cursor-not-allowed border-slate-600'} text-sm`}
        >
          🗑️ Clear
        </button>
      </div>

      {/* Editor */}
      <div className="relative bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <div className="spinner mx-auto mb-4"></div>
              <p className="text-white">Generating your draft...</p>
            </div>
          </div>
        )}
        
        <textarea
          value={draftText}
          onChange={(e) => onDraftChange(e.target.value)}
          className="w-full h-96 p-6 bg-white text-slate-900 font-mono text-sm border-none outline-none resize-none"
          placeholder="Your legal draft will appear here..."
        />
      </div>

      {/* Stats */}
      {draftText && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800 bg-opacity-50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Words</p>
            <p className="text-2xl font-bold text-purple-400">
              {draftText.split(/\s+/).filter(w => w).length}
            </p>
          </div>
          <div className="bg-slate-800 bg-opacity-50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Characters</p>
            <p className="text-2xl font-bold text-purple-400">
              {draftText.length}
            </p>
          </div>
          <div className="bg-slate-800 bg-opacity-50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">Paragraphs</p>
            <p className="text-2xl font-bold text-purple-400">
              {draftText.split('\n\n').filter(p => p.trim()).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DraftEditor;