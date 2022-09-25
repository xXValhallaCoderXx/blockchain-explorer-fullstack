// // const sendRequest = () => {
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         console.log('request sent')
// //         resolve({data: "server"})
// //       }, 1000)
// //     })
// //   }

// //   // 5 batches * 2 requests = 10 requests.
// //   const batches = (Array([]).fill(sendRequest))

// //   ;(async function() {
// //     for (const batch of batches) {
// //       try {
// //         console.log('-- sending batch --')
// //         const x = await Promise.all(batch.map(f => f()))
// //         console.log("batch end", x);
// //       } catch(err) {
// //         console.error(err)
// //       }
// //     }
// //   })()

const arrayChunker = (items, size) => {
  const chunks = [];
  items = [].concat(...items);

  while (items.length) {
    chunks.push(items.splice(0, size));
  }
  return chunks;
};

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });

const callApi = (apiParams) =>
  new Promise((resolve) => {
    console.log("api params: ");
    setTimeout(
      () => {
        resolve({ data: "api response" });
      },
    //   apiParams.index % 2 ? 5000 : 1000
    1000
    );
  });

//   async function ProcessDevice(device) {
//       console.log("ssss", device);
//       await sleep();
//   }

//   const items = [{hello: "world"}, {ss: "ss"}, {as:"sa"}, {werw: "sdfsf"}, {aSA: "SDA"}, {qeq:"adsaa"}]

//   // splice your items into chunks of 100, then process each chunk
//   // catching the result of each ProcessDevice in the chunk.map
//   // the results of the chunk are passed into the .then( )
//   // and you have a .catch( ) in case there's an error anywhere in the items
//   var jobArray = arrayChunker(items,2);
//   console.log(jobArray)

//   for (let i = 0; i < jobArray.length; i++) {
//     console.log("WHAT", )
//     Promise.allSettled(jobArray[i].map(x => ProcessDevice(x))).then(res => {
//         console.log("RESOLVE: ", res);
//     })
//     //   Promise.allSettled(
//     //       jobArray[i].map(ja => ProcessDevice(ja))
//     //   .then(function(results) { console.log("PromiseResults: " + results); })
//     //   .catch((err) => { console.log("error: " + err); }));
//   }

// const someData = [
//     {hehe: "asda"},
//     {hehe: "asda"},
//     {hehe: "asda"},
//     {hehe: "asda"},
//     {hehe: "asda"},
//     {hehe: "asda"},
//     {hehe: "asda"}
// ];

// (async () => {
//     const txRequests = someData.map((t, index) => callApi({ method: 'get', path: '/contact/', data: t, index}));
// const txRequestsResult = await Promise.all(txRequests);
// txRequestsResult.forEach(t => {
//   console.log("WHAT IS T: ", t);
// });
// })()

const someData = [
  { hehe: "asda" },
  { hehe: "asda" },
  { hehe: "asda" },
  { hehe: "asda" },
  { hehe: "asda" },
  { hehe: "asda" },
  { hehe: "asda" },
];

(async () => {
  const x = arrayChunker(someData, 4);


  for (let i = 0; i < x.length; i++) {
    console.log("WHAT", x[i])
    console.log("NEW BATCH", i);
    const txRequests = x[i].map((t, index) =>
      callApi({ method: "get", path: "/contact/", data: t, i })
    );
    console.log("NEW BATCH MAPPED - NOW AWAIT")
    const txRequestsResult = await Promise.all(txRequests);
    console.log("BATCH PROMISE DONE")
    txRequestsResult.forEach((t) => {
      console.log("API RESPONSE HERE: ", t);
    });
    console.log('SLEEP 1000ms')
    await sleep();
    console.log("SLEEP NDONE")
    // Promise.allSettled(jobArray[i].map(x => ProcessDevice(x))).then(res => {
    //     console.log("RESOLVE: ", res);
    // })
    //   Promise.allSettled(
    //       jobArray[i].map(ja => ProcessDevice(ja))
    //   .then(function(results) { console.log("PromiseResults: " + results); })
    //   .catch((err) => { console.log("error: " + err); }));
  }

//   x.forEach(async (y, index) => {
    // console.log("NEW BATCH", index);
    // const txRequests = y.map((t, index) =>
    //   callApi({ method: "get", path: "/contact/", data: t, index })
    // );
    // console.log("NEW BATCH MAPPED - NOW AWAIT")
    // const txRequestsResult = await Promise.all(txRequests);
    // console.log("BATCH PROMISE DONE")
    // txRequestsResult.forEach((t) => {
    //   console.log("API RESPONSE HERE: ", t);
    // });
    // console.log('SLEEP 1000ms')
    // await sleep();
    // console.log("SLEEP NDONE")
//   });
  //     const txRequests = someData.map((t, index) => callApi({ method: 'get', path: '/contact/', data: t, index}));
  // const txRequestsResult = await Promise.all(txRequests);
  // txRequestsResult.forEach(t => {
  //   console.log("WHAT IS T: ", t);
  // });
})();
