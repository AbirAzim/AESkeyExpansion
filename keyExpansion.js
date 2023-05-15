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

console.log(result)