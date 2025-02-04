const MyArr=[ 1 , 5 , 7 , 9 ,12 , 18];

MyArr.push(33);
console.log(MyArr);

console.log(`-------------------------------------------------`)
// MyArr.pop();
// console.log(MyArr);


//Splice vs Slice

const vec2=MyArr.slice(3,5);
//sliced array return till  index-1 so 3 to 4 only
console.log(vec2);
console.log(`-------------------------------------------------`)

//old array
console.log(MyArr);

console.log(`-------------------------------------------------`)

// const vec3=MyArr.splice(3,1);
// const vec3=MyArr.splice(3,4);
const vec3=MyArr.splice(3,2);
console.log(vec3);

console.log(`-------------------------------------------------`)

console.log(MyArr);


