<template>
  <div>
    <canvas ref="lineChartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { Chart, LineController, LinearScale, CategoryScale, PointElement, LineElement, Title, Filler, Tooltip } from 'chart.js';
import axios from 'axios';

Chart.register(LineController, LinearScale, CategoryScale, PointElement, LineElement, Title, Filler, Tooltip);

const lineChartCanvas = ref(null);
const data = ref([]);
const previousMonthData = ref([]);

/* OBTENER RANGO DE FECHA */
const currentDate = new Date();
const mes = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const startDate = new Date(year, mes - 1, 1);
const lastDayOfMonth = new Date(year, mes, 0);
const endDate = new Date(year, mes - 1, lastDayOfMonth.getDate());
const formattedStartDate = startDate.toISOString().substring(0, 10);
const formattedEndDate = endDate.toISOString().substring(0, 10);

const fetchData = async () => {
  const rango = {
    fechaI: formattedStartDate,
    fechaF: formattedEndDate
  };

  try {
    const response = await axios.post('http://backend.vetcachorros.one/data', rango);
    data.value = response.data;
    // Obtener los datos del mes pasado
    const lastMonthStartDate = new Date(year, mes - 2, 1);
    const lastMonthEndDate = new Date(year, mes - 1, 0);
    const formattedLastMonthStartDate = lastMonthStartDate.toISOString().substring(0, 10);
    const formattedLastMonthEndDate = lastMonthEndDate.toISOString().substring(0, 10);
    const rangoLastMonth = {
      fechaI: formattedLastMonthStartDate,
      fechaF: formattedLastMonthEndDate
    };
    const responseLastMonth = await axios.post('http://backend.vetcachorros.one/data', rangoLastMonth);
    previousMonthData.value = responseLastMonth.data;
    updateChartData();
  } catch (error) {
    console.log(error)
  }
};

const extractDayFromDate = (dateString) => {
  return dateString.substring(8);
};

const chartData = reactive({
  labels: [],
  datasets: [
    {
      label: 'VENTAS POR DIA',
      borderColor: 'rgb(163, 39, 240)',
      backgroundColor: 'rgba(163, 39, 240, 0.2)',
      data: [],
      fill: true,
      tension: 0.3, // Ajusta este valor para cambiar la curvatura
    },
    {
      label: 'Ventas por dia',
      borderColor: 'rgba(255, 99, 132, 0.3)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
      data: [],
      fill: true,
      tension: 0.4, // Ajusta este valor para cambiar la curvatura

    },
  ],
});

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Día del mes',
      }, 
      grid: {
        display: false,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Ventas por dia',
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
};

const updateChartData = () => {
  chartData.labels = data.value.map((item) => extractDayFromDate(item.fecha));
  chartData.datasets[0].data = data.value.map((item) => parseInt(item.cantidad));
  chartData.datasets[1].data = previousMonthData.value.map((item) => parseInt(item.cantidad));
};

const updateChart = () => {
  if (lineChartCanvas.value && lineChartCanvas.value.getContext('2d')) {
    new Chart(lineChartCanvas.value.getContext('2d'), {
      type: 'line',
      data: chartData,
      options: chartOptions,
    });
  }
};

onMounted(() => {
  fetchData();
  const chart = new Chart(lineChartCanvas.value.getContext('2d'), {
    type: 'line',
    data: chartData,
    options: chartOptions,
  });

});
</script>

<style scoped>
/* Estilos opcionales para el contenedor de la gráfica */
div {
  width: 90%;
  height: 75%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 300ms ease;
}
</style>
