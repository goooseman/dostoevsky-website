const originalWindowLocation = window.location;

export const mockWindowLocation = (
  mockObject: Partial<typeof window.location>
): void => {
  delete window.location;

  window.location = {
    ...originalWindowLocation,
    ...mockObject,
  };
};

export const unmockWindowLocation = (): void => {
  window.location = originalWindowLocation;
};
