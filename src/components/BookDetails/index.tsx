import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './index.scss'
import Loader from '../Loader'
import Header from '../Header'

const URL= 'https://openlibrary.org/works/'

interface Book {
  description: string;
  cover_image: string;
  title: string;
  subject_places: string;
  subject_times: string;
  subjects: string;
}

const BookDetails: React.FC = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false );
  const [book, setBook] = useState<Book | null>(null);
  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const responce = await fetch(`${URL}${id}.json`);
        const data = await responce.json();
        if(data){
          const{description, title, covers, subject_places, subject_times, subjects } = data;
          const newBook: Book = {
            description: description ? description.value : 'No description available',
            cover_image: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : `${process.env.PUBLIC_URL}/img/book-cover.png`,
            title:title,
            subject_places: subject_places ? subject_places.join(', ') : 'No subject places found',
            subject_times: subject_times ? subject_times.join(', ') : 'No subject times found',
            subjects: subjects ? subjects.join(', ') : 'No subjects found'
          }
          setBook(newBook);
        }
        else{
          setBook(null);
        }
        setLoading(false);
      }
      catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);
  return (
    <section className='book-details'>
      {loading? <Loader/>:<div className="container">
        <Header />
        <div className="book-details-content">
          <div className="book-details-img">
            <img src={book?.cover_image} alt="cover"/>
          </div>
          <div className="book-details-info ">
            <div className="book-details-item">
              <h1>{book?.title}</h1>
            </div>
            <div className="book-details-item ">
              <span>{book?.description}</span>
            </div>
            <div className="book-details-item ">
              <h2>Subject places: </h2>
              <span>{book?.subject_places}</span>
            </div>
            <div className="book-details-item ">
              <h2>Subject times: </h2>
              <span>{book?.subject_times}</span>
            </div>
            <div className="book-details-item subject">
              <h2>Subjects: </h2>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
      }
      
    </section>
  )
}

export default BookDetails