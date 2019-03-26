<template>
  <div class="products">
    <Card v-for="product in products" :key="product.id">
      <div class="item-product">
        <div class="left">
          <div class="title">
           <span class="name">{{'商品名称 : '+ product.title }}</span> 
            <Badge :count="product.inventory" class-name="demo-badge-alone"></Badge>
          </div>

          <div>
            <Tag type="dot" closable color="success">单价:{{ product.price | currency }}</Tag>
          </div>
   
        </div>

        <Button
          class="right"
          type="primary"
          :disabled="!product.inventory"
          @click="addProductToCart(product)"
        >添加至购物车</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Button, Tag, Card, Badge } from "iview";
export default {
  components: {
    Button,
    Tag,
    Badge,
    Card
  },
  computed: {
    localComputed() {},
    ...mapState({
      products: state => state.products.all
    })
  },
  methods: {
    ...mapActions("cart", ["addProductToCart"])
  },
  created() {
    this.$store.dispatch("products/getAllProducts");
  }
};
</script>


<style scoped>
.products {
  display: flex;
  flex-direction: column;
}

.products .item-product {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.item-product .left {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-product .right {
  margin-right: 20px;
}

.item-product .title{
  display: flex;
  align-items: flex-end;
}

.item-product .name{
  margin-right: 20px;
}
</style>
