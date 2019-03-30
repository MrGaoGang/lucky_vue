<template>
  <div class="main">
    <h1>购物车案例</h1>
    <Tabs>
      <TabPane label="商品列表">
        <ProductList/>
      </TabPane>

      <TabPane label="购物车">
        <ShoppingCart/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ProductList from "./ProductList.vue";
import ShoppingCart from "./ShoppingCart.vue";
import { Tabs, TabPane } from "iview";
export default {
  components: { ProductList, ShoppingCart, Tabs, TabPane }
};
</script>


<style scoped>
.main {
  margin: 20px;
}
</style>
