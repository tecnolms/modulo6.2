<template>
  <div id="matching" class="component">
    <div class="title">
      <div class="container">
        <h1 class="eco b">{{ title }}<span v-if="content.audio">
            <v-audio :audio="content.audio.src"></v-audio>
          </span>
 </h1>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <p v-if="text" class="tex" v-html="text" >
        </p>
        <p v-if="content.instruction" class="instruction" v-html="content.instruction"></p>
        <canvas id="canvasLineas"></canvas>
        <div id="activity-container">
          <div v-for="line in lines" :key="line.id" class="line-items">
            <div class="item item-a" @click="match($event)" :id="line[0].id" :data-pair="line[0].pair">
              {{line[0].text}}
            </div>
            <div class="item item-b" @click="match($event)" :id="line[1].id" :data-pair="line[1].pair">
              {{line[1].text}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Audio from './subcomponents/Audio.vue';
export default {
  props: ["content"],
  data() {
    return {
      selected: 0,
      selectedId: 0,
      clicked: 0,
      matched: false,
      totalMatched: 0
    };
  },
  computed: {
    title() {
      return this.content.title;
    },
    text() {
      return this.content.text;
    },
    lines() {
      let items = this.content.items;
      let lines = [];
      let half = Math.round(items.length / 2);
      for (let item = 0; item < items.length / 2; item++) {
        const element = items[item];
        let line = [];
        line.push(element);
        line.push(items[item + half]);
        lines.push(line);
      }
      return lines;
    }
  },
  methods: {
    match(event) {
      let ele = event.target;
      if (
        this.selected == ele.getAttribute("data-pair") ||
        this.selected == ele.getAttribute("id")
      ) {
        document.getElementById(this.selected).classList.add("matched");
        document
          .getElementById(ele.getAttribute("data-pair"))
          .classList.add("matched");
        document
          .getElementById(ele.getAttribute("data-pair"))
          .classList.remove("selected");
        this.clicked = 0;
        this.selected = 0;
        this.selectedId = 0;
        this.totalMatched++;
        if (this.totalMatched == this.content.items.length / 2) {
          this.$Modal.success({
            title: "¡Bien Hecho!",
            content: "Has marcado todas las respuestas correctamente"
          });
        } else {
          this.$Modal.success({
            title: "¡Bien hecho!",
            content: "Has emparejado correctamente las opciones"
          });
        }

        drawLine(getPositions(ele).posA, getPositions(ele).posB);
      } else if (this.clicked > 0) {
        ele.classList.add("selected");
        setTimeout(() => {
          ele.classList.remove("selected");
          document.getElementById(this.selectedId).classList.remove("selected");
          this.selectedId = 0;
          this.selected = 0;
        }, 1500);
        this.clicked = 0;
        this.$Modal.error("Vuelve a intentarlo");
      } else {
        this.selected = ele.getAttribute("data-pair");
        this.selectedId = ele.getAttribute("id");
        this.clicked = 1;
        ele.classList.add("selected");
      }
    }
  },
  components: {
      
      'v-audio': Audio
    },
  mounted() {
    var items = this.content.items;
    let container = $("activity-container");
    let canvas = $("canvasLineas");

    // Dibujo el canvas acorde al tamaño del contenedor principal
    canvas.width = container.getBoundingClientRect().width;
    canvas.height = container.getBoundingClientRect().height;

    // Posicione el contenedor encima del Canvas
    container.style.position = "relative";
    container.style.marginTop =
      "-" + canvas.getBoundingClientRect().height.toString() + "px";
    container.style.zIndex = "100";
  }
};

function drawLine(posA, posB) {
  let canvas = $("canvasLineas");
  let ctx = canvas.getContext("2d");

  //Draw the path
  ctx.beginPath();
  ctx.strokeStyle = "#00665b";
  ctx.lineWidth = 3;
  ctx.moveTo(posA.x, posA.y);
  ctx.lineTo(posB.x, posB.y);
  ctx.stroke();
}

function getPositions(b) {
  // Get the A element
  let a = $(b.dataset.pair);

  // Get the boundings of elements
  let coordA = a.getBoundingClientRect();
  let coordB = b.getBoundingClientRect();
  let cCanvas = $("canvasLineas").getBoundingClientRect();

  // Get the coordinates exact
  let posA = {
    x: cCanvas.width - (coordA.right + coordA.x + 35),
    y: coordA.top - cCanvas.top + coordA.height / 2
  };

  let posB = {
    x: cCanvas.width - coordB.left + cCanvas.left + coordB.width * 0.5,
    y: coordB.top - cCanvas.top + coordB.height / 2
  };

  return {
    posA,
    posB
  };
}

function $(id) {
  return document.getElementById(id);
}
</script>

