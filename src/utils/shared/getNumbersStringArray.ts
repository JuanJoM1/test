const getNumbersStringArray = (textFormated: string, partitions: number[]) => {
  const result: string[] = [];
  let currentIndex = 0;

  partitions.forEach((partition) => {
    if (currentIndex < textFormated.length) {
      result.push(textFormated.slice(currentIndex, currentIndex + partition));
      currentIndex += partition;
    }
  });

  return result;
};

export default getNumbersStringArray;
