export const fetchDataIfNeeded = async (dispatch, fetchFunction, formData, customParams) => {
  if (Object.values(customParams).some(value => value !== '')) {
    await fetchFunction(dispatch, customParams);
  }
};
