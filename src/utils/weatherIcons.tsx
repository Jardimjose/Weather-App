import React from 'react';

export function getWeatherIcon(code: number, className: string = 'w-5 h-5') {
  // 0: Clear sky (Sun)
  if (code === 0) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" strokeWidth="1.75" />
        <path
          strokeLinecap="round"
          strokeWidth="1.75"
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
        />
      </svg>
    );
  }

  // 1, 2: Mainly clear / Partly cloudy (Sun + Cloud)
  if (code === 1 || code === 2) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M12 3v1.5m6.36 1.14-1.06 1.06M21 12h-1.5M5.64 5.64l1.06 1.06M15.5 12a3.5 3.5 0 0 0-6.56-1.69"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M6.5 19h9a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 5.14 12.2 3.5 3.5 0 0 0 6.5 19Z"
        />
      </svg>
    );
  }

  // 3: Overcast (Cloud)
  if (code === 3) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M6.5 19h10a4.5 4.5 0 0 0 .6-8.96A6 6 0 0 0 5.3 11.4 4 4 0 0 0 6.5 19Z"
        />
      </svg>
    );
  }

  // 45, 48: Fog
  if (code === 45 || code === 48) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M4 10h16M3 14h18M5 18h14"
        />
      </svg>
    );
  }

  // 51–67 & 80–82: Drizzle, Rain, Rain Showers
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M6.5 15h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.14 8.2 3.5 3.5 0 0 0 6.5 15ZM8 18l-1 3m5-3-1 3m5-3-1 3"
        />
      </svg>
    );
  }

  // 71–77 & 85–86: Snow & Snow Showers
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M12 2v20m-8.66-5 17.32-10m0 10L3.34 7"
        />
      </svg>
    );
  }

  // 95–99: Thunderstorm
  if (code >= 95) {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
          d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        />
      </svg>
    );
  }

  // Default fallback (Cloud)
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
        d="M6.5 19h10a4.5 4.5 0 0 0 .6-8.96A6 6 0 0 0 5.3 11.4 4 4 0 0 0 6.5 19Z"
      />
    </svg>
  );
}