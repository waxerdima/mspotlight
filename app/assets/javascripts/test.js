var
  s = 'kjsdfbgksdf k sdfkjg kjg .wjer jg we .kj r/lgj w/erlh/lewrlhkwre/ kjadfgklwrbe/lbwerlkghlrebnghlkerbhkewrnlkhewrkhnkwnhr',
  x = 1,
  test_no_camel_case = 5,
  testObject = {};

testObject['test_no_camel_case2'] = 1;

function test2(a, b, c, d) {
  return a + b + c + d;
}

function test3(a, b) {
  if (a == b) {
    return 'a=b';
  }
  return 'a!=b';
}

function test(a, b, c) {
  return a + b + c;
}

location.href = "";
test2(1, 2, 3, 4);
test3(1, 2);
console.log(test_no_camel_case);
console.log(testObject['test_no_camel_case2']);
