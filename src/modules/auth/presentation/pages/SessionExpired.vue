<template>
  <div class="fullscreen bg-app-tertiary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 8vh">
        <span v-text="'¡Ups!'" class="text-app-secondary text-bold" />
        <p style="font-size: 2.5vh">
          Parece que tu sesión ha expirado <br />
          <span style="opacity: .6;">
            Por favor, intenta más tarde.
          </span>

          <br />

          <q-img width="100vw" src="images/horse-racing.svg" />

        </p>
      </div>
    </div>
  </div>
</template>
