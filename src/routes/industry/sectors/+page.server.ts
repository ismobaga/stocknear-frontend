export const load = async ({ locals, setHeaders }) => {
  const getSectorOverview = async () => {
    const { apiKey, apiURL } = locals;

    const response = await fetch(apiURL + "/sector-overview", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });

    const output = await response.json();

    setHeaders({ "cache-control": "public, max-age=3000" });

    return output;
  };

  // Make sure to return a promise
  return {
    getSectorOverview: await getSectorOverview(),
  };
};
