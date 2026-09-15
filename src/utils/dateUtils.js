/**
 * Date of Birth Utility for DD-MM-YYYY format handling & API normalization
 */

/**
 * Converts any stored DOB format (YYYY-MM-DD or DD-MM-YYYY) into DD-MM-YYYY display format
 * @param {string} dobStr 
 * @returns {string} formatted DD-MM-YYYY
 */
export const formatDobForDisplay = (dobStr) => {
  if (!dobStr || typeof dobStr !== 'string') return '';
  const clean = dobStr.trim();
  
  // If already YYYY-MM-DD
  const ymdMatch = clean.match(/^(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})$/);
  if (ymdMatch) {
    const [, y, m, d] = ymdMatch;
    return `${d.padStart(2, '0')}-${m.padStart(2, '0')}-${y}`;
  }

  // If already DD-MM-YYYY or D-M-YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[-/\.](\d{1,2})[-/\.](\d{4})$/);
  if (dmyMatch) {
    const [, d, m, y] = dmyMatch;
    return `${d.padStart(2, '0')}-${m.padStart(2, '0')}-${y}`;
  }

  return clean;
};

/**
 * Validates and normalizes DOB input from user (supports DD-MM-YYYY, DD/MM/YYYY, YYYY-MM-DD)
 * @param {string} dobStr 
 * @returns {{ isValid: boolean, apiDob?: string, displayDob?: string, error?: string }}
 */
export const parseAndValidateDob = (dobStr) => {
  if (!dobStr || !dobStr.trim()) {
    return { isValid: false, error: 'Date of Birth is required.' };
  }

  const clean = dobStr.trim();
  let day, month, year;

  // Pattern 1: DD-MM-YYYY or DD/MM/YYYY or DD.MM.YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[-/\.](\d{1,2})[-/\.](\d{4})$/);
  // Pattern 2: YYYY-MM-DD or YYYY/MM/DD
  const ymdMatch = clean.match(/^(\d{4})[-/\.](\d{1,2})[-/\.](\d{1,2})$/);
  // Pattern 3: 8 digits uninterrupted DDMMYYYY
  const digitsMatch = clean.match(/^(\d{2})(\d{2})(\d{4})$/);

  if (dmyMatch) {
    day = parseInt(dmyMatch[1], 10);
    month = parseInt(dmyMatch[2], 10);
    year = parseInt(dmyMatch[3], 10);
  } else if (ymdMatch) {
    year = parseInt(ymdMatch[1], 10);
    month = parseInt(ymdMatch[2], 10);
    day = parseInt(ymdMatch[3], 10);
  } else if (digitsMatch) {
    day = parseInt(digitsMatch[1], 10);
    month = parseInt(digitsMatch[2], 10);
    year = parseInt(digitsMatch[3], 10);
  } else {
    return {
      isValid: false,
      error: 'Please enter Date of Birth in DD-MM-YYYY format (e.g. 15-08-1995).',
    };
  }

  // Validate date bounds
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return { isValid: false, error: `Year must be between 1900 and ${currentYear}.` };
  }
  if (month < 1 || month > 12) {
    return { isValid: false, error: 'Month must be between 01 and 12.' };
  }
  
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return { isValid: false, error: `Day must be between 01 and ${daysInMonth} for selected month.` };
  }

  const dStr = String(day).padStart(2, '0');
  const mStr = String(month).padStart(2, '0');

  return {
    isValid: true,
    apiDob: `${year}-${mStr}-${dStr}`, // Backend standard (YYYY-MM-DD)
    displayDob: `${dStr}-${mStr}-${year}`, // User display (DD-MM-YYYY)
  };
};
