async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/task/${taskId}`;
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "unknown error occured";
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}

export default deleteTaskAPI;
