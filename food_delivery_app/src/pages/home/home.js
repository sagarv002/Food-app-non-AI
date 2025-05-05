import React from 'react'
import Layout from '../../components/layouts/layout';
import Section1 from './Section1';
import "../../styles/homestyle.css"
import Section3 from"./Section3"
import Section2 from './Section2';
import Section4 from "./Section4";
import Section5 from "./section5";
import Section6 from "./Section6";
function Home() {
  return (
    <>
  
        <Layout>
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>
        <Section6/>
        </Layout>
       

    </>
  );
}

export default Home;
