import React from "react";
import Modal from "./Modal";
import useModal from "./useModal";
import { render, fireEvent } from "__utils__/render";

const TestHelper: React.FC = () => {
  const { isShowing, toggle } = useModal();
  return (
    <>
      <button className="button-default" onClick={toggle}>
        Show Modal
      </button>
      <Modal
        isShowing={isShowing}
        onHideButtonClick={toggle}
        title="Modal title"
      >
        Modal Body
      </Modal>
    </>
  );
};

it("should have open closed by default", () => {
  const { queryByText } = render(<TestHelper />);
  expect(queryByText("Modal Body")).toBeNull();
});

it("should open modal", () => {
  const { getByText } = render(<TestHelper />);
  fireEvent.click(getByText("Show Modal"));
  expect(getByText("Modal Body")).toBeInTheDocument();
});

it("should close modal", () => {
  const { getByText, getByLabelText, queryByText } = render(<TestHelper />);
  fireEvent.click(getByText("Show Modal"));
  fireEvent.click(getByLabelText("Закрыть"));
  expect(queryByText("Modal Body")).toBeNull();
});
