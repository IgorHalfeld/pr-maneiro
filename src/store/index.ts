import { reactive, readonly, Ref } from 'vue'
import { CurrentTweet, Source } from '../types'
import { Persons } from '../utils/persons'

type State = {
  currentTweet: CurrentTweet;
  search: string;
  tweetRef: Ref | null;
};

const state = reactive<State>({
  currentTweet: {
    ...Persons.ney,
    source: Source.iphone
  },
  search: '',
  tweetRef: null
})

export const useStore = () => readonly(state)

export function setCurrentTweet (tweet: CurrentTweet): void {
  state.currentTweet = tweet
}

export function setTweetRef (tweet: Ref): void {
  state.tweetRef = tweet
}

export function setSearch (search: string): void {
  state.search = search
}
