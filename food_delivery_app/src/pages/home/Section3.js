import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import promotionimage from "../../Assets/Food_Assets/assets/promotion/pro.png"


function Section3() {
    return (
        <>
            <section className='promotion_section2'>
                <Container>

                    <Row>

                        <Col lg={6} className='test-center mb-5 mb-lg-0'>

                            <img src={promotionimage} className='img-fluid' alt='promotion2' />
                            <p className='text-black pt-4 pb-6' style={{ color: "red", fontSize: "20px" }}>
                                <h1 style={{ color: "red", fontFamily: "monospace" }}> <b> Nothing brings people together like a good burger </b> </h1>

                                Semper lacus cursus porta primis ligula risus tempus and
                                sagittis ipsum mauris lectus laoreet purus ipsum tempor enim
                                ipsum porta justo integer ultrice aligula lectus aenean magna
                                and pulvinar purus at pretium gravida

                                <ul>
                                    <li>
                                        <p>
                                            Fringilla risus, luctus mauris orci auctor purus euismod
                                            pretium purus pretium ligula rutrum tempor sapien
                                        </p>
                                    </li>

                                    <li><p>Quaerat sodales sapien euismod purus blandit</p></li>
                                    <li><p>Nemo ipsam egestas volute turpis dolores ut aliquam quaerat
                                        sodales sapien undo pretium a purus mauris</p></li>
                                </ul>
                            </p>
                            <h5 style={{ color: "orange", fontFamily: "monospace" }}><b><i>  Integer metus </i></b></h5>

                        </Col>
                    </Row>



                </Container>


                <section className='bg_parallox_scroll'></section>

            </section>


        </>
    )
}

export default Section3;
