
<template>
  <div class="cont-fluid">
      <header>
          <headerClient />
      </header>
      <div id="top">

          <main>
              <article>
                  <!--Principal-->
                  <section class="section hero has-bg-image" id="home" aria-label="home">
                      <div class="cont">
                          <h1 class="h1 hero-title">
                              <span class="span">Gran calidad de</span> Productos
                          </h1>
                          <p class="hero-text">Sale up to 40% off today</p>
                          <a href="#" class="btn">Nuestros productos</a>
                      </div>
                  </section>
                  <!--Principal-->


                  <!--Categorias-->
                  <section class="section category" aria-label="category">
                      <div class="cont">
                          <h2 class="h2 section-title">
                              <span class="span">Mejores</span> categorías
                          </h2>
                          <ul class="has-scrollbar">
                              <li class="scrollbar-item">
                                  <div class="category-card">
                                      <figure class="card-banner img-holder" style="--width: 330; --height: 300;">
                                          <img src="../../assets/img/imgClient/category-1.jpg" width="330" height="300"
                                              loading="lazy" alt="Cat Food" class="img-cover">
                                      </figure>
                                      <h3 class="h3">
                                        <router-link :to="{name: 'catalogo'}">
                                          <a class="card-title">Cat Food</a>
                                        </router-link>
                                      </h3>
                                  </div>
                              </li>
                              <li class="scrollbar-item">
                                  <div class="category-card">
                                      <figure class="card-banner img-holder" style="--width: 330; --height: 300;">
                                          <img src="../../assets/img/imgClient/category-2.jpg" width="330" height="300"
                                              loading="lazy" alt="Cat Toys" class="img-cover">
                                      </figure>
                                      <h3 class="h3">
                                        <router-link :to="{name: 'catalogo'}">
                                          <a class="card-title">Cat Toys</a>
                                        </router-link>
                                      </h3>
                                  </div>
                              </li>
                              <li class="scrollbar-item">
                                  <div class="category-card">
                                      <figure class="card-banner img-holder" style="--width: 330; --height: 300;">
                                          <img src="../../assets/img/imgClient/category-3.jpg" width="330" height="300"
                                              loading="lazy" alt="Dog Food" class="img-cover">
                                      </figure>
                                      <h3 class="h3">
                                        <router-link :to="{name: 'catalogo'}">
                                          <a class="card-title">Dog Food</a>
                                        </router-link>
                                      </h3>
                                  </div>
                              </li>
                              <li class="scrollbar-item">
                                  <div class="category-card">
                                      <figure class="card-banner img-holder" style="--width: 330; --height: 300;">
                                          <img src="../../assets/img/imgClient/category-4.jpg" width="330" height="300"
                                              loading="lazy" alt="Dog Toys" class="img-cover">
                                      </figure>
                                      <h3 class="h3">
                                        <router-link :to="{name: 'catalogo'}">
                                          <a class="card-title">Dog Toys</a>
                                        </router-link>
                                      </h3>
                                  </div>
                              </li>
                              <li class="scrollbar-item">
                                  <div class="category-card">
                                      <figure class="card-banner img-holder" style="--width: 330; --height: 300;">
                                          <img src="../../assets/img/imgClient/category-5.jpg" width="330" height="300"
                                              loading="lazy" alt="Dog Sumpplements" class="img-cover">
                                      </figure>
                                      <h3 class="h3">
                                        <router-link :to="{name: 'catalogo'}">
                                          <a class="card-title">Dog Supplements</a>
                                        </router-link>
                                      </h3>
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </section>
                  <!--Categorias-->

                  <!--Ofertas-->
                  <section class="section offer" aria-label="offer">
                      <div class="cont">
                          <ul class="grid-list">
                              <li>
                                  <div class="offer-card has-bg-image img-holder" style="--width: 540; --height: 374;">
                                      <p class="card-subtitle">Mira tus citas!</p>
                                      <h3 class="h3 card-title">
                                          Seguimiento <span class="span">Personalizado</span>
                                      </h3>
                                    <router-link :to="{name: 'cita'}">
                                      <a href="#" class="btn">Mostrar más</a>
                                    </router-link>
                                  </div>
                              </li>
                              <li>
                                  <div class="offer-card has-bg-image img-holder" style=" --width: 540; --height: 374;">
                                      <p class="card-subtitle">Está con nosotros</p>
                                      <h3 class="h3 card-title">
                                        Realizar una <span class="span">cita</span>
                                      </h3>
                                    <router-link :to="{name: 'cita'}">
                                      <a href="#" class="btn">Realizar</a>
                                    </router-link>
                                  </div>
                              </li>
                              <li>
                                  <div class="offer-card has-bg-image img-holder" style="--width: 540; --height: 374;">
                                      <p class="card-subtitle">Muy rápido</p>
                                      <h3 class="h3 card-title">
                                          Más de lo que <span class="span">imaginas</span>
                                      </h3>

                                  </div>
                              </li>
                          </ul>
                      </div>
                  </section>

                  <!--Ofertas-->

                  <!--Productos-->




                  <!--Informacion-->
                  <section class="section service" aria-label="service">
                      <img src="../../assets/img/imgClient/service-image.png" width="122" height="136" loading="lazy"
                          alt="" class="img">
                      <h2 class="h2 section-title">
                          <span class="span">Todo lo que tu amigo necesita,</span> encuéntralo aquí !
                      </h2>
                      <!--Informacion-->



                      <!--Service-->
                      <ul class="grid-list d-flex justify-content-center align-items-center">
                          <li>
                              <div class="service-card">
                                  <figure class="card-icon">
                                      <img src="../../assets/img/imgClient/service-icon-1.png" width="70" height="70"
                                          loading="lazy" alt="service icon">
                                  </figure>
                                  <h3 class="h3 card-title">Encuéntranos cuando quieras </h3>
                                  <p class="card-text">
                                      Estamos disponibles 10 horas al día
                                  </p>
                              </div>
                          </li>
                      </ul>
                  </section>
                  <!--Service-->

                  <!--Gato-->
                  <section class="cta has-bg-image taste" aria-label="cta">
                      <div class="cont">
                          <figure class="cta-banner">
                              <img src="../../assets/img/imgClient/cta-banner.png" width="900" height="660"
                                  loading="lazy" alt="cat" class="w-100">
                          </figure>
                          <div class="cta-content">
                              <img src="../../assets/img/imgClient/cta-icon.png" width="120" height="35" loading="lazy"
                                  alt="taste guarantee" class="img">
                              <h2 class="h2 section-title">¡Nuestros productos le encantarán!</h2>
                              <p class="section-text">
                                  En veterinariaCachorros, creemos que a tu perro y a tu gato les gustará tanto su comida que si no ...
                                  te ayudaremos 
                                  a encontrar
                                  sustituto. Esa es nuestra garantía de sabor.
                              </p>
                            <router-link :to="{name: 'catalogo'}">
                              <a class="btn">Mostrar</a>
                            </router-link>
                          </div>
                      </div>
                  </section>
                  <!--Gato-->

                  <section class="section brand" aria-label="brand">
                      <div class="cont">

                          <h2 class="h2 section-title">
                              <span class="span">Marcas</span> Populares
                          </h2>

                          <ul class="has-scrollbar">

                              <li class="scrollbar-item">
                                  <div class="brand-card img-holder" style="--width: 150;">
                                      <img src="../../assets/img/marcas/marca1.png" width="150" height="150"
                                          loading="lazy" alt="brand logo" class="img-cover">
                                  </div>
                              </li>

                              <li class="scrollbar-item">
                                  <div class="brand-card img-holder" style="--width: 150;">
                                      <img src="../../assets/img/marcas/marca2.png" width="150" height="150"
                                          loading="lazy" alt="brand logo" class="img-cover">
                                  </div>
                              </li>

                              <li class="scrollbar-item">
                                  <div class="brand-card img-holder" style="--width: 150; ">
                                      <img src="../../assets/img/marcas/marca4.png" width="150" height="150"
                                          loading="lazy" alt="brand logo" class="img-cover">
                                  </div>
                              </li>

                              <li class="scrollbar-item">
                                  <div class="brand-card img-holder" style="--width: 150; ">
                                      <img src="../../assets/img/marcas/marca5.png" width="150" height="150"
                                          loading="lazy" alt="brand logo" class="img-cover">
                                  </div>
                              </li>

                              <li class="scrollbar-item">
                                  <div class="brand-card img-holder" style="--width: 150;">
                                      <img src="../../assets/img/marcas/marca6.png" width="150" height="150"
                                          loading="lazy" alt="brand logo" class="img-cover">
                                  </div>
                              </li>
                          </ul>
                      </div>
                  <div class="ubicacion">
                    <div class="title">
                      <h2 class="h2 section-title">
                        <span class="material-symbols-outlined icon-map">map</span>
                              <span class="span">Descubre</span> nuestra ubicacion!
                        </h2>
                        <div class="mapa-container d-flex justify-content-center w-90">
                          <div class="mapa" @click="goToMaps"></div>
                        </div>
                    </div>
                  </div>
                  </section>
              </article>
          </main>
      </div>
      <!--fin del contenedor-->
      <footer>
          <footerClient/>
      </footer>
  </div>
