/*
 Functions to conjugate verbs 
  German present

 */

// Remove information in parenthesis and extra spaces 
const removeParenthesis = (verb) => {
  return verb.replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '').trim();
};

// Get stem of verb
const getStem = (verb) => {
  var infinitive =  removeParenthesis(verb); 
  var intLen = infinitive.length;
  var ending = infinitive.substring(intLen-2);
  
  if (ending === 'en') {
    return infinitive.substring(0, intLen-2);
  } else {
    return infinitive.substring(0, intLen-1);
  }
};

// Regular expression for stem ending checks
const regExpDT = /[dt]$/;
const regExpMN = /(b|ch|d|f|g|p|t)[nm]$/;
const regExpS = /[szxß]$/;

// Check the ending of the stem
const stemCheck = (stem, person) => { 
  
  if (person === 'du') {
    if (regExpDT.test(stem) || regExpMN.test(stem)) {
      return stem + 'est';
    } else if (regExpS.test(stem)) {
      return stem + 't';
    } else {
      return stem + 'st';
    }
  }
  
  if (person === 'er') {
    if (regExpDT.test(stem) || regExpMN.test(stem)) {
      return stem + 'et';
    } else {
      return stem + 't';
    }
  }
  
  if (person === 'ihr') {
    if (regExpDT.test(stem) || regExpMN.test(stem)) {
      return stem + 'et';
    } else {
      return stem + 't';
    }
  }
  
};

const conjugateIch = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'ete';
    } else {
      return stem + 'te';
    } 
  } else {
    stem = getStem(verb);
    return stem + 'e';
  }
};

const conjugateDu = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'etest';
    } else {
      return stem + 'test';
    } 
  } else {
    stem = getStem(verb);
    return stemCheck(stem, 'du');
  }
};

const conjugateEr = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'ete';
    } else {
      return stem + 'te';
    } 
  } else {
    stem = getStem(verb);
    return stemCheck(stem, 'er');
  }
    
};

const conjugateWir = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'eten';
    } else {
      return stem + 'ten';
    } 
  } else {
    return removeParenthesis(verb);
  }
};

const conjugateIhr = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'etet';
    } else {
      return stem + 'tet';
    } 
  } else {
    stem = getStem(verb);
    return stemCheck(stem, 'ihr');
  }
};

const conjugateSie = (verb, tense) => {
  let stem;
  if (tense === 'imperfect') {
    stem = getStem(verb);
    
    if (regExpDT.test(stem)) {
      return stem + 'eten';
    } else {
      return stem + 'ten';
    } 
  } else {
    return removeParenthesis(verb);
  }
};

// Export functions
const conjugatePresent = (verb) => {
  return [
    conjugateIch(verb),
    conjugateDu(verb),
    conjugateEr(verb),
    conjugateWir(verb),
    conjugateIhr(verb),
    conjugateSie(verb)
  ]
}

const conjugatePerfect = (verb, type, separable) => {
  let perfect;
  let stem;
  if (type === 'strong' && separable === 'yes') {
    
    // get everthing after the mid dot as the stem
    // if there are stem changes make them, maybe move this into get stem
    // do changes to make separable
    
    perfect = removeParenthesis(verb).replace(/·/g, 'ge');
    
  } else if (type === 'strong' && separable === 'no') {

    
    // if there are stem changes make them, maybe move this into get stem
    // do changes to make separable

    perfect = 'ge' + removeParenthesis(verb);
  } else if (type === 'weak' && separable === 'yes') {
    stem = getStem(verb);
    perfect = stemCheck(stem, 'er').replace(/·/g, 'ge');
  } else if (type === 'weak' && separable === 'no') {
    stem = getStem(verb);
    perfect = 'ge' + stemCheck(stem, 'er');
  }

  return perfect;
};

const conjugateImperfect = (verb, type) => {
  
  if (type === 'strong') {
    //const perfect = 'ge' + removeParenthesis(verb);

    return [
      conjugateIch(verb),
      conjugateDu(verb),
      conjugateEr(verb),
      conjugateWir(verb),
      conjugateIhr(verb),
      conjugateSie(verb)
    ]
    
  } else if (type === 'weak') {
    return [
      conjugateIch(verb, 'imperfect'),
      conjugateDu(verb, 'imperfect'),
      conjugateEr(verb, 'imperfect'),
      conjugateWir(verb, 'imperfect'),
      conjugateIhr(verb, 'imperfect'),
      conjugateSie(verb, 'imperfect')
    ]
  
  }
  
};

export { conjugatePresent, conjugatePerfect, conjugateImperfect };
