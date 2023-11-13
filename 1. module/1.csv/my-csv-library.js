const fs = require('fs');

//csv 파일을 읽어서 데이터를 반환하는 함수
function readCSV(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err,data) => {
    
    if(err) {
        console.error('파일을 읽는 중에 오류가 발생했습니다.', err);
        return callback(err, null);
    }
    const rows = data.split('\n');
    const result = rows.map((row) => row.split(','));

    callback (null, result);
    });
}

//데이터를 받아 csv 파일에 쓰는 함수
function writeCSV(filePath, dataToWrite, callback) {
    const csvContent = dataToWrite.map((row)=> row.join(',')).join('\n');
    
    fs.writeFile(filePath, csvContent, 'utf8', (err) => {
        if(err) {
            console.error("파일을 쓰는 도중에 에러가 발생하였습니다", err);
            return callback(err);
        }
        callback(null);
    });
}

const sampleData = [
    ['이름', '생년월일', '성별'],
    ['이지연', '19820101', '여'],
    ['정유연', '19920101', '여'],
    ['조은지', '19951011', '여'],
    ['장은채', '19980112', '여'],
    ['장민호', '19960522', '남'],
    ['박은영', '19950312', '여'],
    ['김태훈', '19950227', '남'],
    ['한지은', '19880110', '여'],
    ['황정훈', '19960512', '남'],
    ['박지한', '19970327', '남'],
    ['이주영', '19970222', '여'],
    ];

const filePath = 'user.csv';

//샘플 데이터를 100번 반복해서 추가
// const repeatedData = Array.from( { length: 100}, ()=> sampleData).flat();

//샘플 데이터를 100번 반복해서 추가(타이틀을 제외한 10개의 데이터만 반복)
const repeatedData = Array.from({ length: 100 }, (_, index) => (index === 0 ? sampleData[0] : sampleData.slice(1)[index % 10]));
console.log(repeatedData);

console.log("쓰기 시작");
// CSV 파일 쓰기
writeCSV(filePath, repeatedData, (err) => {
    if (err) {
        console.error('CSV 파일 쓰기 실패:', err);
        return;
    }

    console.log('데이터가 성공적으로 CSV 파일에 쓰여졌습니다.');
});
console.log("쓰기 완료");

console.log("읽기 시작");
// CSV 파일 읽기
readCSV(filePath, (err, data) => {
    if (err) {
        console.error('CSV 파일 읽기 실패:', err);
        return;
    }

    console.log('CSV 파일 내용:', data);
});
console.log("읽기 완료");