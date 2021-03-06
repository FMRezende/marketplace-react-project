import { useEffect, useState } from "react";
import ProductCard from "../productCard/productCard";
import "./productSelection.css";

const ProductSelection = ({products}) => {

    const [selcategory, setSelcategory] = useState([]);
    
    const handlerLoadSubcategories = function (e) {
        const category = e.target.value;
        setSelcategory(category);
    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
            .then((response) => response.json())
            .then((json) => setCategories(json));
    }, []);

    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/categories/${selcategory}/subcategories`)
            .then((response) => response.json())
            .then((json) => setSubcategories(json));
    }, [selcategory]);

    return (

        <div className="productSelection_container">
            {products.length > 0 &&
                <>
                    {
                        products.map(product => (
                            <ProductCard
                                productId={product._id}
                                urlImage={product.urlImage}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                discount={product.discount}
                            />
                        ))
                    }
                </>}
        </div>

    );
};
export default ProductSelection;