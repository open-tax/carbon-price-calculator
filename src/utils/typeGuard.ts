export const forceType =
  <T>(check: (input: unknown) => input is T) =>
  (input: unknown): T | undefined => {
    if (check(input)) {
      return input;
    }
    return undefined;
  };
