//Promise 형태로 변경
function asyncFunc1 ()  {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
          console.log('함수1 완료');
          resolve('결과1');
       }, 1000);
    });
 }
 
 function asyncFunc2() {
    return new Promise((resolve, reject) =>{
       setTimeout(() => {
          console.log('함수2 완료');
          resolve('결과2');
       }, 1000);
    });
 }

async function excuteOperations() {
    try {
        const response1 = await asyncFunc1();
        const response2 = await asyncFunc1(response1);
        const response3 = await asyncFunc1(response2);
        const response4 = await asyncFunc1(response3);

        console.log('최종결과:', response4);
   } catch(error) {
        console.log('에러발생', error);
   }
}

excuteOperations();