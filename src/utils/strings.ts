/** "Угроза убийством или причинением тяжкого вреда здоровью (включая ст. 119 старой редакции УК РФ)" => "Угроза убийством или причинением тяжкого вреда здоровью" */
export const removeTextInBrackets = (str: string): string =>
  str.replace(/\(.+\)/, "").trim();

export const capitalize = (str: string): string =>
  `${str.substr(0, 1)?.toUpperCase()}${str.substr(1)}`;
