<template>
  <div>
    <input type="checkbox" v-model="checked" @change="updateCheckIn" />
    <label>打卡</label>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import axios from '../utils/axios';

const props = defineProps({
  pageId: String // 确保这个 pageId 从父组件传递过来
});

const checked = ref(false);

const updateCheckIn = async () => {
  const date = new Date().toISOString().split('T')[0];

  try {
    if (checked.value) {
      await axios.post('/checkin', {
        date: date,
        page_id: props.pageId,
        count: 1 // 表示增加打卡
      });
    } else {
      await axios.post('/checkin', {
        date: date,
        page_id: props.pageId,
        count: -1 // 表示取消打卡
      });
    }

    console.log(`Updated check-in for pageId: ${props.pageId} on date: ${date}`);
  } catch (error) {
    console.error('Error updating check-in:', error);
  }
};

onMounted(async () => {
  const date = new Date().toISOString().split('T')[0];

  try {
    const response = await axios.get('/records', { params: { date } });
    const records = response.data;
    checked.value = (records[date] && records[date].includes(props.pageId));
  } catch (error) {
    console.error('Error fetching records:', error);
  }
});
</script>

<style scoped>
/* 你可以在这里添加样式 */
</style>
