class Model {
    constructor() {
        this.uploadParams = {};
        this.listeners=[];

        fetch("../../params", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(json => {
                this.uploadParams = json;
                this.UpdateListeners();
            })
    }

    Listen = (handler) =>
    {
        this.listeners.push(handler);
    }

    UpdateListeners = () =>
    {
        this.listeners.forEach((listener) => {listener();});
    }

    SendUploadParams = () => {
        fetch("../../setParams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.uploadParams),
        });
    }

    SetField = (value, fieldName) => {
        this.uploadParams[fieldName] = value;
        this.SendUploadParams();
    }

    GetField = (fieldName) => {
        return this.uploadParams[fieldName];
    }
};

let model = new Model();
export { model }