var assert = require('assert');


describe('return binary period', function(){
  it('for different numbers', function(){

    assert(4 == task(955), "binary period of 955 (1110111011) is 4");
    assert(0 == task(102), "binary period of 102 (1100110) is 0");
    assert(3 == task(45), "binary period of 45 is 3");
    assert(2 == task(21), "binary period of 21 is 2");
    assert(5 == task(561), "binary period of 1000110001 (561) is 5");
    assert(5 == task(2247), "binary period of 100011000111 (2247) is also 5");
  })
})

var task = function(val) {

  var bin = val.toString(2);
  console.log('binary: ' + bin);

  for (var i =  Math.floor(bin.length/2); i>1; i--) {

    var regex = new RegExp('.{1,' + i + '}', 'g');
    // split binary into chunkes - starting from half and half, and decreasing size of chunk
    var chunkes = bin.match(regex);

    // remove last chunk - for odd numbers, as only even chunks count as a period
    if (chunkes.length % 2 != 0) {
      chunkes.pop();
    }

    var isPeriod = checkPeriod(i, chunkes);
    if (isPeriod) {
      console.log('binary period: ' + i);
      return i;
    }
  }

  console.log("binary period not found");
  return 0;
}

var checkPeriod = function(value, chunkes) {
  // get first chunk to compare with others
  var chunk = chunkes[0];
  
  var isPeriod = false;
  for (var c = 1; c< chunkes.length; c++) {
    if (chunk === chunkes[c]) {
      isPeriod = true;
    } else {
      isPeriod = false;
      break;
    }
  }

  return isPeriod;
}

//A non-empty zero-indexed string S consisting of Q characters is given. The period of this string is the smallest positive integer P such that:
//  P ≤ Q / 2 and
//S[K] = S[K+P] for 0 ≤ K < Q − P.
//  For example, 8 is the period of "codilitycodilityco".
//  A positive integer M is the binary periodof a positive integer N if M is the period of the binary representation of N.
//  For example, 4 is the binary period of 955, because the binary representation of 955 is "1110111011" and its period is 4. On the other hand, 102 does not have a binary period, because its binary representation is "1100110" and it does not have a period.
//  Write a function:
//function solution(N);
//that, given a positive integer N, returns the binary period of N. The function should return −1 if N does not have a binary period.
//  For example, given N = 955 the function should return 4, and given N = 102 the function should return −1, as explained in the example above.
//  Assume that:
//  N is an integer within the range [1..1,000,000,000].
//Complexity:
//  expected worst-case time complexity is O(log(N)2);
//expected worst-case space complexity is O(log(N)).

