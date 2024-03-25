<template>
    <q-btn :disable="!runner.allow"
      @click="toggleSelect"
      class="br-6" :style="getButtonStyle" flat>
      {{ runner.programNumber }}
      <span v-if="isSelected" :style="getInnerSpanStyle" class="br-80 absolute-center" />
      <q-icon v-if="!runner.allow" name="close" size="35px" class="absolute-center text-red" />
    </q-btn>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed } from 'vue';
import { colors } from 'quasar';
import { IRunner } from '@modules/polla/domain/models';

interface IColor {
  bg: `#${string}`;
  text: string;
  border: string;
}

interface IRunnerColor {
  [key: number]: IColor;
}

const defaultRunnerColor: IColor = {
  bg: '#00ff61',
  text: '#ff0000',
  border: '#0089a9'
};

const runnerColors: IRunnerColor = {
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
  },
  16: {
    bg: '#97DCEE',
    text: '#FF0000',
    border: '#97DCEE'
  },
  17: {
    bg: '#0E0F3B',
    text: '#FFFFFF',
    border: '#0E0F3B'
  },
  18: {
    bg: '#08290E',
    text: '#FEFF05',
    border: '#08290E'
  },
  19: {
    bg: '#191B88',
    text: '#FF0000',
    border: '#191B88'
  },
  20: {
    bg: '#F91665',
    text: '#FEFF05',
    border: '#F91665'
  },
  21: {
    bg: '#8C85BB',
    text: '#000000',
    border: '#8C85BB'
  },
  22: {
    bg: '#540F62',
    text: '#FFFFFF',
    border: '#540F62'
  }
};

const props = defineProps({
  size: {
    type: Number,
    required: true
  },
  runner: {
    type: Object as () => IRunner,
    required: true
  },
  modelValue: {
    type: Array as () => string[],
    required: true
  }
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void;
}>();

const { size, runner, modelValue } = toRefs(props);

const getRGBA = (hex: string) =>
{
  const bgColor = Object.values((colors.hexToRgb(hex)));
  return bgColor.length > 3 ? bgColor.splice(2, 1).toString() : bgColor.toString();
};

const toggleSelect = () =>
{
  const index = modelValue.value.indexOf(runner.value.id);

  if (index > -1)
  {
    modelValue.value.splice(index, 1);
  }
  else
  {
    modelValue.value.push(runner.value.id);
  }

  emit('update:modelValue', modelValue.value);
};

const isSelected = computed(() => modelValue.value.includes(runner.value.id));

const runnerColor = computed(() => runnerColors[runner.value.number] ?? defaultRunnerColor);

const getButtonStyle = computed(() => `
  background-color: rgba(${getRGBA(runnerColor.value.bg)}, ${isSelected.value ? '1' : '.1'}) !important;
  color: ${isSelected.value ? runnerColor.value.text : '#000000'} !important;
  width: ${size.value}px;
  height: ${size.value}px;
  border: 1px solid rgba(${getRGBA(runnerColor.value.border)}, ${isSelected.value ? '1' : '.3'}) !important;
`);
const getInnerSpanStyle = computed(() => `border: 1px solid ${runnerColor.value.text}; height: 30px; width: 30px;`);

</script>

