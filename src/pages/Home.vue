<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { fetchRecipes } from "../composables/useRecipes";
import RecipeCard from "../components/RecipeCard.vue";

const props = defineProps<{
  addFavourite: (recipe: any) => void;
  removeFavourite: (recipe: any) => void;
  favourites: any[];
}>();

const searchQuery = ref("");
const recipes = ref<any[]>([]);
const loading = ref(false);

const formattedRecipes = computed(() => {
  return recipes.value.map((recipe) => ({
    ...recipe,
    strMeal: recipe.strMeal.trim(),
  }));
});

async function searchRecipes(query?: string) {
  const q = query !== undefined ? query : searchQuery.value;
  if (!q) {
    recipes.value = [];
    return;
  }
  loading.value = true;
  try {
    const result = await fetchRecipes(q);
    recipes.value = result || [];
  } catch (err) {
    console.error("Couldn't fetch recipes:", err);
    recipes.value = [];
  } finally {
    loading.value = false;
  }
}

function handleFavourite(recipe: any) {
  props.addFavourite(recipe);
}

onMounted(() => {
  searchQuery.value = "cake";
  searchRecipes("cake");
});
</script>

<template>
  <section>
    <h1>Recipes</h1>

    <input
      v-model="searchQuery"
      @keyup.enter="searchRecipes(searchQuery)"
      placeholder="Search for a recipe"
    />

    <button @click="searchRecipes(searchQuery)">Search</button>

    <p v-if="loading">Loading...</p>
    <p v-if="!loading && recipes.length === 0">No recipes found.</p>

    <div v-if="!loading && recipes.length > 0">
      <RecipeCard
        v-for="recipe in formattedRecipes"
        :key="recipe.idMeal"
        :recipe="recipe"
        :isFavourite="favourites.some((f) => f.idMeal === recipe.idMeal)"
        @favourite="props.addFavourite"
        @remove="props.removeFavourite"
        :isFavouritePage="false"
      />
    </div>
  </section>
</template>
