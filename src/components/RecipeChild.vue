<template>
  <div class="w-full bg-white border mt-4 rounded-lg shadow-xl overflow-hidden">
    <a href="#">
      <img
        :src="recipelist.image"
        alt="Recipe Image"
        class="w-full h-48 object-cover rounded-t-lg"
      />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5 class="text-xl font-semibold tracking-tight text-black mt-4">
          {{ editedName || recipelist.name }}
        </h5>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex items-center space-x-1 rtl:space-x-reverse">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-4 h-4"
            :class="{
              'text-yellow-300': star <= recipelist.rating,
              'text-gray-200': star > recipelist.rating,
            }"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
        </div>
        <span
          class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3"
          >{{ recipelist.rating }}</span
        >
      </div>
      <div class="flex justify-between items-center mt-4">
        <i
          @click="toogleFave"
          :class="`${added ? 'fa-solid' : 'fa-regular'} fa-heart`"
        ></i>
      </div>
      <div class="flex justify-between items-center">
        <button @click="showModal" class="button19 border p-4 w-full">
          View Recipe
        </button>
      </div>
    </div>
  </div>

  <teleport to="body">
    <fwb-modal v-if="isShowModal" @close="closeModal">
      <template #header>
        <div>
          <h1 v-if="!editStatus">
            {{ editedName || recipelist.name }}
            <i class="fas fa-edit" @click="editName"></i>
          </h1>
          <div v-else class="flex">
            <input type="text" v-model="changeName" />
            <button @click="saveEdit">Edit Name</button>
          </div>
        </div>
      </template>
      <template #body>
        <div>
          <!-- <label for="recipe-name" class="block text-sm font-medium text-gray-700">Recipe Name</label> -->
        </div>
        <div v-for="(ingredient, index) in recipelist.ingredients" :key="index">
          <button
            class="text-sm font-medium text-gray-900 bg-gray-200 rounded-lg px-3 py-1 my-1"
          >
            {{ ingredient }}
          </button>
        </div>
        <br />
        <div>
          <div
            v-for="(instruction, index) in recipelist.instructions"
            :key="index"
          >
            <button
              class="text-sm font-medium text-gray-900 bg-gray-200 rounded-lg px-3 py-1 my-1"
            >
              ✖️ {{ instruction }}
            </button>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <fwb-button @click="closeModal" color="alternative"> </fwb-button>
          <fwb-button
            class="border p-3 bg-black hover:bg-red-500 text-white font-bold rounded-lg"
            @click="saveChanges"
            color="green"
          >
            Save Changes
          </fwb-button>
        </div>
      </template>
    </fwb-modal>
  </teleport>
</template>

<script setup>
// import ModalPage from './ModalPage.vue'
// defineProps({
//   recipelist:{
//     type:Object
//   }
// })
const props = defineProps(["recipelist", "name"]);
console.log(props.recipelist.name);
const emit = defineEmits(["updateFavourites", "changeName"]);
const added = ref(false);
const editStatus = ref(false);
const changeName = ref(props.recipelist.name);
const editedName = ref("");

const toogleFave = () => {
  added.value = true;
  emit("updateFavourites", added.value);
};
const editName = () => {
  editStatus.value = true;
};

const saveEdit = () => {
  editStatus.value = false;
  editedName.value = changeName.value;
};

import { ref } from "vue";
import { FwbModal } from "flowbite-vue";

const isShowModal = ref(false);

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

function saveChanges() {
  emit("changeName", localName.value);
  recipelist.name = localName.value;
  closeModal();
}
</script>

<style scoped>
.button19 {
  width: 100%;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #0c0c0c;
  transition: 0.5s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}
.button19::after,
.button19::before {
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  transform: skew(90deg) translate(-50%, -50%);
  position: absolute;
  inset: 50%;
  left: 25%;
  z-index: -1;
  transition: 0.5s ease-out;
  background-color: #0c0c0c;
}
.button19::before {
  top: -50%;
  left: -25%;
  transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
}
.button19:hover::before {
  transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
}
.button19:hover::after {
  transform: skew(45deg) translate(-50%, -50%);
}
.button19:hover {
  color: #fff;
}
.button19:active {
  filter: brightness(0.7);
  transform: scale(0.98);
}
</style>
