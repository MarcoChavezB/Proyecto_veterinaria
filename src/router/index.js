const routes = [
      // Vistas predeterminadas
      {
            path: '/',
            name: 'sinlogin',
            component: MenuCLienteSinIniciar,

            children: [
                  {
                        path: '/catalogo',
                        name: 'catalogoSin',
                        component: catalogo
                  },
                  {
                        path: '/',
                        name: 'principalMain',
                        component: principalMain,
                  },
                  {
                        path: '/login',
                        name: 'login',
                        component: login
                  },
                  {
                        path: '/register',
                        name: 'register',
                        component: register
                  },
                  {
                        path: '/ubicacion',
                        name: 'ubicacionSin',
                        component: ubicacion,
                  },
                  {
                        path: '/serviciosSin',
                        name: 'serviciosSin',
                        component: servicios,

                  },
                {
                    path: '/catalogo',
                    name: 'catalogo',
                    component: catalogo
                },
                {
                    path: '/ubicacion',
                    name: 'ubicacion',
                    component: ubicacion,
                }
            ],
      },
      {
            path: '/Home',
            name: 'MenuCliente',
            component: MenuCliente,
            meta: {
              requiresAuth: true
            },
            children: [
                  {
                        path: '/cuerpo',
                        name: 'cuerpo',
                        component: bodyCliente,
                  },
                  {
                        path: '/cita',
                        name: 'cita',
                        component: citas,
                  },
                  {
                        path: '/catalogo',
                        name: 'catalogo',
                        component: catalogo
                  },
                  {
                        path: '/HistorialMedicoC',
                        name: 'HistorialMedicoC',
                        component: HistorialMedicoC
                  },
                  {
                        path: '/citasPendientesC',
                        name: 'citasPendientesC',
                        component: citasPendientesC
                  },
                  {
                        path: '/servicios',
                        name: 'servicios',
                        component: servicios
                  },
                  {
                    path: '/perfil',
                    name: 'perfil',
                    component: gestionusuario
                  }
            ]
      },

      {
            path: '/login',
            name: 'login',
            component: login
      },
      {
            path: '/register',
            name: 'register',
            component: register
      },
      {
            path: '/soporteyayuda',
            name: 'soporteyayuda',
            component: soporteyayuda
      },
      {
            path: '/citas',
            name: 'citas',
            component: citas

      },
      {
            path: '/servicios',
            name: 'servicios',
            component: servicios,
            children:
                  [
                        {
                              path: '/serviciosesteticos',
                              name: 'serviciosesteticos',
                              component: serviciosesteticos
                        },
                        {
                              path: '/serviciosclinicos',
                              name: 'serviciosclinicos',
                              component: serviciosclinicos
                        }
                  ]
      }
      ,
      

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/soporteyayuda',
    name: 'soporteyayuda',
    component: soporteyayuda
  },
  {
    path:'/citas',
    name: 'citas',
    component: citas
    
  },

  { 
    path: '/panelAdmin',
  name: 'panelAdmin',
  component: panelAdmin,
  meta: {
    requiresAuth: true,
    requiredRole: 'Administrador'

  },
    children: [
      {
        path: '/control',
        name: 'control',
        component: control
      },
      {
        path: '/citasTotales',
        name: 'citasTotales',
        component:citasTotales
      },
      {
        path: '/calendario',
        name: 'calendar',
        component: calendar
      },
      {
        path: '/CitasAceptadas',
        name: 'CitasAceptadas',
        component: citasAceptadas
      },
      {
        path: '/compras',
        name: 'compras',
        component: compras
      },
      {
        path: '/productos',
        name: 'productos',
        component: productos,
      },
      {
        path: '/productosInternos',
        name: 'productosInternos',
        component: productosInternos
      },
      {
        path:'/AgregarProducto',
        name: 'AgregarProducto',
        component: AgregarProducto
      },
      {
        path: '/productosPublicos',
        name: 'productosPublicos',
        component: productosPublicos
      },
      {
        path: '/historialMedico',
        name:'reportehistorialmedico',
        component: historialMedico
      },
      {
        path: '/consultasHechas',
        name : 'reportconsultasrealizadas',
        component: consultasHechas
      },
      {
        path: '/consultasRechazadas',
        name: 'reportconsultasrechazadas',
        component: consultasRechazadas
      },
      {
        path: '/ordenesCompra',
        name: 'reportordenescompra',
        component: ordenesCompra
      },
      {
        path: '/reporteVentas',
        name: 'reporteventas',
        component: reporteVentas
      },
      {
        path:'/consultas',
        name: 'consultas',
        component: consultas
      },
      {   
        path: '/GestionProveedores',
        name: 'GestionProveedores',
        component: GestionProveedores
      },
      {
        path: '/GestionUsuarios',
        name: 'GestionUsuarios',
        component: gestionusAdmin
      },
      {
        path: '/AdminServicios',
        name: 'AdminServicios',
        component: Adminservicios
      },
      {
        path: '/ordenes',
        name: 'ordenes',
        component: ordenes
      },
      {
        path: '/add',
        name: 'add',
        component: AgregarProductoExistente
      }

            ]
      },
]








