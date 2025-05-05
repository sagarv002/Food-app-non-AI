import React from 'react'

import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Storeios from "../../Assets/Food_Assets/assets/shop/appstore.png"
import Storeandroid from "../../Assets/Food_Assets/assets/shop/googleplay.png"
import eshop from "../../Assets/Food_Assets/assets/shop/e-shop.png";
import brand1 from"../../Assets/Food_Assets/assets/brands/brand-11.png";
import brand2 from"../../Assets/Food_Assets/assets/brands/brand-12.png";
import brand3 from"../../Assets/Food_Assets/assets/brands/brand-13.png";
import brand4 from"../../Assets/Food_Assets/assets/brands/brand-14.png";
import brand5 from"../../Assets/Food_Assets/assets/brands/brand-15.png";
import brand6 from"../../Assets/Food_Assets/assets/brands/brand-16.png";
import brand7 from"../../Assets/Food_Assets/assets/brands/brand-17.png";
import brand8 from"../../Assets/Food_Assets/assets/brands/brand-18.png";
function Section4() {








    return (


        <>
            <section className='shopsection'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={60} className='text-center text-lg-start mb-5 mb-lg-0'>
                            <h4>Download mobile App and</h4>
                            <h2> save up to 20%</h2>
                            <p> Aliquam a augue suscipit, luctus neque purus ipsum and neque
                                dolor primis libero tempus, blandit varius</p>

                            <Link to="/">
                                <img src={Storeios} alt='IOS' className='img-fluid store me-3' />


                            </Link>
                            <Link to="/">
                                <img src={Storeandroid} alt='Android' className='img-fluid store me-3' />


                            </Link>
                        </Col>
                        
                    </Row>
                </Container>

            </section>

            <section className='brandsection'>
                <Container>
                    <Row>
                        <Carousel>

                            <Carousel.Item>
                                <Carousel.Caption>

                                <div className='d-flex align-items-center justify-content-between'>


                                    <div className='brandimg'>

                                        <img src={brand1} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand2} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand3} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand4} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand5} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand6} className='img-fluid ' alt='band1'/>


                                    </div>
                                </div>

                                </Carousel.Caption>



                            </Carousel.Item>
                            <Carousel.Item>
                                <Carousel.Caption>

                                <div className='d-flex align-items-center justify-content-between'>


                                    <div className='brandimg'>

                                        <img src={brand3} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand4} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand5} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand6} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand7} className='img-fluid ' alt='band1'/>


                                    </div>
                                    <div className='brandimg'>

                                        <img src={brand8} className='img-fluid ' alt='band1'/>


                                    </div>
                                </div>

                                </Carousel.Caption>



                            </Carousel.Item>
                        </Carousel>




                    </Row>
                </Container>

            </section>

        </>
    )
}

export default Section4
 