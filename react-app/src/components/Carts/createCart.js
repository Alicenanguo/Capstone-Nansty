import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCartThunk,updateCartThunk } from '../../store/cart';

import { useHistory } from 'react-router-dom';

import './cart.css';

function CreateCart({product, check}) {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => Object.values(state.session)[0])
    // console.log("user_in_createCart",user)

    const [quantity, setQuantity] = useState(1)


    const onSubmit = async(e) => {
        e.preventDefault()

        if (!user) {
           return window.alert('Please sign in!')
        }

        const cart = {
            product_id: product?.id,
            quantity
        }

        if (!check) {
            await dispatch(createCartThunk(cart))

        } else {
            const newAdd = {
                quantity: check.quantity + Number(quantity)
            }

            await dispatch(updateCartThunk(check.id, newAdd))
        }

        history.push('/carts')
    }
    return (
        <form className='create-cart-container' onSubmit={onSubmit}>
            <div className='cart-select-quantity'>Select the quantity<span className='asterisk'>*</span></div>
            <select
                id='quantity'
                name='quantity'
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                >

                {[...Array(11).keys()].slice(1).map((num) => (
                    <option
                        key={num}
                        value={num}
                    >
                        {num}</option>
                ))}
            </select>
            <button className='add-cart-button' type='submit'>Add to cart</button>
        </form>
    )
    }

export default CreateCart;
