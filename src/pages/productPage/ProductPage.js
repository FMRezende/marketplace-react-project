import React, { useState, useEffect } from 'react';
import './ProductPage.css'
import ContactIcon from '../../assets/message.svg';
import { useParams } from 'react-router';


const ProductPage = () => {

    const params = useParams();
    const productId = params.id

    const [productInfo, setProductInfo] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/api/products/' + productId, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setProductInfo(json);
            });
    }, []);

    console.log(productInfo)


    return (
        <div className="productPage__container">
            <div className="productPage_images__container">
                <p>Here go the images</p>
            </div>
            <div className="productPage_info__container">
                <div className="productPage_info_area">
                    <div className="productPage_info_productName">
                        <h2 className="productPage_info_productTitle">Title of the product</h2>
                        <p className="productPage_info_breadcrumbs">Home {'>'} Category</p>
                        <div className="productPage_info_divider" />
                    </div>
                    <div className="productPage_info_productDescription">
                        <h2 className="productPage_info_subtitle">Description</h2>
                        <p className="productPage_info_text">
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one
                            of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                            the cites of the word in classical literature, discovered the undoubtable source.
                        </p>
                        <h2 className="productPage_info_subtitle">Precio y condiciones</h2>
                        <p className="productPage_info_price">112€ (used)</p>
                    </div>
                </div>
                <div className="productPage_contact_area">
                    <div className="productPage_contact_block">
                        <h2>Start a conversation with the seller!</h2>
                        <div className="productPage_contact_button">
                            <img src={ContactIcon} />
                            <span>Send a message</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productPage_location__container">
            <h2 className="productPage_info_subtitle">Location</h2>
            </div>
        </div>
    )

};

export default ProductPage