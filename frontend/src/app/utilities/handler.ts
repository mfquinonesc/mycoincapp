export class Handler {
    private _massage: string = '';
    private _hasAlert: boolean = false;
    private _hasLoader: boolean = false;
    private _hasCancel: boolean = false;
    private _alertID: number = 0;

    constructor() {
        this.resetAlert();
    }

    get alertID() {
        return this._alertID;
    }

    get hasCancel() {
        return this._hasCancel;
    }

    get message() {
        return this._massage;
    }

    get isLoading() {
        return this._hasLoader;
    }

    get isAlerting() {
        return this._hasAlert;
    }

    resetAlert() {
        this._massage = '';
        this._hasAlert = false;
        this._hasCancel = false;
        this._hasLoader = false;
        this._alertID = 0;
    }

    showLoader() {
        this._hasLoader = true;
    }

    hideLoader() {
        this._hasLoader = false;
    }

    doLoading() {
        this._hasLoader = !this._hasLoader;
    }

    doAlerting() {
        this._hasAlert = !this._hasAlert;
    }

    hideAlert() {
        this._hasAlert = false;
    }

    showAlert(msg: string): number {
        this._hasAlert = true;
        this._massage = msg;
        this._alertID++;
        return this._alertID;
    }

    showConfirm(msg: string): number {
        this._hasCancel = true;
        return this.showAlert(msg);
    }
}
