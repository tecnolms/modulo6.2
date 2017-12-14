<template>
  <div id="finish">
    <section class="green-image">
      <img :src="require('../course/images/finish.png')" alt="Curso Finalizado">
    </section>
    <section>
      <h1>¡Felicitaciones!</h1>
      <h4>Ha finalizado el módulo</h4>
      <p>Recuerda realizar la evaluación de satisfacción correspondiente.</p>
    </section>
    <section class="green-logo">
      <div>
        <img :src="require('../course/images/logofinal.png')" alt="Curso Finalizado">
      </div>
    </section>
  </div>
</template>
<script>
import pipeworks from "../scorm";

export default {
  created() {
    pipeworks.SCORM.set("cmi.core.lesson_status", "completed");
  }
};
</script>
