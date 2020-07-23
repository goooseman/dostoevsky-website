import React from "react";
import ChatWrapperContainer from "./ChartWrapper.container";
import { render, fireEvent, waitFor } from "__utils__/render";

const writeMock = jest.fn();
const mockedOpen = jest.fn().mockImplementation(() => ({
  document: {
    write: writeMock,
  },
}));
const originalOpen = window.open;

beforeAll(() => {
  class SVGPathElement extends HTMLElement {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.SVGRectElement = SVGPathElement;
});

beforeEach(() => {
  window.open = mockedOpen;
});

afterEach(() => {
  window.open = originalOpen;
});

// This test suite will be used if any integration bugs will happen in the future
it("should create an image of a chart", async () => {
  const { getByTitle } = render(
    <ChatWrapperContainer
      title="Test Chart"
      downloadFilename="test"
      labels={["fdfd"]}
      isImageGenerationDebug
    >
      <p>Chart</p>
    </ChatWrapperContainer>
  );
  fireEvent.click(getByTitle("Download chart"));
  await waitFor(() => expect(writeMock).toBeCalledTimes(1));

  expect(writeMock).toBeCalledWith(expect.stringContaining("<svg"));
  expect(writeMock).toBeCalledWith(expect.stringContaining("</svg>"));
});
