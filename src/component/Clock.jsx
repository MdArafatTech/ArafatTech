import React, { useState, useEffect, useRef } from "react";

const OPENWEATHER_API_KEY = "45a479424074bc96aa3ff7f96887fb3b";

// Country list with timezone & city (unchanged)
const countryConfig = {
  Afghanistan: { timeZone: "Asia/Kabul", city: "Kabul" },
  Albania: { timeZone: "Europe/Tirane", city: "Tirana" },
  Algeria: { timeZone: "Africa/Algiers", city: "Algiers" },
  Andorra: { timeZone: "Europe/Andorra", city: "Andorra la Vella" },
  Angola: { timeZone: "Africa/Luanda", city: "Luanda" },
  Argentina: {
    timeZone: "America/Argentina/Buenos_Aires",
    city: "Buenos Aires",
  },
  Armenia: { timeZone: "Asia/Yerevan", city: "Yerevan" },
  "Australia (Sydney)": { timeZone: "Australia/Sydney", city: "Sydney" },
  Austria: { timeZone: "Europe/Vienna", city: "Vienna" },
  Azerbaijan: { timeZone: "Asia/Baku", city: "Baku" },
  Bahamas: { timeZone: "America/Nassau", city: "Nassau" },
  Bahrain: { timeZone: "Asia/Bahrain", city: "Manama" },
  Bangladesh: { timeZone: "Asia/Dhaka", city: "Dhaka" },
  Barbados: { timeZone: "America/Barbados", city: "Bridgetown" },
  Belarus: { timeZone: "Europe/Minsk", city: "Minsk" },
  Belgium: { timeZone: "Europe/Brussels", city: "Brussels" },
  Belize: { timeZone: "America/Belize", city: "Belmopan" },
  Benin: { timeZone: "Africa/Porto-Novo", city: "Porto-Novo" },
  Bhutan: { timeZone: "Asia/Thimphu", city: "Thimphu" },
  Bolivia: { timeZone: "America/La_Paz", city: "La Paz" },
  "Bosnia and Herzegovina": { timeZone: "Europe/Sarajevo", city: "Sarajevo" },
  Botswana: { timeZone: "Africa/Gaborone", city: "Gaborone" },
  Brazil: { timeZone: "America/Sao_Paulo", city: "Sao Paulo" },
  Brunei: { timeZone: "Asia/Brunei", city: "Bandar Seri Begawan" },
  Bulgaria: { timeZone: "Europe/Sofia", city: "Sofia" },
  "Burkina Faso": { timeZone: "Africa/Ouagadougou", city: "Ouagadougou" },
  Burundi: { timeZone: "Africa/Bujumbura", city: "Bujumbura" },
  Cambodia: { timeZone: "Asia/Phnom_Penh", city: "Phnom Penh" },
  Cameroon: { timeZone: "Africa/Douala", city: "Douala" },
  Canada: { timeZone: "America/Toronto", city: "Toronto" },
  "Cape Verde": { timeZone: "Atlantic/Cape_Verde", city: "Praia" },
  "Central African Republic": { timeZone: "Africa/Bangui", city: "Bangui" },
  Chad: { timeZone: "Africa/Ndjamena", city: "Ndjamena" },
  Chile: { timeZone: "America/Santiago", city: "Santiago" },
  China: { timeZone: "Asia/Shanghai", city: "Shanghai" },
  Colombia: { timeZone: "America/Bogota", city: "Bogota" },
  Comoros: { timeZone: "Indian/Comoro", city: "Moroni" },
  "Congo (Brazzaville)": {
    timeZone: "Africa/Brazzaville",
    city: "Brazzaville",
  },
  "Congo (Kinshasa)": { timeZone: "Africa/Kinshasa", city: "Kinshasa" },
  "Costa Rica": { timeZone: "America/Costa_Rica", city: "San Jose" },
  Croatia: { timeZone: "Europe/Zagreb", city: "Zagreb" },
  Cuba: { timeZone: "America/Havana", city: "Havana" },
  Cyprus: { timeZone: "Asia/Nicosia", city: "Nicosia" },
  "Czech Republic": { timeZone: "Europe/Prague", city: "Prague" },
  Denmark: { timeZone: "Europe/Copenhagen", city: "Copenhagen" },
  Djibouti: { timeZone: "Africa/Djibouti", city: "Djibouti" },
  Dominica: { timeZone: "America/Dominica", city: "Roseau" },
  "Dominican Republic": {
    timeZone: "America/Santo_Domingo",
    city: "Santo Domingo",
  },
  "East Timor": { timeZone: "Asia/Dili", city: "Dili" },
  Ecuador: { timeZone: "America/Guayaquil", city: "Quito" },
  Egypt: { timeZone: "Africa/Cairo", city: "Cairo" },
  "El Salvador": { timeZone: "America/El_Salvador", city: "San Salvador" },
  "Equatorial Guinea": { timeZone: "Africa/Malabo", city: "Malabo" },
  Eritrea: { timeZone: "Africa/Asmara", city: "Asmara" },
  Estonia: { timeZone: "Europe/Tallinn", city: "Tallinn" },
  Eswatini: { timeZone: "Africa/Mbabane", city: "Mbabane" },
  Ethiopia: { timeZone: "Africa/Addis_Ababa", city: "Addis Ababa" },
  Fiji: { timeZone: "Pacific/Fiji", city: "Suva" },
  Finland: { timeZone: "Europe/Helsinki", city: "Helsinki" },
  France: { timeZone: "Europe/Paris", city: "Paris" },
  Gabon: { timeZone: "Africa/Libreville", city: "Libreville" },
  Gambia: { timeZone: "Africa/Banjul", city: "Banjul" },
  Georgia: { timeZone: "Asia/Tbilisi", city: "Tbilisi" },
  Germany: { timeZone: "Europe/Berlin", city: "Berlin" },
  Ghana: { timeZone: "Africa/Accra", city: "Accra" },
  Greece: { timeZone: "Europe/Athens", city: "Athens" },
  Grenada: { timeZone: "America/Grenada", city: "St. George's" },
  Guatemala: { timeZone: "America/Guatemala", city: "Guatemala City" },
  Guinea: { timeZone: "Africa/Conakry", city: "Conakry" },
  "Guinea-Bissau": { timeZone: "Africa/Bissau", city: "Bissau" },
  Guyana: { timeZone: "America/Guyana", city: "Georgetown" },
  Haiti: { timeZone: "America/Port-au-Prince", city: "Port-au-Prince" },
  Honduras: { timeZone: "America/Tegucigalpa", city: "Tegucigalpa" },
  Hungary: { timeZone: "Europe/Budapest", city: "Budapest" },
  Iceland: { timeZone: "Atlantic/Reykjavik", city: "Reykjavik" },
  India: { timeZone: "Asia/Kolkata", city: "Mumbai" },
  Indonesia: { timeZone: "Asia/Jakarta", city: "Jakarta" },
  Iran: { timeZone: "Asia/Tehran", city: "Tehran" },
  Iraq: { timeZone: "Asia/Baghdad", city: "Baghdad" },
  Ireland: { timeZone: "Europe/Dublin", city: "Dublin" },
  Israel: { timeZone: "Asia/Jerusalem", city: "Jerusalem" },
  Italy: { timeZone: "Europe/Rome", city: "Rome" },
  "Ivory Coast": { timeZone: "Africa/Abidjan", city: "Abidjan" },
  Jamaica: { timeZone: "America/Jamaica", city: "Kingston" },
  Japan: { timeZone: "Asia/Tokyo", city: "Tokyo" },
  Jordan: { timeZone: "Asia/Amman", city: "Amman" },
  Kazakhstan: { timeZone: "Asia/Almaty", city: "Almaty" },
  Kenya: { timeZone: "Africa/Nairobi", city: "Nairobi" },
  Kiribati: { timeZone: "Pacific/Tarawa", city: "Tarawa" },
  Kosovo: { timeZone: "Europe/Belgrade", city: "Pristina" },
  Kuwait: { timeZone: "Asia/Kuwait", city: "Kuwait City" },
  Kyrgyzstan: { timeZone: "Asia/Bishkek", city: "Bishkek" },
  Laos: { timeZone: "Asia/Vientiane", city: "Vientiane" },
  Latvia: { timeZone: "Europe/Riga", city: "Riga" },
  Lebanon: { timeZone: "Asia/Beirut", city: "Beirut" },
  Lesotho: { timeZone: "Africa/Maseru", city: "Maseru" },
  Liberia: { timeZone: "Africa/Monrovia", city: "Monrovia" },
  Libya: { timeZone: "Africa/Tripoli", city: "Tripoli" },
  Liechtenstein: { timeZone: "Europe/Vaduz", city: "Vaduz" },
  Lithuania: { timeZone: "Europe/Vilnius", city: "Vilnius" },
  Luxembourg: { timeZone: "Europe/Luxembourg", city: "Luxembourg" },
  Madagascar: { timeZone: "Indian/Antananarivo", city: "Antananarivo" },
  Malawi: { timeZone: "Africa/Blantyre", city: "Blantyre" },
  Malaysia: { timeZone: "Asia/Kuala_Lumpur", city: "Kuala Lumpur" },
  Maldives: { timeZone: "Indian/Maldives", city: "Malé" },
  Mali: { timeZone: "Africa/Bamako", city: "Bamako" },
  Malta: { timeZone: "Europe/Malta", city: "Valletta" },
  "Marshall Islands": { timeZone: "Pacific/Majuro", city: "Majuro" },
  Mauritania: { timeZone: "Africa/Nouakchott", city: "Nouakchott" },
  Mauritius: { timeZone: "Indian/Mauritius", city: "Port Louis" },
  Mexico: { timeZone: "America/Mexico_City", city: "Mexico City" },
  Micronesia: { timeZone: "Pacific/Chuuk", city: "Palikir" },
  Moldova: { timeZone: "Europe/Chisinau", city: "Chisinau" },
  Monaco: { timeZone: "Europe/Monaco", city: "Monaco" },
  Mongolia: { timeZone: "Asia/Ulaanbaatar", city: "Ulaanbaatar" },
  Montenegro: { timeZone: "Europe/Podgorica", city: "Podgorica" },
  Morocco: { timeZone: "Africa/Casablanca", city: "Casablanca" },
  Mozambique: { timeZone: "Africa/Maputo", city: "Maputo" },
  "Myanmar (Burma)": { timeZone: "Asia/Yangon", city: "Yangon" },
  Namibia: { timeZone: "Africa/Windhoek", city: "Windhoek" },
  Nauru: { timeZone: "Pacific/Nauru", city: "Yaren" },
  Nepal: { timeZone: "Asia/Kathmandu", city: "Kathmandu" },
  Netherlands: { timeZone: "Europe/Amsterdam", city: "Amsterdam" },
  "New Zealand": { timeZone: "Pacific/Auckland", city: "Auckland" },
  Nicaragua: { timeZone: "America/Managua", city: "Managua" },
  Niger: { timeZone: "Africa/Niamey", city: "Niamey" },
  Nigeria: { timeZone: "Africa/Lagos", city: "Lagos" },
  "North Korea": { timeZone: "Asia/Pyongyang", city: "Pyongyang" },
  "North Macedonia": { timeZone: "Europe/Skopje", city: "Skopje" },
  Norway: { timeZone: "Europe/Oslo", city: "Oslo" },
  Oman: { timeZone: "Asia/Muscat", city: "Muscat" },
  Pakistan: { timeZone: "Asia/Karachi", city: "Karachi" },
  Palau: { timeZone: "Pacific/Palau", city: "Ngerulmud" },
  Palestine: { timeZone: "Asia/Gaza", city: "Gaza" },
  Panama: { timeZone: "America/Panama", city: "Panama City" },
  "Papua New Guinea": {
    timeZone: "Pacific/Port_Moresby",
    city: "Port Moresby",
  },
  Paraguay: { timeZone: "America/Asuncion", city: "Asuncion" },
  Peru: { timeZone: "America/Lima", city: "Lima" },
  Philippines: { timeZone: "Asia/Manila", city: "Manila" },
  Poland: { timeZone: "Europe/Warsaw", city: "Warsaw" },
  Portugal: { timeZone: "Europe/Lisbon", city: "Lisbon" },
  Qatar: { timeZone: "Asia/Qatar", city: "Doha" },
  Romania: { timeZone: "Europe/Bucharest", city: "Bucharest" },
  "Russia (Moscow)": { timeZone: "Europe/Moscow", city: "Moscow" },
  Rwanda: { timeZone: "Africa/Kigali", city: "Kigali" },
  "Saint Kitts and Nevis": { timeZone: "America/St_Kitts", city: "Basseterre" },
  "Saint Lucia": { timeZone: "America/St_Lucia", city: "Castries" },
  "Saint Vincent and the Grenadines": {
    timeZone: "America/St_Vincent",
    city: "Kingstown",
  },
  Samoa: { timeZone: "Pacific/Apia", city: "Apia" },
  "San Marino": { timeZone: "Europe/San_Marino", city: "San Marino" },
  "Sao Tome and Principe": { timeZone: "Africa/Sao_Tome", city: "São Tomé" },
  "Saudi Arabia": { timeZone: "Asia/Riyadh", city: "Riyadh" },
  Senegal: { timeZone: "Africa/Dakar", city: "Dakar" },
  Serbia: { timeZone: "Europe/Belgrade", city: "Belgrade" },
  Seychelles: { timeZone: "Indian/Mahe", city: "Victoria" },
  "Sierra Leone": { timeZone: "Africa/Freetown", city: "Freetown" },
  Singapore: { timeZone: "Asia/Singapore", city: "Singapore" },
  Slovakia: { timeZone: "Europe/Bratislava", city: "Bratislava" },
  Slovenia: { timeZone: "Europe/Ljubljana", city: "Ljubljana" },
  "Solomon Islands": { timeZone: "Pacific/Guadalcanal", city: "Honiara" },
  Somalia: { timeZone: "Africa/Mogadishu", city: "Mogadishu" },
  "South Africa": { timeZone: "Africa/Johannesburg", city: "Johannesburg" },
  "South Korea": { timeZone: "Asia/Seoul", city: "Seoul" },
  "South Sudan": { timeZone: "Africa/Juba", city: "Juba" },
  Spain: { timeZone: "Europe/Madrid", city: "Madrid" },
  "Sri Lanka": { timeZone: "Asia/Colombo", city: "Colombo" },
  Sudan: { timeZone: "Africa/Khartoum", city: "Khartoum" },
  Suriname: { timeZone: "America/Paramaribo", city: "Paramaribo" },
  Sweden: { timeZone: "Europe/Stockholm", city: "Stockholm" },
  Switzerland: { timeZone: "Europe/Zurich", city: "Zurich" },
  Syria: { timeZone: "Asia/Damascus", city: "Damascus" },
  Taiwan: { timeZone: "Asia/Taipei", city: "Taipei" },
  Tajikistan: { timeZone: "Asia/Dushanbe", city: "Dushanbe" },
  Tanzania: { timeZone: "Africa/Dar_es_Salaam", city: "Dar es Salaam" },
  Thailand: { timeZone: "Asia/Bangkok", city: "Bangkok" },
  Togo: { timeZone: "Africa/Lome", city: "Lomé" },
  Tonga: { timeZone: "Pacific/Tongatapu", city: "Nuku'alofa" },
  "Trinidad and Tobago": {
    timeZone: "America/Port_of_Spain",
    city: "Port of Spain",
  },
  Tunisia: { timeZone: "Africa/Tunis", city: "Tunis" },
  Turkey: { timeZone: "Europe/Istanbul", city: "Istanbul" },
  Turkmenistan: { timeZone: "Asia/Ashgabat", city: "Ashgabat" },
  Tuvalu: { timeZone: "Pacific/Funafuti", city: "Funafuti" },
  Uganda: { timeZone: "Africa/Kampala", city: "Kampala" },
  Ukraine: { timeZone: "Europe/Kiev", city: "Kiev" },
  "United Arab Emirates": { timeZone: "Asia/Dubai", city: "Dubai" },
  "United Kingdom": { timeZone: "Europe/London", city: "London" },
  "United States (New York)": {
    timeZone: "America/New_York",
    city: "New York",
  },
  Uruguay: { timeZone: "America/Montevideo", city: "Montevideo" },
  Uzbekistan: { timeZone: "Asia/Tashkent", city: "Tashkent" },
  Vanuatu: { timeZone: "Pacific/Efate", city: "Port Vila" },
  "Vatican City": { timeZone: "Europe/Vatican", city: "Vatican City" },
  Venezuela: { timeZone: "America/Caracas", city: "Caracas" },
  Vietnam: { timeZone: "Asia/Ho_Chi_Minh", city: "Ho Chi Minh City" },
  Yemen: { timeZone: "Asia/Aden", city: "Sana'a" },
  Zambia: { timeZone: "Africa/Lusaka", city: "Lusaka" },
  Zimbabwe: { timeZone: "Africa/Harare", city: "Harare" },
};

