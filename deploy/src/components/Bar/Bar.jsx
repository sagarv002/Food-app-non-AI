import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Bar = ({ labelData, bmiData }) => {
  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(63, 100, 300, 1000);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'black');

    return {
      // labels: labelData,
      // datasets: [
      //   {
        
         
      //   }
      // ]
    };
  };

  const options = {
    responsive: true,
    scales: {
      // xAxes: [
      //   {
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Date',
      //       fontSize: 18,
      //       fontColor: 'white'
      //     },
      //     gridLines: {
      //       display: false,
      //       color: 'white'
      //     },
      //     ticks: {
      //       fontColor: 'white',
      //       fontSize: 16
      //     }
      //   }
      // ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Graph',
            fontSize: 18,
            fontColor: 'white'
          },
          // gridLines: {
          //   display: false,
          //   color: 'white'
          // },
          // ticks: {
          //   fontColor: 'white',
          //   fontSize: 16,
          //   beginAtZero: true
          // }
        }
      ]
    },
    tooltips: {
      titleFontSize: 13,
      bodyFontSize: 13
    }
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

Bar.propTypes = {
  labelData: PropTypes.array,
  bmiData: PropTypes.array
};

export default Bar;
