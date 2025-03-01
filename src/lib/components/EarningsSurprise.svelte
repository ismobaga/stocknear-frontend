<script lang="ts">
  import { stockTicker, displayCompanyName } from "$lib/store";
  import { abbreviateNumber } from "$lib/utils";
  export let data;

  let rawData = {};
  let epsRatio = 0;
  let revenueRatio = 0;
  function latestInfoDate(inputDate) {
    // Convert the input date string to milliseconds since epoch
    const inputDateMs = Date?.parse(inputDate);

    // Get today's date in milliseconds since epoch
    const todayMs = Date?.now();

    // Calculate the difference in milliseconds
    const differenceInMs = todayMs - inputDateMs;

    // Convert milliseconds to days
    const differenceInDays = Math?.floor(
      differenceInMs / (1000 * 60 * 60 * 24),
    );

    // Return the difference in days
    return differenceInDays <= 1;
  }

  $: {
    if ($stockTicker && typeof window !== "undefined") {
      rawData = data?.getEarningsSurprise;
      epsRatio =
        rawData?.epsPrior === 0
          ? null
          : (
              ((rawData?.eps - rawData?.epsPrior) /
                Math.abs(rawData?.epsPrior)) *
              100
            )?.toFixed(2);
      revenueRatio = (
        (rawData?.revenue / rawData?.revenuePrior - 1) *
        100
      )?.toFixed(2);
    }
  }
</script>

{#if Object?.keys(rawData)?.length !== 0}
  <div class="space-y-3 overflow-hidden">
    <!--Start Content-->
    <div class="w-auto lg:w-full p-1 flex flex-col m-auto">
      <div class="flex flex-col items-center w-full mb-3">
        <div class="flex flex-row justify-start mr-auto items-center">
          <!--<img class="h-10 inline-block mr-2" src={copilotIcon} />-->
          <div class="flex flex-row items-center">
            <h3
              class="mr-1 flex flex-row items-center text-white text-2xl font-bold"
            >
              Earnings Surprise
            </h3>
            <label
              class="{latestInfoDate(rawData?.date)
                ? ''
                : 'hidden'} text-black bg-[#fff] ml-2 font-semibold not-italic text-xs rounded px-2 py-0.5"
              >New</label
            >
          </div>
        </div>
      </div>

      <div
        class="text-white text-[1rem] {latestInfoDate(rawData?.date)
          ? 'bg-[#F9AB00] bg-opacity-[0.1] p-3 rounded-md'
          : 'bg-default pl-1'} "
      >
        <div class="mt-1">
          {$displayCompanyName} has released their quartely earnings on {new Date(
            rawData?.date,
          )?.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            daySuffix: "2-digit",
          })}:
        </div>

        <li
          class="ml-[20px] sm:ml-[30px]"
          style="color: #fff; line-height: 22px; margin-top:10px; margin-bottom: 10px; list-style-type: disc;"
        >
          Revenue of <span class="font-semibold"
            >{abbreviateNumber(rawData?.revenue, true)}</span
          >
          {rawData?.revenueSurprise > 0 ? "exceeds" : "misses"} estimates by {abbreviateNumber(
            Math.abs(rawData?.revenueSurprise),
            true,
          )}, with
          <span
            class="font-semibold {revenueRatio > 0
              ? "before:content-['+'] text-[#00FC50]"
              : 'text-[#FF2F1F]'}">{revenueRatio}%</span
          >
          YoY {revenueRatio < 0 ? "decline" : "growth"}.
        </li>
        <li
          class="ml-[20px] sm:ml-[30px]"
          style="color: #fff; line-height: 22px; margin-top: 0px; margin-bottom: 0px; list-style-type: disc;"
        >
          EPS of <span class="font-semibold">{rawData?.eps}</span>
          {rawData?.epsSurprise > 0 ? "exceeds" : "misses"} estimates by {rawData?.epsSurprise?.toFixed(
            2,
          )}, with
          <span
            class="font-semibold {epsRatio === null
              ? 'text-white'
              : epsRatio > 0
                ? 'text-[#00FC50]'
                : 'text-[#FF2F1F]'}"
          >
            {epsRatio === null ? "n/a" : `${epsRatio}%`}
          </span>
          YoY {epsRatio === null ? "" : epsRatio < 0 ? "decline" : "growth"}.
        </li>
      </div>
    </div>
  </div>
{/if}
