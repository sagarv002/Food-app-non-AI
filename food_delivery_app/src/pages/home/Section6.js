import React from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Section6() {
  return (
 <section className='contactsection'>
<Container>
    <Row className='justify-content-center'>

        <Col sm={5} className='text-center'>
        <h4>We Guarantee</h4>
        <h2><b> 30 Minutes Delivery! </b></h2>
        <p>
        Aliquam a augue suscipit, luctus neque purus ipsum neque undo
              dolor primis libero tempus, blandit a cursus varius luctus neque
              magna
        </p>
       <Link to="/" className="btn order_now" style={{ backgroundColor: 'yellow', color: 'black', padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>
       Call: 999-888-7777
       </Link>
        </Col>
    </Row>
</Container>

 </section>
  )
}

export default Section6
