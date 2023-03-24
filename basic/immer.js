// function immer(state, thunk) {
//   let copies = new Map(); // Map 的 key 可以是一个对象，非常适合用来缓存被修改的对象

//   const handler = {
//     get(target, prop) { // 增加一个 get 的劫持，返回一个 Proxy
//       return new Proxy(target[prop], handler);
//     },
//     set(target, prop, value) {
//       const copy = {...target}; // 浅拷贝
//       copy[prop] = value; // 给拷贝对象赋值
//       copies.set(target, copy);
//     }
//   };

//   function finalize(state) { // 增加一个 finalize 函数
//     const result = {...state};
//     Object.keys(state).map(key => { // 以此遍历 state 的 key
//       const copy = copies.get(state[key]);
//       if(copy) { // 如果有 copy 表示被修改过
//         result[key] = copy; // 就是用修改后的内容
//       } else {
//         result[key] = state[key]; // 否则还是保留原来的内容
//       }
//     });
//     return result;
//   }

//   const proxy = new Proxy(state, handler);
//   thunk(proxy);
//   return finalize(state);
// }


function immer(baseState, thunk) {
    // Maps baseState objects to proxies
    const proxies = new Map()
    // Maps baseState objects to their copies
    const copies = new Map()

    const objectTraps = {
        get(target, prop) {
            return createProxy(getCurrentSource(target)[prop])
        },
        has(target, prop) {
            return prop in getCurrentSource(target)
        },
        ownKeys(target) {
            return Reflect.ownKeys(getCurrentSource(target))
        },
        set(target, prop, value) {
            const current = createProxy(getCurrentSource(target)[prop])
            const newValue = createProxy(value)
            if (current !== newValue) {
                const copy = getOrCreateCopy(target)
                copy[prop] = newValue
            }
            return true
        },
        deleteProperty(target, property) {
            const copy = getOrCreateCopy(target)
            delete copy[property]
            return true
        }
    }

    // creates a copy for a base object if there ain't one
    function getOrCreateCopy(base) {
        let copy = copies.get(base)
        if (!copy) {
            copy = Array.isArray(base) ? base.slice() : Object.assign({}, base)
            copies.set(base, copy)
        }
        return copy
    }

    // returns the current source of trugth for a base object
    function getCurrentSource(base) {
        const copy = copies.get(base)
        return copy || base
    }

    // creates a proxy for plain objects / arrays
    function createProxy(base) {
        if (isPlainObject(base) || Array.isArray(base)) {
            if (proxies.has(base)) return proxies.get(base)
            const proxy = new Proxy(base, objectTraps)
            proxies.set(base, proxy)
            return proxy
        }
        return base
    }

    // checks if the given base object has modifications, either because it is modified, or
    // because one of it's children is
    function hasChanges(base) {
        const proxy = proxies.get(base)
        if (!proxy) return false // nobody did read this object
        if (copies.has(base)) return true // a copy was created, so there are changes
        // look deeper
        const keys = Object.keys(base)
        for (let i = 0; i < keys.length; i++) {
            if (hasChanges(base[keys[i]])) return true
        }
        return false
    }

    // given a base object, returns it if unmodified, or return the changed cloned if modified
    function finalize(base) {
        if (isPlainObject(base)) return finalizeObject(base)
        if (Array.isArray(base)) return finalizeArray(base)
        return base
    }

    function finalizeObject(thing) {
        if (!hasChanges(thing)) return thing
        const copy = getOrCreateCopy(thing)
        Object.keys(copy).forEach(prop => {
            copy[prop] = finalize(copy[prop])
        })
        return copy
    }

    function finalizeArray(thing) {
        if (!hasChanges(thing)) return thing
        const copy = getOrCreateCopy(thing)
        copy.forEach((value, index) => {
            copy[index] = finalize(copy[index])
        })
        return copy
    }

    // create proxy for root
    const rootClone = createProxy(baseState)
    // execute the thunk
    thunk(rootClone)
    // and finalize the modified proxy
    return finalize(baseState)
}

function isPlainObject(value) {
    if (value === null || typeof value !== "object") return false
    const proto = Object.getPrototypeOf(value)
    return proto === Object.prototype || proto === null
}


const state = {
  "phone": "1-770-736-8031 x56442",
  "website": {site: "hildegard.org"}, // 注意这里为了方便测试状态共享，将简单数据类型改成了对象
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets",
    "info": {
        "test": "this is a test"
    },
    "checkObj": {
        "name": "Tims"
    },
  }
};

const copy = immer(state, draft => {
  draft.company.info.test = 'google';
});

console.log(copy.company.info.test);
console.log(state.company.info.test);
console.log(copy.website === state.website);
