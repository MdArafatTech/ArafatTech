import React, { useState, useEffect } from "react";

const gradingData = [
  { grade: "A+", point: "4.00", range: "80% and above" },
  { grade: "A", point: "3.75", range: "75% to less than 80%" },
  { grade: "A-", point: "3.50", range: "70% to less than 75%" },
  { grade: "B+", point: "3.25", range: "65% to less than 70%" },
  { grade: "B", point: "3.00", range: "60% to less than 65%" },
  { grade: "B-", point: "2.75", range: "55% to less than 60%" },
  { grade: "C+", point: "2.50", range: "50% to less than 55%" },
  { grade: "C", point: "2.25", range: "45% to less than 50%" },
  { grade: "D", point: "2.00", range: "40% to less than 45%" },
  { grade: "F", point: "0.00", range: "Less than 40%" },
];

const GradingNoteSection = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="w-full   ]">
      
      {/* Theme Toggle */}
      <div className="flex justify-end mb-4">
       
      </div>

      {/* 2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Grading System */}
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-900 dark:text-white">
          
          <h2 className="text-2xl font-bold text-center mb-4">
            NU Bangladesh Grading System
          </h2>

          <div className="overflow-auto rounded-lg border dark:border-gray-700">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                <tr>
                  <th className="border p-3 text-left">Grade</th>
                  <th className="border p-3 text-left">Point</th>
                  <th className="border p-3 text-left">Marks Range</th>
                </tr>
              </thead>

              <tbody>
                {gradingData.map((item, id) => (
                  <tr
                    key={id}
                    className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 hover:bg-yellow-100 dark:hover:bg-yellow-700 transition"
                  >
                    <td className="border p-3">{item.grade}</td>
                    <td className="border p-3">{item.point}</td>
                    <td className="border p-3">{item.range}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Note Section */}
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-900 dark:text-white">
          
          <h2 className="text-2xl font-bold mb-4 text-center">
            CGPA Calculator Notes
          </h2>

          {/* PROFESSIONAL UPGRADED NOTES */}
          <div className="space-y-5 text-lg leading-relaxed">

            {/* Auto Mode Note */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-1">1. Using Department + Year</h3>
              <p>
                When you select your <strong>Department</strong> and <strong>Academic Year</strong>,
                all subjects and credits load <strong>automatically</strong>.
                You only need to enter the <strong>Grade</strong> for each subject.
              </p>
              <p className="mt-2">
                You can still <strong>edit subject names & credits</strong> if your syllabus has changed or differs.
              </p>
            </div>

            {/* Manual Mode Note */}
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/40 border-l-4 border-amber-500">
              <h3 className="font-bold text-lg mb-1">2. Manual Input Mode (No Department Selected)</h3>
              <p>
                If no department and year are selected, you must enter  
                <strong>Every Subject Name + Grade + Credit</strong> manually.
              </p>
              <p className="mt-2">
                This mode is useful when using a <strong>custom syllabus</strong> or older session.
              </p>
            </div>


            {/* Additional Tips */}
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/40 border-l-4 border-green-600">
              <h3 className="font-bold text-lg mb-1">4. Helpful Tips</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Double-check subject credits before calculating.</li>
                <li>Some NU subjects have different credit patterns.</li>
                <li>Use the auto mode for faster, cleaner input.</li>
              </ul>
            </div>

            {/* Final Thanks */}
            <p className="font-semibold text-green-600 dark:text-green-400 text-center text-xl mt-4">
              🎉 Thanks for calculating!  
              <br />
              Stay with <strong>ArafatTech</strong> 💚
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default GradingNoteSection;
