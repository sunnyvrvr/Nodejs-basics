const { readCSV, writeCSV } = require ('./my-csv-library');

const sampleData = [
    ['이름', '생년월일', '성별'],
    ['정유진', '19981101', '여'],
    ['정민규', '19901001', '남'],  
    ['성민정', '19880511', '여'],
    ['장민호', '19960522', '남'],
    ['박은영', '19950312', '여'],
    ['김태훈', '19950227', '남'],
    ['한지은', '19880110', '여'],
    ['황정훈', '19960512', '남'],
    ['박지한', '19970327', '남'],
    ['이주영', '19970222', '여'],
];
// CSV 파일 경로
const filePath = 'user.csv';

// 샘플 데이터를 100번 반복해서 추가 (타이틀을 제외한 10개의 데이터만 반복)
const repeatedData = Array.from({ length: 100 }, (_, index) => (index === 0 ? sampleData[0] : sampleData[index % 10]));

console.log("쓰기 시작");
writeCSV(filePath, repeatedData, (err) => {
    if (err) {
        console.error('CSV파일 쓰기 실패');
        return;
    }
    console.log("성공적으로 CSV파일 쓰기 완료");
});
console.log("쓰기 종료");

console.log("읽기 시작");
readCSV(filePath, (err, data) => {
    if (err) {
        console.error('CSV파일 읽기 실패');
        return;
    }
    console.log("CSV파일 내용", data);
})
console.log("읽기 종료");