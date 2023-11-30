const database = require('./final_database2');
async function main(){
    
    //db = new Database('mydb4.db');
    db = new Database(':memory:') ; //memory db로 만들기
    try{
    //await db.createTable();

    const newUserA = { username: 'sunjinjung', email: 'sunjin@mail.com' }
    const newUserB = { username: 'sunjinjung2', email: 'sunjin2@mail.com' }        
    
    await db.insertUser(newUserA);
    await db.insertUser(newUserB); 
    
    const changeUser = {
        id: 3,
        username: 'sunjinjung',
        email: 'sunjin@mail.com'
    }

    await db.updateUser(changeUser);
    await db.readUser();

    const delUser = { id: 2 }  
    await db.deleteUser(delUser);

    const delUser2 = { id: 2 }  
    await db.deleteUser(delUser2);
    } catch (error) {
        console.log('에러발생:', error)
    } finally {
        //데이터베이스 연결 종류
        db.close();
    }
} 

main();