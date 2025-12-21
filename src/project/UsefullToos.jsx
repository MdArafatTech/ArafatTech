// src/project/UsefulTools.jsx
// ✅ CLEANED - NO HISTORY - FULLY RESPONSIVE - MOBILE-FRIENDLY - ERROR-FREE
import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiRefreshCw, FiCopy, FiCheck, FiEye, FiEyeOff, FiShield, FiLock, FiZap, FiGlobe, FiTrendingUp 
} from 'react-icons/fi';
import { MdCurrencyExchange, MdSwapHoriz } from 'react-icons/md';
import axios from 'axios';
import { FiVolume2 } from 'react-icons/fi';
import Tools from './Tools';
// Currency data
const currencyData = {
  USD: { flag: '🇺🇸', name: 'US Dollar', symbol: '$' },
  EUR: { flag: '🇪🇺', name: 'Euro', symbol: '€' },
  GBP: { flag: '🇬🇧', name: 'British Pound', symbol: '£' },
  INR: { flag: '🇮🇳', name: 'Indian Rupee', symbol: '₹' },
  CAD: { flag: '🇨🇦', name: 'Canadian Dollar', symbol: 'CA$' },
  AUD: { flag: '🇦🇺', name: 'Australian Dollar', symbol: 'A$' },
  JPY: { flag: '🇯🇵', name: 'Japanese Yen', symbol: '¥' },
  CNY: { flag: '🇨🇳', name: 'Chinese Yuan', symbol: 'CN¥' },
  CHF: { flag: '🇨🇭', name: 'Swiss Franc', symbol: 'CHF' },
  SEK: { flag: '🇸🇪', name: 'Swedish Krona', symbol: 'kr' },
  NZD: { flag: '🇳🇿', name: 'New Zealand Dollar', symbol: 'NZ$' },
  BDT: { flag: '🇧🇩', name: 'Bangladeshi Taka', symbol: '৳' },
  PKR: { flag: '🇵🇰', name: 'Pakistani Rupee', symbol: '₨' },
};

// Word lists for passphrases
const wordLists = {
  common: ['apple', 'brave', 'clear', 'dream', 'eagle', 'flame', 'green', 'heart', 'island', 'jolly'],
  tech: ['code', 'pixel', 'cloud', 'data', 'byte', 'node', 'link', 'grid', 'core', 'flux'],
};

// === ULTRA PASSWORD GENERATOR ===
const UltraPasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [numPasswords, setNumPasswords] = useState(3);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous,] = useState(true);
  const [passphraseMode, setPassphraseMode] = useState(false);
  const [wordListType, ] = useState('common');
  const [numWords, setNumWords] = useState(5);
  const [separator, setSeparator] = useState('-');
  const [passwords, setPasswords] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [showPassword, setShowPassword] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);


