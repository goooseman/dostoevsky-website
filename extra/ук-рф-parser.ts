/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JSDOM, ResourceLoader } from "jsdom";
import fs from "fs";
import path from "path";
import type { UkRfPart } from "src/types";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

/**
 * https://blog.usejournal.com/create-a-roman-numerals-converter-in-javascript-a82fda6b7a60
 *
 */
const romanToArabic = (romanNumber: string) => {
  romanNumber = romanNumber.toUpperCase();
  const romanNumList = [
    "CM",
    "M",
    "CD",
    "D",
    "XC",
    "C",
    "XL",
    "L",
    "IX",
    "X",
    "IV",
    "V",
    "I",
  ];
  const corresp = [900, 1000, 400, 500, 90, 100, 40, 50, 9, 10, 4, 5, 1];
  let index = 0,
    num = 0;
  for (const rn in romanNumList) {
    index = romanNumber.indexOf(romanNumList[rn]);
    while (index != -1) {
      num += corresp[rn];
      romanNumber = romanNumber.replace(romanNumList[rn], "-");
      index = romanNumber.indexOf(romanNumList[rn]);
    }
  }
  return num;
};

let i = 0;
/** Раздел VII. Преступления против личности
 * Статья 19. Общие условия уголовной ответственности
 * Статья 19.1
 * Статья 322.1. Организация незаконной миграции
 */
const getIdByLinkText = (text: string): number => {
  const match = text.match(/^[а-яА-Я]+ (.+)\./);
  if (!match) {
    // eslint-disable-next-line no-console
    console.warn(`Not able to retrive ID from ${text}`);
    return i++;
  }
  // match can be neither 208 or VII
  const result = parseFloat(match[1]);
  if (result && result !== NaN) {
    return result;
  }

  return romanToArabic(match[1]);
};

const getTitle = (text: string): string => {
  return text.replace(/^([а-яА-Я]+ .+\. )/, "");
};

const getKonsultantUrl = (path: string | null): string =>
  `http://www.consultant.ru${path}`;

const getParsedList = (listNode: Element): UkRfPart[] => {
  const result: UkRfPart[] = [];
  for (const liNode of listNode.querySelectorAll("li")) {
    if (liNode.parentNode !== listNode) {
      // liNode is not 1st level child of listNode
      continue;
    }

    const link = liNode.querySelector("a")!;

    if (liNode.nextElementSibling?.tagName === "UL") {
      const children = getParsedList(liNode.nextElementSibling!);
      result.push({
        text: { ru: getTitle(link.textContent!) },
        children: children,
        id: getIdByLinkText(link.textContent!),
        minClause: children[0].minClause || children[0].id,
        maxClause:
          children[children.length - 1].maxClause ||
          children[children.length - 1].id,
        url: getKonsultantUrl(link.getAttribute("href")),
      });
      continue;
    }

    result.push({
      text: { ru: getTitle(link.textContent!) },
      url: getKonsultantUrl(link.getAttribute("href")),
      id: getIdByLinkText(link.textContent!),
    });
  }
  return result;
};

const getParsedDocument = async (url: string): Promise<UkRfPart[]> => {
  const resourceLoader = new ResourceLoader({ userAgent: USER_AGENT });
  const dom = await JSDOM.fromURL(url, {
    resources: resourceLoader,
  });

  const { document } = dom.window;
  const initialListNode = document.querySelector(".document contents ul");
  const parsedList = getParsedList(initialListNode!);
  const особеннаяЧасть = parsedList.find(
    (n) => n.text.ru === "Особенная часть"
  );
  if (!особеннаяЧасть) {
    throw new Error(
      `Страница ${url} не содержит указателя "Особенная часть" или структура страницы изменилась и не может быть разобрана.`
    );
  }
  return особеннаяЧасть.children!;
};

(async () => {
  fs.writeFileSync(
    path.join(__dirname, "..", "content", "ук-рф.json"),
    JSON.stringify(
      await getParsedDocument(
        "http://www.consultant.ru/document/cons_doc_LAW_10699/"
      ),
      null,
      2
    )
  );
})().catch(console.error);
