/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JSDOM, ResourceLoader } from "jsdom";
import fs from "fs";
import path from "path";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36";

interface Result {
  [key: string]: string | Result;
}

const getParsedList = (listNode: Element): Result => {
  const result: Result = {};
  for (const liNode of listNode.querySelectorAll("li")) {
    if (liNode.parentNode !== listNode) {
      // liNode is not 1st level child of listNode
      continue;
    }

    if (liNode.nextElementSibling?.tagName === "UL") {
      result[liNode.querySelector("a")?.textContent || ""] = getParsedList(
        liNode.nextElementSibling!
      );
      continue;
    }

    const link = liNode.querySelector("a");
    result[link?.textContent || ""] = link?.getAttribute("href") as string;
  }
  return result;
};

const getParsedDocument = async (url: string): Promise<Result> => {
  const resourceLoader = new ResourceLoader({ userAgent: USER_AGENT });
  const dom = await JSDOM.fromURL(url, {
    resources: resourceLoader,
  });

  const { document } = dom.window;
  const initialListNode = document.querySelector(".document contents ul");
  return getParsedList(initialListNode!);
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