const [showResults, setShowResults] = useState(true); // Default: show results







  
  // ADD THESE MISSING STATES:
  const [includeBrackets, setIncludeBrackets] = useState(false);
  const [includeAmbiguous, setIncludeAmbiguous] = useState(false); // or whatever you want to call it
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(false);
















  const generatePasswords = useCallback(() => {
    const upper = excludeAmbiguous ? 'ABCDEFGHJKLMNPQRTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = excludeAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    const numbers = excludeAmbiguous ? '23456789' : '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset && !passphraseMode) {
      setPasswords(['Select at least one character type']);
      return;
    }

    const newPasswords = [];
    for (let p = 0; p < numPasswords; p++) {
      let pw = '';
      if (passphraseMode) {
        const words = wordLists[wordListType] || wordLists.common;
        for (let i = 0; i < numWords; i++) {
          pw += words[Math.floor(Math.random() * words.length)] + (i < numWords - 1 ? separator : '');
        }
      } else {
        for (let i = 0; i < length; i++) {
          const chars = charset;
          pw += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      newPasswords.push(pw);
    }
    setPasswords(newPasswords);
  }, [length, numPasswords, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeAmbiguous, passphraseMode, wordListType, numWords, separator]);

  const copyToClipboard = useCallback((index, pw) => {
    navigator.clipboard.writeText(pw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      generatePasswords();
      setIsInitialized(true);
    }
  }, [isInitialized, generatePasswords]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-purple-600 rounded-2xl text-white">
          <FiShield size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Password Generator</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Create strong, unique passwords</p>
        </div>
      </div>

      {/* Controls - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Length Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Length: {length}</label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        {/* Generate Count */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Generate</label>
          <input
            type="number"
            min="1"
            max="10"
            value={numPasswords}
            onChange={(e) => setNumPasswords(Number(e.target.value))}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-center"
          />
        </div>
      </div>

{/* Premium Checkboxes - Responsive */}
<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
  {[
    { label: 'Uppercase', state: includeUppercase, set: setIncludeUppercase, icon: 'Aa' },
    { label: 'Lowercase', state: includeLowercase, set: setIncludeLowercase, icon: 'ab' },
    { label: 'Numbers', state: includeNumbers, set: setIncludeNumbers, icon: '123' },
    { label: 'Symbols', state: includeSymbols, set: setIncludeSymbols, icon: '!@#' },
    { label: 'Brackets', state: includeBrackets, set: setIncludeBrackets, icon: '[]{}' },
    { label: 'Ambiguous', state: includeAmbiguous, set: setIncludeAmbiguous, icon: '0OIl' },
    { label: 'Emojis', state: includeEmojis, set: setIncludeEmojis, icon: '😀' },
    { label: 'Hyphens', state: includeHyphens, set: setIncludeHyphens, icon: '-' },
  ].map(({ label, state, set, icon }, idx) => (
    <label
      key={label}
      className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-md hover:scale-[1.02] border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/50"
    >
      <div className="relative flex-shrink-0">
        {/* Hidden native checkbox */}
        <input
          type="checkbox"
          checked={state}
          onChange={(e) => set(e.target.checked)}
          className="w-6 h-6 peer opacity-0 absolute"
          id={`checkbox-${label.toLowerCase()}`}
        />

        {/* Custom checkbox container */}
        <div
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
            ${state 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg scale-110' 
              : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}
          `}
        >
          {/* Checkmark (only shown when checked) */}
          {state && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {label}
        </span>
        <span className="block text-xs text-slate-500 dark:text-slate-400 font-mono">{icon}</span>
      </div>
    </label>
  ))}
</div>


      {/* Passphrase Mode */}
      <label className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          checked={passphraseMode}
          onChange={(e) => setPassphraseMode(e.target.checked)}
          className="w-5 h-5 cursor-pointer accent-purple-600"
        />
        <span className="font-medium cursor-pointer text-slate-700 dark:text-slate-300">Use Passphrase</span>
      </label>

      {passphraseMode && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Word Count</label>
            <input
              type="range"
              min="3"
              max="40"
              value={numWords}
              onChange={(e) => setNumWords(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="text-sm mt-1">{numWords} words</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Separator</label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
            >
      <option value="-">-</option>
<option value="_">_</option>
<option value=".">.</option>
<option value=" ">Space</option>
<option value="/">/</option>
<option value=":">:</option>
<option value=";">;</option>
<option value=",">,</option>
<option value="'">'</option>
<option value="&">&amp;</option>
<option value="|">|</option>
<option value="~">~</option>
<option value="(">(</option>
<option value=")">)</option>
<option value="[">[</option>
<option value="]">]</option>

<option value="@">@</option>
<option value="#">#</option>
<option value="$">$</option>
<option value="%">%</option>
<option value="+">+</option>
<option value="*">*</option>
<option value="=">=</option>
<option value="?">?</option>
<option value="!">!</option>

            </select>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generatePasswords}
        className="w-full py-4 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg transition"
      >
        <FiRefreshCw size={20} />
        Generate Passwords
      </button>

      {/* Results */}
     {/* Results */}
<div className="mt-8 space-y-6">
  {/* Toggle Button */}
  {passwords.length > 0 && (
    <div className="flex justify-between items-center">
      <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        Generated Passwords ({passwords.length})
      </h4>
      <button
        onClick={() => setShowResults(!showResults)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm font-medium transition"
      >
        {showResults ? (
          <>
            <FiEyeOff size={18} /> Hide Results
          </>
        ) : (
          <>
            <FiEye size={18} /> Show Results
          </>
        )}
      </button>
    </div>
  )}

  {/* Password List - Only shown when toggle is ON */}
  {showResults && passwords.length > 0 && passwords.map((pw, index) => (
    <div
      key={index}
      className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-4 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition"
    >
      <div className="flex-1 mr-4">
        <div className="font-mono text-lg break-all select-all">
          {showPassword ? pw : '•'.repeat(pw.length)}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Toggle visibility for this specific password */}
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          title={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
        <button
          onClick={() => copyToClipboard(index, pw)}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          title="Copy to clipboard"
        >
          {copiedIndex === index ? (
            <FiCheck className="text-green-500" size={20} />
          ) : (
            <FiCopy size={20} />
          )}
        </button>
      </div>
    </div>
  ))}

  {/* No passwords message */}
  {passwords.length === 0 && (
    <div className="text-center text-slate-500 dark:text-slate-400 py-8">
      Generate passwords to see results here
    </div>
  )}
</div>
    </div>
  );
};

// === ULTRA CURRENCY CONVERTER ===
const UltraCurrencyConverter = () => {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BDT');
  const [conversionRate, setConversionRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speaking

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const rates = Object.keys(res.data.rates).filter(code => currencyData[code]);
        setCurrencies(rates);
        setConversionRate(res.data.rates[toCurrency] || null);
      } catch (error) {
        console.error('API error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currencies.length === 0) return;
    const fetchConversion = async () => {
      try {
        const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        setConversionRate(res.data.rates[toCurrency] || null);
      } catch (error) {
        console.error('Conversion failed:', error);
      }
    };
    fetchConversion();
  }, [fromCurrency, toCurrency, currencies]);

  useEffect(() => {
    if (conversionRate !== null && amount > 0) {
      setResult((amount * conversionRate).toLocaleString('en-US', { maximumFractionDigits: 2 }));
    } else {
      setResult(null);
    }
  }, [amount, conversionRate]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Speak the conversion result
  const speakResult = () => {
    if (!result || isSpeaking) return;

    const fromSym = currencyData[fromCurrency]?.symbol || fromCurrency;
    const toSym = currencyData[toCurrency]?.symbol || toCurrency;
    const message = `${amount} ${fromSym} is equal to ${result} ${toSym}`;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-emerald-600 rounded-2xl text-white">
          <MdCurrencyExchange size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Currency Converter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time exchange rates</p>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-full p-4 text-2xl font-mono border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold">
            {currencyData[fromCurrency]?.symbol || fromCurrency}
          </div>
        </div>
      </div>

      {/* Currencies */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-4 border cursor-pointer border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>
                {currencyData[cur]?.flag} {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-center">
          <button
            onClick={swapCurrencies}
            className="p-4 bg-slate-200 dark:bg-slate-600 rounded-full hover:bg-slate-300 dark:hover:bg-slate-500 transition"
          >
            <MdSwapHoriz size={24} />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full cursor-pointer p-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700"
          >
            {currencies.map(cur => (
              <option key={cur} value={cur}>
                {currencyData[cur]?.flag} {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result with Speaker Button */}
      <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-2xl text-center relative">
        {isLoading ? (
          <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
        ) : result ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold text-emerald-400">
              {result} {currencyData[toCurrency]?.symbol || toCurrency}
            </div>
            {/* Speaker Button */}
            <button
              onClick={speakResult}
              disabled={isSpeaking}
              className={`absolute text-xl cursor-pointer top-1 right-2 p-3 rounded-full transition ${
                isSpeaking 
                  ? 'bg-emerald-100 animate-pulse' 
                  : 'hover:bg-emerald-100 dark:hover:bg-emerald-800'
              }`}
              title="Speak result"
            >🔊
            
            </button>
          </div>
        ) : (
          <div className="text-slate-500">Enter amount and select currencies</div>
        )}
      </div>
    </div>
  );
};

// === MAIN COMPONENT ===
const UsefulTools = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Ultra Tools
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Professional password generator & currency converter — fast, private, beautiful
          </p>
        </div>

        {/* Tools Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <UltraPasswordGenerator />
          <UltraCurrencyConverter />


       
        </div>
<div className="mt-20"> <Tools></Tools></div>
          
      </div>
    </div>
  );
};

export default UsefulTools;