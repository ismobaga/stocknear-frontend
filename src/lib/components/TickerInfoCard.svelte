<script lang="ts">
  import { stockTicker, screenWidth, wsBidPrice, wsAskPrice } from "$lib/store";

  import { abbreviateNumber } from "$lib/utils";
  import { fade } from "svelte/transition";

  export let stockDeck;
  export let data;

  let info;

  let cloudFrontUrl = import.meta.env.VITE_IMAGE_URL; // Set a default API URL

  let earningDate = null;
  let tierList = "-";
  //let ceoName = "-";
  let sector = "-";
  let industry = "-";
  let exchange = "-";
  let employees = "-";
  //let country = "-";
  let description = "";
  let website = "-";
  let snippet;
  let forwardPE = "-";
  let beta = "-";

  let showFullText = false;
  /*
  function getAbbreviatedName(fullName) {
    try {
      const names = fullName?.split(" ");
      let firstName = names?.at(0);
      // Remove any title prefix (e.g. Dr., Mr., Mrs., Ms.)
      if (names?.length > 1 && /^(Dr|Mr|Mrs|Ms)\.?$/i?.test(names?.at(0))) {
        firstName = names?.at(1);
        names?.splice(0, 1);
      }
      //const initials = names?.slice(0, -1)?.map(name => name?.charAt(0))?.join('. ');
      const lastName = names[names?.length - 1];
      return `${firstName?.charAt(0)}. ${lastName}`;
    } catch (e) {
      //console.log(e)
      return "-";
    }
  }
*/
  $: {
    if (
      $stockTicker &&
      typeof window !== "undefined" &&
      typeof stockDeck !== "undefined" &&
      stockDeck?.length !== 0
    ) {
      info = stockDeck?.at(0);
      earningDate =
        info?.earning !== undefined
          ? new Date(info?.earning)?.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
            })
          : "";

      tierList = info?.tierList;
      //ceoName = info?.ceoName?.length !== 0 ? getAbbreviatedName(info?.ceoName) : "-";
      sector = info?.sector ?? "-";
      industry = info?.industry ?? "-";
      exchange = info?.exchange;
      employees = abbreviateNumber(info?.fullTimeEmployees) ?? "-";
      //country = info?.country ?? "-";
      description =
        info?.description ??
        "A detailed description of the company is not yet available.";
      website = info?.website;
      snippet = description?.slice(0, 250) + "...";
      forwardPE = info?.forwardPE;
      beta = info?.beta !== undefined ? info?.beta?.toFixed(2) : "-";
    }
  }
</script>

