import React, { useState } from "react";
import '../App/App.css';
import PropTypes from "prop-types";
const intialValues = {
    weight: '',
    height: '',
    data: ''

}


const Form = ({ change }) => {

    const [state, setstate] = useState(intialValues);
    const handelChange = e => {

        let { value, name } = e.target;
        if (value > 999) {
            value = 999;
        }

        const data = new Date().toDateString().split(',')[0];
        setstate({

            ...state,
            [name]: value,
            date
        });

    }

    const handleSubmit = () => {

        change(state);
        setstate(intialValues);

    }
    return (

        <>

            <div className="row">
                <div className="col m6 s12">
                    <label htmlFor="weight"> Discount</label>

                    <input
                        id="weight"
                        name="weight"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="99"
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}
                        value={state.weight}
                        onChange={handelChange}
                    />

                </div>


                <div className="col m6 s12">

                    <label htmlFor="height"

                    > Total </label>

                    <input
                        id="height"
                        name="height"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="1200"
                        value={state.height}
                        onChange={handelChange}
                        style={{ color: "red ", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "400px" }}
                    />



                </div>

            </div>


            <div className="center">
                {/* <button

                    id='bmi-btn'
                    className="calculate-btn"
                    type="button"
                    disabled={state.weight === '' || state.height === ''}
                    onClick={handleSubmit}
                    style={{ color: "black ", fontWeight: "bold", backgroundColor: "white", borderRadius: "10px", width: "200px" }}> Go 
                    
                    </button> */}


            </div>

        </>



    );


}

Form.prototypes = {
    change: PropTypes.func.isRequired
}

export default Form;