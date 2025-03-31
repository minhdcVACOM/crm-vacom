import * as Yup from 'yup';
export const VcSchema = {
    forgotPass: Yup.object().shape({
        tenant: Yup.string()
            .required('Phải có Mã truy cập'),
        email: Yup.string()
            .required('Phải có email')
            .email('email không hợp lệ')
    }),
    login: Yup.object().shape({
        tenant: Yup.string()
            .required('Phải có Mã truy cập'),
        username: Yup.string()
            .required('Phải có Tên truy cập'),
        password: Yup.string()
            .required('Phải vào mật khẩu'),
    }),
    accountName: Yup.object().shape({
        name: Yup.string()
            .required('Bạn phải nhập tên'),
        email: Yup.string()
            .required('Phải có email')
            .email('email không hợp lệ')
    }),
    accountPass: Yup.object().shape({
        currentPassword: Yup.string()
            .required('Phải vào mật khẩu'),
        newPassword: Yup.string()
            .required('Phải vào mật khẩu'),
        confirmPass: Yup.string()
            .required('Phải vào mật khẩu'),
    })
}
