<script setup></script>

<template>
    <div class="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div class="mx-auto h-full sm:max-w-xs">
            <div class="m-auto  py-12">
                <div class="mt-12 rounded-3xl border bg-gray-50 -mx-6 sm:-mx-10 p-8 sm:p-10">
                    <h3 class="text-2xl font-semibold text-gray-700 text-center">Login to your account</h3>

                    <form class="mt-10 space-y-8">
                        <div
                            class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                            <input id="" type="Your password" placeholder="Your answer"
                                class="w-full bg-transparent pb-3  border-b border-gray-300 outline-none  invalid:border-red-400 transition">
                        </div>

                        <div
                            class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                            <input id="" type="Your password" placeholder="Your answer"
                                class="w-full bg-transparent pb-3  border-b border-gray-300 outline-none  invalid:border-red-400 transition">
                        </div>

                        <div>
                            <button
                                class="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                                <span class="text-base font-semibold text-white">Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
