//npm install csv-writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'example.csv',
    header: [
        { id: 'column1', title: 'Column 1' },
        { id: 'column2', title: 'Column 2' },
    ],
});

const data = [
    { column1: 'value1', column2: 'value2' },
];

csvWriter.writeRecords(data)
    .then(()=> console.log('CSV 파일이 성공적으로 기록되었습니다'));