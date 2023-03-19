const isJustAString = (e) => (typeof e === "string");

const isJustEmptySpaces = (e) => e.trim().length === 0;

const isValidString = (e) => isJustAString(e) && !isJustEmptySpaces(e);

export { isJustAString, isJustEmptySpaces, isValidString };