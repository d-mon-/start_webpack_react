# blog_from_a_to_z
a simple isomorphic blog project with node.js react compass and mongoDB

###### <img src="./error.png" alt="alert" style="width: 35px;"/>  I put the following code in comment in order to allow mongoose to store documents without _id (let mongodb create _id)

```js
    //in mongoose/lib/model , function name: Model.prototype.$__handleSave
    if (!utils.object.hasOwnProperty(obj || {}, '_id')) {
         setTimeout(function() {
            reject(new Error('document must have an _id before saving'));
         }, 0);
         return;
    }
```



