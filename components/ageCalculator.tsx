"use client";

import { useState } from "react";

interface AgeResult {
  years: number | null;
  months: number | null;
  days: number | null;
}

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<AgeResult>({
    years: null,
    months: null,
    days: null,
  });
  const [error, setError] = useState("");

  const validateDate = (): boolean => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (dayNum < 1 || dayNum > 31) {
      setError("Dia inválido (1-31)");
      return false;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("Mês inválido (1-12)");
      return false;
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);
    if (
      date.getFullYear() !== yearNum ||
      date.getMonth() + 1 !== monthNum ||
      date.getDate() !== dayNum
    ) {
      setError("Data inválida");
      return false;
    }

    setError("");
    return true;
  };

  const calculateAge = () => {
    if (!validateDate()) return;

    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  const isFormValid = day && month && year;

  return (
    <div className="bg-white rounded-t-2xl shadow-sm rounded-bl-2xl rounded-br-[30%] p-12 w-[40vw] h-[65vh] flex justify-center flex-col">
      <div className="flex gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
            Day
          </label>
          <input
            type="number"
            min="1"
            max="31"
            value={day}
            onChange={(e) => setDay(e.target.value.slice(0, 2))}
            className="w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-xl text-black pl-4"
            placeholder="DD"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
            Month
          </label>
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value.slice(0, 2))}
            className="w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-xl text-black pl-4"
            placeholder="MM"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
            Year
          </label>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(e.target.value.slice(0, 4))}
            className="w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-xl text-black pl-4"
            placeholder="AAAA"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center w-full">
        <div className="h-[2px] w-full bg-gray-200"></div>
        <button
          onClick={calculateAge}
          disabled={!isFormValid}
          className={`w-16 h-16 py-2 px-4 rounded-full text-white ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Ca
        </button>
      </div>

      {result.years !== null && (
        <div className="text-2xl font-bold text-fuchsia-600 text-[60px]">
          <p>
            {result.years} <span className="text-black">years</span>
          </p>
          <p>
            {result.months} <span className="text-black">months</span>
          </p>
          <p>
            {result.days} <span className="text-black">days</span>
          </p>
        </div>
      )}
    </div>
  );
}
