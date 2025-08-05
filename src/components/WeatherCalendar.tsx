"use client";

import React, { useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import enLocale from "air-datepicker/locale/en";

interface WeatherDay {
  date: string;
  icon: string; // this comes directly from the API
  avg_temp: number;
  text: string;
}

interface Props {
  weatherData: WeatherDay[];
  onDateSelect: (day: WeatherDay | null) => void;
}

const WeatherCalendar: React.FC<Props> = ({ weatherData, onDateSelect }) => {
  const datepickerRef = useRef<HTMLInputElement>(null);
  const pickerInstance = useRef<AirDatepicker<HTMLInputElement> | null>(null);

  useEffect(() => {
    if (!datepickerRef.current || weatherData.length === 0) return;

    // Destroy existing picker
    pickerInstance.current?.destroy();

    const first14Days = weatherData.slice(0, 14);

    pickerInstance.current = new AirDatepicker(datepickerRef.current, {
      locale: enLocale,
      inline: true,
      minDate: new Date(first14Days[0].date),
      maxDate: new Date(first14Days[first14Days.length - 1].date),

      onSelect({ date }) {
        if (date instanceof Date) {
          const selectedDate = date.toISOString().split("T")[0];
          const selectedDay = weatherData.find(
            (day) => day.date === selectedDate
          );
          onDateSelect(selectedDay || null);
        } else {
          onDateSelect(null);
        }
      },

      onRenderCell({ date, cellType }) {
        if (cellType === "day") {
          const dateString = date.toISOString().split("T")[0];
          const dayData = first14Days.find((day) => day.date === dateString);
          const isImage = dayData?.icon?.startsWith("http") ?? false;

          return {
            html: `
        <div class="flex flex-col items-center text-center">
          <div className="flex text-center">${date.getDate()}</div>
          ${
            dayData && dayData.icon
              ? isImage
                ? `<img src="${dayData.icon}" alt="icon" class="w-4 h-4 mt-0.5" />`
                : `<span class="text-base mt-0.5">${dayData.icon}</span>`
              : ""
          }
        </div>
      `,
          };
        }

        return undefined;
      },
    });

    // Optional: auto-select the first day
    pickerInstance.current.selectDate(new Date(first14Days[0].date));

    return () => {
      pickerInstance.current?.destroy();
      pickerInstance.current = null;
    };
  }, [weatherData, onDateSelect]);

  return <input ref={datepickerRef} readOnly style={{ width: "100%" }} />;
};

export default WeatherCalendar;
