"use client";

import { useState } from "react";
import Image from "next/image";
import iconArrow from "@/public/icon-arrow.svg";

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
  const [rotate, setRotate] = useState(false);

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

    setRotate(!rotate);

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
    <div className="bg-white rounded-t-2xl shadow-sm rounded-bl-2xl rounded-br-[30%] lg:p-12 w-[95vw] lg:w-[40vw] h-[70vh] lg:h-[65vh] flex justify-center items-center lg:items-baseline flex-col">
      <div className="flex gap-8 lg:gap-6 w-[60vw] lg:w-auto justify-center">
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
            className="lg:w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-sm lg:text-xl text-[hsl(0,0%,8%)] lg:pl-4"
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
            className="lg:w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-sm lg:text-xl text-[hsl(0,0%,8%)] lg:pl-4"
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
            className="lg:w-[8vw] p-2 border border-gray-200 rounded-md font-bold text-sm lg:text-xl text-[hsl(0,0%,8%)] lg:pl-4"
            placeholder="AAAA"
            required
          />
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center w-full mt-6 lg:mt-0">
        <div className="h-[2px] lg:w-full w-[42%] bg-gray-200"></div>
        <button
          onClick={calculateAge}
          disabled={!isFormValid}
          className={`w-16 h-16 p-4 lg:px-[14px] flex items-center justify-center rounded-[50%] text-white cursor-pointer  ${
            isFormValid
              ? "bg-[hsl(259,100%,65%)] hover:bg-[hsl(259,100%,65%)]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Image
            src={iconArrow}
            alt=""
            className={`transform transition-transform duration-300 ${
              rotate ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
        <div className="h-[2px] lg:w-full w-[42%] bg-gray-200 lg:hidden"></div>
      </div>

      <div className="text-sm lg:text-2xl font-bold text-[hsl(259,100%,65%)] text-[60px]">
        <p className="text-black">
          <span
            className={`text-[hsl(259,100%,65%)] lg:text-7xl font-bold ${
              result.years === null ? "tracking-widest" : "tracking-normal"
            } `}
          >
            {result.years !== null ? result.years : "--"}
          </span>{" "}
          years
        </p>
        <p className="text-black">
          <span
            className={`text-[hsl(259,100%,65%)] lg:text-7xl font-bold ${
              result.years === null ? "tracking-widest" : "tracking-normal"
            } `}
          >
            {result.months !== null ? result.months : "--"}
          </span>{" "}
          months
        </p>
        <p className="text-black">
          <span
            className={`text-[hsl(259,100%,65%)] text-7xl font-bold ${
              result.years === null ? "tracking-widest" : "tracking-normal"
            } `}
          >
            {result.days !== null ? result.days : "--"}
          </span>{" "}
          days
        </p>
      </div>
    </div>
  );
}
