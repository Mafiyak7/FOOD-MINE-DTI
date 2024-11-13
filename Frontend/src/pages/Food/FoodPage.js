import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Price from '../../components/Price/Price';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import { useCart } from '../../hooks/useCart';
import { getById } from '../../services/foodService';
import classes from './foodPage.module.css';
import NotFound from '../../components/NotFound/NotFound';

export default function FoodPage() {
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };

  useEffect(() => {
    getById(id)
      .then(setFood)
      .catch(() => setError('Failed to load food item.'));
  }, [id]);

  if (error) return <NotFound message={error} linkText="Back To Homepage" />;
  if (!food) return <p>Loading...</p>;

  return (
    <div className={classes.container}>
      <img
        className={classes.image}
        src={`${food.imageUrl}`}
        alt={food.name}
      />

      <div className={classes.details}>
        <div className={classes.header}>
          <span className={classes.name}>{food.name}</span>
          <span
            className={`${classes.favorite} ${food.favorite ? '' : classes.not}`}
            aria-label={food.favorite ? 'Marked as favorite' : 'Not marked as favorite'}
          >
            ❤
          </span>
        </div>

        <div className={classes.rating}>
          <StarRating stars={food.stars} size={25} />
        </div>

        <div className={classes.origins}>
          {food.origins?.map(origin => (
            <span key={origin}>{origin}</span>
          ))}
        </div>

        <div className={classes.tags}>
          {food.tags && <Tags tags={food.tags.map(tag => ({ name: tag }))} forFoodPage />}
        </div>

        <div className={classes.cook_time}>
          <span>
            Time to cook: <strong>{food.cookTime}</strong> minutes
          </span>
        </div>

        <div className={classes.price}>
          <Price price={food.price} />
        </div>

        <button onClick={handleAddToCart} aria-label="Add to cart">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
