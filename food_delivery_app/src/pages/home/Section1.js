import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import burger from "../../Assets/Food_Assets/assets/hero/hero-2.png";
import { Link } from 'react-router-dom';

function Section1() {
  return (
    <section>
      <Container>
        <Row>
          <Col lg={7} className='heroselection'>
            <div className='position-relative'>
              <img src={burger} className='img-fluid' alt="Hero" />
              <div className='price_badge'>
                <div className='badge_text'>
                  <h4 className='h4_xs'>Only</h4>
                  <h4 className='h3_lg'>$.99</h4>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={5}>
            <div className='hero_text text-center'>
            <h1 className='h1-custom text-black'><b> Fresh Burger </b></h1>
<h2 className='h2-custom text-black'>With Onion</h2>

              <p className='text-black pt-4 pb-6'>
  Feugiat primis ligula risus auctor laoreet augue egestas mauris
  viverra tortor in iaculis pretium at magna mauris ipsum primis
  rhoncus feugiat
</p>

              <Link to="/" className="btn order_now" style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '20px', textDecoration: 'none' }}>
  Order Now
</Link>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section1
