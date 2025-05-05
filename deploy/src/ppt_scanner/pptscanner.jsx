import { useState } from "react";

import QRCode from "react-qr-code";

export default function Ppt_scanner() {
  const [loading, setISloading] = useState(false);
  const [code, setCode] = useState("");
  const [input, SetInput] = useState("");

  // This only you cn consider 

  function handelpptscanner() {

    if (loading) {
      setISloading(false);
      setCode(input);
      SetInput("");

    }

  }


  return (
    <div>
      <h1> Your PPT Scanner here </h1>
      <div ><input
        onChange={(e) => SetInput(e.target.value)}
        type=" text"
        name=" ppt Scanner here  "
        placeholder=" Yor data here " />
        <button onClick={() => handelpptscanner()}
        >
          Scanner

        </button>
      </div>


      <div className="Scanner">
        <QRCode
          id=" code_id "
          value={code}
          size={200}

        />
      </div>

    </div>

  );
}