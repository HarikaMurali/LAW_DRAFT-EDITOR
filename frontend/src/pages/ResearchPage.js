import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../App.css';

const ResearchPage = () => {
  const [activeTab, setActiveTab] = useState('caseLaw');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockCaseLaw = [
    {
      id: 1,
      title: 'Kesavananda Bharati v. State of Kerala',
      citation: 'AIR 1973 SC 1461',
      year: 1973,
      court: 'Supreme Court of India',
      summary: 'Established the basic structure doctrine of the Constitution. The Parliament cannot alter the basic structure of the Constitution through amendments.',
      relevance: 'Constitutional Law'
    },
    {
      id: 2,
      title: 'Maneka Gandhi v. Union of India',
      citation: 'AIR 1978 SC 597',
      year: 1978,
      court: 'Supreme Court of India',
      summary: 'Expanded the scope of Article 21 to include the right to live with dignity. Established that procedure must be fair, just, and reasonable.',
      relevance: 'Fundamental Rights'
    },
    {
      id: 3,
      title: 'Vishaka v. State of Rajasthan',
      citation: 'AIR 1997 SC 3011',
      year: 1997,
      court: 'Supreme Court of India',
      summary: 'Established guidelines for prevention of sexual harassment at workplace. Landmark judgment for women\'s rights.',
      relevance: 'Women\'s Rights, Employment Law'
    },
  ];

  const mockStatutes = [
    {
      id: 1,
      title: 'Indian Penal Code, 1860',
      sections: '511 Sections',
      description: 'The main criminal code of India covering all substantive aspects of criminal law.',
      keywords: 'Criminal, Offences, Punishment'
    },
    {
      id: 2,
      title: 'Code of Criminal Procedure, 1973',
      sections: '484 Sections',
      description: 'The procedural law for administration of criminal law in India.',
      keywords: 'Procedure, Investigation, Trial, Bail'
    },
    {
      id: 3,
      title: 'Indian Contract Act, 1872',
      sections: '266 Sections',
      description: 'Governs the law relating to contracts in India.',
      keywords: 'Contracts, Agreements, Consideration'
    },
    {
      id: 4,
      title: 'Indian Evidence Act, 1872',
      sections: '167 Sections',
      description: 'Deals with rules and principles of evidence in Indian courts.',
      keywords: 'Evidence, Proof, Testimony'
    },
  ];

  const mockLegalTerms = [
    {
      term: 'Habeas Corpus',
      definition: 'A writ requiring a person under arrest to be brought before a judge or into court, to secure the person\'s release unless lawful grounds are shown for their detention.',
      category: 'Latin Terms'
    },
    {
      term: 'Prima Facie',
      definition: 'At first sight; on the face of it. Evidence that is sufficient to establish a fact unless rebutted.',
      category: 'Latin Terms'
    },
    {
      term: 'Mens Rea',
      definition: 'The mental element of a crime; guilty mind. The intention or knowledge of wrongdoing that constitutes part of a crime.',
      category: 'Criminal Law'
    },
    {
      term: 'Consideration',
      definition: 'Something of value given by both parties to a contract that induces them to enter into the agreement to exchange mutual performances.',
      category: 'Contract Law'
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeTab === 'caseLaw') {
        const filtered = mockCaseLaw.filter(
          c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
               c.relevance.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } else if (activeTab === 'statutes') {
        const filtered = mockStatutes.filter(
          s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               s.keywords.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } else if (activeTab === 'dictionary') {
        const filtered = mockLegalTerms.filter(
          t => t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
               t.definition.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      }
      setIsSearching(false);
    }, 500);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            🔍 Legal Research Tools
          </h1>
          <p className="text-slate-400 text-lg">
            Access comprehensive case law, statutes, and legal definitions instantly
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-600 to-blue-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('caseLaw')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📚</div>
              <div>
                <p className="text-blue-200 text-sm">Case Law Database</p>
                <p className="text-3xl font-bold text-white mt-1">1000+</p>
                <p className="text-blue-300 text-xs mt-1">Supreme Court & High Court</p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-green-600 to-green-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('statutes')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📖</div>
              <div>
                <p className="text-green-200 text-sm">Indian Statutes</p>
                <p className="text-3xl font-bold text-white mt-1">50+</p>
                <p className="text-green-300 text-xs mt-1">Acts & Regulations</p>
              </div>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-purple-600 to-purple-800 hover:scale-105 transition-transform cursor-pointer"
               onClick={() => setActiveTab('dictionary')}>
            <div className="flex items-center gap-4">
              <div className="text-5xl">📘</div>
              <div>
                <p className="text-purple-200 text-sm">Legal Dictionary</p>
                <p className="text-3xl font-bold text-white mt-1">500+</p>
                <p className="text-purple-300 text-xs mt-1">Terms & Definitions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-6">
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('caseLaw')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'caseLaw'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📚</span>
              Case Law Database
            </button>
            <button
              onClick={() => setActiveTab('statutes')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'statutes'
                  ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📖</span>
              Statute Reference
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'dictionary'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-xl">📘</span>
              Legal Dictionary
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 text-xl">🔍</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={
                activeTab === 'caseLaw' ? 'Search cases, citations, or legal issues...' :
                activeTab === 'statutes' ? 'Search statutes, acts, or sections...' :
                'Search legal terms or definitions...'
              }
              style={{ color: '#000', backgroundColor: '#fff' }}
              className="w-full pl-12 pr-32 py-4 border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg placeholder-slate-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all disabled:opacity-50 shadow-lg"
            >
              {isSearching ? '⏳ Searching...' : '🔎 Search'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'caseLaw' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {searchResults.map((caseItem) => (
                  <div key={caseItem.id} className="card glass-hover border-l-4 border-blue-500 hover:border-blue-400 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">⚖️</span>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white hover:text-blue-400 transition">{caseItem.title}</h3>
                            <p className="text-blue-400 font-mono text-lg mt-1 flex items-center gap-2">
                              📑 {caseItem.citation}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400 mb-3 ml-12">
                          <span className="flex items-center gap-1">🏛️ {caseItem.court}</span>
                          <span className="flex items-center gap-1">📅 {caseItem.year}</span>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full text-sm font-semibold shadow-lg">
                        {caseItem.relevance}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4 text-base ml-12 bg-slate-800/50 p-4 rounded-lg">{caseItem.summary}</p>
                    <div className="flex gap-3 ml-12">
                      <button
                        onClick={() => handleCopyToClipboard(caseItem.citation)}
                        className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        📋 Copy Citation
                      </button>
                      <button
                        onClick={() => setSelectedCase(caseItem)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all text-sm font-semibold flex items-center justify-center gap-2 shadow-lg"
                      >
                        📖 View Full Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📚</div>
                <h3 className="text-3xl font-bold text-white mb-4">Search Indian Case Law</h3>
                <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  Access Supreme Court and High Court judgments, precedents, and legal citations
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Fundamental Rights"); handleSearch(); }}>
                    <p className="text-blue-200 font-semibold mb-2 text-sm">Try searching:</p>
                    <p className="text-white text-lg font-bold">"Fundamental Rights"</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("AIR 1973"); handleSearch(); }}>
                    <p className="text-purple-200 font-semibold mb-2 text-sm">Or by citation:</p>
                    <p className="text-white text-lg font-bold">"AIR 1973"</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                       onClick={() => { setSearchQuery("Constitutional"); handleSearch(); }}>
                    <p className="text-green-200 font-semibold mb-2 text-sm">Or by issue:</p>
                    <p className="text-white text-lg font-bold">"Constitutional"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'statutes' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((statute) => (
                  <div key={statute.id} className="card glass-hover border-l-4 border-green-500 hover:border-green-400 transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">📜</span>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-green-400 transition">{statute.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full text-sm font-semibold shadow-lg">
                            {statute.sections}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm bg-slate-800/50 p-4 rounded-lg">{statute.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {statute.keywords.split(', ').map((keyword, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-600/20 text-green-300 rounded-full text-xs border border-green-500/30">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg hover:from-green-700 hover:to-green-900 transition-all text-sm font-semibold shadow-lg flex items-center justify-center gap-2">
                      📖 Browse Sections
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📖</div>
                <h3 className="text-3xl font-bold text-white mb-4">Browse Indian Statutes</h3>
                <p className="text-slate-400 text-lg mb-8">
                  Quick access to IPC, CPC, CrPC, and other important acts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {mockStatutes.map((statute) => (
                    <div key={statute.id} 
                         className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-left hover:from-slate-600 hover:to-slate-700 transition-all cursor-pointer border border-slate-600 hover:border-green-500 hover:scale-105"
                         onClick={() => { setSearchQuery(statute.title); handleSearch(); }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">📜</span>
                        <h4 className="text-white font-bold text-lg">{statute.title}</h4>
                      </div>
                      <p className="text-green-400 text-sm mb-2 font-semibold">{statute.sections}</p>
                      <p className="text-slate-400 text-sm">{statute.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.map((term, idx) => (
                  <div key={idx} className="card glass-hover border-l-4 border-purple-500 hover:border-purple-400 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">📖</span>
                        <h3 className="text-2xl font-bold text-white hover:text-purple-400 transition">{term.term}</h3>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                        {term.category}
                      </span>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                      <p className="text-slate-300 leading-relaxed text-sm">{term.definition}</p>
                    </div>
                    <button
                      onClick={() => handleCopyToClipboard(`${term.term}: ${term.definition}`)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all text-sm font-semibold shadow-lg flex items-center justify-center gap-2"
                    >
                      📋 Copy Definition
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="text-8xl mb-6">📘</div>
                <h3 className="text-3xl font-bold text-white mb-4">Legal Terms Dictionary</h3>
                <p className="text-slate-400 text-lg mb-8">
                  Instant definitions of legal terms, Latin phrases, and legal concepts
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {mockLegalTerms.map((term, idx) => (
                    <div key={idx} 
                         className="bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-xl text-left hover:from-slate-600 hover:to-slate-700 transition-all cursor-pointer border border-slate-600 hover:border-purple-500 hover:scale-105"
                         onClick={() => { setSearchQuery(term.term); handleSearch(); }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                          <span className="text-2xl">📖</span>
                          {term.term}
                        </h4>
                        <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Tips */}
        <div className="card mt-8 bg-gradient-to-r from-slate-800 to-slate-900 border-l-4 border-yellow-500">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Research Tips</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Use specific keywords for more accurate results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Search by case name, citation, or legal principle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Citations can be directly inserted into your drafts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>Bookmark frequently used statutes and cases</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 font-bold">•</span>
                  <span>All research is saved in your history for future reference</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResearchPage;
