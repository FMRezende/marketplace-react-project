import React, { useState, useEffect } from 'react';
import ContactIcon from '../../assets/message.svg';
import { useParams } from 'react-router';

import Modal from "../../components/modal/Modal"
import ImageZoomed from "../../components/imageZoomed/ImageZoomed"
import SignupForm from "../../components/forms/SignupForm"
import LoginForm from "../../components/forms/LoginForm"
import ProductMap from "../../components/productMap/ProductMap"

// Styles for the page and the map
import './ProductPage.css'
import '../../components/forms/Forms.css';


const ProductPage = ({ user }) => {

    /**** Product fetch to obtain its data ****/
    const params = useParams();
    const productId = params.id;
    const [productInfo, setProductInfo] = useState();
    console.log(productInfo);

    useEffect(() => {
        fetch('http://localhost:5000/api/products/' + productId, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setProductInfo(json)
            });
    }, []);


    /**** Position after geocoding process ****/

    // Import API KEY for Open Cage Geocoder service
    const [productPosition, setProductPosition] = useState([40.42, -3.70]);
    const opencageToken = process.env.REACT_APP_OPENCAGE_API_KEY;

    // Execute geocoding process against OpenCage API
    useEffect(() => {
        if (productInfo) {
            console.log('Entering geocoding process')
            const opencageAddress = productInfo.users_id.address
            /* const opencageAdress = productInfo.address; */
            const opencageURL = `https://api.opencagedata.com/geocode/v1/json?q=${opencageAddress}&key=${opencageToken}&pretty=1&limit=1&language=es&countrycode=es`;
            const encodedURL = encodeURI(opencageURL);
            console.log(encodedURL);

            fetch(encodedURL)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    if(json.results[0] != undefined ){
                        const results = json.results[0].geometry
                        const geolocatedAdress = [results.lat, results.lng]
                        setProductPosition(geolocatedAdress);
                        console.log(geolocatedAdress)
                    };
                });
        }

    }, [productInfo])


    /**** User recognition ****/
    const [knownUser, setKnownUser] = useState(false);
    const [loggedUser, setLoggedUser] = useState(user);

    const checkUserLoggedIn = () => {
        const userLoggedIn = localStorage.getItem('user');
        if (userLoggedIn) {
            setKnownUser(true);
            const userId = JSON.parse(userLoggedIn).id;
            fetch("http://localhost:5000/api/users/" + userId)
                .then((response) => response.json())
                .then((json) => setLoggedUser(json));
            handleChatModal();
        } else {
            setKnownUser(false);
            handleLoginModal();
        }
    };


    /**** Modal control ****/
    const [imageModalVisibility, setImageModalVisibility] = useState(false);
    const [chatModalVisibility, setChatModalVisibility] = useState(false);
    const [signupVisibility, setSignupVisibility] = useState(false);
    const [loginVisibility, setLoginVisibility] = useState(false);

    const handleImageModal = () => {
        setImageModalVisibility(!imageModalVisibility)
    }

    const handleChatModal = () => {
        setChatModalVisibility(!chatModalVisibility)
    }

    const handleLoginModal = () => {
        setLoginVisibility(!loginVisibility)
    }

    const handleSignupModal = () => {
        setSignupVisibility(!signupVisibility)
    }

    const changeModal = () => {
        handleLoginModal();
        handleSignupModal();
    }

    /**** Message to the owner of the product ****/

    //formData : combo for the inputs
    const [formData, setFormData] = useState({
        message: undefined
    });

    const body = {
        sender: user._id,
        /* receiver: productInfo.users_id.name, */
        /* product: productInfo._id, */
        message: formData.message,
    }

    const sendMessageToOwner = () => {
        /* fetch con post a chats */
    }


    return (
        <>
            {productInfo &&
                <div className="productPage__container">
                    {/* Image gallery */}
                    <div className="productPage_images__container">
                        <div className="productPage_images_firstImage">
                            <img
                                src={productInfo.urlImage}
                                alt="image unavailable"
                                onClick={handleImageModal}
                            />
                        </div>
                        <div className="productPage_images_otherImages_up">
                            <img
                                src={productInfo.urlImage}
                                alt="image unavailable"
                                onClick={handleImageModal}
                            />
                        </div>
                        <div className="productPage_images_otherImages_down">
                            <img
                                src={productInfo.urlImage}
                                alt="image unavailable"
                                onClick={handleImageModal}
                            />
                        </div>
                        <div className="productPage_images_otherImages_up">
                            <img
                                src={productInfo.urlImage}
                                alt="image unavailable"
                                onClick={handleImageModal}
                            />
                        </div>
                        <div className="productPage_images_otherImages_down">
                            <img
                                src={productInfo.urlImage}
                                alt="image unavailable"
                                onClick={handleImageModal}
                            />
                        </div>
                    </div>
                    {/* Product information */}
                    <div className="productPage_info__container">
                        <div className="productPage_info_area">
                            <div className="productPage_info_productName">
                                <h2 className="productPage_info_productTitle">{productInfo.name}</h2>
                                {productInfo.product_category_id
                                    ? <p className="productPage_info_breadcrumbs">Home {'>'} {productInfo.product_category_id.name} {'>'} {productInfo.product_subcategory_id.name}</p>
                                    : <p className="productPage_info_breadcrumbs">Home {'>'} Undefined category</p>
                                }
                                <div className="productPage_info_divider" />
                            </div>
                            <div className="productPage_info_productDescription">
                                <h2 className="productPage_info_subtitle">Description</h2>
                                <p className="productPage_info_text">{productInfo.description}</p>
                                <h2 className="productPage_info_subtitle">Price and conditions</h2>
                                <p className="productPage_info_price">{productInfo.price}€</p>
                            </div>
                        </div>
                        <div className="productPage_contact_area">
                            <div className="productPage_contact_block">
                                <h2>Start a conversation with the seller!</h2>
                                <div className="productPage_contact_button"
                                    onClick={checkUserLoggedIn}>
                                    <img src={ContactIcon} />
                                    <span>Send a message</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Map */}
                    <div className="productPage_location__container">
                        <h2 className="productPage_info_subtitle">Location</h2>
                        <p>{productInfo.users_id.address}</p>
                        <ProductMap productPosition={productPosition} />
                    </div>
                    {/* Image Zoom */}
                    <ImageZoomed
                        visibility={imageModalVisibility}
                        setVisibility={setImageModalVisibility}
                        content={
                            <div className="productPage_images_modalImage">
                                <img
                                    src={productInfo.urlImage}
                                    alt="image unavailable"
                                    onClick={handleImageModal}
                                />
                            </div>
                        }
                    />
                    {/* Modals */}
                    <Modal
                        visibility={chatModalVisibility}
                        setVisibility={setChatModalVisibility}
                        content={
                            <div className="form_container">
                                <h2>Send a message to {productInfo.users_id.name}</h2>
                                <textarea
                                    className="form_full_input"
                                    placeholder="Message"
                                    rows="10"
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                />
                                <div className="productPage_contact_button"
                                    onClick={sendMessageToOwner}>
                                    <img src={ContactIcon} />
                                    <span>Send a message</span>
                                </div>
                            </div>
                        }
                    />
                    <Modal
                        visibility={signupVisibility}
                        setVisibility={setSignupVisibility}
                        content={
                            <SignupForm changeModal={changeModal} action={checkUserLoggedIn} />
                        }
                    />
                    <Modal
                        visibility={loginVisibility}
                        setVisibility={setLoginVisibility}
                        content={
                            <LoginForm changeModal={changeModal} action={checkUserLoggedIn} />
                        }
                    />
                </div>
            }
        </>
    )

};

export default ProductPage;