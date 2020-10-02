import { reactive, readonly } from 'vue'
import { Person } from '../types'
import { Persons } from '../utils/persons'

type State = {
  currentTweet: string;
  currentPerson: Person;
};

const state = reactive<State>({
  currentTweet: 'Text genérico',
  currentPerson: Persons.ney
})

export const useStore = () => readonly(state)

export function setCurrentTweet (tweet: string): void {
  state.currentTweet = tweet
}