<div class="sm:space-y-3">
  <div
    class="sm:rounded-md lg:border lg:border-gray-600 bg-[#000] lg:bg-default h-auto w-screen pt-16 sm:w-full md:w-[420px] xl:w-[450px] lg:pt-0"
  >
    <!--Start Header-->
    <div
      class="sm:rounded-t-lg w-full h-[130px] bg-[#000] p-3 flex flex-col bg-cover bg-center bg-no-repeat"
      style="background-image: url({`${cloudFrontUrl}/stocks/cover/${$stockTicker?.toUpperCase()}.jpg`});"
    >
      <div class="flex flex-row pt-1 pb-2">
        {#if earningDate}
          <div
            class="badge bg-[#fff] gap-2 mt-2 font-semibold text-sm text-black"
          >
            Earnings Call - {earningDate}
          </div>
        {/if}
      </div>
      <!--
            <div class="flex flex-row justify-end items-center mt-2 relative z-10 -my-5">
                <div style={`background-image: url(${tierList === 'S' || tierList === 'S+' || tierList === 'S-' ? sTier : tierList === 'A' || tierList === 'A+' || tierList === 'A-' ? aTier : tierList === 'B' || tierList === 'B+' || tierList === 'B-' ? bTier : defaultTier});`} class="animate-bounce circle-background mr-5 w-20 h-20 z-10">
                    <div class="tier-text italic m-auto text-xl">
                    <span class="{tierList !== null ? 'text-4xl' : 'hidden'} " style="color: ${tierList === 'S' || tierList === 'S+' || tierList === 'S-' ? '#FFFFFF' : tierList === 'A' || tierList === 'A+' || tierList === 'A-' ? '#1239FA' : ''});`}">
                      {tierList ?? 'n/a'}  
                    </span>
                    </div>
                </div>

            </div>
            -->
    </div>
    <!--End Header-->
    <!--Start Content-->
    <div class="w-full flex flex-wrap border-t border-gray-600 px-2">
      <h2 class="text-start ml-2 text-2xl font-bold text-white pb-2 mt-3">
        Company Info
      </h2>
      <div class="flex justify-center items-center w-full m-auto">
        <table class="table table-sm table-compact">
          <tbody>
            <!--
              <tr class="text-white border-b border-[#27272A]">
                <td class="text-start lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">CEO</td>
                <td class="text-center sm:text-end bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default whitespace-normal font-semibold">{ceoName}</td>
                <td class="text-start sm:text-end lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">Country</td>
                <td class="text-start sm:text-end bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default whitespace-normal font-semibold">{country}</td>
              </tr>
              -->
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Bid</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{$wsBidPrice !== 0 && $wsBidPrice !== null
                  ? $wsBidPrice
                  : (data?.getStockQuote?.bid ?? "-")}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Ask</td
              >
              <td class="text-start sm:text-end bg-[#000] lg:bg-default"
                >{$wsAskPrice !== 0 && $wsAskPrice !== null
                  ? $wsAskPrice
                  : (data?.getStockQuote?.ask ?? "-")}</td
              >
            </tr>
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Mkt Cap</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{abbreviateNumber(data?.getStockQuote?.marketCap)}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Vol</td
              >
              <td class="text-start sm:text-end bg-[#000] lg:bg-default"
                >{abbreviateNumber(data?.getStockQuote?.volume)}</td
              >
            </tr>
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Beta</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{beta}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Avg. Vol</td
              >
              <td class="text-start sm:text-end bg-[#000] lg:bg-default"
                >{abbreviateNumber(data?.getStockQuote?.avgVolume)}</td
              >
            </tr>
            <!--
              <tr class="text-white ">
                <td class="text-start lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white whitespace-pre-line font-semibold whitespace-nowrap">Sector</td>
                <td class="text-center bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default whitespace-pre-line font-semibold">{sector}</td>
                <td class="text-start sm:text-center lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">Employees</td>
                <td class="text-start sm:text-end bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default font-semibold">{employees}</td>
              </tr>
              <tr class="text-white border-b border-[#27272A]">
                <td class="text-start lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">Industry</td>
                <td class="text-center bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default whitespace-normal font-semibold">{industry}</td>
                <td class="text-start sm:text-center lg:border-b lg:border-[#27272A] bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">Exchange</td>
                <td class="text-start sm:text-end bg-[#000] lg:border-b lg:border-[#27272A] lg:bg-default font-semibold">{exchange}</td>
              </tr>
              -->
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Open</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{data?.getStockQuote?.open?.toFixed(2)}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Prev. Close</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default whitespace-nowrap"
                >{data?.getStockQuote?.previousClose?.toFixed(2) ?? "-"}</td
              >
            </tr>
            <!--
              {#if $screenWidth > 640}
              <tr class="text-white border-b border-[#27272A]">
                <td class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap">1D-Range</td>
                <td class="text-center sm:text-end bg-[#000] lg:bg-default">{data?.getStockQuote?.dayLow?.toFixed(2)} - {data?.getStockQuote?.dayHigh?.toFixed(2)}</td>
                <td class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap ">1Y-Range</td>
                <td class="text-start sm:text-end bg-[#000] lg:bg-default whitespace-nowrap ">{data?.getStockQuote?.yearLow?.toFixed(2)} - {data?.getStockQuote?.yearHigh?.toFixed(2)}</td>
              </tr>
              {/if}
              -->
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >EPS (ttm)</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{data?.getStockQuote?.eps}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >PE Ratio (ttm)</td
              >
              <td class="text-start sm:text-end bg-[#000] lg:bg-default"
                >{data?.getStockQuote?.pe}</td
              >
            </tr>
            <tr class="text-white border-b border-[#27272A]">
              <td
                class="text-start bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Shares Out.</td
              >
              <td class="text-center sm:text-end bg-[#000] lg:bg-default"
                >{abbreviateNumber(data?.getStockQuote?.sharesOutstanding)}</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default text-white font-semibold whitespace-nowrap"
                >Forward PE</td
              >
              <td
                class="text-start sm:text-end bg-[#000] lg:bg-default whitespace-nowrap"
                >{forwardPE === undefined || forwardPE === null
                  ? "-"
                  : forwardPE}</td
              >
            </tr>
          </tbody>
        </table>
      </div>

      <h2
        class="text-start sm:ml-4 text-xl font-bold text-white pb-2 pt-5 sm:pt-3 p-1 sm:p-0"
      >
        Description
      </h2>

      <p class="text-gray-100 sm:ml-2 text-sm whitespace-normal p-1 sm:p-2">
        {#if showFullText}
          <div transition:fade={{ delay: 0, duration: 80 }} in={showFullText}>
            {description}
          </div>
        {:else if $screenWidth <= 800}
          {description}
        {:else}
          {snippet}
        {/if}
      </p>
      {#if description.length !== 0}
        <div class="flex flex-row w-full items-center mt-4 pb-2 mb-2">
          <label
            on:click={() => (showFullText = !showFullText)}
            class="hidden lg:block ml-3 w-full text-md mt-1 cursor-pointer font-medium text-white sm:hover:text-blue-400 sm:hover:underline"
          >
            {#if showFullText}
              Show less
            {:else}
              Show more
            {/if}
          </label>

          <div class="flex justify-end w-full relative bottom-0 right-0 mr-3">
            <a
              target="_blank"
              href={website}
              class="inline-flex text-sm font-medium text-white sm:hover:text-blue-400 sm:hover:underline"
            >
              Go to website
              <svg
                class="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                ></path><path
                  d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                ></path></svg
              >
            </a>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
