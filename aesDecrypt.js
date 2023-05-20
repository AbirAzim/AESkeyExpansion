
function asciiToHex(ascii){
  let result = ascii.charCodeAt(0);
  let hex = result.toString(16);
  return hex
 }
 
 function xor(hex1, hex2) {
   const buf1 = Buffer.from(hex1, 'hex');
   const buf2 = Buffer.from(hex2, 'hex');
   const bufResult = buf1.map((b, i) => b ^ buf2[i]);
   return bufResult.toString('hex');
 }
 
 function keyExpansion(key){
   let round0 = [];
   let allRoundKeys = [];
   for(let i = 0; i < key.length; i++){
     round0.push(asciiToHex(key[i]));
   }
 
   allRoundKeys.push(round0);
   let roundKey = round0;
   
   for(let i = 0; i < 10; i++){
     roundKey = keyExpansionGFunction(roundKey, i);
     allRoundKeys.push(roundKey);
   }
   return allRoundKeys;
 }
 
 function keyExpansionGFunction(data, round){
   
 let recon = ['01', '02', '04', '08', '10', '20', '40', '80', '1b', '36']
 
   let lastWord = [ data[13], data[14], data[15], data[12]];
   let lastWordSBox = [];
 
   for(let i = 0; i < 4; i++){
     lastWordSBox.push(sBoxFunction(lastWord[i]));
   }
 
   let tempWord = lastWordSBox;
   let returnData = []
 
   for(let i = 0; i < 4; i++){
       let columnData = [];
       for(let j = (i*4); j < (i*4)+4; j++){
         let xor1 = '';
         if(j === 0 ){
           xor1 = xor(tempWord[0], recon[round])
         } else {
           xor1 = xor(tempWord[j % 4], '00')
         }
 
         let xor2 = xor(xor1, data[j])
         columnData.push(xor2)
       }
       tempWord = columnData;
       returnData.push(...columnData);
   }
 
   return returnData;
 }
 
 
 function sBoxFunction(data){
   let sBox = [
     ['63', "7c", "77", "7b", "f2", "6b", "6f", "c5", "30", "01", "67", "2b", "fe", "d7", "ab", "76"],
     ["ca", "82", "c9", "7d", "fa", "59", "47", "f0", "ad", "d4", "a2", "af", "9c", "a4", "72", "c0"],
     ["b7", "fd", "93", "26", "36", "3f", "f7", "cc", "34", "a5", "e5", "f1", "71", "d8", "31", "15"],
     ["04", "c7", "23", "c3", "18", "96", "05", "9a", "07", "12", "80", "e2", "eb", "27", "b2", "75"],
     ["09", "83", "2c", "1a", "1b", "6e", "5a", "a0", "52", "3b", "d6", "b3", "29", "e3", "2f", "84"],
     ["53", "d1", "00", "ed", "20", "fc", "b1", "5b", "6a", "cb", "be", "39", "4a", "4c", "58", "cf"],
     ["d0", "ef", "aa", "fb", "43", "4d", "33", "85", "45", "f9", "02", "7f", "50", "3c", "9f", "a8"],
     ["51", "a3", "40", "8f", "92", "9d", "38", "f5", "bc", "b6", "da", "21", "10", "ff", "f3", "d2"],
     ["cd", "0c", "13", "ec", "5f", "97", "44", "17", "c4", "a7", "7e", "3d", "64", "5d", "19", "73"],
     ["60", "81", "4f", "dc", "22", "2a", "90", "88", "46", "ee", "b8", "14", "de", "5e", "0b", "db"],
     ["e0", "32", "3a", "0a", "49", "06", "24", "5c", "c2", "d3", "ac", "62", "91", "95", "e4", "79"],
     ["e7", "c8", "37", "6d", "8d", "d5", "4e", "a9", "6c", "56", "f4", "ea", "65", "7a", "ae", "08"],
     ["ba", "78", "25", "2e", "1c", "a6", "b4", "c6", "e8", "dd", "74", "1f", "4b", "bd", "8b", "8a"],
     ["70", "3e", "b5", "66", "48", "03", "f6", "0e", "61", "35", "57", "b9", "86", "c1", "1d", "9e"],
     ["e1", "f8", "98", "11", "69", "d9", "8e", "94", "9b", "1e", "87", "e9", "ce", "55", "28", "df"],
     ["8c", "a1", "89", "0d", "bf", "e6", "42", "68", "41", "99", "2d", "0f", "b0", "54", "bb", "16"] ];
 
     let row = '-1';
     let column = '-1';
 
    if(data.charAt(0) === 'a'){
     row = 10
    } else if(data.charAt(0) === 'b'){
     row = 11
    } else if(data.charAt(0) === 'c'){
     row = 12
    } else if(data.charAt(0) === 'd'){
     row = 13
    } else if(data.charAt(0) === 'e'){
     row = 14
    }else if(data.charAt(0) === 'f'){
     row = 15
    } else {
     row = parseInt(data[0])
    }
 
    if(row === -1){
     return -1
    }
 
    if(data.charAt(1) === 'a'){
     column = 10
    } else if(data.charAt(1) === 'b'){
     column = 11
    } else if(data.charAt(1) === 'c'){
     column = 12
    } else if(data.charAt(1) === 'd'){
     column = 13
    } else if(data.charAt(1) === 'e'){
     column = 14
    }else if(data.charAt(1) === 'f'){
     column = 15
    } else {
     column = parseInt(data[1])
    }
 
    if(column === -1){
     return -1
    }
 
   return sBox[row][column]
 
 }


 function inverseSBoxFunction(data){
  let sBox = [
    ['52', "09", "6a", "d5", "30", "36", "a5", "38", "bf", "40", "a3", "9e", "81", "f3", "d7", "fb"],
    ["7c", "e3", "39", "82", "9b", "2f", "ff", "87", "34", "8e", "43", "44", "c4", "de", "e9", "cb"],
    ["54", "7b", "94", "32", "a6", "c2", "23", "3d", "ee", "4c", "95", "0b", "42", "fa", "c3", "4e"],
    ['08', '2e', 'a1', '66', '28', 'd9', '24', 'b2', '76', '5b', 'a2', '49', '6d' ,'8b', 'd1', '25'],
    ["72", "f8", "f6", "64", "86", "68", "98", "16", "d4", "a4", "5c", "cc", "5d", "65", "b6", "92"],
    ["6c", "70", "48", "50", "fd", "ed", "b9", "da", "5e", "15", "46", "57", "A7", "8d", "9d", "84"],
    ["90", "d8", "ab", "00", "8c", "bc", "d3", "0a", "f7", "e4", "58", "05", "b8", "b3", "45", "06"],
    ["d0", "2c", "1e", "8f", "ca", "3f", "0f", "02", "c1", "af", "bd", "03", "01", "13", "8a", "6b"],
    ["3a", "91", "11", "41", "4f", "67", "dc", "ea", "97", "f2", "cf", "ce", "f0", "b4", "e6", "73"],
    ["96", "aC", "74", "22", "e7", "ad", "35", "85", "e2", "f9", "37", "e8", "1c", "75", "df", "6e"],
    ["47", "f1", "1a", "71", "1d", "29", "c5", "89", "6f", "b7", "62", "0e", "aa", "18", "be", "1b"],
    ["fc", "56", "3e", "4b", "c6", "d2", "79", "20", "9a", "db", "c0", "fe", "78", "cd", "5a", "f4"],
    ["1f", "dd", "a8", "33", "88", "07", "c7", "31", "b1", "12", "10", "59", "27", "80", "ec", "5f"],
    ["60", "51", "7f", "a9", "19", "b5", "4a", "0d", "2d", "e5", "7a", "9f", "93", "c9", "9c", "ef"],
    ["a0", "e0", "3b", "4d", "ae", "2a", "f5", "b0", "c8", "eb", "bb", "3c", "83", "53", "99", "61"],
    ["17", "2b", "04", "7e", "ba", "77", "d6", "26", "e1", "69", "14", "63", "55", "21", "0c", "7d"] ];

    let row = '-1';
    let column = '-1';

   if(data.charAt(0) === 'a'){
    row = 10
   } else if(data.charAt(0) === 'b'){
    row = 11
   } else if(data.charAt(0) === 'c'){
    row = 12
   } else if(data.charAt(0) === 'd'){
    row = 13
   } else if(data.charAt(0) === 'e'){
    row = 14
   }else if(data.charAt(0) === 'f'){
    row = 15
   } else {
    row = parseInt(data[0])
   }

   if(row === -1){
    return -1
   }

   if(data.charAt(1) === 'a'){
    column = 10
   } else if(data.charAt(1) === 'b'){
    column = 11
   } else if(data.charAt(1) === 'c'){
    column = 12
   } else if(data.charAt(1) === 'd'){
    column = 13
   } else if(data.charAt(1) === 'e'){
    column = 14
   }else if(data.charAt(1) === 'f'){
    column = 15
   } else {
    column = parseInt(data[1])
   }

   if(column === -1){
    return -1
   }

  return sBox[row][column]

}
 
 
 // let result = keyExpansionGFunction(['47', '37', '94', 'ed', '40', 'd4', 'e4', 'a5', 'a3', '70', '3a', 'a6', '4c', '9f', '42', 'bc'], 0)
 
 // let result = keyExpansion(['54', '68', '61', '74', '73', '20', '6d', '79', '20', '4b', '75', '6e', '67', '20', '46', '75'])
 
 let result = keyExpansion('Thats my Kung Fu')

