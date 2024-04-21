export class UserModel {
    firstName?: string;
    lastName?: string;
    phone?: number;
    email?: string;
    password?: string;
    budget?: number;
    docType?: string;
    identification?:number;

    constructor(firstName?: string, lastName?: string, phone?: number, email?: string, password?: string, budget?: number, docType?: string,identification?:number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.budget = budget;
        this.docType = docType;
        this.identification = identification;
    }
}
