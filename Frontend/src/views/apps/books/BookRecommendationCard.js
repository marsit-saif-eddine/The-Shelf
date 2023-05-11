// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, CardHeader, CardTitle,CardImg } from 'reactstrap'

const BookCards = props => {
  // ** Props
  const {

    products,

    activeView,

  } = props


  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {

        return (
          <>
  
        <article className="card" key={item.name}>
          <div className="card__info-hover">
              <div class="card__clock-info">
                <span class="card__time">
                <Link to={`/bookdetail/${item._id}`} className="card_link">View details</Link>
                </span>
              </div>
            
          </div>
          <div className="card__img"></div>
          <Link to={`/bookdetail/${item._id}`} className="card_link">
            <div className="card__img--hover" style={{backgroundImage:`url('${item.image ? item.image : 'http://localhost:3000/image/cover_book.png'}')`}}></div>
          </Link>
          <div className="card__info">
            <h3 className="card__title">{item.name}</h3>
            <span className="card__by">by <a href="#" className="card__author" title="author">{item.author}</a></span>
            <div className="card__description">{item.description}</div>  
          </div>
        </article>  
          </>
          
          
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default BookCards
