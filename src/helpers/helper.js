import jsonData from "../anagrams.json";
import React, { useState, useEffect } from 'react';

//prevArray is passed in to make sure repeat arrays aren't picked again
//wordlen is a Num object which is the length of each word in the randomly picked array and is the key to index into the JSON object with
export default function nextArray(userWordLen) {
  // if (!jsonData[userWordLen]) {
  //   return [];
  // }
  let selectedLenArray = jsonData[userWordLen];
  let randIndex = randInt(0, selectedLenArray.length - 1);
  return selectedLenArray[randIndex];
}

export function randInt(low, high) {
  const rndDec = Math.random();
  return Math.floor(rndDec * (high - low + 1) + low);
}