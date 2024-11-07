function generateCalendar(year, month) {
    // Month is 0-indexed (0 = January, 11 = December)
    const date = new Date(year, month);
    
    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = date.getDay();
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create an array to hold the days of the calendar
    const calendar = [];
    
    // Fill the calendar array with empty spaces for days before the first day of the month
    let currentDay = 1;
    for (let i = 0; i < 6; i++) { // We can have up to 6 rows (weeks) in a calendar
      const week = [];
      
      for (let j = 0; j < 7; j++) { // 7 days in a week
        if (i === 0 && j < firstDay) {
          // Empty spaces before the start of the month
          week.push(null);
        } else if (currentDay <= daysInMonth) {
          // Fill the week with the current day
          week.push(currentDay);
          currentDay++;
        } else {
          // No more days in the month
          week.push(null);
        }
      }
      
      // Add the week to the calendar
      calendar.push(week);
    }
    
    return calendar;
  }

  export {generateCalendar}