</template>

<script setup>
// import headerClient from '../../components/cliente/menuCOmponents/headerSinLogin.vue'
import footerClient from '../../components/cliente/menuComponents/footer.vue';
const goToMaps = () => {
    window.open("https://www.google.com/maps/place/Clinica+veterinaria+cachorros/@25.5260108,-103.2249768,16.74z/data=!4m6!3m5!1s0x868fc1bf8b8f70e5:0x30f7ddd0cd2cd4a!8m2!3d25.5259657!4d-103.2227034!16s%2Fg%2F11fr37vvbn?hl=en-MX&entry=ttu", "_blank")
  }
</script>



<style scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cont-fluid {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 2.2fr;
  grid-template-rows: 0.3fr 1.7fr;
  gap: 0px 0px;
  grid-template-areas:
      "."
      ".";
  height: 100vh;
}


.mapa{  
  height: 30em;
  width: 100%;
  background-image: url('../../assets/img/ubicacion3.png');
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}

/*-----------------------------------*\
#RESET
\*-----------------------------------*/

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}
.icon-map{
  margin-top: 2em;
  color: coral;
  font-size: 4rem;
}

a,
img,
span,
button,
ion-icon {
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  height: auto;
}

button {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

ion-icon {
  pointer-events: none;
}

address {
  font-style: normal;
}

html {
  font-family: var(--ff-nunito_sans);
  font-size: 10px;
  scroll-behavior: smooth;
}

body {
  background-color: var(--white);
  color: var(--black);
  font-size: 1.6rem;
  line-height: 1.5;
}

:focus-visible {
  outline-offset: 4px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: hsl(0, 0%, 98%);
}

::-webkit-scrollbar-thumb {
  background-color: hsl(0, 0%, 80%);
}

::-webkit-scrollbar-thumb:hover {
  background-color: hsl(0, 0%, 70%);
}


section.brand .img-cover {   
width: 170px;
}



.cont {
  padding-inline: 15px;
}

.section {
  padding-block: var(--section-padding);
}

.has-bg-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.h1,
.h2,
.h3 {
  line-height: 1.1;
}

.h1 {
  color: var(--white);
  font-family: var(--ff-bangers);
  font-size: var(--fs-1);
  font-weight: var(--fw-400);
  letter-spacing: 1px;
}

.h2,
.h3 {
  color: var(--eerie-black);
}

.h2 {
  font-size: var(--fs-2);
}

.h3 {
  font-size: var(--fs-3);
}

.btn {
  background-color: var(--black);
  color: var(--white);
  max-width: max-content;
  padding: 8px 25px;
  font-weight: var(--fw-700);
  border-radius: 50px;
  transition: var(--transition-1);
}

.section-title {
  text-align: center;
  margin-block-end: 30px;
}

.section-title .span {
  display: inline;
  color: var(--portland-orange);
}

.img-holder {
  aspect-ratio: var(--width) / var(--height);
  overflow: hidden;
}


.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.has-scrollbar {
  display: flex;
  align-items: center;
  gap: 30px;
  overflow-x: auto;
  scroll-snap-type: inline mandatory;
  padding-block-end: 20px;
  margin-block-end: -20px;
}

.scrollbar-item {
  min-width: 100%;
  scroll-snap-align: start;
}

.has-scrollbar::-webkit-scrollbar {
  height: 10px;
}

.has-scrollbar::-webkit-scrollbar-track {
  outline: 2px solid var(--portland-orange);
  border-radius: var(--radius-10);
}

.has-scrollbar::-webkit-scrollbar-thumb {
  border-radius: var(--radius-10);
  background-color: var(--portland-orange);
  border: 2px solid var(--white);
}

.has-scrollbar::-webkit-scrollbar-button {
  width: calc(25% - 30px);
}

.grid-list {
  display: grid;
  gap: 30px;
}

.w-100 {
  width: 100%;
}





/*-----------------------------------*\
#HEADER
\*-----------------------------------*/

.action-btn.user {
  display: none;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--white);
  padding-block: 20px;
  z-index: 4;
}

