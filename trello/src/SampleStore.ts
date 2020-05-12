import { observable, action } from 'mobx';

export default class SampleStore {
    @observable yourStore = 'hello';

    @action changeStoreValue = (value: string) => {
        this.yourStore = value;
    };
    @action changeToWorld = () => {
        this.yourStore = "World";
    }
}