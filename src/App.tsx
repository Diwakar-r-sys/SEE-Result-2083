/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { fetchResult, StudentResult } from './lib/data';

function ResultCard({ result, onBack }: { result: StudentResult; onBack: () => void }) {
  return (
    <div className="w-full bg-white border border-gray-300 rounded shadow-[0_2px_8px_rgb(0,0,0,0.08)] overflow-hidden mb-8">
      <div className="bg-[#0056b3] text-white py-4 px-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">SEE Result 2083</h2>
        <button onClick={onBack} className="text-sm hover:underline flex items-center gap-1">
          &larr; Back to Search
        </button>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-8">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Symbol Number</p>
            <p className="text-lg font-bold">{result.symbolNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Student Name</p>
            <p className="text-lg font-bold">{result.name}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm font-medium mb-1">School</p>
            <p className="text-lg font-bold">{result.schoolName}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 border border-gray-200 rounded">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-500 text-sm font-medium mb-1">Status</p>
            <p className={`text-2xl font-bold ${result.status === 'Pass' ? 'text-green-700' : 'text-red-700'}`}>
              {result.status}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm font-medium mb-1">Final GPA</p>
            <p className="text-4xl font-extrabold text-[#0056b3]">
              {typeof result.gpa === 'number' ? result.gpa.toFixed(2) : result.gpa}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center no-print">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-[#0056b3] hover:bg-[#004494] text-white font-medium rounded transition-colors"
          >
            Print Result
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [symbolNumber, setSymbolNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StudentResult | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!symbolNumber.trim()) {
      setError('Please enter your symbol number.');
      return;
    }
    
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await fetchResult(symbolNumber);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching result. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header matching typical NTC style */}
      <header className="bg-white border-b border-gray-200 py-3 sm:py-4 px-4 shadow-sm no-print">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
              <span className="text-[#0056b3]">Nepal</span>
              <span className="text-[#e31837]">Telecom</span>
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold text-gray-700">
            SEE Result 2083
          </div>
        </div>
      </header>

      {/* Navigation matching typical NTC style */}
      <nav className="bg-[#0056b3] text-white no-print">
        <div className="max-w-5xl mx-auto flex h-full">
          <div className="py-3 px-6 bg-[#004e9e] border-b-[3px] border-white font-bold h-full">Webpage</div>
          <div className="py-3 px-6 hover:bg-[#004e9e] font-medium opacity-90 transition-colors cursor-pointer h-full border-b-[3px] border-transparent">SMS</div>
          <div className="py-3 px-6 hover:bg-[#004e9e] font-medium opacity-90 transition-colors cursor-pointer h-full border-b-[3px] border-transparent">IVR</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full py-8">
        {!result ? (
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
              <div className="bg-gray-100 border-b border-gray-200 p-4">
                <h2 className="text-lg font-bold text-gray-800">Check SEE Result 2083</h2>
              </div>
              <div className="p-6 md:p-8">
                
                <p className="text-gray-600 mb-6 text-sm">
                  Enter your exact Symbol Number to view your Secondary Education Examination (SEE) result with marksheet.
                  (Example mock: 0010001A, 0010002B)
                </p>

                <form onSubmit={handleSearch} className="space-y-5">
                  <div>
                    <label htmlFor="symbol" className="block text-sm font-bold text-gray-700 mb-1">
                      Symbol Number
                    </label>
                    <input
                      id="symbol"
                      type="text"
                      value={symbolNumber}
                      onChange={(e) => setSymbolNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. 0010001A"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:border-[#0056b3] focus:ring-1 focus:ring-[#0056b3] outline-none transition-colors uppercase"
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb] rounded text-sm mb-4">
                      {error}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-2.5 bg-[#0056b3] hover:bg-[#004494] text-white font-bold rounded transition-colors disabled:opacity-70 flex justify-center"
                    >
                      {loading ? 'Searching...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded p-4 text-sm text-blue-800">
              <h3 className="font-bold mb-2">Instructions:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Make sure to append the alphabet at the end of your symbol number (e.g., 0010001A).</li>
                <li>This is a mock application representing a simplified white-faced design similar to official portals.</li>
              </ul>
            </div>
          </div>
        ) : (
          <ResultCard result={result} onBack={() => { setResult(null); setSymbolNumber(''); }} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-6 text-center text-sm no-print mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2083 Nepal Telecom. All rights reserved.</p>
          <div className="flex gap-4">
             <span className="hover:text-white cursor-pointer">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