.header.active {
  position: fixed;
  box-shadow: var(--shadow-1);
}

.header .cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.nav-toggle-btn {
  font-size: 30px;
  transition: var(--transition-1);
}

.nav-toggle-btn.active .menu-icon,
.nav-toggle-btn .close-icon {
  display: none;
}

.nav-toggle-btn .menu-icon,
.nav-toggle-btn.active .close-icon {
  display: block;
}

.logo {
  font-family: var(--ff-carter_one);
  font-size: 3rem;
}

.header-actions {
  display: flex;
  gap: 15px;
}

.header .action-btn {
  position: relative;
  font-size: 22px;
  transition: var(--transition-1);
}

.header .btn-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--portland-orange);
  color: var(--white);
  font-size: var(--fs-8);
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50px;
}

.nav-toggle-btn:is(:hover, :focus),
.header .action-btn:is(:hover, :focus) {
  transform: scale(1.1);
}

.navbar {
  position: fixed;
  top: 85px;
  left: -320px;
  bottom: 0;
  background-color: var(--white);
  max-width: 320px;
  width: 100%;
  padding: 20px 10px;
  box-shadow: var(--shadow-2);
  transition: 0.25s var(--cubic-out);
  overflow-x: hidden;
  overflow-y: auto;
}

.navbar.active {
  transform: translateX(320px);
  transition-timing-function: var(--cubic-in);
}

