<template>
  <article>
    <div class="img">
      <div class="cont-img">
        <img :src="img" alt="">
      </div>
    </div>
    <div class="text">
      <div class="tx">
        <p>{{ name }} </p>
        <p>${{ price }}</p>
      </div>
    </div>
  </article>
</template>


<script>
export default {
  props: {
    img: String,
    name: String,
    price: Number
  }
}
</script>

<style scoped>



article{
  height: 50vh;
  width: 40vh;
  display: grid;
  border-radius: 20px;
  grid-template-rows: 3fr 1fr;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: 0.3s;
  background-color: white;
}

article:hover{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 20px;
  transform: scale(1.05);
  transition: 0.3s;
}

.img{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cont-img{
  width:99%;
  height: 99%;
  border-radius: 20px 20px 0px 0px
}
.cont-img img{
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px
}

.text{ 
  display: flex;
  justify-content: center;
  align-items: center;
}

.tx{
  width: 90%;
}

.tx p:last-child{
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  color: #FFA500;
  font-weight: bold;
}
</style>