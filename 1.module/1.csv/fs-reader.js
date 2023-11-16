const fs = require('fs');

const filePath = 'sample.csv';

fs.readFile(filePath, 'utf8', (err, data) => {
    if(err) {
        console.error('파일을 읽는 중에 오류했습니다.', err);
        return;
    }
    //console.log(data);
    rows = data.split('\n');

    // 1. for loop 방식
    //  for(let i=0; i< rows.length; i++) {
    //      //console.log(rows[i]);
    //      const row = rows[i];
    //      const columns = row.split(',');
    //      console.log(`행 ${i+1}`, columns);
    //  }
    //  2. forEach 방식
    //  rows.forEach(row, i) => {
    //      const columns = row.split(',');
    //      console.log(`행 ${i+1}:`, columns);
    //  });

    //3. map 방식
    rows.map((row, i) => {
        const columns = row.split(',');
        console.log(`행 ${i+1}`, columns);
    });

});