.navbar-link {
  color: var(--eerie-black);
  font-size: var(--fs-6);
  padding: 10px 15px;
}

.navbar-action-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background-color: var(--sonic-silver);
  color: var(--white);
  font-weight: var(--fw-700);
  text-transform: uppercase;
  text-align: center;
}





/*-----------------------------------*\
#HERO
\*-----------------------------------*/

.hero {
  margin-block-start: 85px;
  min-height: 360px;
  background-position: left;
  text-align: center;
}

.hero-title .span {
  font-size: 0.5em;
}

.hero-text {
  color: var(--white);
  margin-block: 15px 25px;
}

.hero .btn {
  margin-inline: auto;
}

.hero .btn:is(:hover, :focus) {
  background-color: var(--portland-orange);
}





/*-----------------------------------*\
#CATEGORY
\*-----------------------------------*/

.category-card .card-banner {
  border-radius: var(--radius-10);
}

.category-card .img-cover {
  transition: var(--transition-2);
}

.category-card:is(:hover, :focus-within) .img-cover {
  transform: scale(1.08);
}

.category-card .card-title {
  margin-block-start: 15px;
  text-align: center;
  transition: var(--transition-1);
}

.category-card .card-title:is(:hover, :focus) {
  color: var(--portland-orange);
}





/*-----------------------------------*\
#OFFERS
\*-----------------------------------*/

.offer-card {
  border-radius: var(--radius-10);
  padding: 20px;
  display: grid;
  align-content: center;
}

.offer-card .card-subtitle {
  font-size: var(--fs-7);
  text-transform: uppercase;
  font-weight: var(--fw-700);
}

.offer-card .card-title {
  color: var(--black);
  margin-block: 5px 24px;
}

.offer-card .btn {
  background-color: var(--portland-orange);
}

.offer-card .btn:is(:hover, :focus) {
  background-color: var(--black);
}





/*-----------------------------------*\
#PRODUCT
\*-----------------------------------*/

.product .img-cover.hover,
.product-card .card-action-btn {
  display: none;
}

