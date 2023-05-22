<script setup>
import { useHead } from 'unhead'

useHead({
  title: '404 Error | Shop With Hawa'
})
</script>

<template>
    <section class="grid md:grid-cols-2 items-center gap-4 p-4">
        <div class="space-y-3">
            <h1 class="text-6xl font-extrabold text-indigo-700">404</h1>
            <p class="text-4xl font-bold">Ooops! You aren't supposed to see this.</p>
            <div class="text-md">
                <p>The page you're looking for no longer exists.</p>
                <p>
                    <span>Return to the</span>
                    <RouterLink to="/" class="mx-1 underline">homepage</RouterLink>
                    <span>and remember you haven't seen anything.</span>
                </p>
            </div>
        </div>
        <img src="../assets/images/404.png" alt="404 image" />
    </section>
</template>
