const hashStringToNumber = (str: string) => {
  if (!str) {
    return 0;
  }
  return Math.abs(
    Array.from(str.toString()).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );
};

export default hashStringToNumber;
