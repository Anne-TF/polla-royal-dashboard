<template>
  <q-layout view="hHh lpR lFf">
    <q-drawer
      show-if-above
      v-model="drawer"
      :width="280"
      :mini="false"
      :breakpoint="500"
      class="bg-app-primary"
    >
      <q-scroll-area class="fit">
        <div @click="$router.push('/dashboard')" class="wp-100 flex column items-center">
          <q-icon
            size="8em"
            class="cursor-pointer"
            name="img:/images/horse.svg" />
        </div>
        <q-expansion-item
          expand-separator
          v-for="(option, index) in navigationOptions.filter((e) => {
            if (e.mustBeSuperAdmin) {
              return authStore.GetIsSuperAdmin;
            }
            return true;
          })"
          :key="index"
          :icon="option.icon"
          class="border-white"
          dark
          :label="option.title"
          @click="option?.to ?? null ? $router.push(option?.to) : ''"
          :header-class="`text-opensans-medium fs-15`"
        >
          <q-list
            dense
            class="flex justify-end"
          >
            <q-item
              v-for="(subopt, index) in option.suboptions"
              :key="index"
              :clickable="subopt.active"
              v-ripple
              @click="$router.push(subopt.link)"
              :active="!$router.currentRoute.value.path.includes(subopt.link)"
              active-class="bg-lx-primary text-white text-opensans-bold"
              class="wp-100 text-opensans-medium"
            >
              <q-item-section
                class="fs-14 q-pl-xl">
                {{ subopt.title }}
              </q-item-section>

              <q-avatar side>
                <q-icon :name="subopt.icon" />
              </q-avatar>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item
          clickable
          class="absolute-bottom q-mb-sm q-px-lg">
          <q-item-section class="text-opensans-bold">
            Cerrar sesión
          </q-item-section>

          <q-item-section side>
            <q-icon color="lx-secondary" name="logout" />
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@modules/auth/domain/store';

interface NavigationOption {
  title: string;
  icon: string;
  expanded: boolean;
  mustBeSuperAdmin?: boolean;
  to?: string;
  suboptions: {
    title: string;
    icon: string;
    active: boolean;
    link: string;
    mustBeSuperAdmin?: boolean;
  }[];
}

const authStore = useAuthStore();

const drawer = ref<boolean>(false);
const navigationOptions: NavigationOption[] = [
  {
    title: 'Gestionar operadores',
    icon: 'domain_add',
    expanded: false,
    mustBeSuperAdmin: true,
    suboptions: [
      {
        title: 'Lista de operadores',
        icon: 'format_list_bulleted',
        active: true,
        link: '/operadores'
      },
      {
        title: 'Crear operador',
        icon: 'add',
        active: true,
        link: '/operadores/crear'
      }
    ]
  },
  {
    title: 'Gestionar apuestas',
    icon: 'casino',
    expanded: false,
    suboptions: [
      {
        title: 'Lista de apuestas',
        icon: 'format_list_bulleted',
        active: true,
        link: '/apuestas'
      }
    ]
  },
  {
    title: 'Gestionar usuarios',
    icon: 'people',
    expanded: false,
    suboptions: [
      {
        title: 'Lista de usuarios',
        icon: 'format_list_bulleted',
        active: true,
        link: '/usuarios'
      }
    ]
  }
];
</script>
