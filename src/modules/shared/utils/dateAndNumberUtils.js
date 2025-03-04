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
  if (!value) return "N/A";

  const number = value["$numberDecimal"] ?? value;

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
  

export { formatUIDisplayDate, calculatePersonalProfileAge, formatDecimalValue, parseDateString };
