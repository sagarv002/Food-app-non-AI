import { useEffect, useState } from "react"
import data from "./data"
import "./style.css"

export default function Elements() {
  const [selected, isSelected] = useState(null);
  const [scrollpercentage, setScrollpercentage] = useState(0);
  function track(yourid) {
    isSelected(yourid === selected ? null : yourid);
  }




  function handelscrollpercentage() {
    const howmuchscrolled = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    setScrollpercentage((howmuchscrolled / height) * 100);
  }

  useEffect(() => {
    window.addEventListener('scroll', handelscrollpercentage)

    return () => {
      window.removeEventListener('scroll', () => { })
    }

  }, [])





  return (

    <>
      <div className="Top-container">
        <h1> Image compressor  </h1>
        <div className="scroll-progress-tracking-conatiner">
          <div className="current-progress-bar" style={{ width: '${scrollpercentage}%' }}>
          </div>
        </div>
      </div>

      <div className=" Elements">
        <div className="elementsselector">

          {
            data ?
              data.map((dataid) => <div className=" teams">

                <div onClick={() => Selection(dataid.id)} className="ai">
                  <h3> {dataid.name}</h3>
                  <span>+</span>
                </div>
                {
                  selected === dataid.id ? <div className="Elements_type"> {dataid.country}</div> : null
                }
              </div>) : <div> element not fuound </div>
          }

        </div>
      </div></>);
}