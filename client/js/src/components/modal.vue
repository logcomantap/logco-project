<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item"><h3>{{name}}</h3></li>
      <li class="list-group-item" v-if="desc"><small>{{desc}}</small></li>
            <li class="list-group-item" v-if="!desc"><small>No Description</small></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["mylogo"],
  data() {
    return {
      name: "",
      desc: ""
    };
  },
  created() {
    console.log("masuk modal");
    this.name = this.mylogo.name;
    this.desc = this.mylogo.description;
    console.log(this.mylogo);
  }
};
</script>

<style>
</style>
