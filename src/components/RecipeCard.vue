<template>
  <article class="card">
    <h2>{{ recipe.strMeal }}</h2>
    <img
      :src="recipe.strMealThumb"
      :alt="recipe.strMeal"
      width="200"
    />
    <p>Category: {{ recipe.strCategory }}</p>

    <template v-if="!isFavouritePage">
      <p v-if="recipe.strArea">Cuisine: {{ recipe.strArea }}</p>
      <p v-if="recipe.strTags">Tags: {{ recipe.strTags }}</p>
    </template>

    <template v-else>
      <p>
        <strong>Instructions:</strong>
        {{ recipe.strInstructions ? recipe.strInstructions : 'No instructions.' }}
      </p>
      <ul>
        <li v-for="(ing, i) in ingredients" :key="i">
          {{ ing }}
        </li>
      </ul>
    </template>

    <button @click="handleClick">
      {{ isFavourite ? 'Remove from favourites' : 'Add to favourites' }}
    </button>
  </article>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea?: string
  strTags?: string
  strInstructions?: string
  [key: string]: any
}

const props = defineProps<{
  recipe: Recipe
  isFavouritePage?: boolean
  isFavourite?: boolean
}>()

const emit = defineEmits<{
  (e: 'favourite', recipe: Recipe): void
  (e: 'remove', recipe: Recipe): void
}>()

function handleClick() {
  if (props.isFavourite) {
    emit('remove', props.recipe)
  } else {
    emit('favourite', props.recipe)
  }
}

const ingredients = computed(() => {
  const list: string[] = []
  for (let i = 1; i <= 20; i++) {
    const ing = props.recipe[`strIngredient${i}`]
    const meas = props.recipe[`strMeasure${i}`]
    if (ing && ing.trim()) {
      list.push(`${meas ? meas : ''} ${ing}`.trim())
    }
  }
  return list
})
</script>