export default function Clock() {
  const [selectedCountry, setSelectedCountry] = useState("Bangladesh");
  const [time, setTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true); // ✅ ADDED
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  // ✅ FIXED: Day/night detection based on selected country's local time
  const updateDayNight = (localTime) => {
    const hour = localTime.getHours();
    setIsDaytime(hour >= 6 && hour < 18);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update time every second and day/night mode
  useEffect(() => {
    const updateTime = () => {
      const tz = countryConfig[selectedCountry].timeZone;
      const localString = new Date().toLocaleString("en-US", { timeZone: tz });
      const localTime = new Date(localString);
      setTime(localTime);
      updateDayNight(localTime); // ✅ FIXED: Use local time
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [selectedCountry]);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const city = countryConfig[selectedCountry].city;
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        if (!resp.ok) throw new Error("Weather fetch failed");
        const data = await resp.json();
        setWeather({
          tempC: data.main.temp,
          tempF: (data.main.temp * 9) / 5 + 32,
          description: data.weather[0].main,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          wind: data.wind?.speed || 0,
          pressure: data.main.pressure,
        });
      } catch (err) {
        console.error(err);
        setError("Could not load weather");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    if (selectedCountry) fetchWeather();
  }, [selectedCountry]);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const two = (n) => n.toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const filteredCountries = Object.keys(countryConfig).filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (





















   <div className="h-auto flex items-center justify-center sm:p-4 ">
  <div className="w-full max-w-4xl mx-auto">
    {/* Main Card - No extra padding/margin */}
    <div >
      {/* Dynamic Background Overlay */}
      <div
        className={`absolute inset-0  transition-all rounded-3xl duration-1000 ${
          isDaytime
            ? "bg-gradient-to-br from-amber-50/95 via-yellow-50/95 to-orange-50/95"
            : "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-blue-900/95"
        }`}
      />

      {/* Country Selector */}
      <div className="relative z-50 p-4 sm:p-6">
        <div className="max-w-md mx-auto" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full group flex items-center justify-between p-4 rounded-xl shadow-lg hover:shadow-xl border-2 backdrop-blur-md transition-all duration-300 ${
              isDaytime
                ? "bg-gradient-to-r from-amber-400/30 via-yellow-300/30 to-orange-300/30 text-slate-900 border-amber-300/60 hover:border-amber-400/80"
                : "bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-white border-slate-600/60 hover:border-slate-500/80"
            }`}
          >
            <span className="font-medium truncate pr-4 text-base sm:text-lg">
              {selectedCountry}
            </span>
            <span className={`text-lg ${isDaytime ? "text-orange-600" : "text-slate-300"} ${dropdownOpen ? "rotate-180" : ""} transition-transform duration-300`}>
              ▼
            </span>
          </button>
{dropdownOpen && (
  <div className="fixed inset-x-0 top-17 bottom-0 z-[9999] sm:relative sm:inset-auto sm:top-auto sm:bottom-auto sm:mt-2 sm:z-auto">
    {/* Mobile Backdrop - Darker in night mode */}
    <div
      className={`sm:hidden absolute inset-0 backdrop-blur-sm transition-colors ${
        isDaytime ? "bg-black/40" : "bg-black/70"
      }`}
      onClick={() => setDropdownOpen(false)}
    />

    {/* Dropdown Panel - Day/Night adaptive */}
    <div className={`mx-4 sm:mx-0 mt-2 sm:mt-0 rounded-2xl shadow-2xl border-2 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
      isDaytime
        ? "bg-gradient-to-br from-amber-50/95 to-white/98 border-amber-200/70"
        : "bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/60 shadow-2xl shadow-black/20"
    }`}>
      {/* Search Input - Responsive colors */}
      <div className="p-4 border-b sticky top-0 backdrop-blur-md z-10 transition-colors">
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-5 py-3 rounded-xl border-2 outline-none text-base font-medium transition-all duration-200 ${
            isDaytime
              ? "bg-amber-50/95 border-amber-300/70 text-gray-900 placeholder-gray-600 focus:border-amber-500 focus:bg-white/100 shadow-sm"
              : "bg-gray-900/95 border-gray-600/70 text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:bg-gray-800/100 shadow-sm"
          }`}
          autoFocus
        />
      </div>

      {/* Country List - Responsive items */}
      <div className="max-h-[60vh] sm:max-h-72 overflow-y-auto">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <button
              key={country}
              onClick={() => {
                setSelectedCountry(country);
                setDropdownOpen(false);
                setSearch("");
              }}
              className={`w-full text-left px-6 py-4 text-base font-medium border-b last:border-b-0 transition-all duration-200 hover:scale-[1.01] ${
                isDaytime
                  ? "border-amber-100/50 text-gray-900 hover:bg-amber-100/80 hover:shadow-md"
                  : "border-gray-800/50 text-gray-100 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-indigo-900/20"
              } ${
                selectedCountry === country
                  ? isDaytime
                    ? "bg-amber-200/70 ring-2 ring-amber-300/50 shadow-md"
                    : "bg-indigo-500/20 ring-2 ring-indigo-400/50 shadow-lg"
                  : ""
              }`}
            >
              {country}
            </button>
          ))
        ) : (
          <div className={`p-12 text-center transition-colors ${
            isDaytime ? "text-amber-700" : "text-gray-400"
          }`}>
            <div className="text-5xl mb-4 opacity-60">🌍</div>
            <p className="text-lg font-medium">No countries found</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}


        </div>
      </div>

      {/* Clock & Weather - Tight Layout */}
      <div className="relative z-10 px-4 sm:px-6 pb-8">
        <div className={`rounded-3xl border-4 shadow-2xl overflow-hidden ${
          isDaytime
            ? "bg-gradient-to-br from-yellow-400/25 via-amber-50/95 to-orange-400/25 text-orange-600 border-orange-400/70 shadow-orange-300/50"
            : "bg-gradient-to-br from-blue-500/25 via-slate-900/95 to-indigo-500/25 text-cyan-400 border-cyan-400/70 shadow-cyan-500/40"
        }`}>
          <div className="p-6 sm:p-8 md:p-10 text-center">
            {/* Time */}
            <div className="mb-4">
              <div className="font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                {two(hours % 12 === 0 ? 12 : hours % 12)}:{two(minutes)}:{two(seconds)}{" "}
                <span className="text-3xl sm:text-5xl md:text-6xl font-light">
                  {ampm}
                </span>
              </div>
            </div>

            {/* Date & City */}
            <div className={`mb-6 text-base sm:text-xl md:text-2xl font-light opacity-90 ${
              isDaytime ? "text-orange-700" : "text-slate-300"
            }`}>
              <div>
                {time.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="mt-2 text-sm sm:text-lg opacity-75">
                {countryConfig[selectedCountry]?.city || selectedCountry}
              </div>
            </div>

            {/* Loading / Error / Weather */}
            {loading && (
              <div className="py-6">
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full border-current mx-auto mb-3 animate-spin" />
                <p className="text-lg opacity-75">Loading weather...</p>
              </div>
            )}

            {error && (
              <div className={`p-5 rounded-xl backdrop-blur-sm border ${
                isDaytime
                  ? "bg-orange-500/20 border-orange-400/50 text-orange-600"
                  : "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
              }`}>
                {error}
              </div>
            )}

            {weather && !loading && !error && (
              <div className="space-y-6">
                {/* Icon + Description */}
                <div className="flex flex-col items-center">
                  {weather.icon && (
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt={weather.description}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  )}
                  <p className={`text-xl sm:text-2xl font-semibold capitalize mt-3 ${
                    isDaytime ? "text-orange-700" : "text-cyan-300"
                  }`}>
                    {weather.description}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Temp", value: unit === "C" ? `${Math.round(weather.tempC)}°C` : `${Math.round(weather.tempF)}°F` },
                    { label: "Humidity", value: `${weather.humidity}%` },
                    { label: "Wind", value: `${weather.wind} m/s` },
                    { label: "Pressure", value: `${weather.pressure} hPa` },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl backdrop-blur-sm border ${
                        isDaytime
                          ? "bg-orange-300/20 border-orange-300/40"
                          : "bg-cyan-400/20 border-cyan-400/40"
                      }`}
                    >
                      <div className={`text-2xl sm:text-3xl font-bold ${
                        isDaytime ? "text-orange-600" : "text-cyan-300"
                      }`}>
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm mt-1 opacity-80">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Unit Toggle */}
                <button
                  onClick={() => setUnit(unit === "C" ? "F" : "C")}
                  className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all ${
                    isDaytime
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                      : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  }`}
                >
                  Switch to °{unit === "C" ? "F" : "C"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




  );
}
