<template>
  <div class="table-container">
    <div class="responsive-table">
      <table class="table table-hover custom-table">
        <thead>
        <tr>
          <th></th>
          <th>Mapa de colores</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div class="status-circle gray">
              <div class="status-description">
                <div class="circle gray small-circle"></div>
              </div>
            </div>
          </td>
          <td><p>Tu cita se genera como pendiente, esto quiere decir que necesita validación de la doctora.</p></td>
        </tr>
        <tr>
          <td>
            <div class="status-circle yellow">
              <div class="status-description">
                <div class="circle yellow small-circle"></div>
              </div>
            </div>
          </td>
          <td><p>Tu cita ha sido aceptada y está en espera de ser atendida.</p></td>
        </tr>
        <tr>
          <td>
            <div class="status-circle red">
              <div class="status-description">
                <div class="circle red small-circle"></div>
              </div>
            </div>
          </td>
          <td><p>Tu cita ha sido rechazada. Para conocer los motivos, contacta a la doctora.</p></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.status-circle {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.status-description {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%; /* Hacer que los círculos sean perfectos */
  margin-right: 10px;
}

.small-circle {
  width: 10px; /* Establecer un tamaño más pequeño para los círculos */
  height: 10px;
}

.gray {
  background-color: gray;
}

.yellow {
  background-color: green;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.custom-table {
  font-size: 0.9rem;
}

.custom-table thead th {
  font-weight: bold;
  background-color: white;
}

.table-container {
  height: 100%;
  width: 100%;
}
</style>
