import React from 'react';

const DraftEditor = ({ draftText, onDraftChange, onSaveDraft, isLoading }) => {
  
  const handleDownloadPDF = () => {
    if (!draftText) {
      alert('No draft content to download');
      return;
    }

    // Create a new window for PDF generation
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Legal Draft</title>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            margin: 40px;
            color: #000;
          }
          h1, h2, h3 {
            color: #000;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .content {
            white-space: pre-line;
            font-size: 12pt;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Legal Document</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        <div class="content">${draftText}</div>
        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };
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
            rows="25"
            placeholder="Your generated draft will appear here..."
            className="w-full py-4 px-6 bg-white border-2 border-gray-300 rounded-xl text-black placeholder-gray-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y font-mono text-base shadow-lg min-h-[600px]"
            style={{color: '#000000', backgroundColor: '#ffffff'}}
          ></textarea>
          <div className="mt-4 flex gap-4">
            <button
              onClick={onSaveDraft}
              disabled={!draftText}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              💾 Save Draft
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={!draftText}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              📄 Download PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DraftEditor;