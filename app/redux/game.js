import { resetScore } from './score'

const FETCH_GAMES_REQUEST = 'Fiji/game/FETCH_GAMES_REQUEST'
const FETCH_GAMES_SUCCESS = 'Fiji/game/FETCH_GAMES_SUCCESS'
const FETCH_GAMES_FAILURE = 'Fiji/game/FETCH_GAMES_FAILURE'
const FETCH_GAME_THEME_REQUEST = 'Fiji/game/FETCH_GAME_THEME_REQUEST'
const FETCH_GAME_THEME_SUCCESS = 'Fiji/game/FETCH_GAME_THEME_SUCCESS'
const FETCH_GAME_THEME_FAILURE = 'Fiji/game/FETCH_GAME_THEME_FAILURE'
const FETCH_GAME_DATA_REQUEST = 'Fiji/game/FETCH_GAME_DATA_REQUEST'
const FETCH_GAME_DATA_SUCCESS = 'Fiji/game/FETCH_GAME_DATA_SUCCESS'
const FETCH_GAME_DATA_FAILURE = 'Fiji/game/FETCH_GAME_DATA_FAILURE'

const initialState = {
  isFetching: false,
  games: [],
  theme: {},
  gameData: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        games: action.games
      }
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        isFetching: false,
        games: []
      }
    case FETCH_GAME_THEME_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAME_THEME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        theme: action.theme
      }
    case FETCH_GAME_THEME_FAILURE:
      return {
        ...state,
        isFetching: false,
        theme: {}
      }
    case FETCH_GAME_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAME_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gameData: action.gameData
      }
    case FETCH_GAME_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        gameData: []
      }
    default:
      return state
  }
}

export const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
})

export const fetchGamesSuccess = (games) => ({
  type: FETCH_GAMES_SUCCESS,
  games
})

export const fetchGamesFailure = () => ({
  type: FETCH_GAMES_FAILURE
})

export const fetchGameThemeRequest = () => ({
  type: FETCH_GAME_THEME_REQUEST
})

export const fetchGameThemeSuccess = (theme) => ({
  type: FETCH_GAME_THEME_SUCCESS,
  theme
})

export const fetchGameThemeFailure = () => ({
  type: FETCH_GAME_THEME_FAILURE
})

export const fetchGameDataRequest = () => ({
  type: FETCH_GAME_DATA_REQUEST
})

export const fetchGameDataSuccess = (gameData) => ({
  type: FETCH_GAME_DATA_SUCCESS,
  gameData
})

export const fetchGameDataFailure = () => ({
  type: FETCH_GAME_DATA_FAILURE
})

export const fetchGames = () => async(dispatch, getState) => {
  try {
    dispatch(fetchGamesRequest())
    const result = require('../assets/games/games.json')
    dispatch(fetchGamesSuccess(result))
  } catch(error) {
      console.log('fetchGames: ' + error)
      dispatch(fetchGamesFailure())
  }
}

export const fetchGameTheme = ( game_id ) => async(dispatch, getState) => {
  try {
    dispatch(fetchGameThemeRequest())
    const sets = require('../assets/games/games.json').game_id.sets
    dispatch(fetchGameThemeSuccess({_id: game_id, sets}))
  } catch(error) {
      console.log('fetchGameTheme: ' + error)
      dispatch(fetchGameThemeFailure())
  }
}

export const fetchGameData = () => async(dispatch, getState) => {
  try {
    dispatch(fetchGameDataRequest())
    dispatch(resetScore())
    let gameData = []
    for (let index = 0; index < 4; index++) {
      gameData.push(String.fromCharCode(65 + index))
    }
    dispatch(fetchGameDataSuccess(gameData))
  } catch(error) {
      console.log('fetchGameData: ' + error)
      dispatch(fetchGameDataFailure())
  }
}

export default reducer