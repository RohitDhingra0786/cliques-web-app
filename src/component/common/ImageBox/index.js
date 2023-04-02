import React from "react";
import { getImageUrl } from "utils";

const ImageBox = ({ images }) => {
  let rows = [];
  let row = [];
  for (let i = 0; i < images.length; i++) {
    row.push(images[i]);
    if (row.length === 2 || i === images.length - 1) {
      rows.push(row);
      row = [];
    }
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((image, index) => (
            <div key={index} style={{ marginRight: 10 }}>
              {image}
              {/* <img
                src={getImageUrl(image)}
                alt={`image-${index}`}
                style={{ width: "100%", height: "100%" }}
              /> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageBox;
