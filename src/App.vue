<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/favourites">Favourites</RouterLink>
    </nav>
  </header>
  <main>
     <RouterView
      :favourites="favourites"
      :addFavourite="addFavourite"
      :removeFavourite="removeFavourite"
    />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const favourites = ref<any[]>([])

function addFavourite(recipe: any) {
  if (!favourites.value.some(r => r.idMeal === recipe.idMeal)) {
    favourites.value.push(recipe)
    console.log(`Added ${recipe.strMeal} to favourites.`)
  }
}

function removeFavourite(recipe: any) {
  favourites.value = favourites.value.filter(r => r.idMeal !== recipe.idMeal)
  console.log(`Removed ${recipe.strMeal} from favourites.`)
  }
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}
nav a {
  margin-right: 1rem;
}
</style>