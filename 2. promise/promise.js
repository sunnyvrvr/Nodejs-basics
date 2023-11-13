// 대기(Pending): 비동기 작업이 아직 완료되지 않은 초기 상태입니다.
// 이행(Fulfilled): 비동기 작업이 성공적으로 완료된 상태를 나타냅니다.
// 거부(Rejected): 비동기 작업이 실패한 상태를 나타냅니다.

const myPromise = new Promise((resolve, reject) => {
    //비동기 작업이 여기에서 수행
    //완료되면 resolve() 호출
    //실패하면 reject() 호출
})

// Promise 호출 사용
myPromise 
    .then((result) => {
        //성공
    })
    .then((err) => {
        //에러
    })

function asyncTask(callback) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            const rand = Math.random();
            if(rand >= 0.5) {
                resolve("작업완료");        
            } else {
                reject("작업실패");
            }
        }, 1000);
    });
}

asyncTask()
    .then((result) => {
        console.log('성공:', result);
    })
    .catch((error) => {
        console.log('실패:', error);      
    })