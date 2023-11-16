function readCSV(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
    
    if(err) {
        console.error('파일을 읽는 중에 오류가 발생했습니다:', err);
        return callback(err, null);
    }
    const rows = data.split('\n');
    const result = rows.map((row) => row.split(','));
    callback (null, result);
    });
}

function writeCSV(filePath, dataToWrite, callback) {
    const csvContent = dataToWrite.map((row)=> row.join(',')).join('\n');
    // 의도적으로 한줄 한줄 느리게 쓰기 위한 데모 코드
    // 한줄씩 처리하도록 setTimeout을 통해서 한줄 한줄 쓸때마다 지연 처리
    let currentIndex = 0;

    function writeLine() {
        if (currentIndex < dataToWrite.length){
        const line = dataToWrite[currentIndex].join(',');
       
        fs.appendFile(filePath, line + '\n', 'utf8', (err) => {
            if (err) {
                console.error ('파일쓰기오류', err);
                return callback(err);
            }

            currentIndex++;
            setTimeout(writeLine, 10); //10ms 간격으로 처리
            });
        } else {
            callback(null);
        }
    }
    writeLine();
}

module.export = { readCSV, writeCSV };