const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import calendar from '../views/Calendar/Calendario.vue'
import principalMain from '../../src/views/Inicio/MainInicio.vue'
import control from '../views/Administracion/MenuManagmentView.vue';
import panelAdmin from '../views/Administracion/PanelAdminView.vue';
import productos from '../views/Productos/TablaProductsPublicsView.vue';
import productosInternos from '../views/Productos/TablaProductsInternosView.vue';
import productosPublicos from '../views/Productos/TablaProductsPublicsView.vue';
import historialMedico from '../views/Reportes/HistorialMedicoView.vue';
import consultasHechas from '../views/Reportes/ConsultasRealizadasView.vue';
import consultasRechazadas from '../views/Reportes/ConsultasRechazadasView.vue';
import ordenesCompra from '../views/Reportes/OrdenesDeCompraView.vue';
import reporteVentas from '../views/Reportes/ReporteVentasView.vue';
import login from '../views/forms/loginView.vue';
import register from '../views/forms/RegisterView.vue';
import soporteyayuda from '../views/soporteyusuarios/soporteyayuda.vue';
import GestionProveedores from '../views/proveedores/GestionProveedoresView.vue';
import citas from '../views/Citas/CitasView.vue';
import compras from '../views/compras/ComprasManagmen.vue';
import gestionusAdmin from '../views/soporteyusuarios/gestionusAdmin.vue';
import gestionusuario from '../views/soporteyusuarios/gestionusuario.vue';
import Adminservicios from '../views/servicios/AdminServicios.vue';
// cliente
import MenuCliente from '../views/cliente/ClienteView.vue'
import MenuCLienteSinIniciar from '../views/cliente/SinIniciar.vue'
import bodyCliente from '../views/cliente/menu/menuclienteview.vue'
import ubicacion from '../views/ubicacion/MapaUbicacion.vue'
import catalogo from '../views/productos/catalogoView.vue'
//import sidebar from '../views/Administracion/PanelAdminView.vue'
import AgregarProducto from '../views/Productos/AgregarProducto.vue';
import AgregarProductoExistente from '../views/productos/AgregarProductoExistente.vue'
import servicios from '../views/servicios/servicios.vue'


import consultas from '../views/Consultas/ConsultasView.vue';
import ordenes from '../views/Ordenes_de_Compra/OrdenesCompraView.vue'
import HistorialMedicoC from '../views/HistorialMedico/HistorialMedicoViewCliente.vue'
import citasPendientesC from '../views/CitasPendientesCliente/CitasPendientesClienteView.vue';

import serviciosesteticos from '../views/Servicios/serviciosesteticos.vue'
import serviciosclinicos from '../views/Servicios/serviciosclinicos.vue'
import citasTotales from '../views/citas/citasTotales.vue'
import citasAceptadas from '../views/citas/citasAceptadas.vue'


// // to = a donde
// // from = de donde
// // next = lugar destino


// // Navigation guard to check if the user is already authenticated (has a token)
// router.beforeEach((to, from, next) => {
//   // mandar el token si ya esta authenticado y si es asi no se habre el login
//   // se va a dashboard
//   const authToken = useUsuarioStore().usuario._token;

//   // If the user is already authenticated and tries to access the login page,
//   // redirect them to another page (e.g., dashboard)
//   if (to.name === 'login' && authToken) {
//       next('/dashboard');
//   } else {

//       next();
//   }
// });

// // Add navigation guard to check for authentication token
// router.beforeEach((to, from, next) => {
//   // Check if the route requires authentication
//   if (to.matched.some((route) => route.meta.requiresAuth)) {
//       // Get the token from the Pinia store
//       const authToken = useUsuarioStore().usuario._token;

//       // If the user is authenticated (has a token), allow access to the route
//       if (authToken) {
//           next();
//       } else {
//           // If the user is not authenticated, redirect to the login page
//           next('/login');
//       }
//   } else {
//       // For public routes, allow access without authentication
//       next();
//   }
// });




// // login
// function login() {
//   if (!valid.value) {
//       return
//   }
//   overlay.value = true
//   fetch('http://web.local/usuario/auth', {
//       method: 'POST',
//       body: JSON.stringify(usuario.value),
//   }).then(response => response.json())
//       .then(data => {
//           if (data.status != 200) {
//               alert(data.message)
//               overlay.value = false
//               return
//           }
//           // mandarlo al store de pinia
//           usuarioStore.setUser(data.data)
//           router.push({name: 'dashboard'})
//           overlay.value = false

//       });
// }


import {useUsuarioStore} from "@/stores/UsuariosStore";

// Navigation guard to check if the user is already authenticated (has a token)
router.beforeEach((to, from, next) => {
  const authToken = useUsuarioStore().usuario._token;

  // If the user is already authenticated and tries to access the login page,
  // redirect them to another page (e.g., dashboard)
  if (to.name === 'login' && authToken) {
    next('/cuerpo');
  } else {
    next();
  }
});

// Add navigation guard to check for authentication token
router.beforeEach((to, from, next) => {
  const userStore = useUsuarioStore();
  const authToken = userStore.usuario._token;
  const userType = useUsuarioStore().usuario.usuario.tipo_usuario;

  if (to.name === 'login' && authToken) {
    next('/cuerpo');
  }
  else if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!authToken) {
      next('/login');
    }
    else if (userType === 'Administrador' && to.name === 'perfil') {
      console.log('Redireccionando a Control porque es un Administrador.');
      next('/control');
    } 
    else if (to.matched.some(route => route.meta.requiredRole && route.meta.requiredRole !== userType)) {
      next('/login'); 
    } 
    else {
      next();
    }
  } 
  else {
    next();
  }
});