.product-card {
  text-align: center;
}

.product-card .card-banner {
  border: 1px solid var(--platinum);
  border-radius: var(--radius-10);
  margin-block-end: 20px;
}

.product-card :is(.wrapper, .rating-wrapper) {
  display: flex;
}

.product-card .wrapper {
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: var(--silver-chalice);
  font-size: var(--fs-7);
}

.product-card .rating-wrapper {
  color: var(--amber);
  gap: 2px;
}

.product-card .rating-wrapper.gray {
  color: unset;
}

.product-card .h3 {
  --fs-3: 1.8rem;
  margin-block: 8px 10px;
}

.product-card .card-title {
  transition: var(--transition-1);
}

.product-card .card-title:is(:hover, :focus) {
  color: var(--portland-orange);
}

.product-card .card-price {
  color: var(--portland-orange);
  font-size: var(--fs-4);
  font-weight: var(--fw-700);
}





/*-----------------------------------*\
#SERVICE
\*-----------------------------------*/

.service .img {
  margin-inline: auto;
  margin-block-end: 30px;
}

.service .section-title {
  margin-block-end: 60px;
}

.service-card {
  text-align: center;
}

.service-card .card-icon {
  max-width: max-content;
  margin-inline: auto;
}

.service-card .card-title {
  margin-block: 10px;
}

.service-card .card-text {
  color: var(--spanish-gray);
}





/*-----------------------------------*\
#CTA
\*-----------------------------------*/

.cta {
  background-position: 75%;
}

.cta-banner {
  display: none;
}

.cta-content {
  padding-block: 80px var(--section-padding);
}

.cta .section-title {
  text-align: left;
  margin-block: 10px 20px;
}

.cta .section-text {
  margin-block-end: 30px;
}

.cta .btn:is(:hover, :focus) {
  background-color: var(--white);
  color: var(--black);
}





/*-----------------------------------*\
#BRAND
\*-----------------------------------*/

.brand {
  --section-padding: 100px;
}

.brand .has-scrollbar {
  gap: 0;
}

.brand .scrollbar-item {
  min-width: 50%;
}

.brand .scrollbar-item:not(:last-child) {
  border-inline-end: 1px solid var(--platinum);
}

.brand-card {
  max-width: max-content;
  margin-inline: auto;
}






/*-----------------------------------*\
#MEDIA QUERIES
\*-----------------------------------*/

/**
* responsive for large than 575px screen
*/

@media (min-width: 575px) {

  /**
* CUSTOM PROPERTY
*/

  :root {

      /**
 * typography
 */

      --fs-2: 4rem;
      --fs-3: 2.6rem;

  }



  /**
* REUSED STYLE
*/

  .scrollbar-item {
      min-width: calc(50% - 15px);
  }

  .grid-list {
      grid-template-columns: 1fr 1fr;
  }



  /**
* HERO
*/

  .hero {
      display: grid;
      padding-inline-start: 20px;
      justify-content: flex-start;
      align-items: center;
  }



  /**
* OFFER
*/

  .offer .grid-list {
      grid-template-columns: 1fr;
  }



  /**
* PRODUCT
*/

  .product-card .card-banner {
      position: relative;
  }

  .product-card .card-action-btn,
  .product-card .card-banner .hover {
      display: block;
      position: absolute;
  }

  .product-card .card-banner .hover {
      top: 0;
      left: 0;
  }

  .product-card:is(:hover, :focus-within) .default,
  .product-card .hover {
      opacity: 0;
  }

  .product-card .default,
  .product-card:is(:hover, :focus-within) .hover {
      opacity: 1;
  }

  .product-card .card-action-btn {
      top: 15px;
      right: 15px;
      color: var(--eerie-black);
      font-size: 20px;
      background-color: var(--white);
      border: 1px solid var(--platinum);
      padding: 12px;
      border-radius: 50%;
      transition: var(--transition-1);
      opacity: 0;
  }

  .product-card .card-action-btn:is(:hover, :focus) {
      background-color: var(--portland-orange);
      border-color: var(--portland-orange);
      color: var(--white);
  }

  .product-card:is(:hover, :focus-within) .card-action-btn {
      opacity: 1;
  }



  /**
* CTA
*/

  .cta .img {
      width: 250px;
  }

  .cta .h2 {
      --fs-2: 3.2rem;
  }



  /**
* BRAND
*/

  .brand .scrollbar-item {
      min-width: 25%;
  }


}





