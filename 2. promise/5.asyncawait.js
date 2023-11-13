function externalAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Math.random() >= 0.8;  
            if (result) {
                resolve("결과 왔음");
            } else {
                reject("응답 없음");
            }
        }, 1000);//실제 네트워크 응답을 시뮬레이션 하기 위한 값(1초)
    });
}


async function waitForResult() {
    try {
        result = await externalAPI();
        console.log("결과도착:",result);
    } catch (error) {
        console.error(`에러발생:${error}`);
        return new Promise((resolve) => {
                setTimeout(waitForResult, 1000);
                //재시도 할때까지 대기 하기 위한 값(1초)
        })
    }
}
console.log("실행완료");
waitForResult().then((finalResult) => {
    console.log("최종 비동기 결과는??", finalResult);
})
