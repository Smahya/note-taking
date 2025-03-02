export function queryResponse(response: { data: any; error: any }) {
  if (response.error) throw response.error;
  return response.data;
}
