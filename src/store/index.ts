import { reactive, readonly, Ref } from 'vue'
import { Person } from '../types'
import { Persons } from '../utils/persons'

type State = {
  currentTweet: Person;
  search: string;
  tweetRef: Ref | null;
};

const state = reactive<State>({
  currentTweet: Persons.ney,
  search: '',
  tweetRef: null
})

export const useStore = () => readonly(state)

export function setCurrentTweet (tweet: Person): void {
  state.currentTweet = tweet
}

export function setTweetRef (tweet: Ref): void {
  state.tweetRef = tweet
}

export function setSearch (search: string): void {
  state.search = search
}
