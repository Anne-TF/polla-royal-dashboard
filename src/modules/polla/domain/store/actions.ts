import { PiniaActions } from './types';

const actions: PiniaActions = {
  setHippodromes(hippodromes)
  {
    this.hippodromes = hippodromes;
  },
  setSelectedHippodrome(id)
  {
    this.bet.hippodromeId = id;
    this.selectedHippodrome = this.hippodromes.find((h) => h.id === id) || null;
    this.optionSelected = this.selectedHippodrome.allowsPlay ? 'play' : 'history';

    this.bet.races  = this.selectedHippodrome.races.reduce((prev, curr) =>
    {
      return {
        ...prev,
        [curr]: []
      };
    }, {});
  },
  setBetOfRace(cardId: string, runners: string[])
  {
    this.bet.races[cardId] = runners;
  },
  setOptionSelected(value)
  {
    this.optionSelected = value;
  }
};

export default actions;
