export const ACTION_TYPES = {
  NEW_NAME: "NEW_NAME"
};

export const submitName = newName => {
  return { type: ACTION_TYPES.NEW_NAME, name: newName }
}