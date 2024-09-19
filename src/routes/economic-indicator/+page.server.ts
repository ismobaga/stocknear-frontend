export const load = async ({ locals, setHeaders }) => {
  const getEconomicIndicator = async () => {
    const { apiKey, apiURL } = locals;

    const response = await fetch(apiURL + "/economic-indicator", {
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
    getEconomicIndicator: await getEconomicIndicator(),
  };
};