/**
* responsive for large than 768px screen
*/

@media (min-width: 768px) {

  /**
* CUSTOM PROPERTY
*/

  :root {

      /**
 * typography
 */

      --fs-1: 9rem;

  }



  /**
* REUSED STYLE
*/

  .scrollbar-item {
      min-width: calc(33.33% - 20px);
  }

  .grid-list {
      grid-template-columns: repeat(3, 1fr);
  }



  /**
* HERO
*/

  .hero {
      aspect-ratio: 1512 / 784;
      padding-inline-start: 10%;
  }

  .hero-text {
      font-size: 2.4rem;
  }



  /**
* OFFER
*/

  .offer .grid-list {
      grid-template-columns: repeat(3, 1fr);
  }



  /**
* CTA
*/

  .cta-banner {
      display: block;
  }

  .cta .cont {
      display: grid;
      grid-template-columns: 1fr 0.75fr;
      align-items: flex-end;
  }


}





/**
* responsive for large than 992px screen
*/

@media (min-width: 992px) {

  /**
* CUSTOM PROPERTY
*/

  :root {

      /**
 * typography
 */

      --fs-1: 12rem;
      --fs-3: 3rem;

      /**
 * spacing
 */

      --section-padding: 50px;

  }



  /**
* REUSED STYLE
*/

  .cont {
      padding-inline: 30px;
  }

  .scrollbar-item {
      min-width: calc(20% - 24px);
  }



  /**
* HEADER
*/

  .nav-toggle-btn,
  .navbar-action-btn {
      display: none;
  }

  .header {
      --color: var(--white);
      background: none;
  }

  .header.active {
      --color: var(--black);
      background-color: var(--white);
  }

  .header .logo,
  .header .action-btn {
      color: var(--color);
  }

  .header .action-btn.user {
      display: block;
  }

  .logo {
      font-size: 3.8rem;
  }

  .navbar,
  .navbar.active {
      all: unset;
      margin-inline-end: auto;
  }

  .navbar-list {
      display: flex;
      gap: 10px;
  }

  .navbar-link {
      color: var(--color);
      --fs-6: 1.7rem;
      font-weight: var(--fw-700);
      transition: var(--transition-1);
  }

  .header.active .navbar-link:is(:hover, :focus) {
      color: var(--portland-orange);
  }



  /**
* HERO
*/

  .hero {
      margin-block-start: 0;
  }



  /**
* CATEGORY
*/

  .category-card .h3 {
      --fs-3: 2rem;
  }



  /**
* SERVICE
*/

  .service .grid-list {
      grid-template-columns: repeat(4, 1fr);
  }

  .service-card .h3 {
      --fs-3: 2.4rem;
  }



  /**
* BRAND
*/

  .brand .scrollbar-item {
      min-width: 20%;
  }

}





@media (min-width: 1200px) {

  /**
* CUSTOM PROPERTY
*/

  :root {

      /**
 * typography
 */

      --fs-1: 15rem;
      --fs-3: 3.2rem;

  }



  /**
* REUSED STYLE
*/

  .grid-list {
      grid-template-columns: repeat(4, 1fr);
  }



  /**
* CTA
*/

  .cta-content {
      padding-block: 100px;
  }



  /**
* BRAND, 
*/

  :is(.brand) .cont {
      max-width: 1200px;
      width: 100%;
      margin-inline: auto;
  }

}

#home {
  background-image: url('../../assets/img/imgClient/hero-banner.jpg')
}

li:first-child .offer-card {
  background-image: url('../../assets/img/imgClient/offer-banner-1.jpg');
}

li:nth-child(2) .offer-card {
  background-image: url('../../assets/img/imgClient/offer-banner-2.jpg');
}

li:nth-child(3) .offer-card {
  background-image: url('../../assets/img/imgClient/offer-banner-3.jpg');
}

.taste {
  background-image: url('../../assets/img/imgClient/cta-bg.jpg')
}
</style>

