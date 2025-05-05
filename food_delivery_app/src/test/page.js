import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import promotionimage from "../Assets/Food_Assets/assets/promotion/pro.png"
import autoher from "../Assets/Food_Assets/assets/blog/review-author-3.jpg"

function Page() {
    return (
        <>
            <section className='promotion_section'>
                <Container>

                    <Row>

                        <Col lg={6} className='test-center mb-5 mb-lg-0'>

                            <img src={promotionimage} className='img-fluid' alt='promotion' />
                            <p className='text-black pt-4 pb-6' style={{color:"red"}}>
  Feugiat primis ligula risus auctor laoreet augue egestas mauris
  viverra tortor in iaculis pretium at magna mauris ipsum primis
  rhoncus feugiat
</p>

                        </Col>
                    </Row>
                    
                    <Col lg={5} className='test-center mb-5 mb-lg-0'>

<img src={autoher} className='img-fluid' alt='promotion' />

</Col>
<Col lg={9}>
            <div className='hero_text text-center'>
            <h1 className='h1-custom text-black'>francess</h1>
<h2 className='h2-custom text-black'>Auther !</h2>

              <p className='text-black pt-4 pb-6' style={{color:"red"}}>
  Feugiat primis ligula risus auctor laoreet augue egestas mauris
  viverra tortor in iaculis pretium at magna mauris ipsum primis
  rhoncus feugiat
</p>

     

            </div>
          </Col>

                </Container>


                <section className='bg_parallox_scroll'></section>

            </section>


        </>
    )
}

export default Page;
