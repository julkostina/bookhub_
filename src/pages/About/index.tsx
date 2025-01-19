import React from 'react'
import './index.scss'
import Header from '../../components/Header'
const About: React.FC = () => {
  return (
    <div className='about'>
      <Header/>
      <div className="about-text">
      <div>
      <h1 data-testid="bookhub">BookHub</h1>
      <p>BookHub is a comprehensive online platform designed for book enthusiasts and researchers alike. It allows users to easily find detailed information on a vast collection of books across various genres. Each book listing on BookHub includes key information such as the book's title, a brief description, author details, date of publication, genre, and user reviews. The platform also offers personalized recommendations, allowing users to explore new books based on their reading preferences. Whether you're looking for the latest releases, classic literature, or specific authors, BookHub makes book discovery simple and engaging.</p>
      <p style={{paddingTop:"15px", fontStyle:"italic", fontSize:"1.3rem"}}>Enjoy your time with BookHub!</p>
      <div className="created">
      <p><span>Author: </span> <a href="https://github.com/julkostina">Yulia Kostina</a></p>
      <p><span>Based on:</span> <a href="https://openlibrary.org/">OpenLibrary</a></p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default About