import React from "react";

export default function ButtonCstm({event, text, img , color, hover, radius,}) {
    return (
        <button type="submit" onClick={event} className={`py-2 px-16 ${color} ${radius} font-medium hover:${hover}`}>
            {text}
        <img className="w-10" src={img} />
        </button>
    )
}