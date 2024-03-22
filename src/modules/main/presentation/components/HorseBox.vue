<template>
    <q-btn
      @click="() => {
        isActive = !isActive;
        emit('onSelect', isActive ? number : null);
      }"
      class="br-6" :style="`
    background-color: rgba(${getRGBA(horseColor.bg)}, ${isActive ? '1' : '.1'}) !important;
    color: ${isActive ? horseColor.text : '#000000'} !important;
    width: ${size}px;
    height: ${size}px;
    border: 1px solid rgba(${getRGBA(horseColor.border)}, ${isActive ? '1' : '.3'}) !important;
    `" flat>
      {{ number }}
      <span v-if="isActive" :style="`border: 1px solid ${horseColor.text}; height: 30px; width: 30px;`" class="br-80 absolute-center" />
    </q-btn>
</template>

<script setup lang="ts">
import { ref, defineProps, toRefs } from 'vue';
import { colors } from 'quasar';

interface IColor {
  bg: `#${string}`;
  text: string;
  border: string;
}

interface IHorseColor {
  [key: number]: IColor;
}

const horseColors: IHorseColor = {
  1: {
    bg: '#FF0000',
    text: '#FFFFFF',
    border: '#FF0000'
  },
  2:{
    bg: '#FFFFFF',
    text: '#000000',
    border: '#000000'
  },
  3:{
    bg: '#1700FE',
    text: '#FFFFFF',
    border: '#1700FE'
  },
  4:{
    bg: '#FEFF05',
    text: '#000000',
    border: '#FEFF05'
  },
  5:{
    bg: '#0E6224',
    text: '#FFFFFF',
    border: '#0E6224'
  },
  6:{
    bg: '#000000',
    text: '#FFFFFF',
    border: '#000000'
  },
  7: {
    bg: '#FF4A0B',
    text: '#000000',
    border: '#FF4A0B'
  },
  8: {
    bg: '#F55084',
    text: '#000000',
    border: '#F55084'
  },
  9: {
    bg: '#03A0C7',
    text: '#000000',
    border: '#03A0C7'
  },
  10: {
    bg: '#6F409C',
    text: '#FFFFFF',
    border: '#6F409C'
  },
  11: {
    bg: '#ADADAD',
    text: '#FF0000',
    border: '#ADADAD'
  },
  12: {
    bg: '#01FF00',
    text: '#000000',
    border: '#01FF00'
  },
  13: {
    bg: '#3B0D0E',
    text: '#FFFFFF',
    border: '#3B0D0E'
  },
  14: {
    bg: '#60061C',
    text: '#FEFF05',
    border: '#60061C'
  },
  15: {
    bg: '#989489',
    text: '#FFFFFF',
    border: '#989489'
  }
};

const  { hexToRgb } = colors;

const props = defineProps({
  size: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits<{
  (event: 'onSelect', value: number | null): void;
}>();

const isActive = ref(props.selected ?? false);

const { size, number } = toRefs(props);

const horseColor = horseColors[number.value];

const getRGBA = (hex: string) =>
{
  const bgColor = Object.values((hexToRgb(hex)));
  return bgColor.length > 3 ? bgColor.splice(2, 1).toString() : bgColor.toString();
};


</script>

