export const UPDATE_FIELDS = 'UPDATE_FIELDS';

export function updateFields(fields, userType) {
  return {
    type: UPDATE_FIELDS,
    payload: { fields },
    meta: { userType },
  };
}
