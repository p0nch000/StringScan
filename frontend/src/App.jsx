import React, { useState } from 'react';
import { Upload, Search, RefreshCw, Type } from 'lucide-react';

function App() {
  const [files, setFiles] = useState({ 1: null, 2: null });
  const [fileContents, setFileContents] = useState({ 1: '', 2: '' });
  const [searchPatterns, setSearchPatterns] = useState({ 1: '', 2: '' });
  const [autoCompleteText, setAutoCompleteText] = useState('');
  const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState([]);

  const handleFileUpload = (event, fileNumber) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      setFiles(prev => ({ ...prev, [fileNumber]: file }));
      const reader = new FileReader();
      reader.onload = (e) => setFileContents(prev => ({ ...prev, [fileNumber]: e.target.result }));
      reader.readAsText(file);
    } else {
      alert('Por favor, seleccione un archivo .txt');
    }
  };

  const handleSearch = (fileNumber) => {
    //Llamada al endpoint de Z
  };

  const findSimilarity = () => {
    //Llamada al algoritmo de LCS
  };

  const findPalindrome = (fileNumber) => {
    //Lamada al algoritmo de Manacher
  };

  const handleAutoComplete = (text) => {
    //Construir trie con el texto 
    setAutoCompleteText(text);
    setAutoCompleteSuggestions(['ejemplo1', 'ejemplo2', 'ejemplo3']);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600 tracking-tight">
          String<span className="text-gray-800">Scan</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map(fileNumber => (
            <div key={fileNumber} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Archivo {fileNumber}</h2>
                {files[fileNumber] && <span className="text-sm text-gray-500">{files[fileNumber].name}</span>}
              </div>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 border rounded-lg"
                  placeholder={`Buscar en Archivo ${fileNumber}`}
                  value={searchPatterns[fileNumber]}
                  onChange={(e) => setSearchPatterns(prev => ({ ...prev, [fileNumber]: e.target.value }))}
                />
                <button
                  onClick={() => handleSearch(fileNumber)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <Search className="w-4 h-4 mr-2" /> Buscar
                </button>
              </div>
              <FileUploadButton
                number={fileNumber}
                file={files[fileNumber]}
                onUpload={(e) => handleFileUpload(e, fileNumber)}
              />
              {fileContents[fileNumber] && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-60 overflow-auto">
                  <pre className="whitespace-pre-wrap">{fileContents[fileNumber]}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Similitud</h2>
            <button 
              onClick={findSimilarity} 
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Encontrar Similitud
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Palíndromos</h2>
            <div className="space-y-2">
              <button 
                onClick={() => findPalindrome(1)} 
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
              >
                <Type className="w-4 h-4 mr-2" /> Palíndromo Archivo 1
              </button>
              <button 
                onClick={() => findPalindrome(2)} 
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
              >
                <Type className="w-4 h-4 mr-2" /> Palíndromo Archivo 2
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Auto-Completar</h2>
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Escribe para auto-completar"
              value={autoCompleteText}
              onChange={(e) => handleAutoComplete(e.target.value)}
            />
            {autoCompleteSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                {autoCompleteSuggestions.map((suggestion, index) => (
                  <li key={index} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FileUploadButton({ number, file, onUpload }) {
  return (
    <div className="text-center">
      <label className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
        <Upload className="w-5 h-5 mr-2" />
        <span className="text-sm font-medium">
          {file ? 'Cambiar archivo' : `Cargar Archivo ${number} (.txt)`}
        </span>
        <input type='file' className="hidden" onChange={onUpload} accept=".txt" />
      </label>
    </div>
  );
}

export default App;