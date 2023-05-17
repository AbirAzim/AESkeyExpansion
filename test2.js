function multiplicationOfPolynomials(a, b){
  let returnPolynomials = [];
  let returnBinary = [];

  for(let i = 0; i < a.length; i++){
    for(let j = 0; j < b.length; j++){
      let value = a[i].power + b[j].power;

      if(value === 8){
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


export default function hexaDecimalMultiply(a,b){
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
