<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  type $$Props = HTMLAttributes<HTMLTableSectionElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<tfoot
  class={cn("font-medium text-primary-foreground", className)}
  {...$$restProps}
>
  <slot />
</tfoot>
