import { PiniaActions } from './types';

const actions: PiniaActions = {
  setHippodromes(hippodromes)
  {
    this.hippodromes = hippodromes;
  },
  setSelectedHippodrome(id)
  {
    this.selectedHippodrome = this.hippodromes.find((h) => h.id === id) || null;
    this.bet.hippodromeId = id;
    this.bet.races = this.selectedHippodrome.races.reduce((prev, curr) =>
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
  }
};

export default actions;
