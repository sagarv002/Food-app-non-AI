import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Section2() {
  return (
 <section className='menusection'>
    <Container>
        <Row>
            <Col sm={7} lg={5}>
            <div className='ads_box ads_img1 mb-5 mb-md-0'>
            <h4 className='mb-0'> GET YOUR FREE</h4>
    <h5>CHEESE FRIES</h5>
    <Link to="/" className="btn order_now" style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>
    <u>Learnmore</u>
   </Link>
            </div>
            
            </Col>


            <Col sm={7} lg={7}>
            <div className='ads_box ads_img2 '>
            <h4 className='mb-0'> GET YOUR FREE</h4>
    <h5>CHEESE FRIES</h5>
   <Link to="/" className="btn order_now" style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>
   <u>Learnmore</u>
   </Link>
            </div>
            
            </Col>


        </Row>
    </Container>
 </section>
  )
}

export default Section2
