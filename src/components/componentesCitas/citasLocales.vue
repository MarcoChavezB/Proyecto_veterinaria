<script>
import InputFecha from "@/components/ControlesSencillos/InputFecha.vue";

</script>
<template>
      <div id="dialog-cita" style="border: 1px solid blue; width: 900px;">
                        <div id="title" style="text-align:center;">
                              <h3>AGENDAR UNA NUEVA CITA</h3>
                        </div>
                        <div id="card-body" style="margin: auto; width: 80%;">
                              <form action="">
                                    <div id="form-cita">
                                          <div id="cita-campos">
                                                <!-- <div class="input">
                                                      <span>FECHA-REGISTRO</span>
                                                      <input type="date">
                                                </div> -->
                                                <div class="input">
                                                      <InputFecha placeholder="Fecha cita" v-model="fecha" @click="HistorialMedicoFecha"/>
                                                </div>
                                                <div class="input" style="margin-bottom: 40px;">
                                                      <span>MOTIVO</span>
                                                      <textarea style="resize: none;" name="" id="" cols="30" rows="10"></textarea>
                                                </div>
                                          </div>
                                    </div>
                                    <div id="forms-entities" style="display: flex; justify-content: space-around;">
                                          <div id="form-cliente">
                                                <h4>DATOS DEL CLIENTE</h4>
                                                <div class="input">
                                                      <span>NOMBRE</span>
                                                      <input type="text" v-model="nombre">
                                                </div>
                                                <div class="input">
                                                      <span>APELLIDOS</span>
                                                      <input type="text" v-model="apellidos">
                                                </div>
                                                <div class="input">
                                                      <span>TELÉFONO1</span>
                                                      <input type="text" v-model="telefono1">
                                                </div>
                                                <div class="input">
                                                      <span>TELÉFONO2</span>
                                                      <input type="text" v-model="telefono2">
                                                </div>
                                          </div>
                                          <div id="form-mascota">
                                                <h4>DATOS DE LA MASCOTA</h4>
                                                <div class="input">
                                                      <span>NOMBRE</span>
                                                      <input type="text" v-model="anima.nombre">
                                                </div>
                                                <div class="input">
                                                      <span>ESPECIE</span>
                                                      <input type="text" v-model="animal.especie">
                                                </div>
                                                <div class="input">
                                                      <span>RAZA</span>
                                                      <input type="text" v-model="animal.raza">
                                                </div>
                                                <div class="input">
                                                      <span>GÉNERO</span>
                                                      <input type="text" v-model="animal.genero">
                                                </div>
                                          </div>
                                    </div>
                                    <div style="width: 15%; display: flex; justify-content: flex-start; align-items: flex-end;">
                                          <input type="submit" value="Agendar Citra">
                                    </div>
                              </form>
                        </div>
                  </div>
</template>
<style scoped>

</style>