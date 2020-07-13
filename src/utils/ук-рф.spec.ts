import { getClauseById } from "./ук-рф";

/**
 * This test is not pure (does not mock `content/ук-рф.json`) by design.
 * It tests, that `content/ук-рф.json` contains data in the required format.
 * Therefore, it is an integration test of `extra/ук-рф-parser.ts`.
 */

it("should return clause", () => {
  expect(getClauseById(106)).toMatchObject({
    part: {
      text: { ru: "Преступления против личности" },
    },
    section: {
      text: {
        ru: "Преступления против жизни и здоровья",
      },
    },
    clause: {
      text: {
        ru: "Убийство матерью новорожденного ребенка",
      },
    },
  });
});

it("should return clause for the minimum range boundary", () => {
  expect(getClauseById(105)).toMatchObject({
    part: {
      text: { ru: "Преступления против личности" },
    },
    section: {
      text: {
        ru: "Преступления против жизни и здоровья",
      },
    },
    clause: {
      text: {
        ru: "Убийство",
      },
    },
  });
});

it("should return clause for the maximum range boundary", () => {
  expect(getClauseById(125)).toMatchObject({
    part: {
      text: { ru: "Преступления против личности" },
    },
    section: {
      text: {
        ru: "Преступления против жизни и здоровья",
      },
    },
    clause: {
      text: {
        ru: "Оставление в опасности",
      },
    },
  });
});
