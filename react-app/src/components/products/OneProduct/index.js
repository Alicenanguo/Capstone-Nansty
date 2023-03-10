import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams,useHistory } from "react-router-dom";

import { getOneProductThunk } from "../../../store/product";
import GetProductReviews from "../../Reviews/ProductReviews";
import CreateReviewsModal from "../../Reviews/CreateReviewModal";
import { createCartThunk } from "../../../store/cart";
import CreateCart from "../../Carts/createCart";


import StarRating from "react-star-ratings";
import "./OneProduct.css";

const GetOneProduct = () => {
  const history= useHistory()
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState([]);


  const { productId } = useParams();

  const single = useSelector((state) => state.products.singleProduct);
  console.log("single#########", single);

  const All = useSelector(state => Object.values(state.products.allProducts));
  const product = All.find(el => el.id === +productId)

  const user = useSelector((state) => state.session.user);

  const carts = useSelector(state => Object.values(state.carts.Cart))


  const check = carts.find(el => el.product_id === +productId)

  useEffect(() => {
    dispatch(getOneProductThunk(productId)).then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  // if (!single) return null;
  // if (!product) return null
  // if (!carts) return null



  return (
    <div className="getOneProduct_container">
      {isLoaded && (
        <div className="single_product">
          {single?.id && (
            <>
              <div className='upper'>

                <div className="product_img" >


                  <img src={single?.preview_image}
                    className="single_img"
                    alt={single.name}
                    onError={e => { e.currentTarget.src = "/default.jpeg"; }}

                    />


                    {/* {single?.product_image.length > 0 && (

                      <img src={single?.product_image[1].url}
                        className="single_img"
                        alt={single.name}
                        onError={e => { e.currentTarget.src = "https://as2.ftcdn.net/v2/jpg/01/37/87/23/1000_F_137872395_EqvoLs5itkB46bMoG2EYyvHtBQzvUcuZ.jpg"; }}

                      />

                    )} */}


                  {single?.product_image?.length > 0 && (
                    single?.product_image.slice(1).map((el) => (
                      <img
                        key={el.id}
                        className="single_img"
                        src={el.url}
                        alt={single.name}
                        onError={e => { e.currentTarget.src = "/default.jpeg"; }}
                      />
                    ))
                  )
                    }


                {/* : (
                  <img
                     key={single.id}
                    className="single_img"
                     src={single.preview_image}
                     alt={single.name}
                     onError={e => { e.currentTarget.src = "https://as2.ftcdn.net/v2/jpg/01/37/87/23/1000_F_137872395_EqvoLs5itkB46bMoG2EYyvHtBQzvUcuZ.jpg"; }}

                   />
                  ) */}



                </div>
                <div className='one_product_right'>
                  <div className='seller_name'>{single?.user.first_name}</div>
                  <div className="one_product_review_stars">
                <StarRating
                  numberofStars={5}
                  rating={single?.average_rating}
                  starRatingColor='rgb(57,57,57)'
                  starEmptyColor='rgb(227,227,227)'
                  starDimension='15px'
                  starSpacing='2px'

                />

                  </div>

              <div className="single_name">{single?.name}</div>

                  <div className="single_price">${single?.price}</div>
                  {/* <div> <CreateCart product={single} isExist={isExist}/></div> */}

                  <div className="add-to-cart">
                  {user &&
                  user.id &&
                  single.seller_id !== user.id && (
                      <CreateCart product={product} check={check} />
                      )}
                     <div className="free_shipping">
                    <i class="fa-solid fa-truck-fast"></i>
                    <span className="shipping_text">Hooray! This item ships free to the US.</span>
                  </div>
                  </div>


                </div>
                </div>

              <div className='down'>
                <div className="down_left">
                  <div className="all_reviews_one_page">
                    <span className="one_page_count_reviews">{single?.review_nums}{' '}Reviews</span>
                    <StarRating
                  numberofStars={5}
                  rating={single?.average_rating}
                  starRatingColor='rgb(2,2,21)'
                  starEmptyColor='rgb(227,227,227)'
                  starDimension='20px'
                  starSpacing='2px'

                />

                  </div>


              <div className="create_review_spotList">
                {user &&
                  user.id &&
                  single.seller_id !== user.id && (
                    <CreateReviewsModal productId={productId} />
                  )}
              </div>
              <div>
                <GetProductReviews productId={productId} />
                  </div>
                </div>

                <div className="down_right">


                  <div className='des_text'>
                    <div className="text-description">Description</div>
                    <div>{single?.description}</div>
                  </div>

                  </div>
                </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default GetOneProduct;
