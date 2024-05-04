<template>
  <VChart style="height: 400px" :option="chartOption" />
</template>
<script setup lang="ts">
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { computed } from "vue";
import { supabase } from "@/supabase";
import type { Grade } from "@/model/Grade";

type BarData = {
  value: number;
  name: string;
};

const { data: grades } = await supabase.from("grades").select("*");
const { data: lastGradeOfAdherents } = await supabase.from("adherents_last_grades").select("*");

const lastGradeOfAdherentsFormatted = computed(() =>
  lastGradeOfAdherents?.map((g) => ({ ...g, name: grades?.find((g2) => g2.id === g.last_grade_id)?.name })),
);

const gradeGroups = computed(() =>
  Object.groupBy<Grade>(lastGradeOfAdherentsFormatted.value ?? [], (g: Grade) => g.name),
);
const gradesData = computed(() =>
  Object.entries(gradeGroups.value)
    .map<BarData>((v) => ({ name: v[0], value: (v[1] as []).length }))
    .toSorted((a: BarData, b: BarData) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    }),
);

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, GridComponent, BarChart]);

const chartOption = computed(() => ({
  title: {
    text: "Number of adherents per grade",
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
  xAxis: {
    type: "category",
    data: gradesData.value.map((d: BarData) => d.name),
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: gradesData.value.map((d: BarData) => d.value),
      type: "bar",
    },
  ],
}));
</script>
