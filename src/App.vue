<template>
  <div>
    <div class="home">{{message}}</div>
    <Input v-model="message" placeholder="please input data"/>
  </div>
</template>

<script>
import { Input } from "iview";

export default {
  data() {
    return {
      message: "你好世界！"
    };
  },
  components: [Input]
};
</script>

<style scoped>
.home {
  color: red;
}
</style>
