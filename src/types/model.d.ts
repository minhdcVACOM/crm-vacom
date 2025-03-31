export { };
declare global {
    interface IBackendRes<T> {
        error?: IError;
        message: string;
        statusCode: number | string;
        data?: T;
    }
    interface IError {
        code: string;
        details: string;
        message: string;
        validationErrors: IErrorValidation[];
    }
    interface IErrorValidation {
        members: string[];
        message: string;
    }
    interface ITenant {
        success: boolean;
        tenantId: string;
        name: string;
        isActive: boolean;
    }
    interface ILogin {
        tenantId: string;
        tenant: string;
        username: string;
        password: string;
        token: string;
        tokenType: string;
        remember: boolean;
    }
}