//  console.log("re",result[10])
 
 
 
 
 
 function AESEncryption(cipherText){
 
   let hexMatrix = [];
 
   for(let i=0; i<cipherText.length; i++){
     hexMatrix.push(asciiToHex(cipherText[i]));
   }
 
   let initialStateArray = addRoundKey(hexMatrix, 0);
   let tempStateArray  = initialStateArray
 
   for(let i=0; i< 10; i++){
     for(let j=0; j< 16; j++){
       let tempSBox = sBoxFunction(tempStateArray[j])
       tempStateArray[j] = tempSBox
     }
 
     tempStateArray = shiftRows(tempStateArray)
 
     //console.log(tempStateArray)
 
     if(i !== 9){
       tempStateArray = mixColumns(tempStateArray)
       // console.log(tempStateArray)
 
     }
 
     tempStateArray = addRoundKey(tempStateArray, i+1)
   }

   console.log(tempStateArray)
 
   let hexText = hexToText(tempStateArray)
 
   console.log(hexText)
 }
 
 function AESDecryption(cipherText){
 
   let hexMatrix = cipherText;

  //  console.log(cipherText[11])
  //  console.log(cipherText[12])
 
  //  for(let i=0; i<cipherText.length; i++){
  //    hexMatrix.push(asciiToHex(cipherText[i]));
  //  }

  //  console.log(hexMatrix);
 
   let initialStateArray = addRoundKey(hexMatrix, 10);
   let tempStateArray  = initialStateArray
 
   for(let i=9; i>= 0; i--){
    //  for(let j=0; j< 16; j++){
    //    let tempSBox = sBoxFunction(tempStateArray[j])
    //    tempStateArray[j] = tempSBox
    //  }
 
     tempStateArray = inverseShiftRows(tempStateArray)

      for(let j=0; j< 16; j++){
       let tempSBox = inverseSBoxFunction(tempStateArray[j])
       tempStateArray[j] = tempSBox
     }

     tempStateArray = addRoundKey(tempStateArray, i)
 
     if(i !== 0){
      tempStateArray = inverseMixColumns(tempStateArray)
      // console.log(tempStateArray)
    }
         
   }
 
   let hexText = hexToText(tempStateArray)
 
   console.log(hexText)
 }
 
 
 function addRoundKey(hexMatrix, rounds){
   let key = result[rounds];
   let returnData = [];
 
   for(let i=0; i< 16; i++){
     returnData.push(xor(hexMatrix[i], key[i]))
   }
 
   return returnData;
 }
 
 function shiftRows(hexMatrix) {
   let returnData = [];
   for(let i=0; i< 16; i+= 4) {
     let temp = i;
     for(let j=0; j< 4; j++){
       // console.log(temp)
       returnData.push(hexMatrix[temp]);
       temp +=  5;
       temp %= 16;
     }
   }
   return returnData;
 }

 function inverseShiftRows(hexMatrix) {
  let returnData = [];
  for(let i=0; i< 16; i+= 4) {
    let temp = i;
    for(let j=0; j< 4; j++){
      // console.log(temp)
      returnData.push(hexMatrix[temp]);
      temp +=  13;
      temp %= 16;
    }
  }
  return returnData;
}
 
 function binaryXorAndHexReturn(array){
   let binary = '';
   for(let i=0; i< 8; i++) {
     let count = 0;
     for(let j=0; j< 4; j++) {
       count+= array[j][i]; 
     }
     if(count === 0){
       binary = binary.concat('0')
     } else if(count % 2 === 0) {
       binary = binary.concat('0')
     } else {
       binary = binary.concat('1')
     }
   }
 
   let binaryToHex = parseInt(+binary, 2).toString(16);
 
   if(binaryToHex.length == 1){
     binaryToHex= '0'+binaryToHex;
   }
 
   return binaryToHex;
 }
 
 function mixColumns(hexMatrix) {
   let startHexMatrix = 0;
   let returnData = [];
 
   for(let i = 0; i < 4; i++) {
     for(let j = 0; j < 4; j++) {
       let temp = getMixColumnValue(j, hexMatrix, startHexMatrix)
       returnData.push(temp)
     }
     
     startHexMatrix += 4
     // let constantMatrixIndex = i % 4;
     // let takenConstantMatrix = constantMAtrix[constantMatrixIndex];
   }
 
   return returnData;
 }

 function inverseMixColumns(hexMatrix) {
  let startHexMatrix = 0;
  let returnData = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      let temp = inverseGetMixColumnValue(j, hexMatrix, startHexMatrix)
      returnData.push(temp)
    }
    
    startHexMatrix += 4
    // let constantMatrixIndex = i % 4;
    // let takenConstantMatrix = constantMAtrix[constantMatrixIndex];
  }

  return returnData;
}

