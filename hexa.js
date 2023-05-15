function hexa(myString){
  var hex, i;
  let myArray = []

  var result = "";
  let tempArray = []
  let k = 1;
  for (i=0; i<myString.length; i++) {

      hex = myString.charCodeAt(i).toString(16);
      
      console.log(k);
      console.log(k % 4)

      if(k % 4 === 0){
        tempArray.push(hex)
        console.log(tempArray)
        myArray.push(tempArray)
        tempArray = [];
        k++
      } else {
        tempArray.push(hex)
        k++
      }
  }

  return myArray;
}

function xor(hex1, hex2) {
  const buf1 = Buffer.from(hex1, 'hex');
  const buf2 = Buffer.from(hex2, 'hex');
  const bufResult = buf1.map((b, i) => b ^ buf2[i]);
  return bufResult.toString('hex');
}

console.log(xor('4f', '73'));