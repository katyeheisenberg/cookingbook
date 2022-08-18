import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getFood } from '../../../redux/reducers/foods'

import Input from '../input-field'
import Button from '../button'

const InputPanel = () => {
  const dispatch = useDispatch()
  const [foodName, setFoodName] = useState('')
  const [foodWeight, setFoodWeight] = useState(100)

  const onClick = () => {
    dispatch(getFood(foodName, +foodWeight))
    setFoodName('')
    setFoodWeight(100)
  }

  return (
    <div
      id="input-panel"
      className="flex justify-center p-3 m-3 text-white antialiased font-mono font-semibold text-sm"
    >
      <Input
        id="food-name"
        label="Название продукта"
        onChange={setFoodName}
        value={foodName}
        onKeyPress={onClick}
      />
      <Input
        type="number"
        id="food-weight"
        label="Вес"
        onChange={setFoodWeight}
        value={foodWeight}
        onKeyPress={onClick}
      />
      <Button name="Add" onClick={onClick} />
    </div>
  )
}

export default InputPanel
