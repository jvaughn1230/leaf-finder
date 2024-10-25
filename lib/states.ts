import { UsaStates } from "usa-states";

const { states } = new UsaStates({
  includeTerritories: true,
  contiguousOnly: false,
  exclude: [],
  ignoreCharacter: "",
});

export const stateArray = states.map((state) => ({
  name: state.name,
  abbreviation: state.abbreviation,
}));
