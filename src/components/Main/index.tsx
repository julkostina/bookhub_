import React from 'react'
import './index.scss'
import SearchForm from '../SearchForm'
import BookList from '../BookList';
const Main: React.FC = () => {
  const [showBookList, setShowBookList] = React.useState(false);
  return (
    <div className='main'>
        <div className="main__text">
            <h1>BookHub</h1>
            <p>Find your favorite books here</p>
            <SearchForm  bookList={showBookList} setBookList={setShowBookList}/>
        </div>
        {showBookList && <BookList />}
    </div>
  )
}

export default Main