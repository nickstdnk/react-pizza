import axios from 'axios'
import { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import Sort from '../components/Sort'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({ name: 'популярности (DESC)', sortProperty: 'rating' })
  useEffect(() => {
    setIsLoading(true)
    axios.get('https://6286b11ee9494df61b2c1a47.mockapi.io/items', {
      params: {
        'category': (categoryId > 0) ? categoryId : null,
        'sortBy': sortType.sortProperty.replace('-', ''),
        'order': sortType.sortProperty.includes('-') ? 'asc' : 'desc',
      }
    })
      .then(res => {
        setItems(res.data);
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType])
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
      {isLoading
      ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
      : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
      }
      </div>
    </div>
  )
}

export default Home