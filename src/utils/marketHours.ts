import { addDays, isAfter, isBefore, isWeekend, setHours, setMinutes, setSeconds } from 'date-fns';

export interface MarketStatus {
  isOpen: boolean;
  message: string;
  timeUntilChange: string;
}

export function getMarketStatus(): MarketStatus {
  const now = new Date();
  const easternTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  
  // Skip weekends
  if (isWeekend(easternTime)) {
    const nextMonday = addDays(easternTime, 8 - easternTime.getDay());
    const marketOpen = setHours(setMinutes(setSeconds(nextMonday, 0), 30), 9);
    const timeUntil = getTimeUntil(easternTime, marketOpen);
    
    return {
      isOpen: false,
      message: 'Markets are closed',
      timeUntilChange: `Opens ${timeUntil}`
    };
  }
  
  // Market hours: 9:30 AM - 4:00 PM ET
  const marketOpen = setHours(setMinutes(setSeconds(easternTime, 0), 30), 9);
  const marketClose = setHours(setMinutes(setSeconds(easternTime, 0), 0), 16);
  
  const isMarketHours = isAfter(easternTime, marketOpen) && isBefore(easternTime, marketClose);
  
  if (isMarketHours) {
    const timeUntil = getTimeUntil(easternTime, marketClose);
    return {
      isOpen: true,
      message: 'Markets are open',
      timeUntilChange: `Closes ${timeUntil}`
    };
  } else if (isBefore(easternTime, marketOpen)) {
    const timeUntil = getTimeUntil(easternTime, marketOpen);
    return {
      isOpen: false,
      message: 'Markets are closed',
      timeUntilChange: `Opens ${timeUntil}`
    };
  } else {
    // After market close
    const nextDay = addDays(easternTime, 1);
    const nextOpen = setHours(setMinutes(setSeconds(nextDay, 0), 30), 9);
    const timeUntil = getTimeUntil(easternTime, nextOpen);
    
    return {
      isOpen: false,
      message: 'Markets are closed',
      timeUntilChange: `Opens ${timeUntil}`
    };
  }
}

function getTimeUntil(from: Date, to: Date): string {
  const diff = to.getTime() - from.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours === 0) {
      return `in ${days}d`;
    }
    return `in ${days}d ${remainingHours}h`;
  } else if (hours > 0) {
    if (minutes === 0) {
      return `in ${hours}h`;
    }
    return `in ${hours}h ${minutes}m`;
  } else {
    return `in ${minutes}m`;
  }
}