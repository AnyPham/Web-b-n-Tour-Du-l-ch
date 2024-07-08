import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import "../styles/account.scss";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const Account = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/users?username=${username}`)
            .then((res) => res.json())
            .then((resp) => {
            setUsername(user.username);
            setFullname(user.fullname);
            setEmail(user.email);
            setPhone(user.phone);
            }).catch((err) => {
        })
    }, [user.username]);

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const data1 = {username, fullname, email, phone};

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {username, fullname, email, phone};
        fetch(`http://localhost:5000/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
                'Accept':'application/json',
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        }).
        then(response => response.json())
            .then(data1 => {
            sessionStorage.clear();
            toast.success("Chỉnh sửa thành công")
            localStorage.setItem("user", JSON.stringify(data1))
            navigate('/');
        }).catch((err) => {
        })
    };

    return (
        <>
            <Navbar/>
            <title>Thông tin tài khoản</title>
            <div className="containerAcc" >
                <div className="wrapper" onSubmit={handleSubmit}>
                    <div className="profile_ava">
                            <div className="avatar-content">
                                <div className="img-circle text-center mb-3">
                                    <img src={user.img} alt="Image" className="shadow"/>
                                </div>
                                <h4 className="text-center">{user.fullname}</h4>
                            </div>
                            <div className="nav-pills" >
                                <a href="/acount" className="nav-link active"><i className="fa fa-home text-center mr-1"></i>
                                    Thông tin tài khoản</a>
                                <a href="/resetPassword" className="nav-link"><i className="fa fa-home text-center mr-1"></i>
                                    Mật khẩu</a>
                            </div>
                    </div>
                    <form className="content">
                        <div className="tab-pane" id="account">
                            <div className="title">Thông tin tài khoản</div>
                            <div className="row infor" onSubmit={handleSubmit}>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input disabled="disabled" type="text" className="form-control" value={username}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Họ tên</label>
                                        <input value={fullname} onChange={e=>setFullname(e.target.value)} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input value={phone} onChange={e=>setPhone(e.target.value)} type="phone" className="form-control"/>
                                    </div>
                                </div>
                                <div className="button">
                                    <button type="submit" className="btn btn-primary">Chỉnh sửa</button>
                                    <button type="reset" className="btn btn-light">Huỷ</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}