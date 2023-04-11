import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = (rating % 1) !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const starArray = [...Array(fullStars).fill('fill'), halfStar ? 'half' : 'empty', ...Array(emptyStars).fill('empty')];
console.log(starArray)
  return (
    <div>
      {starArray.map((star, index) => (
        <FontAwesomeIcon key={index} icon={faStar} style={{color:star.includes('fill')?'yellow':'gray'}} className={`star-${star}`} />
      ))}
    </div>
  );
};
export default StarRating;
