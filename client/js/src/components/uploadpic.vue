<template>
  <div>
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
        <button type="submit" class="btn btn-success" id="submitEdit">Post</button>
      </form>
    </div>
    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      picture: "",
      filename: "",
      error: "",
      isLoading: false
    };
  },
  methods: {
    previewFiles() {
      this.picture = this.$refs.myFiles.files[0];
      this.filename = this.$refs.myFiles.files[0].name;
    },
    addPost() {
      this.isLoading = true;
      console.log("add");
      console.log(this.picture);

      let newImage = new FormData();
      newImage.append("image", this.picture);

      console.log(newImage, "==");

      axios({
        method: "POST",
        url: `http://localhost:3000/logos`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: newImage
      })
        .then(({ data }) => {
          this.isLoading = false;
          Swal.fire("Now you know the answer!", "success");
          this.$emit("add-image", data);
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
