/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JSDOM, ResourceLoader } from "jsdom";
import fs from "fs";
import path from "path";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

export interface UkRfPart {
  text: {
    ru: string;
  };
  url: string;
  key: string;
  children?: UkRfPart[];
}

// Статья 19. Общие условия уголовной ответственности
// Статья 19.1
// Статья 322.1. Организация незаконной миграции
const getKeyByLinkText = (text: string): string => {
  const match = text.match(/Статья (.+)\./);
  if (!match) {
    throw new Error(`Not able to retrive ID from ${text}`);
  }
  return match[1];
};

const getParsedList = (listNode: Element): UkRfPart[] => {
  const result: UkRfPart[] = [];
  for (const liNode of listNode.querySelectorAll("li")) {
    if (liNode.parentNode !== listNode) {
      // liNode is not 1st level child of listNode
      continue;
    }

    const link = liNode.querySelector("a")!;

    if (liNode.nextElementSibling?.tagName === "UL") {
      result.push({
        text: { ru: link.textContent! },
        children: getParsedList(liNode.nextElementSibling!),
        key: link.getAttribute("href") as string,
        url: link.getAttribute("href") as string,
      });
      continue;
    }

    result.push({
      text: { ru: link.textContent! },
      url: link.getAttribute("href") as string,
      key: getKeyByLinkText(link.textContent!),
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
