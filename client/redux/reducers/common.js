export const INPUT_TEXT = '@common/INPUT_TEXT'
export const SET_FOOD_WEIGHT = '@common/SET_FOOD_WEIGHT'

const initialState = {
  inputText: '',
  foodWeight: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_TEXT: {
      return {
        ...state,
        inputText: action.payload
      }
    }
    case SET_FOOD_WEIGHT: {
      return {
        ...state,
        foodWeight: action.payload
      }
    }
    default:
      return state
  }
}

export function setInputValue(value) {
  return {
    type: INPUT_TEXT,
    payload: value
  }
}

export function setWeight(value) {
  return {
    type: SET_FOOD_WEIGHT,
    payload: value
  }
}
