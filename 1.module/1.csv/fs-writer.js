const fs = require('fs');

const filePath = 'sample.csv';

const dataToWrite = [
    ['Column1', 'Column2'],
    ['Value1', 'Value2'],
];

const csvContent = dataToWrite.map((row)=> row.join(',')).join('\n');
console.log(csvContent);

fs.writeFile(filePath, csvContent, 'utf8', (err) =>{
    if (err) {
        console.err("파일을 쓰는 도중 오류가 발생했습니다:", err);
        return;
    }   
    console.log('CSV 파일이 성공적으로 작성되었습니다');
});