function inverseGetMixColumnValue(j, hexMatrix, startHexMatrix) {
  let constantMAtrix =  [['0e', '0b', '0d', '09'], ['09', '0e', '0b', '0d'], ['0d', '09', '0e', '0b'], ['0b', '0d', '09', '0e']]

  let takenConstantMatrix = constantMAtrix[j];
  let myProcessingArray = [];
  let xorOperationArray = []

  for(let i = 0; i < 4; i++) {
    myProcessingArray.push(hexMatrix[startHexMatrix + i])
  }
// 2 -> 4
 for(let i = 0; i < 4; i++) {
  console.log("t",takenConstantMatrix[i]);
  console.log("p", myProcessingArray[i]);
  let value = hexaDecimalMultiply(takenConstantMatrix[i], myProcessingArray[i])
  xorOperationArray.push(value)
 }

 let singleValueInHex = binaryXorAndHexReturn(xorOperationArray);

 return singleValueInHex;
}

 
 function getMixColumnValue(j, hexMatrix, startHexMatrix) {
   let constantMAtrix =  [['02', '03', '01', '01'], ['01', '02', '03', '01'], ['01', '01', '02', '03'], ['03', '01', '01', '02']]
 
   let takenConstantMatrix = constantMAtrix[j];
   let myProcessingArray = [];
   let xorOperationArray = []
 
   for(let i = 0; i < 4; i++) {
     myProcessingArray.push(hexMatrix[startHexMatrix + i])
   }
 
  for(let i = 0; i < 4; i++) {
   let value = hexaDecimalMultiply(takenConstantMatrix[i], myProcessingArray[i])
   xorOperationArray.push(value)
  }
 
  let singleValueInHex = binaryXorAndHexReturn(xorOperationArray);
 
  return singleValueInHex;
 }
 
 
 function multiplicationOfPolynomials(a, b){
   let returnPolynomials = [];
   let returnBinary = [];
 
   for(let i = 0; i < a.length; i++){
     for(let j = 0; j < b.length; j++){
       let value = a[i].power + b[j].power;

      //  console.log("v",value)
 
       if(value === 10){
         let power6 = returnPolynomials.findIndex(rp => {
           return rp.power === 6
         });
 
         let power5 = returnPolynomials.findIndex(rp => {
           return rp.power === 5
         })
 
         let power3 = returnPolynomials.findIndex(rp => {
           return rp.power === 3
         })
 
         let power2 = returnPolynomials.findIndex(rp => {
           return rp.power === 2
         })
 
         if(power6 !== -1){
           returnPolynomials[power6].count += 1
         }else {
           returnPolynomials.push({
             power: 6,
             count: 1
           })
         }
 
         if(power5 !== -1){
           returnPolynomials[power5].count += 1
         } else {
           returnPolynomials.push({
             power: 5,
             count: 1
           })
         }
 
         if(power3 !== -1){
           returnPolynomials[power3].count += 1
         } else {
           returnPolynomials.push({
             power: 3,
             count: 1
           })
         }
 
         if(power2 !== -1){
           returnPolynomials[power2].count += 1
         }else {
           returnPolynomials.push({
             power: 2,
             count: 1
           })
         }
       }
 
       else if(value === 9){
          let power5 = returnPolynomials.findIndex(rp => {
          return rp.power === 5
         })

         let power4 = returnPolynomials.findIndex(rp => {
           return rp.power === 4
         });
 
        //  let power3 = returnPolynomials.findIndex(rp => {
        //    return rp.power === 3
        //  })
 
         let power2 = returnPolynomials.findIndex(rp => {
           return rp.power === 2
         })
 
         let power1 = returnPolynomials.findIndex(rp => {
           return rp.power === 1
         })
 
         if(power5 !== -1){
          returnPolynomials[power5].count += 1
        } else {
          returnPolynomials.push({
            power: 5,
            count: 1
          })
        }
 
         if(power4 !== -1){
           returnPolynomials[power4].count += 1
         }else {
           returnPolynomials.push({
             power: 4,
             count: 1
           })
         }
 
         if(power2 !== -1){
           returnPolynomials[power2].count += 1
         }else {
           returnPolynomials.push({
             power: 2,
             count: 1
           })
         }
 
         if(power1 !== -1){
           returnPolynomials[power1].count += 1
         } else {
           returnPolynomials.push({
             power: 1,
             count: 1
           })
         }
 
 
        //  if(power0 !== -1){
        //    returnPolynomials[power0].count += 1
        //  } else {
        //    returnPolynomials.push({
        //      power: 0,
        //      count: 1
        //    })
        //  }
       }
 
       else if(value === 8){
         //irreducible polynomial theory 
         let power4 = returnPolynomials.findIndex(rp => {
           return rp.power === 4
         });
 
         let power3 = returnPolynomials.findIndex(rp => {
           return rp.power === 3
         })
 
         let power1 = returnPolynomials.findIndex(rp => {
           return rp.power === 1
         })
 
         let power0 = returnPolynomials.findIndex(rp => {
           return rp.power === 0
         })
 
         if(power4 !== -1){
           returnPolynomials[power4].count += 1
         }else {
           returnPolynomials.push({
             power: 4,
             count: 1
           })
         }
 
         if(power3 !== -1){
           returnPolynomials[power3].count += 1
         } else {
           returnPolynomials.push({
             power: 3,
             count: 1
           })
         }
 
         if(power1 !== -1){
           returnPolynomials[power1].count += 1
         } else {
           returnPolynomials.push({
             power: 1,
             count: 1
           })
         }
 
 
         if(power0 !== -1){
           returnPolynomials[power0].count += 1
         } else {
           returnPolynomials.push({
             power: 0,
             count: 1
           })
         }
       } else {
         let exist = returnPolynomials.findIndex(rp => {
           return rp.power === value
         })
 
         if(exist !== -1){
           returnPolynomials[exist].count += 1
         } else {
           returnPolynomials.push({
             power: value,
             count: 1
           })
         }
       }
     }
   }
 
   let filterDuplicates = returnPolynomials.filter(rp => {
     return rp.count % 2 !== 0
   })
 
   filterDuplicates = filterDuplicates.map(rp => {
     if(rp.count % 2 !== 0 && rp.count > 1){
       return {
         power: rp.power,
         count: 1
       }
     } else {
       return rp
     }
   })
 
   for(let i = 0; i <= 7; i++){
     let exist = filterDuplicates.findIndex(fd => {
       return fd.power === i
     })
 
     if(exist !== -1){
       returnBinary.push(1)
     } else {
       returnBinary.push(0)
     }
   }
 
   returnBinary = returnBinary.reverse()
 
 
   return returnBinary;
 }
 
 
 function hexaDecimalMultiply(a,b){
   let aBin = ("00000000" + (parseInt(a, 16)).toString(2)).substr(-8)
   let bBin = ("00000000" + (parseInt(b, 16)).toString(2)).substr(-8)

   console.log(aBin)
   console.log(bBin)
 
 
   let aXPolyNomialArray = [];
   let bXPolyNomialArray = [];
 
 
   let powerObjectMap = {
     0: 7,
     1: 6,
     2: 5,
     3: 4,
     4: 3,
     5: 2,
     6: 1,
     7: 0
   };
   
   for(let i = 7; i >= 0; i--){
     let aXPolyNomialObject = {
       value: +aBin[i],
       power: powerObjectMap[String(i)]
     };
 
     if(aXPolyNomialObject.value === 1){
       aXPolyNomialArray.push(aXPolyNomialObject);
     }
 
     let bXPolyNomialObject = {
       value: +bBin[i],
       power: powerObjectMap[String(i)]
     };
 
     if(bXPolyNomialObject.value === 1){
       bXPolyNomialArray.push(bXPolyNomialObject);
     }
   }
   
   console.log(aXPolyNomialArray)
   console.log(bXPolyNomialArray)
 
   return multiplicationOfPolynomials(aXPolyNomialArray, bXPolyNomialArray)
 
 }
 
 function hexToText(array){
   let returnString = '';
 
   for(let i=0; i< 16; i++){
     let input = array[i];
     let decimalValue = parseInt(input, 16); // Base 16 or hexadecimal
     let character = String.fromCharCode(decimalValue);
     returnString = returnString.concat(character)
     // console.log('returnString: ' + returnString);
   }
   return returnString;
 }
 
 
 
//  AESEncryption('Two One Nine Two')
AESDecryption(
  [
    '29', 'c3', '50', '5f',
    '57', '14', '20', 'f6',
    '40', '22', '99', 'b3',
    '1a', '02', 'd7', '3a'
  ]
);

// let tt =   [
//   '47', '37', '94', 'ed',
//   '40', 'd4', 'e4', 'a5',
//   'a3', '70', '3a', 'a6',
//   '4c', '9f', '42', 'bc'
// ]

// console.log("ss",inverseMixColumns(tt))