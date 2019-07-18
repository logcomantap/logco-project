<template>
  <div id="app">
      <div>
<form @submit.prevent="addPost">
      <div class="custom-file">
        <label class="custom-file-label text-truncate" for="inputGroupFile01">{{filename}}</label>
        <input
          type="file"
          class="custom-file-input"
          ref="myFiles"
          id="inputGroupFile01"
          aria-describedby="inputGroupFileAddon01"
          @change="previewFiles"
          multiple
        />
      </div>
        <button type="button" class="btn btn-secondary">Close</button>
        <button type="submit" class="btn btn-success" id="submitEdit">Post</button>
    </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
      return {
          picture : '',
          filename: '',
          error : ''
      }
  },
  methods: {
    previewFiles() {
      this.picture = this.$refs.myFiles.files[0];
      this.filename = this.$refs.myFiles.files[0].name;
    },
    addPost() {
      console.log("add");
      console.log(this.picture);

      let newImage = new FormData();
      newImage.append("image", this.picture);

      console.log(newImage, "==");

      axios({
        method: "POST",
        url: `http://localhost:3000/logos`,
        // headers: {
        //   token: localStorage.getItem("token")
        // },
        data: newImage
      })
        .then(({ data }) => {
        //   Toast.fire({
        //     type: "success",
        //     title: "Image posted successully"
        //   });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          this.error = err.response.data.message;
        });
    }
  }
};
</script>

<style>
</style>
