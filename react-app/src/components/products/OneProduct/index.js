import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";

import { getOneProductThunk } from "../../../store/product";
import GetProductReviews from "../../Reviews/ProductReviews";
import CreateReviewsModal from "../../Reviews/CreateReviewModal";


import "./OneProduct.css";
import StarRatings from "react-star-ratings";

const GetOneProduct = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const { productId } = useParams();

  const single = useSelector((state) => state.products.singleProduct);
  console.log("single#########", single);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneProductThunk(productId)).then(() => setIsLoaded(true));
  }, [dispatch, productId]);

  if (!single) return null;

  return (
    <div className="getOneProduct_container">
      {isLoaded && (
        <div className="single_product">
          {single.id && (
            <>
              <div className='upper'>

              <div className="product_img" >
                {single?.product_image.length > 0 ? (
                  single.product_image.map((el) => (
                    <img
                      key={el.id}
                      className="single_img"
                      src={el.url}
                      alt={single.name}
                    />
                  ))
                ) : (
                  <img
                    key={single.id}
                    className="single_img"
                    src={single.preview_image}
                    alt={single.name}
                  />
                )}
                </div>
                <div className='one_product_right'>
                  <div className='seller_name'>{single?.user.first_name}</div>
              <div className="single_name">{single?.name}</div>

              <div>${single?.price}</div>

                <div>{single?.description}</div>
                </div>
                </div>

               <div className='down'>

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
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default GetOneProduct;
