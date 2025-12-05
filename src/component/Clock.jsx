import React, { useState, useEffect, useRef } from "react";

const OPENWEATHER_API_KEY = "45a479424074bc96aa3ff7f96887fb3b";

// Country list with timezone & city
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
  const [darkMode, setDarkMode] = useState(true);
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

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

  // Update time every second and adjust dark/light mode
  useEffect(() => {
    const updateTime = () => {
      const tz = countryConfig[selectedCountry].timeZone;
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: tz })
      );
      setTime(now);
      const hour = now.getHours();
      setDarkMode(hour >= 18 || hour < 6);
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
          wind: data.wind.speed,
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
    fetchWeather();
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
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white -mb-10 mt-35" : "bg-yellow-50 text-gray-900"
      } flex flex-col items-center justify-center py-10 rounded-xl p-4 transition-colors duration-500`}
    >
      {/* Digital Clock + Weather */}




      <div className=" grid grid-cols-1 items-center justify-center gap-10">












        {/* Dropdown Section */}
     <div className="flex items-center justify-center   dark:bg-gray-900">
  <div className="relative w-full sm:w-48 md:w-60" ref={dropdownRef}>
    {/* Selected Country Box */}
    <div
      className={`p-2 rounded cursor-pointer border flex justify-between items-center transition-all ${
        darkMode
          ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          : "bg-yellow-200 text-gray-900 border-yellow-300 hover:bg-yellow-300"
      }`}
      onClick={() => setDropdownOpen(!dropdownOpen)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setDropdownOpen(!dropdownOpen);
        }
      }}
      tabIndex={0}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={dropdownOpen}
      aria-controls="country-list"
    >
      {/* Selected Country Name */}
      <span>{selectedCountry || "Select a country"}</span>

      {/* Dropdown Icon */}
      <span
        className={`ml-2 text-sm transition-transform duration-300 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        } ${dropdownOpen ? "rotate-180" : ""}`}
      >
        ▼
      </span>
    </div>

    {/* Dropdown List */}
    {dropdownOpen && (
      <div
        id="country-list"
        className={`absolute z-20 mt-1 w-full max-h-64 overflow-y-auto border rounded shadow-xl transition-all ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-yellow-200 text-gray-900 border-yellow-300"
        }`}
        role="listbox"
      >
        {/* Search Input */}
        <div className="relative sticky top-0 z-20">
          <input
            type="text"
            className={`w-full p-2 rounded mb-1 border-b outline-none ${
              darkMode
                ? "bg-gray-600 text-white border-gray-500"
                : "bg-yellow-50 text-gray-900 border-yellow-300"
            }`}
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setDropdownOpen(false);
            }}
            aria-label="Search countries"
          />
        </div>

        {/* Country Options */}
        {filteredCountries.map((country) => (
          <div
            key={country}
            className={`p-2 cursor-pointer transition ${
              darkMode ? "hover:bg-gray-600" : "hover:bg-blue-50"
            }`}
            onClick={() => {
              setSelectedCountry(country);
              setDropdownOpen(false);
              setSearch("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCountry(country);
                setDropdownOpen(false);
                setSearch("");
              }
            }}
            tabIndex={0}
            role="option"
            aria-selected={selectedCountry === country}
          >
            {country}
          </div>
        ))}

        {/* Empty State */}
        {filteredCountries.length === 0 && (
          <div className="p-2 text-gray-400" role="option">
            No countries found
          </div>
        )}
      </div>
    )}
  </div>
</div>

        {/* Digital Clock Section */}
        <div
          className={`digital-clock font-['LED_Digital_7'] text-5xl md:text-7xl p-4 rounded-lg ${
            darkMode
              ? "shadow-[0_0_20px_cyan] text-cyan-400 border-cyan-400"
              : "shadow-[0_0_20px-pink] text-red-500 border-red-500"
          } border-4 drop-shadow-[0_0_5px] transition-colors duration-500 flex flex-col items-center`}
        >
          <div>
            {two(hours % 12 === 0 ? 12 : hours % 12)}:{two(minutes)}:
            {two(seconds)} {ampm}
          </div>
          <div className="text-xl mt-2">
            {time.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {loading && <div className="mt-2 text-lg">Loading weather...</div>}
          {error && <div className="mt-2 text-lg text-yellow-600">{error}</div>}
          {weather && !loading && !error && (
            <div className="mt-4 text-lg flex flex-col items-center">
              <div className="flex items-center space-x-2">
                {weather.icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-12 h-12"
                    style={{
                      filter: darkMode ? "invert(100%)" : "none",
                    }}
                  />
                )}
                <span>{weather.description}</span>
              </div>
              <div>
                {unit === "C"
                  ? `${Math.round(weather.tempC)}° C`
                  : `${Math.round(weather.tempF)}° F`}
              </div>
              <div>Humidity: {weather.humidity}%</div>
              <div>Wind: {weather.wind} m/s</div>
              <div>Pressure: {weather.pressure} hPa</div>
              <button
                className="mt-2 p-1 border rounded"
                onClick={() => setUnit(unit === "C" ? "F" : "C")}
              >
                Show °{unit === "C" ? "F" : "C"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
