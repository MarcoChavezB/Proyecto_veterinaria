<template>
      <article>
            <div class="principal-view" id="principal">
                  <div class="intra">
                        <div class="margin">
                              <div class="bg-img"></div>
                              <div class="controllers">
                                    <h1>Discover we products</h1>
                                    <div class="options">
                                          <div class="inputContainer">
                                                <input v-model="nombre" required="required" id="inputField" placeholder="Search products" type="text">
                                                <label class="usernameLabel" for="inputField">For me?</label>
                                                <img class="userIcon" src="../../assets/img/dog.png" alt="">
                                          </div>
                                          <button class="cta">
                                                <span
                                                @click="scrollToSection()">Search products</span>
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
            <section class="bdy" id="section">
              <div v-for="card in productos" :key="card.id">
                <CardProduct :img="card.imagen" :name="card.nom_producto" :price="card.precio_venta"/>       
              </div>
            </section>

      </article>
</template>
  
<script>
import CardProduct from '../../components/servicios/CardProduct.vue';
import axios from 'axios';

export default {
  components:{
    CardProduct,
  },
  data () {
    return {
      nombre: '',
      productos: [],
    }
  },
  methods: {
    scrollToSection() {
      const section = document.getElementById('section');
      section.scrollIntoView({ behavior: 'smooth' });
    },
    reverseScroll() {
      const section = document.getElementById('principal');
      section.scrollIntoView({ behavior: 'smooth' });
    },
    async getProductos() {
      const response = await axios.get('http://18.223.116.149/api/productos/venta')
      this.productos = response.data.productos;
    },
    async getProductoByName(nombre){
      const response = await axios.get('http://18.223.116.149/api/productos/getProductoByName/'+ nombre)
      this.productos = response.data.producto;
    }
  },
  watch: {
    nombre: function (val) {
      this.getProductoByName(val)
    }
  },
  mounted() {
      this.reverseScroll()
      this.getProductos()
  }
}
</script>
  
<style scoped>
.bdy{

      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 2rem;
      padding: 2rem;
}
.principal-view{
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: end;
}

.intra{
      width: 100%;
      height: 95vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: black;
}
.margin{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 1;
      color: white;
}
.options{
      display: flex;
      flex-direction: column;
      gap: 2rem;
}
.bg-img{
      width: 100%;
      height: 100%;
      background-image: url('../../assets/img/bgProducts.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      z-index: -2;
      
      
      opacity: 0.7;
}



/* input */
.inputContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#inputField {
  border: 2px solid white;
  background-color: transparent;
  border-radius: 10px;
  padding: 12px 15px;
  color: black;
  font-weight: 500;
  outline: none;
  caret-color: rgb(155, 78, 255);
  transition-duration: .3s;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
}

input::placeholder{
      color: white;
}

.userIcon {
  position: absolute;
  width: 42px;
  top: -53px;
  left: -15px;
  opacity: 0;
  transition: .2s linear;
  
}

.usernameLabel {
  position: absolute;
  top: -55px;
  left: 40px;
  color: white;
  font-size: 24px;
  font-weight: 400;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  transition: .2s linear;
  opacity: 0;
}

#inputField:focus ~ .usernameLabel,
#inputField:valid ~ .usernameLabel {
  transform: translateX(20px);
  opacity: 1;
}

#inputField:focus ~ .userIcon,
#inputField:valid ~ .userIcon {
  transform: translateX(20px);
  opacity: 1;
}

#inputField:focus,
#inputField:valid {
  
  transition-duration: .3s;
}

.controllers{
      height: 100%;
      gap: 6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
}

.controllers h1{
      font-size: 3rem;
      font-weight: 700;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.cta {
  position: relative;
  margin: auto;
  padding: 12px 18px;
  transition: all 0.2s ease;
  border: none;
  background: none;
  cursor: pointer;
}

.cta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 50px;
  background: #b1dae7;
  width: 45px;
  height: 45px;
  transition: all 0.3s ease;
}

.cta span {
  position: relative;
  font-family: "Ubuntu", sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: white;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.cta svg {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #234567;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.cta:hover:before {
  width: 100%;
  background: #b1dae7;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active {
  transform: scale(0.95);
}

</style>

<!-- 



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// import foote from '@\components\cliente\menuComponents\footer.vue';
const productos =ref([]);
const search = ref([]);
const obtenerproductos = async () => 
{
      productos.value = [];
    try 
    {
        const response = await axios.get('http://18.223.116.149/api/productosPublicos')
         if (Array.isArray(response.data.data)) {
             productos.value = response.data.data;
            //  console.log(response.data.data);
         } 
         else {
             productos.value = [response.data.data];
         }
      productos.value = response.data.data;
    } catch (error) {
      //   console.error(error)
    }
}
onMounted(obtenerproductos);


const productocadena = async () => {
    productos.value = [];
    try {
      const data = {
      cadena: search.value,
    };
        const response = await axios.post('http://18.223.116.149/api/productopublicoporcadena', data)
        if (Array.isArray(response.data.data)) {
            productos.value = response.data.data;
        } else {
            productos.value = [response.data.data];
        }
      //   console.log(productos.value)
    } catch (error) {
      //   console.error(error)
    }
}
</script> -->