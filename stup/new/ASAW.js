
const CreatePromise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
        let Err = false;
        if (!Err) {
            resolve({
                Name: `Nemish`,
                Class: `12`,
                Gender: `Male`
            })
        }
        else {
            reject(`THERE WAS SOME ISSUE IN THE SERVER`);
        }

    }, 3000);
});

// async function promiseCollector() {

//     const data = await CreatePromise;
//     console.log(data);

// }

// promiseCollector();

//Is code me ye issue hai ki agar ham is CreatPromise ko Ye manke cahle ki ye surf Sucessful hi hoga har
//  request me to ye code corrcet hai but if reject ho jati hai call gar to  ye code error thrwo karega
// beacuse at thatmoment the wait creatPromise would give a error

//so for that we have to use the try catch method.
//____________________________________________________________________________FIX_____________________/

async function promiseCollector() {

    try{
        const data = await CreatePromise;
        console.log(data);
    }
    catch(error)
    {
        console.log("ERROR IN LOADING DATA");  //grafully catcing error
    }
}

promiseCollector();


