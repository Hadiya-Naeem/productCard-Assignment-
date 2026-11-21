import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Oval } from 'react-loader-spinner'
import './ProductCard.css'
import { ShoppingCart } from 'lucide-react'

const ProductCard = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products")
                setProducts(response.data.products)
            }
            catch (error) {
                console.log(error)
                setError("failed to fetch data")
            }
            finally {
                setLoading(false)
            }

        }
        fetchProduct()
    }, [])

    if (loading) {
        return (
            <div className='loader'>
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        )
    }

    return (
        <div className="container d-flex  flex-column gap-4">
            <h1 className='text-center pt-4 headingText'>Our <span className='gradientText'>products</span></h1>

            <div className="row cardCon">
                {
                    products.map(({ id, title, description, price, thumbnail }) => {
                        return (
                            <section className="card cards" style={{ maxWidth: "320px" }}>
                                <img src={thumbnail} className="card-img-top" alt={title}/>
                                    <div className="card-body">
                                        <h4 className="card-title text-center cardHeading">{title}</h4>
                                        <p className="card-text text-center cardText">{description}</p>
                                        <div className='d-flex'>
                                            <h4 className='cardprice'>${price}</h4>
                                        <button className='ms-auto cardBtn'>
                                            Add to cart
                                            <ShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                            </section>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductCard