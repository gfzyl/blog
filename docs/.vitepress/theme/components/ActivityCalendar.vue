<template>
  <div>
    <ActivityCalendar
        :data="calendarData"
        :endDate="endDate"
        width="50"
        height="10"
        cellLength="20"
        cellInterval="8"
        cellBorderRadius="5"
        backgroundColor="#ffffff"
        :colors="colors"
        showHeader
        showWeekDayFlag
        :levelMapper="levelMapper"
        showLevelFlag
        levelFlagText="['低', '高']"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../utils/axios';

const endDate = new Date().toISOString().split('T')[0];
const colors = ["#f5f5f5", "#ebfaff", "#e5f9ff", "#c7f1ff", "#86e0fe", "#3ecefe"];

const levelMapper = count => {
  if (count == 0) return 0;
  if (count <= 1) return 1;
  if (count <= 2) return 2;
  if (count <= 3) return 3;
  if (count <= 4) return 4;
  return 5;
};

const calendarData = ref([]);

const fetchRecords = async () => {
  try {
    const response = await axios.get('/records');
    const records = response.data;
    const data = Object.keys(records).map(date => ({
      date,
      count: records[date]
    }));

    calendarData.value = data;
    console.log('Calendar data:', data);
  } catch (error) {
    console.error('Error fetching records:', error);
  }
};

onMounted(fetchRecords);
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
