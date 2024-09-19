import { getCache, setCache } from "$lib/store";

export const load = async ({ params, parent }) => {
  const getLeaderboard = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextYear = year + Math.floor((currentMonthIndex + 1) / 12);
    const nextMonth = String(nextMonthIndex + 1).padStart(2, "0");
    const startDate = `${year}-${String(currentMonthIndex + 1).padStart(2, "0")}-01`;
    const endDate = `${nextYear}-${nextMonth}-01`;

    let output;

    // Get cached data for the specific tickerID
    const cachedData = getCache("", "getLeaderboard");
    if (cachedData) {
      output = cachedData;
    } else {
      const { fastifyURL } = await parent();

      const postData = {
        startDate: startDate,
        endDate: endDate,
      };

      const response = await fetch(fastifyURL + "/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      output = (await response.json())?.items
        ?.filter((item) => item.rank !== 0)
        ?.sort((a, b) => a.rank - b.rank);

      // Cache the data for this specific tickerID with a specific name 'getLeaderboard'
      setCache("", output, "getLeaderboard");
    }

    return output;
  };

  // Make sure to return a promise
  return {
    getLeaderboard: await getLeaderboard(),
  };
};
