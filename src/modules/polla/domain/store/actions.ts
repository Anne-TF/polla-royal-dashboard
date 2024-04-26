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

    if (!this.selectedHippodrome.allowsPlay)
    {
      this.optionSelected = 'history';
    }

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
  },
  setPot(value)
  {
    this.pot = value;
  },
  setTicket(hippodromeId, value)
  {
    this.hippodromes = this.hippodromes.map((h) =>
    {
      if (h.id === hippodromeId)
      {
        h.ticket = value;
      }
      return h;
    });

    if (this.selectedHippodrome?.id === hippodromeId)
    {
      this.selectedHippodrome.ticket = value;
    }
  },
  setExceededCombinations(value)
  {
    this.exceededCombinations = value;
  }
};

export default actions;
