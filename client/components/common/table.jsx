import React from 'react'
import { useSelector } from 'react-redux'

const Table = () => {
  const { foodList, totalNutrients } = useSelector((s) => s.foods)

  const totalWeightPerElement = (elementWeight = 0, weight = 0) => {
    return +(elementWeight * (weight / 100)).toFixed(2)
  }

  const nutrientsPer100grams = (total = 0, weight = 0) => {
    const multi = weight / 100
    if (multi < 1) {
      return 0
    }
    return +(total / multi).toFixed(2)
  }

  return (
    <div className="overflow-hidden shadow rounded-lg m-2 border-white border">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gradient-to-tl from-green-500 to-teal-800 text-white antialiased">
            <th className="py-1 text-white antialiased font-mono font-semibold border-white">Name</th>
            <th>Calories</th>
            <th>Proteins</th>
            <th>Fats</th>
            <th>Carbo</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((element, index) => {
            return (
              <tr
                key={`${element._id}${index}`}
                className="text-center font-mono font-semibold border-white border-t"
              >
                <td className="py-1 text-white antialiased font-mono font-semibold">
                  {element?.name}
                </td>
                <td className="text-white antialiased font-mono font-semibold">
                  {totalWeightPerElement(element?.calories, element?.weight)}
                </td>
                <td className="text-white antialiased font-mono font-semibold">
                  {totalWeightPerElement(element?.protein, element?.weight)}
                </td>
                <td className="text-white antialiased font-mono font-semibold">
                  {totalWeightPerElement(element?.fat, element?.weight)}
                </td>
                <td className="text-white antialiased font-mono font-semibold">
                  {totalWeightPerElement(element?.carbohydrate, element?.weight)}
                </td>
                <td className="text-white antialiased font-mono font-semibold">
                  {element?.weight} g.
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr className="text-center border-t font-mono font-semibold">
            <td className="font-bold py-1 max-w-xs text-white antialiased font-mono font-semibold">
              Total:
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {totalNutrients.calories}
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {totalNutrients.protein}
            </td>
            <td className="text-white antialiased font-mono font-semibold">{totalNutrients.fat}</td>
            <td className="text-white antialiased font-mono font-semibold">
              {totalNutrients.carbohydrate}
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {totalNutrients.weight} g.
            </td>
          </tr>
          <tr className="text-center border-t text-white antialiased font-mono font-semibold">
            <td className="font-bold py-1 max-w-xs text-white antialiased font-mono font-semibold">
              Per 100 grams:
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {nutrientsPer100grams(totalNutrients.calories, totalNutrients.weight)}
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {nutrientsPer100grams(totalNutrients.protein, totalNutrients.weight)}
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {nutrientsPer100grams(totalNutrients.fat, totalNutrients.weight)}
            </td>
            <td className="text-white antialiased font-mono font-semibold">
              {nutrientsPer100grams(totalNutrients.carbohydrate, totalNutrients.weight)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table
