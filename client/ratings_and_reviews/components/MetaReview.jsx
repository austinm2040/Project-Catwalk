import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import token from '../../env/config.js';
import axios from 'axios';
import Rating from './Rating.jsx';
import StarsCount from './StarsCount.jsx';
import SizeComfortLengthQuality from './SizeComfortLengthQuality.jsx';


function MetaReview() {
  const currentProduct = useSelector(state => state.currentProduct) || { data: { id: 11004 } };
  // const currentProduct = useSelector(state => state.currentProduct);
  const currentMetaReview = useSelector(state => state.currentMetaReviews);
  const[metaReview, setMetaReview] = useState({});

  console.log('************** currentPRODUCTTTTT', currentProduct);

  useEffect(() => {
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: token
    };
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/reviews/meta', {
      params: {
        product_id: currentProduct.data.id
      }
    })
    .then((result) => {
      setMetaReview(result.data);
    })
  }, [currentProduct])

  return (
    <div className="metaReview">
      <h4 className="ratingsHeader">RATINGS & REVIEWS</h4>
      <Rating ratings={metaReview.ratings}/>
      <div className="recommendPrecentage">
        % of reviews recommend this product
      </div>
      <StarsCount ratings={metaReview.ratings}/>
      {/* {console.log('****************metareview!!', metaReview)} */}
      <SizeComfortLengthQuality characteristics={metaReview.characteristics}/>
    </div>
  )
}

export default MetaReview;