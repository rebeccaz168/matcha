// src/components/ColorFinder.js
import React, { useEffect, useState } from 'react';
import ColorThief from 'color-thief';
import colorNameList from 'color-name-list';

const ColorFinder = ({ imageSrc }) => {
  const [closestColor, setClosestColor] = useState('');

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        findClosestColor(dominantColor);
      };
    }
  }, [imageSrc]);

  const findClosestColor = (color) => {
    const [r, g, b] = color;
    let closestColor = '';
    let minDistance = Infinity;

    colorNameList.forEach(({ name, rgb }) => {
      const [cr, cg, cb] = rgb;
      const distance = Math.sqrt(
        Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestColor = name;
      }
    });

    setClosestColor(closestColor);
  };

  return <div>Closest shade of green: {closestColor}</div>;
};

export default ColorFinder;
