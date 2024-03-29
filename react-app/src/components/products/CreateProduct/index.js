import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { createProductTHUNK } from "../../../store/product";
import { getThunkAll } from "../../../store/category";

import "./CreateProduct.css";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products.singleSpot);
  const allCategory = useSelector((state) => state.categories.categories);
  const allArr = Object.values(allCategory);
  console.log("categoryArr", allArr);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [preview_image, setPreviewImage] = useState("");
  const [category_id, setCategoryId] = useState("1");

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getThunkAll());
  }, [dispatch]);

  useEffect(() => {
    const errors = {};
    if (!name) errors.noName="Please enter a valid name";
    if (name.length > 255)
      errors.longName="Name could not greater than 255 characters";
    if (!description) errors.noDescription="Please enter a valid description";
    if (description.length > 2000)
      errors.longDescription="Description could not greater than 2000 characters";
    if (!price || price <= 0)
      errors.minusPrice="Please enter a price greater than 0";
    if (isNaN(price)) errors.noNumber="Price must be a number";
    // if (!preview_image) errors.noImage = "need a image for the product";
    // if ((!preview_image.startsWith('http://')) && (!preview_image.startsWith('https://')))
    //   errors.brokenImage_start = "Url must start with 'http://' or 'https://'";
    // // if ((!preview_image.endsWith("pdf")) && (!preview_image.endsWith("png")) && (!preview_image.endsWith("jpg")) &&
    // //     (!preview_image.endsWith("jpeg")) && (!preview_image.endsWith("jpeg")))
    // //   errors.brokenImage_end = "Url must end with 'pdf' or 'png' or 'jpg' or 'jpeg' or 'gif'";
    // const endArr = ['pdf', 'png', 'jpg', 'jpeg', 'gif']
    // let count = 0;
    // endArr.map(el => {
    //   if (preview_image.includes(el)) count++
    // }
    // )
    // if (count === 0) errors.brokenImage_end = "Url must end with 'pdf' or 'png' or 'jpg' or 'jpeg' or 'gif'";

    setValidationErrors(errors);

    // if (Object.values(errors).length) {
    //   return;
    // }

  }, [name, description, price, preview_image]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const productInfo = {
      name,
      description,
      price,
      //preview_image,
      category_id,
    };

    const arr = Object.values(validationErrors)

    if (arr.length === 0) {
      await dispatch(createProductTHUNK(productInfo))
      .then((result)=> history.push(`/products/${result.id}`))

    }
  };
  const cancelSubmit = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    console.log(`Selected index: ${selectedIndex}`,typeof selectedIndex);
    setCategoryId(selectedIndex)
  };
  //console.log("errors@@@@@@@@@", validationErrors);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setPreviewImage(file);

    const image = document.getElementById("preview_img");
    image.src = URL.createObjectURL(file);

  };
  return (
    <>
      <form
        id="create_container"
        className="createProduct_form"
        onSubmit={onSubmit}
      >
        <div id="create_your_product" className="c">
          <h2>{`Hi! ${user.firstName}! start your bussiness here`}</h2>
        </div>
        {/* {hasSubmitted && validationErrors.length > 0 && (
          <div className="err-div">
            <ul className="error_container">
              {validationErrors.map((error, idx) => (
                <li className="error" key={idx}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )} */}

        <div className="create_selling_list_container">
          <div className="create_selling_list">
            <label>
              <div className="create_selling_title"> Product Name</div>
              <textarea
                id="name"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              {hasSubmitted && validationErrors.noName && (
                <div className='errors_info'>*{validationErrors.noName}</div>
              )}
              {hasSubmitted && validationErrors.longName && (
                <div className='errors_info'>*{validationErrors.longName}</div>
              )}
            </label>
          </div>

          <div className="create_selling_list">
            <label>
              <div className="create_selling_title">Price</div>
              <input
                id="price"
                type="number"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                required
              />
              {hasSubmitted && validationErrors.minusPrice && (
                <div className='errors_info'>*{validationErrors.minusPrice}</div>
              )}
              {hasSubmitted && validationErrors.noNumber && (
                <div className='errors_info'>*{validationErrors.noNumber}</div>
              )}
            </label>
          </div>

          <div className="create_selling_list">
            <label>
              <div className="create_selling_title">Product Description</div>
              <textarea
                id="description"
                type="text"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
              {hasSubmitted && validationErrors.noDescription && (
                <div className='errors_info'>*{validationErrors.noDescription}</div>
              )}
              {hasSubmitted && validationErrors.longDescription && (
                <div className='errors_info'>*{validationErrors.longDescription}</div>
              )}

            </label>
          </div>

          <div className="create_selling_list">
          <div>
                                <label htmlFor='previewImage'>Images{' '}<span style={{color: 'red'}}>*</span></label>
                                {/* <p>Please enter the url for the product. A good preview image can make your listing more appealing!</p> */}
                                <p>Please upload images for the listing.</p>
            </div>

            <div className='preview-img-container'>
                                <img
                                    id="preview_img"
                                    alt="preview image"
                                    // className={`${
                                    // previewImage ? "cs-preview-img" : "no-preview-img"
                                    // }`}
                                    hidden={preview_image ? false : true}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={updateImage}
              />
              
                            </div>
                        </div>
            {/* <label>
              <div className="create_selling_title">Image Url</div>
              <textarea
                id="previewImage"
                type="text"
                name="previewImage"
                onChange={(e) => setPreviewImage(e.target.value)}
                value={preview_image}
                // required
              />
              {hasSubmitted && validationErrors.noImage && (
                <div className='errors_info'>*{validationErrors.noImage}</div>
              )}
              {hasSubmitted && validationErrors.brokenImage_start && (
                <div className='errors_info'>*{validationErrors.brokenImage_start}</div>
              )}
              {hasSubmitted && validationErrors.brokenImage_end && (
                <div className='errors_info'>*{validationErrors.brokenImage_end}</div>
              )}
            </label> */}
          {/* </div> */}

          {/* <div className="create_selling_list">
            <label className="create_selling_title">Category</label> */}

            {/* <select id="my-select" onChange={handleChange} value={handleChange()} >
        {allArr.map((option, index) => (
          <option key={index} value={index}>
            {option?.name}
          </option>
        ))}
      </select> */}

            <div className="create_selling_list">
              <label>
                <div className="create_selling_title">Category</div>
                <select
            id="category_id"
            type="text"
            name="category_id"
            onChange={handleChange}
                value={allCategory[category_id]?.name}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {allArr.map((el) => (
              <option key={el?.id} value={el?.name}>{el?.name}
                </option>
            ))}
          </select>
              </label>
            </div>

            {/* <select value={category_id} onChange={handleChange} required>
              <option value='' disabled>
                Select a category
              </option>
              {allArr.map((el) => (
                <option key={el?.id} value={el?.name}>
                  {el?.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="create_product_submit">
            <div><button type="submit" className="add_product_button">
              Add Product
            </button>
              </div>
            <div><button className="cancel_product_button_create" onClick={cancelSubmit}>
              Cancel
            </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreateProduct;
