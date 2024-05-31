import axios from "axios";
import { defineStore } from "pinia";
const url = "https://dummyjson.com/recipes"


export const useRecipeApp = defineStore('recipeStore', {
    state: ()=>{
        return{
            recipes:[]
        }
    },
    getters: {

    },
    actions:{
            getFoodRecipes(){
                axios.get(url)
                .then((res)=>{
                    this.recipes = res.data.recipes
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
    }
})

