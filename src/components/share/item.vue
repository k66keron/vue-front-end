<template>
    <div class="product-block">
        <div class="product-img" @click="onRoute(item.productId)">
            <img :src="item.image"/>
        </div>
        <div class="product-name" @click="onRoute(item.productId)">
            {{ item.productName }}
        </div>
        <div class="product-price discount">
            <span>฿{{ FormatCurrency(125) }}</span>
            <span class="discount">{{ FormatCurrency(150) }}</span>
        </div>
        <div class="product-footer">
            <button class="btn btn-sm btn-success">add</button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ItemComponent',
  props: {
    item: { type: Object, default: () => {} }
  },
  mounted () {
    console.log(this.item)
  },
  methods: {
    onRoute (item) {
      this.$router.push({
        path: '/products/detail',
        query: { item: item }
      })
    }
  }
}
</script>
<style>
    .product-block {
        display: block;
        height: 400px;
        padding: 15px;
        text-align: left;
        /* border: 1px solid #efefef; */
    }
    .product-block .product-img > img {
        width: 100%;
        padding: 15px;
    }
    .product-block .product-name {
        font-size: 11px;
    }
    .product-block .product-price {
        position: absolute;
        bottom: 70px;
    }
    .product-block .product-footer {
        position: absolute;
        bottom: 30px;
    }
    /* .product-block .product-price.discount {
        color: tomato;
    } */
    .product-block .product-price.discount > .discount {
        color: #ccc;
        text-decoration:line-through;
    }
</style>
