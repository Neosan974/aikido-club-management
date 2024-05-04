<template>
  <VChart style="height: 400px" :option="chartOption" />
</template>
<script setup lang="ts">
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import { computed } from "vue";

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, GridComponent, PieChart]);

type PieData = {
  value: number;
  name: string;
};
type Props = {
  data: PieData[];
};

const { data } = defineProps<Props>();

const chartOption = computed(() => ({
  title: {
    text: "Number of adherents per gender",
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "horizontal",
    left: "center",
    bottom: "bottom",
  },
  series: [
    {
      name: "Gender",
      type: "pie",
      radius: "60%",
      data,
    },
  ],
}));
</script>
