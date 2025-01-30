import { format, startOfDay, differenceInYears, parseISO } from 'date-fns';

/**
 * Strips the time from a date object and formats it into a specific format.
 * 
 * @param {Date | string} date - The input date object or date string.
 * @param {string} dateFormat - The format for the date (default 'dd/MM/yyyy').
 * @param {string} timeZone - The time zone to format the date in (default 'Asia/Dubai').
 * @returns {string} - The formatted date.
 */
const formatDate = (date, dateFormat = 'dd/MM/yyyy', timeZone = 'Asia/Dubai') => {
    if (!date) return 'N/A';
    
    // Strip the time and get the start of the day
    const strippedDate = startOfDay(new Date(date)); // Set the time to 00:00:00
    
    // Format the date into the specified format
    return format(strippedDate, dateFormat);
};

const calculateAge = (dateOfBirth) => {
    const birthDate = parseISO(dateOfBirth); // Parse the input date if it's a string
    const today = new Date();
    return differenceInYears(today, birthDate); // Get the difference in years
  };

export { formatDate, calculateAge };
