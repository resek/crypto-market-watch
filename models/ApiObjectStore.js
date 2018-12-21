import {types} from "mobx-state-tree";

const ApiObjectStore = types
    .model("ApiObjectStore", {
        id: types.number,
        name: types.string,
    });

export default ApiObjectStore;