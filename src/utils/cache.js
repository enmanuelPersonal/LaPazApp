import {AsyncStorage} from 'react-native'
import { Cache } from "react-native-cache";


export const cache = new Cache({
    namespace: "myapp",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});