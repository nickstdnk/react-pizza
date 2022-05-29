import React, { useState } from 'react'

const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

const Categories = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((obj, index) => (
          <li
            key={index}
            className={value === index ? 'active': ''}
            onClick={() => onClickCategory(index)}>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories