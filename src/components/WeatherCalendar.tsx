'use client'

import React, { useEffect, useRef } from 'react'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import enLocale from 'air-datepicker/locale/en'


interface WeatherDay {
  date: string
  icon: string
  avg_temp: number
  text: string
}

interface Props {
  weatherData: WeatherDay[]
  onDateSelect: (day: WeatherDay | null) => void
}

const WeatherCalendar: React.FC<Props> = ({ weatherData, onDateSelect }) => {
  const datepickerRef = useRef<HTMLInputElement>(null)
  const pickerInstance = useRef<AirDatepicker<HTMLInputElement> | null>(null)
    
  // Initialize datepicker when component mounts
  useEffect(() => {
    if (!datepickerRef.current) return

    // Destroy old instance if exists
    pickerInstance.current?.destroy();

    pickerInstance.current = new AirDatepicker(datepickerRef.current, {
      locale: enLocale,
      inline: true,
      
      // Limit calendar dates to your weatherData range
      minDate: new Date(weatherData[0].date),
      maxDate: new Date(weatherData[weatherData.length-1].date),

      //Handle date selection
      onSelect({ date }) {
        if (date instanceof Date) {
          const selectedDate = date.toISOString().split('T')[0]
          const selectedDay = weatherData.find((day) => day.date === selectedDate)
          onDateSelect(selectedDay || null)
        } else {
          onDateSelect(null)
        }
      },
    })

  }, [weatherData, onDateSelect])
  
  return <input ref={datepickerRef} readOnly />
}

export default WeatherCalendar
