import { isValid, parse , differenceInYears} from 'date-fns';
import { formatInTimeZone } from "date-fns-tz";

const formatUIDisplayDate = (dateString, formatString, timeZone = "Asia/Dubai") => {
  if (!dateString) return "Invalid Date"; 
  
  const parsedDate = parse(dateString, "dd-MM-yyyy", new Date());

  if (!isValid(parsedDate)) return "Invalid Date";
  const escapedFormatString = formatString ? formatString.replace(/([^\w\s])/g, "'$1'") : 'MMMM dd, yyyy';

  return formatInTimeZone(parsedDate, timeZone, escapedFormatString );
};

const parseDateString = (dateString, formatString = "dd-MM-yyyy") => {
  if (!dateString) return null;

  const parsedDate = parse(dateString, formatString, new Date());

  return isValid(parsedDate) ? parsedDate : null;
};

const calculatePersonalProfileAge = (dateInput) => {
  if (!dateInput) return "Invalid Date"; 
  const parsedDate = parse(dateInput, "dd-MM-yyyy", new Date());
  if (!(parsedDate instanceof Date) || !isValid(parsedDate)) {
    return null;
  }

  return differenceInYears(new Date(), parsedDate);
};


/**
 * Formats a number with commas as thousand separators and ensures two decimal places.
 * Example: 2100 -> "2,100.00"
 */

const formatDecimalValue = (value) => {
  if (!value) return "-";

  const number = value["$numberDecimal"] ?? value;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

const formatDuration = (totalHours) => {
  if (!totalHours) return "-";

  const totalSeconds = Math.floor(totalHours * 3600);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || !parts.length) parts.push(`${seconds}s`);

  const result = parts.join(' ').trim();
  return result === "0s" ? "-" : result;
};
  

export { formatUIDisplayDate, calculatePersonalProfileAge, formatDecimalValue, parseDateString, formatDuration };
