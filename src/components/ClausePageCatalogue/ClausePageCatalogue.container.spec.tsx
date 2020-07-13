import React from "react";
import { render, fireEvent } from "__utils__/render";
import ClausePageCatalogueContainer from "./ClausePageCatalogue.container";

it("should open subcategories", () => {
  const { getByText } = render(
    <ClausePageCatalogueContainer year={2019} onClose={jest.fn()} />
  );
  const part = getByText("Преступления против личности");
  expect(part).toBeInTheDocument();
  fireEvent.click(part);
  const section = getByText(
    "Преступления против свободы, чести и достоинства личности"
  );
  expect(section).toBeInTheDocument();
  fireEvent.click(section);
  const clause = getByText("Похищение человека");
  expect(clause).toBeInTheDocument();
});

it("should have subcategories opened by default", () => {
  const { getByText } = render(
    <ClausePageCatalogueContainer
      year={2019}
      onClose={jest.fn()}
      clauseId={282}
    />
  );
  expect(
    getByText("Преступления против государственной власти")
  ).toBeInTheDocument();
  expect(
    getByText(
      "Преступления против основ конституционного строя и безопасности государства"
    )
  ).toBeInTheDocument();
  expect(
    getByText(
      "Возбуждение ненависти либо вражды, а равно унижение человеческого достоинства"
    )
  ).toBeInTheDocument();
});
