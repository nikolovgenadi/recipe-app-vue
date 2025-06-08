<script setup lang="ts">
import { defineProps } from "vue";
import RecipeCard from "../components/RecipeCard.vue";

const props = defineProps<{
  favourites: any[];
  removeFavourite: (recipe: any) => void;
}>();
</script>

<template>
  <section>
    <h1>Favourites</h1>
    <p v-if="props.favourites.length === 0">No favourite recipes yet.</p>
    <div v-else>
      <RecipeCard
        v-for="recipe in props.favourites"
        :key="recipe.idMeal"
        :recipe="recipe"
        :isFavourite="true"
        @remove="props.removeFavourite"
        :isFavouritePage="true"
      />
    </div>
  </section>
</template>