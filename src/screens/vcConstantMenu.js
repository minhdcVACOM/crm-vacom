export const VcConstantMenu={
    public:{
        doc:[
            {
                title: 'Tài liệu',
                data: [
                    {
                        title: "EDOC - Tài liệu ký điện tử",
                        menuId: "6684da31c602b0dbdbf8876c",
                        windowId:"6684d381c602b0dbdbf8875a",
                        fieldSearch: [
                            {id:"name",value:"Tên tài liệu"},
                            {id:"edocNumber",value:"Số tài liệu"},
                            {id:"searchCode",value:"Mã tra cứu"},
                            {id:"status",value:"Trạng thái",ref:"6684db24c602b0dbdbf8876e"},
                            {id:"employeeId",value:"Người đăng ký",ref:"647078277d4aeb3a9f76ca26"}
                        ]
                    },
                    {
                        title: "Duyệt tài liệu",
                        menuId: "66e2559168006aaa89e38069",
                        windowId:"66e24eef68006aaa89e38043",
                        fieldSearch: [
                            {id:"name",value:"Tên tài liệu"},
                            {id:"edocNumber",value:"Số tài liệu"},
                            {id:"searchCode",value:"Mã tra cứu"},
                            {id:"status",value:"Trạng thái",ref:"6684db24c602b0dbdbf8876e"}
                        ]
                    }
                ]
            }
        ],
        public:[
            {
                title: 'Danh mục chính',
                data: [
                    {
                        title: "Khách hàng tiềm năng",
                        menuId: "65235a74fb4d80e403fbb9bc",
                        windowId:"65235739fb4d80e403fbb9a8",
                        quickSearch: true,
                        fieldSearch: [
                            {id:"name",value:"Tên khách hàng"},
                            {id:"code",value:"Mã khách hàng"},
                            {id:"contact",value:"Liên hệ"},
                            {id:"taxCode",value:"Mã số thuế"},
                            {id:"tel",value:"Điện thoại"}
                        ]
                    },
                    {
                        title: "Đề nghị thanh toán",
                        menuId: "64800b829f38a89cd515291f",
                        windowId:"648004f59f38a89cd51528f3",
                        fieldSearch: [
                            {id:"description",value:"Diễn giải"},
                            {id:"employeeId",value:"Nhân viên",ref:"647078277d4aeb3a9f76ca26"}
                        ]
                    },
                    {
                        title: "Đăng ký công việc hàng ngày",
                        menuId: "6482edef016051aff794cf79",
                        windowId:"6482eb31016051aff794cf67",
                        fieldSearch: [
                            {id:"name",value:"Tên công việc"}
                        ]
                    },
                    {
                        title: "Duyệt đăng ký công việc",
                        menuId: "6483e5490b2e01182da847c1",
                        windowId:"6483e13d0b2e01182da847af",
                        fieldSearch: [
                            {id:"description",value:"Diễn giải"}
                        ]
                    },
                    {
                        title: "Đề nghị chuyển khoản",
                        menuId: "65a7583a6a3b0f9fdca1f418",
                        windowId:'65a753456a3b0f9fdca1f3fc',
                        fieldSearch: [
                            {id:"note",value:"Ghi chú"}
                        ]
                    },
                    {
                        title: "Xác nhận công nợ",
                        menuId: "65f1282c727b9d41363a580c",
                        windowId:"65f12079727b9d41363a57ea",
                        quickSearch: true
                    }
                ]
            },
            {
                title: 'Danh mục khác',
                data: [
                    {
                        title: "Xin nghỉ phép",
                        menuId: "646f0ed5163b075e01b93545",
                        windowId:"646ed0bf863a597b8ac77992",
                        fieldSearch: [
                            {id:"reason",value:"Lý do"}
                        ]
                    },
                    {
                        title: "Lịch công tác",
                        menuId: "6479692b8b16f9e4f72d20b1",
                        windowId:"647955d08b16f9e4f72d2083",
                        fieldSearch: [
                            {id:"customerName",value:"Tên khách hàng"}
                        ]
                    },
                    {
                        title: "Vi phạm",
                        menuId: "647eec1b6c2c48afde313b4a",
                        windowId:"647eebe86c2c48afde313b48",
                        fieldSearch: [
                            {id:"description",value:"Diễn giải"}
                        ]
                    },
                    {
                        title: "Đề nghị tạm ứng",
                        menuId: "647efc656c2c48afde313ba9",
                        windowId:"647ef9646c2c48afde313b99",
                        fieldSearch: [
                            {id:"reason",value:"Lý do"}
                        ]
                    }
                ]
            }
        ],
        list:[
            {
                title: 'Danh mục chính',
                data: [
                    {
                        title: "Nhân viên",
                        menuId: "646f29ff163b075e01b935c7",
                        windowId:"646f25ee163b075e01b935b9",
                        fieldSearch: [
                            {id:"name",value:"Tên nhân viên"}
                        ]
                    },
                    {
                        title: "Loại phần mềm",
                        menuId: "64d5cca4bc2470bc11c2e4dd",
                        windowId:"64d5cadebc2470bc11c2e4cb",
                        fieldSearch: [
                            {id:"name",value:"Tên phần mềm"}
                        ]
                    },
                    {
                        title: "Sản phẩm",
                        menuId: "64e5c6787d287b8bddd64f60",
                        windowId:"64e5c4957d287b8bddd64f58",
                        quickSearch: true
                    },
                    {
                        title: "Loại hợp đồng",
                        menuId: "651e65a85755ec9bd3c586f5",
                        windowId:"651e63485755ec9bd3c586e3",
                        marginBottom: 10,
                        fieldSearch: [
                            {id:"name",value:"Tên hợp đồng"}
                        ]
                    }
                ]
            },
            {
                title: 'Danh mục khác',
                data: [
                    {
                        title: "Chức vụ",
                        menuId: "646f1fdc163b075e01b9356d",
                        windowId:"646f1dbf163b075e01b93557",
                        fieldSearch: [
                            {id:"name",value:"Tên chức vụ"}
                        ]
                    },
                    {
                        title: "Phòng ban",
                        menuId: "646f23e3163b075e01b93587",
                        windowId:"646f21d6163b075e01b9357f",
                        fieldSearch: [
                            {id:"name",value:"Tên phòng ban"}
                        ]
                    },
                    {
                        title: "Tỉnh thành",
                        menuId: "64785a7b8b16f9e4f72d2053",
                        windowId:"647858428b16f9e4f72d2041",
                        fieldSearch: [
                            {id:"name",value:"Tên tỉnh thành"}
                        ]
                    },
                    {
                        title: "Đơn vị tính",
                        menuId: "64ec5e101b2fd0cceadad9d5",
                        windowId:"64ec5d161b2fd0cceadad9cf",
                        fieldSearch: [
                            {id:"code",value:"Mã đơn vị tính"}
                        ]
                    },
                    {
                        title: "Lý do chuyển khoản",
                        menuId: "65d6d3e64e0dfb3826b177a8",
                        windowId:"65d6d0f54e0dfb3826b17796",
                        fieldSearch: [
                            {id:"name",value:"Tên lý do"}
                        ]
                    },
                    {
                        title: "Loại báo giá",
                        menuId: "651f824f147babf9df26f38f",
                        windowId:"651f8090147babf9df26f387",
                        marginBottom: 20,
                        fieldSearch: [
                            {id:"name",value:"Tên báo giá"}
                        ]
                    }
                ]
            }
        ]
    }
}