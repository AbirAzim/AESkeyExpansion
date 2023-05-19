
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


// let result = keyExpansionGFunction(['47', '37', '94', 'ed', '40', 'd4', 'e4', 'a5', 'a3', '70', '3a', 'a6', '4c', '9f', '42', 'bc'], 0)

// let result = keyExpansion(['54', '68', '61', '74', '73', '20', '6d', '79', '20', '4b', '75', '6e', '67', '20', '46', '75'])

let result = keyExpansion('Thats my Kung Fu')





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

  let hexText = hexToText(tempStateArray)

  console.log(hexText)
}

function AESDecryption(cipherText){

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
        let power4 = returnPolynomials.findIndex(rp => {
          return rp.power === 4
        });

        let power3 = returnPolynomials.findIndex(rp => {
          return rp.power === 3
        })

        let power2 = returnPolynomials.findIndex(rp => {
          return rp.power === 2
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


        if(power0 !== -1){
          returnPolynomials[power0].count += 1
        } else {
          returnPolynomials.push({
            power: 0,
            count: 1
          })
        }
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

  filterDuplicates = returnPolynomials.map(rp => {
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



AESEncryption('Two One Nine Two')