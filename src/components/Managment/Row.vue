<template>
<div class="app">
  <div class="item item--1">
    <span class="material-symbols-outlined">shopping_cart</span>
    <span class="quantity"> 90+ </span>
    <span class="text text--1"> Icons </span>
  </div>
  <div class="item item--2">
    <span class="material-symbols-outlined">inventory</span>
    <span class="text text--2"> Illustrations </span>
  </div>
  <div class="item item--3">
    <span class="material-symbols-outlined">manage_accounts</span>
    <span class="quantity"> 150+ </span>
    <span class="text text--3"> Components </span>
  </div>
  <div class="item item--4">
    <span class="material-symbols-outlined"></span>
    <span class="quantity"> 30+ </span>
    <span class="text text--4"> Animations </span>
  </div>
</div>
</template>



<style scoped>
.app {
margin-top: 23px;
 width: 80%;
 height: 100%;
 color: white;
 display: grid;
 grid-template-columns: 1fr 1fr;
 grid-template-rows: 1fr 1fr;
 gap: 5px;
 overflow: visible;
}

.app .item {
 border-radius: 10px;
 width: 100%;
 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}

.item:hover {
 transform: scale(0.95);
 transition: all 0.3s;
}

.item svg {
 width: 40px;
 height: 40px;
 margin-bottom: 7px;
}

.item--1 {
 background: #c7c7ff;
}

.item--2 {
 background: #ffd8be;
}

.item--3 {
 background: #a9ecbf;
}

.item--4 {
 background: #f3bbe1;
}

.quantity {
 font-size: 25px;
 font-weight: 600;
}

.text {
 font-size: 12px;
 font-family: inherit;
 font-weight: 600;
}

.text--1 {
 color: rgba(149,149,255,1);
}

.text--2 {
 color: rgba(252,161,71,1);
}

.text--3 {
 color: rgba(66,193,110,1);
}

.text--4 {
 color: rgba(220,91,183,1);
}
</style>