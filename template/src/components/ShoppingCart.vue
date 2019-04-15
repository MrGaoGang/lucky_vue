<template>
  <div class="cart">
    <h2>你的购物车：</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <div>
      <Card v-for="product in products" :key="product.id">
        <div
          class="item-cart"
        >{{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}</div>
      </Card>
    </div>
    <h2>Total: {{ total | currency }}</h2>
    <p>
      <Button type="warning" :disabled="!products.length" @click="checkout(products)">Checkout</Button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { Card, Button } from "iview";
export default {
  components: {
    Card,
    Button
  },
  computed: {
    ...mapState("cart", {
      checkoutStatus: state => state.checkoutStatus
    }),
    ...mapGetters("cart", {
      products: "cartProducts",
      total: "cartTotalPrice"
    })
  },
  methods: {
    // checkout (products) {
    //   this.$store.dispatch('cart/checkout', products)
    // }
    ...mapActions("cart", ["checkout"])
  }
};
</script>
